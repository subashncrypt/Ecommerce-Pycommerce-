/*
 * @author: Indu Munagapati
 * User authentication controller
 */

const userModel = require("../models/user-model");
const userAddressModel = require("../models/user-address-model");
const sellerModel = require("../models/seller-model");
const createJWT = require("../authentication/authentication");

const verifyEmailAddress = async (req, res) => {
  const emailAddress = req.body.emailAddress;

  try {
    //Fetching email address from DB to check if the email address already exists or not
    const getEmailAddress = await userModel.find({
      emailAddress: emailAddress,
    });
    if (getEmailAddress.length !== 0) {
      res.status(400).json({
        message: "User already exists",
      });
    } else {
      res.status(200).json({
        message: "No user found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error " + err,
    });
  }
};

const userRegistration = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const securityQuestionOne = req.body.securityQuestionOne;
  const securityQuestionTwo = req.body.securityQuestionTwo;

  try {
    //creating new user model in the DB
    await userModel.create({
      firstName,
      lastName,
      emailAddress,
      password,
      phoneNumber,
      address,
      securityQuestionOne,
      securityQuestionTwo,
    });
    await userAddressModel.create({
      emailAddress,
      address,
    });
    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error " + err,
    });
  }
};

const userLogin = async (req, res) => {
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;

  try {
    //Fetching user from DB to check using the email address
    const getUser = await userModel.find({ emailAddress: emailAddress });
    if (getUser.length !== 0 && getUser[0].password === password) {
      const isSeller = getUser[0].seller;
      const id = getUser[0]._id;
      res.status(200).json({
        message: "User Login Successfully",
        jwtoken: createJWT.createJWT(emailAddress),
        id,
        emailAddress,
        isSeller,
      });
    } else {
      res.status(400).json({
        message: "Email address/Password is incorrect",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error " + err,
    });
  }
};

const forgotPassword = async (req, res) => {
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;
  const securityQuestionOne = req.body.securityQuestionOne;
  const securityQuestionTwo = req.body.securityQuestionTwo;

  try {
    const getUser = await userModel.find({ emailAddress: emailAddress });
    if (getUser.length !== 0) {
      if (
        getUser[0].securityQuestionOne === securityQuestionOne &&
        getUser[0].securityQuestionTwo === securityQuestionTwo
      ) {
        //updating the password of the user
        await userModel.updateOne(
          {
            emailAddress: emailAddress,
          },
          {
            password: password,
          }
        );
        res.status(201).json({
          message: "Password changed successfully",
        });
      } else {
        res.status(400).json({
          message: "Security question answers are incorrect",
        });
      }
    } else {
      res.status(400).json({
        message: "Email address is incorrect",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error " + err,
    });
  }
};

const sellerRegistration = async (req, res) => {
  const emailAddress = req.body.emailAddress;
  const companyName = req.body.companyName;
  const companyRegistrationNumber = req.body.companyRegistrationNumber;
  const location = req.body.location;

  try {
    //creating new seller model in the DB
    await sellerModel.create({
      emailAddress,
      companyName,
      companyRegistrationNumber,
      location,
    });
    //updating the seller to true in the user model
    await userModel.updateOne(
      {
        emailAddress: emailAddress,
      },
      {
        seller: true,
      }
    );
    res.status(201).json({
      message: "Seller Registered Successfully",
      seller: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error " + err,
    });
  }
};

module.exports = {
  verifyEmailAddress,
  userRegistration,
  userLogin,
  forgotPassword,
  sellerRegistration,
};

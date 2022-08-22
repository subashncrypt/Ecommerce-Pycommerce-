/*
 * @author: Indu Munagapati
 * Profile information and manage addresses controller
 */

const userModel = require("../models/user-model");

const getUserDetails = async (req,res) => {
  const emailAddress = req.params.id;

  try {
    const getUser = await userModel.find({ emailAddress: emailAddress });
      if (getUser.length !== 0) {
        const name = getUser[0].firstName + " " + getUser[0].lastName;
        const phoneNumber = getUser[0].phoneNumber;
        res.status(200).json({
          name, phoneNumber
        });
    } else {
        res.status(400).json({
          message: "No user found"
        });
    }
  } catch (err) {
      res.status(500).json({
        message: "Internal server error " + err,
      });
  }
}

const changePassword = async (req,res) => {
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;

  try {
    const getUser = await userModel.find({ emailAddress: emailAddress });
    if (getUser.length !== 0) {
      //updating the password of the user
      await userModel.updateOne(
        { emailAddress: emailAddress },
        { password: password }
      );
      res.status(201).json({
        message: "Password changed successfully",
      });
    } else {
      res.status(400).json({
        message: "No User Found",
      });
    }
  } catch (err) {
      res.status(500).json({
        message: "Internal server error " + err,
      });
  }
}

const updatePhoneNumber = async (req,res) => {
  const emailAddress = req.body.emailAddress;
  const phoneNumber = req.body.phoneNumber;

  try {
    const getUser = await userModel.find({ emailAddress: emailAddress });
    if (getUser.length !== 0) {
      //updating the phone number of the user
      await userModel.updateOne(
        { emailAddress: emailAddress },
        { phoneNumber: phoneNumber }
      );
      res.status(201).json({
        message: "Phone number changed successfully",
      });
    }
  } catch (err) {
      res.status(500).json({
        message: "Internal server error " + err,
      });
  }
}

module.exports = {
  getUserDetails,
  changePassword,
  updatePhoneNumber
};

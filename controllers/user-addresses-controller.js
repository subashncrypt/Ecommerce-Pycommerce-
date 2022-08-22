/*
 * @author: Indu Munagapati
 * User authentication controller
 */

const userAddressModel = require("../models/user-address-model");

const addAddress = async (req, res) => {
    const emailAddress = req.body.emailAddress;
    const address = req.body.address;
    try {
      //creating new user address model in the DB
      await userAddressModel.create({
        emailAddress,
        address,
      });
      res.status(201).json({
        message: "User Address Successfully added",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error " + err,
      });
    }
  };

const modifyAddress = async (req, res) => {
    const id = req.body.id;
    const address = req.body.address;
    try {
      const getAddress = await userAddressModel.find({ _id: id });
      if (getAddress.length !== 0) {
          //updating the address of the user
          await userAddressModel.updateOne(
            {
                _id: id,
            },
            {
                address: address,
            }
          );
          res.status(201).json({
            message: "Address changed successfully",
          });
      } else {
        res.status(400).json({
          message: "Address is not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error " + err,
      });
    }
  };


  const deleteAddress = async (req, res) => {
    const id = req.params.id;
    try {
      const getAddress = await userAddressModel.find({ _id: id });
      if (getAddress.length !== 0) {
          //deleting address of the user
          await userAddressModel.deleteOne(
            {
                _id: id,
            }
          );
          res.status(200).json({
            message: "Address deleted successfully",
          });
      } else {
        res.status(400).json({
          message: "Address is not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error " + err,
      });
    }
  };

  const viewAddresses = async (req, res) => {
    const emailAddress = req.params.id;
  
    try {
      //Fetching user addresses from DB using the email address
      const getAddress = await userAddressModel.find({ emailAddress: emailAddress });
      if(getAddress.length !== 0){
        res.status(200).json({
          message: "Successfully retrived addresses",
          getAddress
        });
      } else {
        res.status(404).json({
          message: "No Addresses Found",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error " + err,
      });
    }
  };

module.exports = {
    addAddress,
    modifyAddress,
    viewAddresses,
    deleteAddress,
  };

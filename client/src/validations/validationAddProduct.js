/*
* @author: Meghdoort Ojha
*/
import Validator from "validator";
import isEmpty from "lodash/isEmpty";

function calculateImageSize(img) {
  let sizeInBytes = encodeURI(img).split(/%..|./).length - 1;
  let sizeInMb = sizeInBytes / 1000000;
  return sizeInMb;
}
function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.category)) {
    errors.category = "This field is required";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "This field is required";
  }

  // if (Validator.isEmpty(data.serialNo)) {
  //   errors.serialNo = "This field is required";
  // } else if (!Validator.isNumeric(data.serialNo)) {
  //   errors.serialNo = "Please enter a valid number";
  // }

  if (Validator.isEmpty(data.image)) {
    errors.image = "This field is required";
  } else if (calculateImageSize(data.image) > 2) {
    errors.image = "Maximum file size is 2mb";
  }

  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = "This field is required";
  } else if (!Validator.isNumeric(data.quantity)) {
    errors.quantity = "Please enter a valid number";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "This field is required";
  } else if (!Validator.isNumeric(data.price)) {
    errors.price = "Please enter a valid number";
  }

  if (Validator.isEmpty(data.discount)) {
    errors.discount = "This field is required";
  } else if (!Validator.isNumeric(data.discount)) {
    errors.discount = "Please enter a valid number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default validateInput;

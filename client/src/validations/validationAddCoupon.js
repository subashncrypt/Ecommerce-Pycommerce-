/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 */
import Validator from "validator";
import isEmpty from "lodash/isEmpty";
/**
 * Function to validate input data from the forms
 */
function validateInput(data) {
  let errors = {};
  /**
   * The condition to check if the coupon code is empty
   */
  if (Validator.isEmpty(data.couponCode)) {
    errors.couponCode = "This field is required";
  }
  /**
   * The condition to check if the coupon condition is empty
   */
  if (Validator.isEmpty(data.couponCondition)) {
    errors.couponCondition = "This field is required";
  }
  /**
   * The condition to check if the maximum amount off is empty or not a number
   */
  if (Validator.isEmpty(data.maximumOff)) {
    errors.maximumOff = "This field is required";
  } else if (!Validator.isNumeric(data.maximumOff)) {
    errors.maximumOff = "Please enter a valid number";
  }
  /**
   * The condition to check if the discount is empty or not a number
   */
  if (Validator.isEmpty(data.couponDiscount)) {
    errors.couponDiscount = "This field is required";
  } else if (!Validator.isNumeric(data.couponDiscount)) {
    errors.couponDiscount = "Please enter a valid number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
/**
 *  The function above is exported as validateInput
 */
export default validateInput;

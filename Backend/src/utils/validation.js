import validator from 'validator';

export const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  // Check names
  if (!firstName || !lastName) {
    throw new Error("First name and last name are required.");
  }
  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First name should be 4-50 characters.");
  }
  if (lastName.length < 2 || lastName.length > 50) {
    throw new Error("Last name should be 2-50 characters.");
  }

  // Check email
  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("A valid email address is required.");
  }

  // Check password
  if (!password) {
    throw new Error("Password is required.");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough.");
  }
};


export const validateProfileEditData = (req) => {
  const editableFields = ['firstName', 'lastName', 'age', 'gender', 'about', 'photoUrl', 'skills'];
  const isEditAllowed = Object.keys(req.body).every((field) => editableFields.includes(field));
  return isEditAllowed;
}
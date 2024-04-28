// Description: Error messages for the application

const emptyFieldErrorMessage = ( field ) => `${field} cannot be empty`;

const invalidEmailErrorMessage = () =>
    "Invalid email address. The email address should be in the " +
    "format: email@example.com";

const invalidIPAddressErrorMessage = () =>
    "Invalid IP address. The address should be within the range " +
    "from 0.0.0.0 to 255.255.255.255";

const invalidPasswordErrorMessage = () =>
    "Password must have at least 8 characters, 1 uppercase letter, " +
    "1 lowercase letter, 1 special character and passwords must be equal.";

export {
    emptyFieldErrorMessage,
    invalidEmailErrorMessage,
    invalidIPAddressErrorMessage,
    invalidPasswordErrorMessage,
};

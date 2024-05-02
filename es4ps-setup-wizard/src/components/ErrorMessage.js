/*
 * The purpose of this file is to provide error messages template as
 * well as a component (ErrorMessage) to display them when appropriate.
 * All current and future error messages should be added to this file.
 */

import './ErrorMessage.css';

const emptyFieldErrorMessage = ( field ) => `${field} cannot be empty`;

const invalidEmailErrorMessage = () =>
    "Invalid email address. The email address should be in the " +
    "format: email@example.com";

// At the current release, this is spefic for Samba
const invalidIPAddressErrorMessage = () =>
    "Invalid IP address. The address should be within the range " +
    "from 0.0.0.0 to 255.255.255.255";

// Used almost anywhere where a password is required, except
// in the SMTPPassword field where a user must input an external
// smtp service password which may not have the same requirements
// as the ES4PS passwords.
const invalidPasswordErrorMessage = () =>
    "Password must have at least 8 characters, 1 uppercase letter, " +
    "1 lowercase letter, 1 special character and passwords must be equal.";

// One object for templates in order to make exporting easier
// But this can be changed in next releases.
const templateMessages = {
    emptyFieldErrorMessage,
    invalidEmailErrorMessage,
    invalidIPAddressErrorMessage,
    invalidPasswordErrorMessage
};

// A simple and elegant error component that is enough for the current
// requirements. It can be changed in the future.
const ErrorMessage = ({ message }) => {
    return (
        <>
        <p className='error-message'>{message}</p>
        </>
    );
}

export { ErrorMessage, templateMessages };

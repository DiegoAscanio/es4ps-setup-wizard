const validConfig = ( config ) => {
    let valid = true;
    for ( let attribute in config ) {
        if ( ! config[attribute].valid ) {
            valid = false;
            break;
        }
    }
    return valid;
};

const isEmpty = (value) =>
    value === undefined || value === null || value === "";

const isNotEmpty = (value) =>
    !isEmpty(value);

const isEmailAddressValid = (email) =>
    email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;

const isIPAddressValid = (ip) =>
    ip.match(/^([0-9]{1,3}\.){3}[0-9]{1,3}$/) !== null;

const isPasswordValid = (password1, password2) => {
    // password should be at least 8 characters long
    // password should contain at least one number
    // password should contain at least one special character
    // password should contain at least one uppercase letter
    // password should contain at least one lowercase letter
    // password should match the confirmation password
    let condition = true;
    condition &= password1.length >= 8;
    condition &= password1.match(/[0-9]/) !== null;
    condition &= password1.match(/[!@#$%^&*]/) !== null;
    condition &= password1.match(/[A-Z]/) !== null;
    condition &= password1.match(/[a-z]/) !== null;
    condition &= password1 === password2;
    return Boolean(condition);
};

export {
    isEmpty,
    isNotEmpty,
    isEmailAddressValid,
    isIPAddressValid,
    isPasswordValid,
    validConfig
};

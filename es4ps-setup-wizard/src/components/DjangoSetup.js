/* 
 *  RabbitMQSetup, DjangoSetup and SambaSetup are all similar components
 *  structured in the same way:
 *  - They contain states to store values from the input fields and
 *    boolean flags states to check if the values are valid or not.
 *  - They contain useEffect hooks to update the Config state with the
 *    values from the input fields if they are valid.
 *  - They use an input field map containing the label, placeholder,
 *    input handler, valid flag, error message and type of the input
 *    for each property needed to be set in the Config state.
 *      - This is made this way to avoid code repetition when creating
 *      div form-groups to show each input field. So, instead of building
 *      each div form-group manually, we can use the InputFieldGroup
 *      component to receive a map of them and render all the input fields
 *      in a loop.
 */

import { useState, useEffect } from "react";

import { 
    isNotEmpty, 
    isEmailAddressValid, 
    isPasswordValid 
} from "./validators";

import { 
    emptyFieldErrorMessage, 
    invalidPasswordErrorMessage, 
    invalidEmailErrorMessage
} from "./errorMessages";

import { InputFieldGroup } from "./InputComponents";

const DjangoSetup = ({ Config, ConfigUpdateHandler }) => {
    // create states to store and check all the values of the Django setup

    const [djangoSuperuserName, setDjangoSuperuserName] = useState("")
    const [validDjangoSuperuserName, setValidDjangoSuperuserName] = useState(false)
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [validDjangoSuperuserPassword, setValidDjangoSuperuserPassword] = useState(false);
    const [FQDN, setFQDN] = useState("");
    const [validFQDN, setValidFQDN] = useState(false);
    const [allowedEmailDomains, setAllowedEmailDomains] = useState("");
    const [validAllowedEmailDomains, setValidAllowedEmailDomains] = useState(false);
    const [smtpServer, setSmtpServer] = useState("");
    const [validSmtpServer, setValidSmtpServer] = useState(false);
    const [smtpPort, setSmtpPort] = useState("");
    const [validSmtpPort, setValidSmtpPort] = useState(false);
    const [smtpUsername, setSmtpUsername] = useState("");
    const [validSmtpUsername, setValidSmtpUsername] = useState(false);
    const [smtpPassword, setSmtpPassword] = useState("");
    const [validSmtpPassword, setValidSmtpPassword] = useState(false);

    // any update in each of these states will trigger this effect
    // to update the Config state with the new values if they are valid
    // and update the valid flags of each state.
    useEffect(() => {
        let newConfig = {
            superuserName: {
                value: isNotEmpty(djangoSuperuserName)
                       ? djangoSuperuserName
                       : "",
                valid: isNotEmpty(djangoSuperuserName)
            },
            superuserPassword: {
                value: isPasswordValid(password1, password2)
                       ? password1
                       : "",
                valid: isPasswordValid(password1, password2)
            },
            FQDN: {
                value: isNotEmpty(FQDN)
                       ? FQDN
                       : "",
                valid: isNotEmpty(FQDN)
            },
            allowedEmailDomains: {
                value: isNotEmpty(allowedEmailDomains)
                       ? allowedEmailDomains
                       : "",
                valid: isNotEmpty(allowedEmailDomains)
            },
            smtpServer: {
                value: isNotEmpty(smtpServer)
                       ? smtpServer
                       : "",
                valid: isNotEmpty(smtpServer)
            },
            smtpPort: {
                value: isNotEmpty(smtpPort)
                       ? smtpPort
                       : "",
                valid: isNotEmpty(smtpPort)
            },
            smtpUsername: {
                value: isEmailAddressValid(smtpUsername)
                       ? smtpUsername
                       : "",
                valid: isEmailAddressValid(smtpUsername)
            },
            smtpPassword: {
                value: isNotEmpty(smtpPassword)
                       ? smtpPassword
                       : "",
                valid: isNotEmpty(smtpPassword)
            },
        };
        ConfigUpdateHandler(newConfig);
        setValidDjangoSuperuserName(newConfig.superuserName.valid);
        setValidDjangoSuperuserPassword(newConfig.superuserPassword.valid);
        setValidFQDN(newConfig.FQDN.valid);
        setValidAllowedEmailDomains(newConfig.allowedEmailDomains.valid);
        setValidSmtpServer(newConfig.smtpServer.valid);
        setValidSmtpPort(newConfig.smtpPort.valid);
        setValidSmtpUsername(newConfig.smtpUsername.valid);
        setValidSmtpPassword(newConfig.smtpPassword.valid);
    }, [
        djangoSuperuserName,
        password1,
        password2,
        FQDN,
        allowedEmailDomains,
        smtpServer,
        smtpPort,
        smtpUsername,
        smtpPassword,
    ]);

    // here it is defined the map of input fields to be rendered
    // by the InputFieldGroup component, in order to avoid code repetition.
    // On next releases of ESP4S, it is planned to store this map in a
    // JSON file and load it dynamically to avoid code repetition. Also,
    // maybe a component to create these JSONs asking for the fields
    // and their properties could be created.
    const inputFieldsMap = {
        superuserName: {
            label: "Django Superuser Username",
            placeholder: "admin",
            inputHandler: setDjangoSuperuserName,
            validFlag: validDjangoSuperuserName,
            errorMessage: emptyFieldErrorMessage("Django Superuser Username")
        },
        password1: {
            label: "Django Superuser Password",
            placeholder: "Passw0rd!",
            inputHandler: setPassword1,
            validFlag: true,
            errorMessage: "",
            type: "password"
        },
        password2: {
            label: "Django Superuser Password (confirm)",
            placeholder: "Passw0rd!",
            inputHandler: setPassword2,
            validFlag: validDjangoSuperuserPassword,
            errorMessage: invalidPasswordErrorMessage(),
            type: "password"
        },
        FQDN: {
            label: "ES4PS Fully Qualified Domain Name (FQDN)",
            placeholder: "es4ps.example.com",
            inputHandler: setFQDN,
            validFlag: validFQDN,
            errorMessage: emptyFieldErrorMessage("ES4PS Fully Qualified Domain Name (FQDN)")
        },
        allowedEmailDomains: {
            label: "Allowed Email Domains (comma separated)",
            placeholder: "example.com,example.org",
            inputHandler: setAllowedEmailDomains,
            validFlag: validAllowedEmailDomains,
            errorMessage: emptyFieldErrorMessage("Allowed Email Domains")
        },
        // maybe in next releases smtpServer, smtpPort, smtpUsername and
        // smtpPassword will be replaced by django email services by
        // itselves, but for now, we need to have an existing SMTP server
        // with TLS over port 587 to send emails. We also need to hava
        // a valid email account (and its passwords) to send emails.
        // So the user needs to provide these informations and at least
        // the email will be validated to be a valid email address in the
        // format user@email.provider
        smtpServer: { 
            label: "SMTP Server",
            placeholder: "smtp.example.com",
            inputHandler: setSmtpServer,
            validFlag: validSmtpServer,
            errorMessage: emptyFieldErrorMessage("SMTP Server")
        },
        smtpPort: {
            label: "SMTP Port",
            placeholder: "587",
            inputHandler: setSmtpPort,
            validFlag: validSmtpPort,
            errorMessage: emptyFieldErrorMessage("SMTP Port")
        },
        smtpUsername: {
            label: "SMTP Username",
            placeholder: "es4ps@example.com",
            inputHandler: setSmtpUsername,
            validFlag: validSmtpUsername,
            errorMessage: invalidEmailErrorMessage()
        },
        smtpPassword: {
            label: "SMTP Password",
            placeholder: "Passw0rd!",
            inputHandler: setSmtpPassword,
            validFlag: validSmtpPassword,
            errorMessage: emptyFieldErrorMessage("SMTP Password"),
            type: "password"
        },
    };
    // as it is possible to see, the rendering code of this component
    // is very simple and clean, because the input fields are defined
    // in a map and rendered by the InputFieldGroup component.
    return (
        <>
            <h2>Django Setup</h2>
            <p>
                Django is a high-level Python web framework that encourages
                rapid development and clean, pragmatic design. It is used in
                ES4PS to manage users operations (creation, deletion, retrieval,
                etc.). allowing users of an enterprise which uses ES4PS to
                self register and have their accounts propagated to the
                ESP4S Samba AD-DC Server through celery tasks.
            </p>
            <InputFieldGroup inputFieldsMap={inputFieldsMap} />
        </>
    );
};

export default DjangoSetup;

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
            djangoFQDN: {
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
        setValidFQDN(newConfig.djangoFQDN.valid);
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

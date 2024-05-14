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
    isPasswordValid,
    areAllowedEmailDomainsValid
} from "./validators";

import {
    templateMessages
} from "./ErrorMessage";

import { InputFieldGroup } from "./InputComponents";

const emptyFieldErrorMessage = templateMessages.emptyFieldErrorMessage;
const invalidPasswordErrorMessage = templateMessages.invalidPasswordErrorMessage;
const invalidEmailErrorMessage = templateMessages.invalidEmailErrorMessage;
const invalidAllowedEmailDomainsErrorMessage = templateMessages.invalidAllowedEmailDomainsErrorMessage;

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
                value: areAllowedEmailDomainsValid(allowedEmailDomains)
                       ? allowedEmailDomains
                       : "",
                valid: areAllowedEmailDomainsValid(allowedEmailDomains)
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
            errorMessage: emptyFieldErrorMessage("Django Superuser Username"),
            tooltipText: "The Django Superuser is the user that will be\n" +
                          "created in the Django database to manage the\n" +
                          "Django application as well as to create, update\n" +
                          "and delete other users in the ES4All platform\n" +
                          "through the Django Admin interface."
        },
        password1: {
            label: "Django Superuser Password",
            placeholder: "Passw0rd!",
            inputHandler: setPassword1,
            validFlag: true,
            errorMessage: "",
            type: "password",
            tooltipText: "Set the super password that allows you to manage\n" +
                         "the domain users through the ES4All platform\'s\n" +
                         "Django Admin interface.",
            id: "django-superuser-password"
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
            label: "ES4All Fully Qualified Domain Name (FQDN)",
            placeholder: "es4all.example.com",
            inputHandler: setFQDN,
            validFlag: validFQDN,
            errorMessage: emptyFieldErrorMessage("ES4All Fully Qualified Domain Name (FQDN)"),
            tooltipText: "This is the field that represents the address that\n" +
                         "the members of your organization will use to register\n" +
                         "their users in the ES4All platform (and its Samba Domain\n" +
                         "Controller). You need to fill this field with a DNS\n" +
                         "address that points to the IP address of the server\n" +
                         "that hosts ES4All containers composition. This DNS address\n" +
                         "can be registered through a corporate DNS provider or\n" +
                         "in your organization\'s internal DNS server. It it is\n" +
                         "also possible to hardcode the resolution of this address\n" +
                         "to the IP address of the server in the windows hosts file\n" +
                         "located in C:\\Windows\\System32\\drivers\\etc\\hosts."
        },
        allowedEmailDomains: {
            label: "Allowed Email Domains (comma separated)",
            placeholder: "example.com,example.org",
            inputHandler: setAllowedEmailDomains,
            validFlag: validAllowedEmailDomains,
            errorMessage: invalidAllowedEmailDomainsErrorMessage(),
            tooltipText: "This field is used to restrict the email domains\n" +
                         "that can be used to register users in the ES4All.\n" +
                         "Through this field it is possible to restrict the\n" +
                         "registration of users only to your organization by\n" +
                         "your organization email domain. If you want to allow\n" +
                         "any user from anywhere to register in the ES4All, you\n" +
                         "can leave this field empty, although it is not\n" +
                         "recommended since it go against ES4All main purpose:\n" +
                         "to allow only users from a certain organization to\n" +
                         "register in the organization\'s domain controller."
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
            errorMessage: emptyFieldErrorMessage("SMTP Server"),
            tooltipText: "You should set the SMTP server as the name address\n" +
                         "that the server of your e-mail provider uses to\n" +
                         "allow their users to send e-mails. For microsoft\n" +
                         "outlook, live and hotmail accounts, the SMTP server\n" +
                         "is smtp-mail.outlook.com."
        },
        smtpPort: {
            label: "SMTP Port",
            placeholder: "587",
            inputHandler: setSmtpPort,
            validFlag: validSmtpPort,
            errorMessage: emptyFieldErrorMessage("SMTP Port"),
            tooltipText: "This is the TCP port used by SMTP servers\n" +
                         "to listen to incoming connections. The default\n" +
                         "port for SMTP servers is 587, but some servers\n" +
                         "may listen to other ports. You should check with\n" +
                         "your e-mail provider the port that you should use.\n" +
                         "For microsoft outlook, live and hotmail accounts,\n" +
                         "the port is 587."
        },
        smtpUsername: {
            label: "SMTP Username",
            placeholder: "es4all@example.com",
            inputHandler: setSmtpUsername,
            validFlag: validSmtpUsername,
            errorMessage: invalidEmailErrorMessage(),
            tooltipText: "This is simply the e-mail address that you use with\n" +
                         "your e-mail provider to send and receive e-mails.\n" +
                         "Some example of microsoft email addresses:\n" +
                         "email@hotmail.com, email@live.com, email@outlook.com," +
                         "etc."
                         
        },
        smtpPassword: {
            label: "SMTP Password",
            placeholder: "Passw0rd!",
            inputHandler: setSmtpPassword,
            validFlag: validSmtpPassword,
            errorMessage: emptyFieldErrorMessage("SMTP Password"),
            type: "password",
            tooltipText: "Your e-mail address password.",
            id: "smtp-password"
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
                ES4All to manage users operations (creation, deletion, retrieval,
                etc.). allowing users of an enterprise which uses ES4All to
                self register and have their accounts propagated to the
                ESP4S Samba AD-DC Server through celery tasks.
            </p>
            <InputFieldGroup inputFieldsMap={inputFieldsMap} />
        </>
    );
};

export default DjangoSetup;

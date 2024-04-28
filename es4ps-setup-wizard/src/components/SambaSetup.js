import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import { InputFieldGroup } from "./InputComponents";

import { 
    emptyFieldErrorMessage,
    invalidEmailErrorMessage,
    invalidIPAddressErrorMessage,
    invalidPasswordErrorMessage,
} from "./errorMessages";

import { isNotEmpty, isPasswordValid, isIPAddressValid } from "./validators";

import "./style.css";

const SambaSetup = ({ Config, ConfigUpdateHandler }) => {
    // state to store and check hostname of the samba server
    const [hostname, setHostname] = useState("");
    const [validHostname, setValidHostname] = useState(false);

    // state to store and check ip address of the samba server
    const [ip, setIp] = useState('');
    const [validIp, setValidIp] = useState(false);

    // state to store and check the domain of the samba server
    const [domain, setDomain] = useState("");
    const [validDomain, setValidDomain] = useState(false);

    // state to store and check the realm suffix of the samba server
    const [realmSuffix, setRealmSuffix] = useState("");
    const [validRealmSuffix, setValidRealmSuffix] = useState(false);

    // state to store and check the admin password of the samba server
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [validPassword, setValidPassword] = useState(true);

    // effect to run when any of the fields change
    useEffect(() => {
        let newConfig = {
            hostname: {
                value: isNotEmpty(hostname)
                       ? hostname
                       : "",
                valid: isNotEmpty(hostname)
            },
            ip: {
                value: isIPAddressValid(ip)
                       ? ip
                       : "",
                valid: isIPAddressValid(ip)
            },
            domain: {
                value: isNotEmpty(domain)
                       ? domain
                       : "",
                valid: isNotEmpty(domain)
            },
            realmSuffix: {
                value: isNotEmpty(realmSuffix)
                       ? realmSuffix
                       : "",
                valid: isNotEmpty(realmSuffix)
            },
            adminPassword: {
                value: isPasswordValid(password1, password2)
                       ? password1
                       : "",
                valid: isPasswordValid(password1, password2)
            }
        }
        ConfigUpdateHandler(newConfig);
        setValidHostname(newConfig.hostname.valid);
        setValidIp(newConfig.ip.valid);
        setValidDomain(newConfig.domain.valid);
        setValidRealmSuffix(newConfig.realmSuffix.valid);
        setValidPassword(newConfig.adminPassword.valid);
    }, [hostname, ip, domain, realmSuffix, password1, password2]);

    const inputFieldsMap = {
        hostname: {
            label: "Samba Server Hostname",
            placeholder: "ES4PSDC",
            inputHandler: setHostname,
            validFlag: validHostname,
            errorMessage: emptyFieldErrorMessage("Samba Server Hostname")
        },
        ip: {
            label: "Samba Server IP Address",
            placeholder: "",
            inputHandler: setIp,
            validFlag: validIp,
            errorMessage: invalidIPAddressErrorMessage()
        },
        domain: {
            label: "Samba Server Domain Name",
            placeholder: "DOM",
            inputHandler: setDomain,
            validFlag: validDomain,
            errorMessage: emptyFieldErrorMessage("Samba Server Domain Name")
        },
        realmSuffix: {
            label: "Samba Realm Suffix",
            placeholder: "ES4PS.LOCAL",
            inputHandler: setRealmSuffix,
            validFlag: validRealmSuffix,
            errorMessage: emptyFieldErrorMessage("Samba Realm Suffix")
        },
        password1: {
            label: "Samba Admin User Password",
            placeholder: "Passw0rd!",
            inputHandler: setPassword1,
            validFlag: true,
            errorMessage: "",
            type: "password"
        },
        password2: {
            label: "Confirm Samba Admin User Password",
            placeholder: "Passw0rd!",
            inputHandler: setPassword2,
            validFlag: validPassword,
            errorMessage: invalidPasswordErrorMessage(),
            type: "password"
        }
    };
    return (
        <>
            <h2>Samba Setup</h2>
            <p>
                Samba is a free and open-source software suite that provides
                file, print and active directory / domain controller services
                such as user authentication and authorization for Microsoft
                Windows clients. For that reason, samba is the core of the
                ES4PS platform to authenticate users in their Windows machines.
            </p>
            <p>
                For Samba you will need to configure a hostname for the server,
                an IP address, a domain name, a realm suffix to build a samba
                realm and a password for the samba admin user. A realm is a set
                of users, groups, and others identified by a domain name
                (example: DOM) and a domain suffix (example: ES4PS.LOCAL). So,
                for the current example, the realm would be DOM.ES4PS.LOCAL.
                If you are not sure about the inputs you can use the suggested
                values when available.
            </p>
            <InputFieldGroup inputFieldsMap={inputFieldsMap} />
        </>
    );
};

export default SambaSetup;

import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

import "./style.css";

const SambaSetup = ({ Config, ConfigUpdateHandler }) => {
    // state for hostname of the samba server
    const [hostname, setHostname] = useState("ES4PSDC");
    useEffect(() => {
        const newConfig = { ...Config, hostname: hostname };
        ConfigUpdateHandler(newConfig);
    }, [hostname]);

    // state for ip address of the samba server
    const [ip, setIp] = useState(null);
    useEffect(() => {
        const newConfig = { ...Config, ip: ip };
        ConfigUpdateHandler(newConfig);
    }, [ip]);

    // state for the domain of the samba server
    const [domain, setDomain] = useState("DOM");
    useEffect(() => {
        const newConfig = { ...Config, domain: domain };
        ConfigUpdateHandler(newConfig);
    }, [domain]);

    // state for the realm suffix of the samba server
    const [realmSuffix, setRealmSuffix] = useState(".ES4PS.LOCAL");
    useEffect(() => {
        const newConfig = { ...Config, realmSuffix: "." + realmSuffix };
        ConfigUpdateHandler(newConfig);
    }, [realmSuffix]);

    // state for the admin password of the samba server
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
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    useEffect(() => {
        const newConfig = {
            ...Config,
            adminPassword: isPasswordValid(password1, password2) ? password1 : null,
            validAdminPassword: isPasswordValid(password1, password2),
        };
        ConfigUpdateHandler(newConfig);
        setValidPassword(isPasswordValid(password1, password2));
    }, [password1, password2]);
    return (
        <>
            <h2>Samba Setup</h2>
            <p>
                Samba is a free and open-source software suite that provides
                file, print and active directory / domain controller services
                such as user authentication and authorization for Microsoft
                Windows clients.
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
            <div className="form-group">
                <label htmlFor="samba_hostname">Samba Server Hostname</label>
                <input
                    type="text"
                    className="form-control"
                    name="samba_user"
                    placeholder="ES4PSDC"
                    onChange={(e) => setHostname(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="samba_ip">Samba Server IP Address</label>
                <input
                    type="text"
                    className="form-control"
                    name="samba_ip"
                    onChange={(e) => setIp(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="samba_domain">Samba Server Domain Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="samba_domain"
                    placeholder="DOM"
                    onChange={(e) => setDomain(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="samba_realm">Samba Realm Suffix</label>
                <input
                    type="text"
                    className="form-control"
                    name="samba_realm"
                    placeholder="ES4PS.LOCAL"
                    onChange={(e) => setRealmSuffix(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="samba_password_1">
                    Samba Admin User Password:
                </label>
                <input
                    type="password"
                    className="form-control"
                    name="samba_password_1"
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder="Passw0rd!"
                />
            </div>
            <div className="form-group">
                <label htmlFor="samba_password_2">
                    Confirm Samba Admin User Password:
                </label>
                <input
                    type="password"
                    className="form-control"
                    name="samba_password_2"
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Passw0rd!"
                />
                {!validPassword && (
                    <ErrorMessage message="Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 special character and passwords must be equal." />
                )}
            </div>
        </>
    );
};

export default SambaSetup;

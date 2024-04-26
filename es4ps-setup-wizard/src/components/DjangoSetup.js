import { useState, useEffect } from "react";

const DjangoSetup = ({ Config, ConfigUpdateHandler }) => {
    const [djangoSuperuserUsername, setDjangoSuperuserUsername] = useState(
        Config.djangoSuperuserUsername
    );
    const [djangoSuperuserPassword, setDjangoSuperuserPassword] = useState(
        Config.djangoSuperuserPassword
    );
    const [FQDN, setFQDN] = useState(Config.FQDN);
    const [allowedEmailDomains, setAllowedEmailDomains] = useState(
        Config.allowedEmailDomains
    );
    const [smtpServer, setSmtpServer] = useState(Config.smtpServer);
    const [smtpPort, setSmtpPort] = useState(Config.smtpPort);
    const [smtpUsername, setSmtpUsername] = useState(Config.smtpUsername);
    const [smtpPassword, setSmtpPassword] = useState(Config.smtpPassword);

    useEffect(() => {
        ConfigUpdateHandler({
            ...Config,
            djangoSuperuserUsername: djangoSuperuserUsername,
            djangoSuperuserPassword: djangoSuperuserPassword,
            FQDN: FQDN,
            allowedEmailDomains: allowedEmailDomains,
            smtpServer: smtpServer,
            smtpPort: smtpPort,
            smtpUsername: smtpUsername,
            smtpPassword: smtpPassword,
        });
    }, [
        djangoSuperuserUsername,
        djangoSuperuserPassword,
        FQDN,
        allowedEmailDomains,
        smtpServer,
        smtpPort,
        smtpUsername,
        smtpPassword,
    ]);
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
        </>
    );
};

export default DjangoSetup;

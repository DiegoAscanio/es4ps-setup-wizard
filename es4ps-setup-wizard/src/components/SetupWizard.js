
import SelectMode from "./SelectMode.js";
import UploadCertificate from "./UploadCertificate.js";
import AllInOneSetup from "./AllInOneSetup.js";
import RabbitMQSetup from "./RabbitMQSetup.js";
import SambaSetup from "./SambaSetup.js";
import DjangoSetup from "./DjangoSetup.js";

import { useState, useEffect } from 'react';


const SetupWizard = () => {
    // defining state to store rabbit mq configuration dictionary
    const [ RabbitMQConfig, setRabbitMQConfig ] = useState({
        username: {
            value: '',
            valid: false
        },
        vhost: {
            value: '',
            valid: false
        },
        password: {
            value: '',
            valid: false
        }
    });

    // defining state to store samba configuration dictionary
    const [ SambaConfig, setSambaConfig ] = useState({
        hostname: {
            value: '',
            valid: false
        },
        ip: {
            value: '',
            valid: false
        },
        domain: {
            value: '',
            valid: false
        },
        realmSuffix: {
            value: '',
            valid: false
        },
        adminPassword: {
            value: '',
            valid: false
        },
    });

    // defining state for the django configuration dictionary
    const [ DjangoConfig, setDjangoConfig ] = useState({
        superuserName: {
            value: '',
            valid: false
        },
        superuserPassword: {
            value: '',
            valid: false
        },
        validSuperuserPassword: {
            value: '',
            valid: false
        },
        allowedEmailDomains: {
            value: '',
            valid: false
        },
        smtpServer: {
            value: '',
            valid: false
        },
        smtpPort: {
            value: '',
            valid: false
        },
        smtpUsername: {
            value: '',
            valid: false
        },
        smtpPassword: {
            value: '',
            valid: false
        },
        djangoFQDN: {
            value: '',
            valid: false
        },
    });

    // defining state for the all-in-one configuration dictionary
    const [ AllInOneConfig, setAllInOneConfig ] = useState({
        RabbitMQ: RabbitMQConfig,
        Samba: SambaConfig,
        Django: DjangoConfig
    });

    return (
        <div>
            <h1>Setup Wizard</h1>
            <RabbitMQSetup
                Config={RabbitMQConfig}
                ConfigUpdateHandler={setRabbitMQConfig}
            />
        </div>
    );
}

export default SetupWizard;

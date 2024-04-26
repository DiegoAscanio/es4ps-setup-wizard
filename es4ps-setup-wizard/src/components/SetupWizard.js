
import SelectMode from "./SelectMode.js";
import UploadCertificate from "./UploadCertificate.js";
import AllInOneSetup from "./AllInOneSetup.js";
import RabbitMQSetup from "./RabbitMQSetup.js";
import SambaSetup from "./SambaSetup.js";
import DjangoSetup from "./DjangoSetup.js";

import { useState, useEffect } from 'react';

const componentModesMap = {
    '': null,
    'all-in-one': AllInOneSetup,
    'rabbitmq': RabbitMQSetup,
    'samba': SambaSetup,
    'django': DjangoSetup
}

const setupModesMap = {
    '': 'Select a setup mode',
    'all-in-one': 'All in one',
    'rabbitmq': 'Only RabbitMQ',
    'samba': 'Only Samba',
    'django': 'Only Django'
}

const SSLModesMap = {
    'self-signed': 'Generate a Self-signed certificate',
    'provided': 'Provide a valid certificate and its key'
}

const SetupWizard = () => {
    // defining state to store the wizard setup mode selected
    // by the user
    const [ setupMode, setSetupMode ] = useState('');
    // defining state to store the result of the wizard
    const [ setupResult, setSetupResult ] = useState(null);
    // defining state to store the ssl mode selected
    // by the user
    const [ SSLMode, setSSLMode ] = useState('self-signed');
    // defining state to store eventually uploaded valid certificate
    // and its key by the user
    const [ certificate, setCertificate ] = useState(null);
    const [ key, setKey ] = useState(null);
    // defining state to store rabbit mq configuration dictionary
    const [ RabbitMQConfig, setRabbitMQConfig ] = useState({
        username: 'admin',
        vhost: 'myvhost',
        password: '',
        validPassword: false
    });
    // useEffect to react to changes in the RabbitMQConfig state
    useEffect(() => {
        console.log(RabbitMQConfig);
    }, [RabbitMQConfig]);

    // defining state to store samba configuration dictionary
    const [ SambaConfig, setSambaConfig ] = useState({
        hostname: 'ES4PSDC',
        ip: null,
        domain: 'DOM',
        realmSuffix: '.ES4PS.LOCAL',
        adminPassword: null,
        validAdminPassword: false
    });
    // useEffect to react to changes in the SambaConfig state
    useEffect(() => {
        console.log(SambaConfig);
    }, [SambaConfig]);

    // defining state for the django configuration dictionary
    const [ DjangoConfig, setDjangoConfig ] = useState({
        superuserName: 'admin',
        superuserPassword: '',
        validSuperuserPassword: false,
        allowedEmailDomains: ['@es4ps.local'],
        smtpServer: 'smtp.example.com',
        smtpPort: 587,
        smtpUsername: 'smtpuser@example.com',
        smtpPassword: '',
        djangoFQDN: 'localhost:8000'
    });
    // useEffect to react to changes in the DjangoConfig state
    useEffect(() => {
        console.log(DjangoConfig);
    }, [DjangoConfig]);

    // defining state for the all-in-one configuration dictionary
    const [ AllInOneConfig, setAllInOneConfig ] = useState({
        RabbitMQ: RabbitMQConfig,
        Samba: SambaConfig,
        Django: DjangoConfig
    });
    // useEffect to react to changes in the AllInOneConfig state
    useEffect(() => {
        console.log(AllInOneConfig);
    }, [AllInOneConfig]);

    // defining component configs map
    const componentConfigsMap = {
        '': null,
        'all-in-one': AllInOneConfig,
        'rabbitmq': RabbitMQConfig,
        'samba': SambaConfig,
        'django': DjangoConfig
    };

    // defining component handlers map
    const componentHandlersMap = {
        '': null,
        'all-in-one': setAllInOneConfig,
        'rabbitmq': setRabbitMQConfig,
        'samba': setSambaConfig,
        'django': setDjangoConfig
    };

    // defining the selected component to render based on the setup mode
    const SelectedComponent = componentModesMap[setupMode];
    const SelectedConfig = componentConfigsMap[setupMode];
    const SelectedHandler = componentHandlersMap[setupMode];

    // define component to render, iniatily only showing SelectMode component
    return (
        <div>
            <h1>Setup Wizard</h1>
            <p>
                This wizard will help you to setup the application. For security reasons, SSL encryption is enabled by default. 
                So, you should provide a valid SSL certificate and key to sign the communication between the services.
            </p>
            <p>
                If you dont have a valid SSL certificate, you can choose to generate a self-signed Certificate Authority (CA) 
                and use it to generate self-signed certificates for the services. What do you want to do?
            </p>
            <SelectMode
                onChange={setSSLMode}  
                selectedMode={SSLMode}
                selectModeMap={SSLModesMap}
            />
            { SSLMode === 'provided' && 
                <UploadCertificate 
                    onCertificateChange={setCertificate}
                    onKeyChange={setKey}
                /> 
            }
            <p>
                Now you can choose the setup mode you want to use. The available modes are:
            </p>
            <ul>
                {
                    Object.keys(setupModesMap).map((key) => (
                        <li key={key}>{setupModesMap[key]}</li>
                    ))
                }
            </ul>
            <SelectMode 
                onChange={setSetupMode}
                selectedMode={setupMode}
                selectModeMap={setupModesMap}
            />
            { /* render the selected setup by the user */ }
            { setupMode !== '' && <SelectedComponent Config={SelectedConfig} ConfigUpdateHandler={SelectedHandler}/> }
        </div>
    );
}

export default SetupWizard;


import AllInOneSetup from "./AllInOneSetup.js";
import RabbitMQSetup from "./RabbitMQSetup.js";
import SambaSetup from "./SambaSetup.js";
import DjangoSetup from "./DjangoSetup.js";
import { validConfig } from "./validators";
import CreateES4PSContainersComposition from "./CreateES4PSContainersComposition.js";
import DownloadContainersComposition from "./DownloadContainersComposition.js";

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
        },
    });
    // defining state to verify if the configuration is valid
    const [ validRabbitMQConfig, setValidRabbitMQConfig ] = useState(false);

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
    // defining state to verify if the configuration is valid
    const [ validSambaConfig, setValidSambaConfig ] = useState(false);

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
        FQDN: {
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
    });
    // defining state to verify if the configuration is valid
    const [ validDjangoConfig, setValidDjangoConfig ] = useState(false);

    // define state for all-in-one configuration dictionary
    const [ AllInOneConfig, setAllInOneConfig ] = useState({
        rabbitMQ: RabbitMQConfig,
        samba: SambaConfig,
        django: DjangoConfig,
    });
    // define state to verify if the configuration is valid
    const [ validAllInOneConfig, setValidAllInOneConfig ] = useState(false);

    // define state for the result of the composition
    const [ CompositionResult, setCompositionResult ] = useState(null);
    const [ isCompositionResult, setIsCompositionResult ] = useState(false);

    useEffect(() => {
        if (CompositionResult) {
            setIsCompositionResult(true);
        }
    }, [CompositionResult]);

    useEffect(() => {
        let newConfig = {
            rabbitMQ: RabbitMQConfig,
            samba: SambaConfig,
            django: DjangoConfig,
        };
        setAllInOneConfig(newConfig);
        setValidRabbitMQConfig(validConfig(RabbitMQConfig));
        setValidSambaConfig(validConfig(SambaConfig));
        setValidDjangoConfig(validConfig(DjangoConfig));
        setValidAllInOneConfig(
            validConfig(RabbitMQConfig) &&
            validConfig(SambaConfig) &&
            validConfig(DjangoConfig)
        );
    }, [RabbitMQConfig, SambaConfig, DjangoConfig]);

    return (
        <div>
            <h1>Setup Wizard</h1>
            <RabbitMQSetup
                Config={RabbitMQConfig}
                ConfigUpdateHandler={setRabbitMQConfig}
            />
            <SambaSetup
                Config={SambaConfig}
                ConfigUpdateHandler={setSambaConfig}
            />
            <DjangoSetup
                Config={DjangoConfig}
                ConfigUpdateHandler={setDjangoConfig}
            />
            {validAllInOneConfig &&
                <CreateES4PSContainersComposition 
                   Config={AllInOneConfig}
                   ConfigUpdateHandler={setAllInOneConfig}
                   setCompositionResult={setCompositionResult}
                />
            }
            {isCompositionResult &&
                <DownloadContainersComposition
                    zipfile={CompositionResult}
                />
            }
        </div>
    );
}

export default SetupWizard;

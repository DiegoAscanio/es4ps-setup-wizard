
import AllInOneSetup from "./AllInOneSetup.js";
import RabbitMQSetup from "./RabbitMQSetup.js";
import SambaSetup from "./SambaSetup.js";
import DjangoSetup from "./DjangoSetup.js";
import { validConfig } from "./validators";
import CreateES4PSContainersComposition from "./CreateES4PSContainersComposition.js";

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
        valid: false
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
        valid: false
    });

    // define state for all-in-one configuration dictionary
    const [ AllInOneConfig, setAllInOneConfig ] = useState({
        rabbitMQ: RabbitMQConfig,
        samba: SambaConfig,
        django: DjangoConfig,
        valid: false
    });

    // define state for the results of the composition
    const [ CompositionResults, setCompositionResults ] = useState(null);

    useEffect(() => {
        console.log(RabbitMQConfig);
        let newConfig = {
            rabbitMQ: RabbitMQConfig,
            samba: SambaConfig,
            django: DjangoConfig,
            valid: RabbitMQConfig.valid &&
                   SambaConfig.valid &&
                   DjangoConfig.valid

        };
        setAllInOneConfig(newConfig);
    }, [RabbitMQConfig, SambaConfig, DjangoConfig]);

    // useEffect for all-in-one configuration
    // for now we'll just log the configuration
    useEffect(() => {
        //console.log(AllInOneConfig);
    }, [AllInOneConfig]);

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
            {AllInOneConfig.valid &&
                <CreateES4PSContainersComposition 
                   Config={AllInOneConfig}
                    ConfigUpdateHandler={setAllInOneConfig}
                />
            }
        </div>
    );
}

export default SetupWizard;

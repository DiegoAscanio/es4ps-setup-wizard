import { useState, useEffect } from 'react';

import RabbitMQSetup from './RabbitMQSetup.js';
import SambaSetup from './SambaSetup.js';
import DjangoSetup from './DjangoSetup.js';

const AllInOneSetup = ({ Config, ConfigUpdateHandler}) => {
    const [ SambaConfig, setSambaConfig ] = useState(Config.Samba);
    useEffect(() => {
        const newConfig = {
            ...Config,
            Samba: SambaConfig
        };
        ConfigUpdateHandler(newConfig);
    }, [SambaConfig]);

    const [ RabbitMQConfig, setRabbitMQConfig ] = useState(Config.RabbitMQ);
    useEffect(() => {
        const newConfig = {
            ...Config,
            RabbitMQ: RabbitMQConfig
        };
        ConfigUpdateHandler(newConfig);
    }, [RabbitMQConfig]);

    const [ DjangoConfig, setDjangoConfig ] = useState(Config.Django);
    useEffect(() => {
        const newConfig = {
            ...Config,
            Django: DjangoConfig
        };
        ConfigUpdateHandler(newConfig);
    }, [DjangoConfig]);

    return (
        <>
            <h1>All-In-One Setup</h1>
            <RabbitMQSetup Config={RabbitMQConfig} ConfigUpdateHandler={setRabbitMQConfig}/>
            <SambaSetup Config={SambaConfig} ConfigUpdateHandler={setSambaConfig}/>
            <DjangoSetup Config={DjangoConfig} ConfigUpdateHandler={setDjangoConfig}/>
        </>
    );
}

export default AllInOneSetup;

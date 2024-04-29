import React, { useState, useEffect } from "react";
import { isNotEmpty, isPasswordValid } from "./validators";
import { InputFieldGroup } from "./InputComponents";

import { 
    emptyFieldErrorMessage,
    invalidEmailErrorMessage,
    invalidPasswordErrorMessage
} from "./errorMessages";

import "./style.css";

const RabbitMQSetup = ({ Config, ConfigUpdateHandler }) => {
    // define states to store and check the username
    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);

    // define states to store and check the password
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    // define state to store and check the virtual host
    const [vhost, setVhost] = useState('');
    const [validVhost, setValidVhost] = useState(false);

    // define useEffect to perform updates on the Config object
    useEffect(() => {
        const newConfig = {
            username: {
                value: isNotEmpty(username)
                       ? username
                       : '',
                valid: isNotEmpty(username)
            },
            password: {
                value: isPasswordValid(password1, password2)
                       ? password1
                       : '',
                valid: isPasswordValid(password1, password2)
            },
            vhost: {
                value: isNotEmpty(vhost)
                       ? vhost
                       : '',
                valid: isNotEmpty(vhost)
            }
        };
        ConfigUpdateHandler(newConfig);
        setValidUsername(newConfig.username.valid);
        setValidPassword(newConfig.password.valid);
        setValidVhost(newConfig.vhost.valid);
    }, [username, password1, password2, vhost]);

    const inputFieldsMap = {
        username: {
            label: "RabbitMQ User",
            placeholder: "admin",
            inputHandler: setUsername,
            validFlag: validUsername,
            errorMessage: emptyFieldErrorMessage('RabbitMQ User')
        },
        password1: {
            label: "RabbitMQ Password",
            placeholder: "Passw0rd!",
            inputHandler: setPassword1,
            validFlag: true,
            errorMessage: "",
            type: "password"
        },
        password2: {
            label: "Confirm RabbitMQ Password",
            placeholder: "Passw0rd!",
            inputHandler: setPassword2,
            validFlag: validPassword,
            errorMessage: invalidPasswordErrorMessage(),
            type: "password"
        },
        vhost: {
            label: "RabbitMQ Virtual Host",
            placeholder: "myvhost",
            inputHandler: setVhost,
            validFlag: validVhost,
            errorMessage: emptyFieldErrorMessage('RabbitMQ Virtual Host')
        }
    };

    return (
        <>
            <h2>RabbitMQ Setup</h2>
            <p>
                RabbitMQ is a message broker that allows you to send and receive
                messages between different services.
            </p>
            <p>
                It is used by celery to manage task queues and distribute these
                tasks to workers which will execute them. ES4PS uses celery to
                create, update and delete users on samba servers (each one will
                have a worker assigned to execute these tasks). So that's why
                you need to have RabbitMQ installed and running.
            </p>
            <p>
                For RabbitMQ you will need to configure a user, a virtual host
                and a password. If you don't know what to put here, you can
                input the suggested values (when available) assigned to the
                input fields.
            </p>
            <InputFieldGroup inputFieldsMap={inputFieldsMap} />
        </>
    );
};

export default RabbitMQSetup;

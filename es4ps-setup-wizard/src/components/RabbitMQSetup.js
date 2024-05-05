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


import React, { useState, useEffect } from "react";
import { isNotEmpty, isPasswordValid } from "./validators";
import { InputFieldGroup } from "./InputComponents";

import { templateMessages } from "./ErrorMessage";

import "./style.css";

const emptyFieldErrorMessage = templateMessages.emptyFieldErrorMessage;
const invalidPasswordErrorMessage = templateMessages.invalidPasswordErrorMessage;

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
    /* 
     * Vhosts (virtual hosts) needs to be set in RabbitMQ in order
     * to enable separate environments for different applications.
     * This is useful when you have multiple applications running
     * on the same RabbitMQ server and you want to separate
     * the queues, exchanges and bindings for each one to avoid
     * conflicts between them.
     *
     * In this ES4PS release only one queue is used, so only
     * one vhost (or none at all) is needed. But it is a good
     * practice to use vhosts to separate the environments.
     *
     * If more queues are needed in a next release, the current
     * configuration prepares the environment to handle them
     * with more vhosts.
     */

    // define useEffect to perform updates on the Config object
    // if and only if the values are valid.
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

    // The same as in DjangoSetup and SambaSetup, an inputFieldsMap
    // is defined to store the properties of each input field needed
    // to be set in the Config state in order to avoid code repetition.
    // This is provided by the InputFieldGroup component.
    const inputFieldsMap = {
        username: {
            label: "RabbitMQ User",
            placeholder: "admin",
            inputHandler: setUsername,
            validFlag: validUsername,
            errorMessage: emptyFieldErrorMessage('RabbitMQ User'),
            tooltipText: `The RabbitMQ user is necessary to protect the\n` +
                         `RabbitMQ server from unauthorized access. It will\n` +
                         `be used by all containers that will interact with\n` +
                         `celery tasks — Django and Samba containers — to\n` +
                         `create, update and delete users on samba ADDC\n` +
                         `servers.`,
        },
        password1: {
            label: "RabbitMQ Password",
            placeholder: "Passw0rd!",
            inputHandler: setPassword1,
            validFlag: true,
            errorMessage: "",
            type: "password",
            tooltipText: `The RabbitMQ password is necessary for the same\n` +
                         `reason as the RabbitMQ user.`,
            id: "rabbitmq-password",
        },
        password2: {
            label: "Confirm RabbitMQ Password",
            placeholder: "Passw0rd!",
            inputHandler: setPassword2,
            validFlag: validPassword,
            errorMessage: invalidPasswordErrorMessage(),
            type: "password",
        },
        vhost: {
            label: "RabbitMQ Virtual Host",
            placeholder: "myvhost",
            inputHandler: setVhost,
            validFlag: validVhost,
            errorMessage: emptyFieldErrorMessage('RabbitMQ Virtual Host'),
            tooltipText: `Virtual hosts in RabbitMQ are used to separate\n` +
                         `different environments for different applications.\n` +
                         `This is useful when you have multiple applications\n` +
                         `running on the same RabbitMQ server and you want to\n` +
                         `separate the queues, exchanges and bindings for each\n` +
                         `one to avoid conflicts between them. For this release\n` +
                         `only one vhost is necessary and it can bet set to\n` +
                         `its suggested value myvhost.`,
        }
    };

    // Another component with clean and simple JSX code.
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

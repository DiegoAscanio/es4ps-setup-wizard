import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

import "./style.css";

const RabbitMQSetup = ({ Config, ConfigUpdateHandler }) => {
    // define state to store user credentials and each time
    // the user changes the input fields, update the state
    // with the new values and propagate the changes to the
    // parent component
    const [username, setUsername] = useState(Config.username);
    useEffect(() => {
        const newConfig = { ...Config, username: username };
        ConfigUpdateHandler(newConfig);
    }, [username]);

    // define states to check password validity
    const [validPassword, setValidPassword] = useState(true);

    const [password1, setPassword1] = useState(null);
    const [password2, setPassword2] = useState(null);
    useEffect(() => {
        const newConfig = { ...Config, 
            password: password1 === password2 ? password1 : null,
            validPassword: password1 === password2
        };
        ConfigUpdateHandler(newConfig);
        setValidPassword(password1 === password2);
    }, [password1, password2]);

    const [vhost, setVhost] = useState("myvhost");
    useEffect (() => {
        const newConfig = { ...Config, vhost: vhost };
        ConfigUpdateHandler(newConfig);
    }, [vhost]);

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
                For RabbitMQ you will need to configure a user, a password and a
                virtual host. If you don't know what to put here, you can input
                the suggested values (when available) assigned to the input
                fields.
            </p>
            <div className="form-group">
                <label htmlFor="rabbitmq_user">RabbitMQ User</label>
                <input
                    type="text"
                    className="form-control"
                    name="rabbitmq_user"
                    placeholder="admin"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="rabbitmq_password_1">RabbitMQ Password:</label>
                <input
                    type="password"
                    className="form-control"
                    name="rabbitmq_password_1"
                    placeholder="Passw0rd!"
                    onChange={(e) => setPassword1(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="rabbitmq_password_2">
                    Confirm RabbitMQ Password:
                </label>
                <input
                    type="password"
                    className="form-control"
                    name="rabbitmq_password_2"
                    placeholder="Passw0rd!"
                    onChange={(e) => setPassword2(e.target.value)}
                />
                {!validPassword && (
                    <ErrorMessage message="Passwords do not match" />
                )}
            </div>
            <div className="form-group">
                <label htmlFor="rabbitmq_vhost">RabbitMQ Virtual Host</label>
                <input
                    type="text"
                    className="form-control"
                    name="rabbitmq_vhost"
                    placeholder="myvhost"
                    onChange={(e) => setVhost(e.target.value)}
                />
            </div>
        </>
    );
    };

export default RabbitMQSetup;


const _genRabbitMQSection = (Config) => (
    `# RabbitMQ dotenv section\n` +
    `RABBITMQ_DEFAULT_USER=${Config.username.value}\n` +
    `RABBITMQ_DEFAULT_PASS=${Config.password.value}\n` +
    `RABBITMQ_DEFAULT_VHOST=${Config.vhost.value}\n\n`
)

const _genSambaSection = (Config) => {
    samba = Config.samba;
    rabbitMQ = Config.rabbitMQ;
    let serverRealm = samba.domain.value + '.' + samba.realmSuffix.value;
    return (
        `# Samba dotenv section\n` +
        `SERVER_ROLE=DC\n` +
        `SERVER_HOSTNAME=${Config.hostname.value}\n` +
        `SERVER_DNS_BACKEND=SAMBA_INTERNAL\n` +
        `SERVER_IP=${samba.ip.value}\n` +
        `SERVER_REALM=${serverRealm}\n` +
        `SERVER_DOMAIN=${samba.domain.value}\n` +
        `SERVER_ADMIN_PASSWORD=${samba.adminPassword.value}\n` +
        `RABBITMQ_HOST=${samba.ip.value}\n` 
        `RABBITMQ_USER=${rabbitMQ.username.value}\n` +
        `RABBITMQ_PASSWORD=${rabbitMQ.password.value}\n` +
        `RABBITMQ_VHOST=${rabbitMQ.vhost.value}\n\n`
    )
};

const _genDjangoSection = (Config) => {
    let rabbitMQ = Config.rabbitMQ;
    let samba = Config.samba;
    let django = Config.django;
    let celeryBrokerURL = `amqps://${rabbitMQ.username.value}:${rabbitMQ.password.value}@${samba.ip.value}:5671/${rabbitMQ.vhost.value}`;
    let celeryBackendURL = `rpc://${rabbitMQ.username.value}:${rabbitMQ.password.value}@${samba.ip.value}:5671/${rabbitMQ.vhost.value}`;
    return (
        `# Django dotenv section\n` +
        `ES4C_MANAGER_ALLOWED_EMAIL_DOMAINS=${django.allowedEmailDomains.value}\n` +
        `ES4C_MANAGER_SMTP_SERVER=${django.smtpServer.value}\n` +
        `ES4C_MANAGER_SMTP_PORT=${django.smtpPort.value}\n` +
        `ES4C_MANAGER_SMTP_USERNAME=${django.smtpUsername.value}\n` +
        `ES4C_MANAGER_SMTP_PASSWORD=${django.smtpPassword.value}\n` +
        `ES4C_MANAGER_HOST_FQDN=${django.FQDN.value}\n` +
        `ES4C_MANAGER_CELERY_BROKER_URL=${celeryBrokerURL}\n` +
        `ES4C_MANAGER_CELERY_RESULT_BACKEND=${celeryBackendURL}\n` +
        `SAMBA_ADMIN_PASSWORD=${samba.adminPassword.value}\n` +
        `DJANGO_SUPERUSER_USERNAME=${django.superuserName.value}\n` +
        `DJANGO_SUPERUSER_PASSWORD=${django.superuserPassword.value}\n`
    )
};

const genDotEnvFile = (AllInOneConfig) => {
    let dotEnv = '';
    dotEnv += _genRabbitMQSection(AllInOneConfig.rabbitMQ);
    dotEnv += _genSambaSection(AllInOneConfig);
    dotEnv += _genDjangoSection(AllInOneConfig);
    return dotEnv;
};

export { genDotEnvFile };

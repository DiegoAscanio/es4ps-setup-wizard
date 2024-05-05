## ESP4S Setup Wizard Steps

### RabbitMQ Steps

1. Fill in RabbitMQ User
2. Fill in RabbitMQ Password
3. Fill in RabbitMQ VHost

### Samba Steps

1. Fill in hostname
2. Fill in server IP address
3. Fill in domain name
4. Fill in realm suffix
5. Fill in Samba Administrator Password

### Django Steps

1. Fill in Superuser Username
2. Fill in Superuser Password
3. Fill in FQDN
4. Fill in Allowed email domains
5. Fill in SMTP Server
6. Fill in SMTP Port
7. Fill in SMTP Username
8. Fill in SMTP Password
We'll be using for demo purposes the following values:
    - smtp username: `es4ps@outlook.com`
    - smtp password: `P@ssw0rd!AB`

Everything was filled in correctly! Now we can generate the containers composition.

And it is ready to download. Let us do it!

Now we should extract it.

We'll open a terminal, and execute `bash build.sh` and then `bash start.sh` and Everything will be ready to use.

To add a Windows machine to the ES4PS Domain, you should follow the steps below:

1. Ensure that the Windows machine is connected to the ES4PS network.
2. Ensure that the Windows machine DNS is provided by the ES4PS DNS server.
    - You can do this by setting the DNS server in the network adapter settings.
    - This IP address is the **Samba Server IP Address** you filled in the setup wizard.
3. Ensure that IPv6 network support is disabled.
    - This is necessary because the ES4PS current release does not support IPv6, but future releases will.
    - You can do this by unchecking the IPv6 checkbox in the network adapter settings.
4. Now, open the Windows Explorer, right-click on "This PC" and select "Properties".
5. Click on "Change settings" in the "Computer name, domain, and workgroup settings" section.
6. Click on "Change" in the "Computer Name/Domain Changes" window.
7. Select "Domain" and enter the domain name, which combines the **Samba Server Domain Name** and **Samba Realm Suffix** fields you filled out in the setup wizard.
    - For example, if the **Samba Server Domain Name** is `dom` and the **Samba Realm Suffix** is `es4ps.local`, then the domain name would be `dom.es4ps.local`.
8. Click "OK" and enter **Administrator** as Username and **Samba Server Administrator Password** that you filled in the setup wizard as the Password.
9. Joining the domain will take a few seconds to a few minutes. So, grab a cup of coffee and wait.
Some tools, like FOG (Free Open-source Ghost), can automate this process so you can join the domain without any manual intervention. This automation is extremely useful in scenarios like computer labs, and a future ES4PS release will cover the integration between FOG and ES4PS.
10. After a few minutes, you'll be greeted with a welcome message into the domain, and then, after a few seconds, you'll be asked to restart the computer. Proceed with that.
11. After the restart, any user self-registered in the ES4PS user management interface (built with Django) can log in to the Windows machine. For instance, if you want to login with the user `es4psexampleuser` created in the **Registering a new user in the ES4PS plataform** section, you can do so by entering `es4psexampleuser` as the username and the password you set for that user, for example, `P@ssw0rdAB`.

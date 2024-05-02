# ES4PS-setup-wizard Useful Information

All components are defined in the `components` folder. As the author could not 
load external functions in the components who are not in the same folder, there
 are also some javascript functions who are not components but are needed by 
the components and they are stored in the `components` folder as well.

These are:

- `./components/genDotEnvFile.js`
- `./components/validators.js`

All the components and functions are properly commented to help anyone 
who wants to contribute to the project and/or this setup wizard tool.

Other thing to note is that the `utils` folder contains functions — that are 
not currently used in this release — to generate self signed certificates.
These functions would be used if the **select mode for chosing to upload or
generate self-signed certificates** component was implemented.
These codes didn't work as expected and it was decided — to ensure the first
MVP — to impose self-signed certificate generation in the containers that
would need certificates to encrypt its communications.
Anyways, the `utils` codes are there as a reference for future implementations.

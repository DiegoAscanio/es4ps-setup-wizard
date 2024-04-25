const { X509Certificate, X509Certificates, PemConverter } = require("@peculiar/x509");
const { Crypto } = require("@peculiar/webcrypto");

const crypto = new Crypto();
const algorithm = {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1])
};

async function generateCA() {
    // generate private key for the CA
    const caKeyPair = await crypto.subtle.generateKey(
        algorithm,
        true,
        ["sign", "verify"]
    );
    // create a self-signed certificate for the CA
    const caCert = new X509Certificate({
        serialNumber: "01",
        issuer: {
            commonName: "ES4PS CA",
        },
        subject: {
            commonName: "ES4PS CA",
        },
        notBefore: new Date(),
        notAfter: new Date(new Date().setFullYear(new Date().getFullYear() + 99)),
        publicKey: caKeyPair.publicKey,
        signingKey: caKeyPair.privateKey,
        extensions: [
            { name: "basicConstraints", cA: true, pathLenConstraint: null },
            { name: "keyUsage", keyCertSign: true, crlSign: true },
        ]
    });
    return { caCert, caKeyPair };
}

async function generateCertificate(caCert, caKeyPair, subject = { commonName: "ES4PS generic client" }) {
    // generate private key for the certificate
    const keyPair = await crypto.subtle.generateKey(
        algorithm,
        true,
        ["sign", "verify"]
    );
    // create a certificate signed by the CA
    const cert = new X509Certificate({
        // make serial number a random number
        serialNumber: crypto.getRandomValues(new Uint8Array(16)),
        issuer: caCert.subject,
        subject,
        notBefore: new Date(),
        notAfter: new Date(new Date().setFullYear(new Date().getFullYear() + 99)),
        publicKey: keyPair.publicKey,
        signingKey: caKeyPair.privateKey,
        extensions: [
            { name: "basicConstraints", cA: false },
            { name: "keyUsage", digitalSignature: true, keyEncipherment: true },
        ]
    });
    return { cert, keyPair };
}

async function exportCertificates(ca, client) {
    const caCertificatePem = PemConverter.encode(ca.caCert.rawData);
    const caPrivateKeyPem = PemConverter.encode(await crypto.subtle.exportKey("pkcs8", ca.caKeyPair.privateKey));

    const clientCertificatePem = PemConverter.encode(client.clientCert.rawData);
    const clientPrivateKeyPem = PemConverter.encode(await crypto.subtle.exportKey("pkcs8", client.clientKeyPair.privateKey));

    return {
        caCertificate: caCertificatePem,
        caPrivateKey: caPrivateKeyPem,
        clientCertificate: clientCertificatePem,
        clientPrivateKey: clientPrivateKeyPem
    };
}


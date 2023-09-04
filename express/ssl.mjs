import { createCA, createCert } from "mkcert";
import { existsSync, writeFileSync, mkdirSync } from "fs";

if (!existsSync("./.certs/key.pem")) {

    console.log("Creating SSL certificates...")

    const ca = await createCA({
        organization: "Hello CA",
        countryCode: "DE",
        state: "State",
        locality: "Local",
        validity: 999
    });

    const cert = await createCert({
        ca: { key: ca.key, cert: ca.cert },
        domains: ["127.0.0.1", "localhost"],
        validity: 365
    });

    console.log("Writing SSL certificates...")
    if (!existsSync("./.certs")) {
        console.log("Creating certs directory...")
        mkdirSync("./.certs");
    }
    writeFileSync("./.certs/key.pem", cert.key);
    writeFileSync("./.certs/cert.pem", cert.cert);
}
else {
    console.log("SSL certificates already exist.")
}
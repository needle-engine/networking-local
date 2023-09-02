import { createCA, createCert } from "mkcert";
import { existsSync, writeFileSync } from "fs";

if (!existsSync("./key.pem")) {

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
    writeFileSync("./key.pem", cert.key);
    writeFileSync("./cert.pem", cert.cert);
}
else {
    console.log("SSL certificates already exist.")
}
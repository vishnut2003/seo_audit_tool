import { HTTPResponse } from "puppeteer";

const EMPTY_PROTOCOL_OBJECT = "NO PROTOCOL FOUND";
const SSL_NOT_ENABLES = "SSL NOT INSTALLED";
const SSL_ENABLED = "SSL INSTALLED";

export async function checkSecurityProtocol ({httpResponse}: {
    httpResponse: HTTPResponse | null,
}) {
    return new Promise <"NO PROTOCOL FOUND" | "SSL NOT INSTALLED" | "SSL INSTALLED"> ((resolve, reject) => {
        try {
            // check if security protocol exist
            if (!httpResponse) {
                return resolve(EMPTY_PROTOCOL_OBJECT);
            }

            const securityDetails = httpResponse.securityDetails();

            if (securityDetails) {
                return resolve(SSL_ENABLED);
            } else {
                return resolve(SSL_NOT_ENABLES);
            }

            
        } catch (err) {
            return reject(err);
        }
    })
}
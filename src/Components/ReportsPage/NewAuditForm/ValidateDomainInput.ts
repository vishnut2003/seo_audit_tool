
export default async function ValidateDomainInput({input}: {
    input: string | null
}) {
    return new Promise<{
        success: boolean,
        error?: string
    }>((resolve) => {

        if(!input) {
            return resolve({
                success: false,
                error: 'Please enter a domain.'
            });
        }

        const domainRegx = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
        if(!domainRegx.test(input)) {
            return resolve({
                success: false,
                error: 'Input is not a valid domain.'
            });
        }

    })    
}
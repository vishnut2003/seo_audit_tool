
export interface LoginFormValidateErrorInterface {
    fieldSpecific?: {
        email?: {
            status: boolean,
            message: string
        },
        password?: {
            status: boolean,
            message: string
        }
    },
    commonError?: {
        status: boolean,
        message: string
    }
}

export default async function LoginFormValidate({ email, password }: {
    email: string,
    password: string
}) {
    return new Promise<void>((resolve, reject) => {

        // validate if email or password is empty
        if (!email && !password) {

            const error: LoginFormValidateErrorInterface = {
                fieldSpecific: {
                    email: {
                        status: true,
                        message: "Email field is required."
                    },
                    password: {
                        status: true,
                        message: "Password field is required."
                    }
                }
            }
            return reject(error);

        } else if (!email) {

            const error: LoginFormValidateErrorInterface = {
                fieldSpecific: {
                    email: {
                        status: true,
                        message: "Email field is empty."
                    }
                }
            }
            return reject(error)

        } else if (!password) {

            const error: LoginFormValidateErrorInterface = {
                fieldSpecific: {
                    password: {
                        status: true,
                        message: "Password field is empty."
                    }
                }
            }
            return reject(error)

        }

        // return if success
        resolve();
    })
}
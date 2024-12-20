
export async function verifyIsAdmin ({email, password}: {
    email?: string,
    password?: string
}) {
    return new Promise((resolve, reject) => {
        console.log(email, password);
    })
}
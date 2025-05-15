
export async function convertFileTypeClientFunction ({
    files,
}: {
    fromType: string,
    toType: string,
    files: File[],
}) {
    return new Promise((resolve, reject) => {
        try {
            if (files.length === 0) {
                return reject("Please Select minimum 1 file.");
            }

            console.log("Working...");
        } catch (err) {
            return reject(err);
        }
    })
}
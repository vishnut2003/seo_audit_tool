import { JSDOM, VirtualConsole } from "jsdom";

export async function generateInteractiveDoc({ content }: {
    content: string,
}) {
    return new Promise<JSDOM>((resolve, reject) => {
        try {
            const vc = new VirtualConsole()
            return resolve(new JSDOM(content, { virtualConsole: vc }));
        } catch (err) {
            reject(err);
        }
    })
}
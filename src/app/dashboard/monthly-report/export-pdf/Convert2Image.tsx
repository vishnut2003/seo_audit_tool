import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react'

const Convert2Image = ({
    onCapture,
    children,
}: {
    onCapture: Dispatch<SetStateAction<string | null>>,
    children: ReactNode,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const capture = async () => {

            await new Promise(resolve => setTimeout(resolve, 5000))

            if (ref.current) {
                const html2canvas = (await import("html2canvas")).default;
                const canvas = await html2canvas(ref.current);
                const imgData = canvas.toDataURL("image/png");
                onCapture(imgData);
            }
        };
        capture();
    }, [onCapture]);

    return (
        <div style={{ position: "absolute", top: -9999, left: -9999 }} ref={ref}>
            {children}
        </div>
    );
}

export default Convert2Image
'use client';

import SelectTypesPopup from "./(tools)/(Convertor)/SelectTypesPopup";

const ConvertorPromo = () => {

    return (
        <div
            className="flex flex-col md:flex-row gap-3 items-center bg-gradient-to-r from-themesecondary to-white py-4 px-6 text-white rounded-lg"
        >
            <div
                className="w-full md:w-[80%] space-y-2"
            >
                <h2
                    className="text-2xl font-semibold drop-shadow-md"
                >Convert to anything</h2>
                <p
                    className="text-base drop-shadow-md"
                >Convert any image or document file effortlessly into your desired format with speed, precision, and ease.</p>
            </div>
            <SelectTypesPopup />
        </div>
    )
}

export default ConvertorPromo
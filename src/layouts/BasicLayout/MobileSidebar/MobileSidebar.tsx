'use client';

import { useState } from "react";
import SidebarFooter from "../Sidebar/SidebarFooter/SidebarFooter";
import SidebarMenu from "../Sidebar/SidebarMenu/SidebarMenu";
import { RiArrowLeftLine, RiBarChartHorizontalLine } from "@remixicon/react";
import SidebarLogo from "../Sidebar/SidebarLogo";

const MobileSidebar = () => {

    const [sidebar, setSidebar] = useState(false);

    return (
        <div className="flex justify-center items-center">

            {/* Toggle button */}
            <button
                className="md:hidden mr-5"
                onClick={() => setSidebar(true)}>
                <RiBarChartHorizontalLine size={25} />
            </button>

            {/* Sidebar */}
            <div className={`${sidebar ? "w-[90%]" : "w-0"} transition-all max-w-[350px] h-full bg-white text-foreground shadow-xl flex md:hidden flex-col justify-start fixed top-0 left-0 z-50 overflow-hidden`}>

                <div className="w-full flex justify-between gap-3 items-center">
                    <SidebarLogo />
                    <RiArrowLeftLine
                        onClick={() => setSidebar(false)}
                        size={25}
                        className="mr-5" 
                    />
                </div>

                <div className="w-full h-full min-h-0 py-5 px-6">
                    <div className="w-full">
                        <SidebarMenu />
                    </div>
                </div>

                <SidebarFooter />
            </div>
        </div>
    )
}

export default MobileSidebar
import SidebarFooter from "./SidebarFooter/SidebarFooter"
import SidebarLogo from "./SidebarLogo"
import SidebarMenu from "./SidebarMenu/SidebarMenu"

const Sidebar = () => {
    return (
        <div className="max-w-[80%] md:max-w-[290px] w-full h-full bg-primary text-foregroundwhite flex flex-col justify-start fixed md:static">
            <SidebarLogo />
            <div className="w-full h-full min-h-0 py-5 px-6">
                <div className="w-full">
                    <SidebarMenu/>
                </div>
            </div>
            <SidebarFooter/>
        </div>
    )
}

export default Sidebar
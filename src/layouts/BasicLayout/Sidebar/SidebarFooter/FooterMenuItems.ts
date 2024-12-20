import { RemixiconComponentType, RiSettings4Line, RiUser3Line } from "@remixicon/react";

export interface footerMenuIterface {
    name: string,
    icon: RemixiconComponentType,
    link: string,
}

const footerMenuItems: footerMenuIterface[] = [
    {
        name: 'My Account',
        icon: RiSettings4Line,
        link: '#',
    },
    {
        name: 'User Management',
        icon: RiUser3Line,
        link: "#"
    }
]

export default footerMenuItems;
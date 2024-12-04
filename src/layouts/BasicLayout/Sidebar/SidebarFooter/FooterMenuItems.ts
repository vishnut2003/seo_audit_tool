import { RemixiconComponentType, RiLogoutBoxRLine, RiSettings4Line } from "@remixicon/react";

export interface footerMenuIterface {
    name: string,
    icon: RemixiconComponentType,
    link?: string,
    onclick?: () => null
}

const footerMenuItems: footerMenuIterface[] = [
    {
        name: 'My Account',
        icon: RiSettings4Line,
        link: '#',
    },
    {
        name: 'Logout',
        icon: RiLogoutBoxRLine,
        onclick: () => {
            console.log('logging out');
            return null
        }
    }
]

export default footerMenuItems;
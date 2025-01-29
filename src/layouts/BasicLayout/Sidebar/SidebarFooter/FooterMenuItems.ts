import { RemixiconComponentType, RiSettings4Line } from "@remixicon/react";

export interface footerMenuIterface {
    name: string,
    icon: RemixiconComponentType,
    link: string,
}

const footerMenuItems: footerMenuIterface[] = [
    {
        name: 'My Account',
        icon: RiSettings4Line,
        link: '/dashboard/advance/my-account',
    }
]

export default footerMenuItems;
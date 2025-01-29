import Link from "next/link"
import { footerMenuIterface } from "./FooterMenuItems"

const SingleMenuItem = ({menuItem}: {
    menuItem: footerMenuIterface
}) => {
  return (
    <Link href={menuItem.link!} className="flex gap-2 opacity-95 py-3 px-4 rounded-lg hover:bg-gray-50 w-full min-w-max">
        <menuItem.icon size={24}/>
        <p className="whitespace-nowrap font-medium">{menuItem.name}</p>
    </Link>
  )
}

export default SingleMenuItem
import Link from "next/link"
import { footerMenuIterface } from "./FooterMenuItems"

const SingleMenuItem = ({menuItem}: {
    menuItem: footerMenuIterface
}) => {
  return (
    menuItem.onclick ?
    <button className="flex gap-2 opacity-95 py-3 px-4 rounded-lg hover:bg-white/10 w-full">
        <menuItem.icon size={24}/>
        <p>{menuItem.name}</p>
    </button>:
    <Link href={menuItem.link!} className="flex gap-2 opacity-95 py-3 px-4 rounded-lg hover:bg-white/10 w-full">
        <menuItem.icon size={24}/>
        <p>{menuItem.name}</p>
    </Link>
  )
}

export default SingleMenuItem
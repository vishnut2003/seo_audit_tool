import React from 'react'
import { ToolItemSEOTool } from './toolsList'
import Image from 'next/image'
import Link from 'next/link'

const ColumnTemplateSEOTools = ({
  toolItem,
}: {
  toolItem: ToolItemSEOTool,
}) => {
  return (
    <Link
      href={toolItem.url}
      className='flex flex-col gap-3 items-center'
    >
      <Image
        src={toolItem.imageUrl}
        alt={toolItem.name}
        width={1000}
        height={1000}
        className='w-[60px] p-3 shadow-md shadow-gray-300'
      />
      <h3
        className='font-medium text-sm'
      >{toolItem.name}</h3>
    </Link>
  )
}

export default ColumnTemplateSEOTools
import { ReactNode } from "react"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"

const BasicLayout = ({children}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <div className="w-full h-[100dvh] flex">
        {/* Basic Layout Sidebar */}
        <Sidebar/>
        
        {/* Basic Laout Content */}
        <div className="w-full h-full flex flex-col">
          
          {/* Header of basic layout */}
          <Header/>
          <div className="w-full h-full min-h-0 overflow-y-auto p-9 flex justify-center">

            {/* Page Content */}
            <div className="w-full max-w-screen-2xl h-full flex flex-col">
            {children}
            </div>
          </div>
        </div>
    </div>
  )
}

export default BasicLayout
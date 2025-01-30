import { ReactNode } from "react"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"

const BasicLayout = ({ children, pageTitle }: Readonly<{
  children: ReactNode,
  pageTitle?: string,
}>) => {
  return (
    <div className="w-full h-[100dvh] flex bg-gray-100">
      {/* Basic Layout Sidebar */}
      <Sidebar />

      {/* Basic Laout Content */}
      <div className="w-full h-full flex flex-col">

        {/* Header of basic layout */}
        <Header />

        <h2
          className="text-3xl font-extrabold mb-3 pl-5 md:pl-9 pt-4"
        >{pageTitle}</h2>

        <div className="w-full h-full min-h-0 overflow-y-auto p-5 md:p-9 flex justify-center">

          {/* Page Content */}
          <div className="w-full max-w-screen-2xl max-h-max h-full flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicLayout
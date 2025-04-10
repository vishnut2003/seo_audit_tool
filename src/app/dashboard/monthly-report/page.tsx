import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import React from 'react'
import MonthlyReportMainContent from './MainContent'

const MonthlyReportPage = () => {
  return (
    <BasicLayout
        pageTitle='Monthly Report'
    >
        <MonthlyReportMainContent/>
    </BasicLayout>
  )
}

export default MonthlyReportPage
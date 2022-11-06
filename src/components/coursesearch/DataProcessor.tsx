
import React from 'react'

type DataProcessorProps = {
    children: React.ReactNode,
}

export const DataProcessor = ({children}:DataProcessorProps) => {

const prcocess = () => {
    filterByTerm()
    filterByStatus()
    filterByActivity()
    checkExceptions()
    
}
  return (
    <>{children}</>
  )
}



const filterByTerm = () => {

}

const filterByStatus = () => {

}

const filterByActivity = () => {

}

const checkExceptions = () => {

}

const checkSectionWithoutName = () => {

}

const checkAbnormalEntry = () => {

}

const checkEmptySearchResult = () => {

}

const checkPartiallyEmptySearchResult = () => {

}
const checkIncompleteSchedule = () => {

}
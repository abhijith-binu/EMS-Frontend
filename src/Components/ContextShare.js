import React, { useState } from 'react'
import { createContext } from 'react'


export const registerContext = createContext()
export const deleteContext = createContext()

function ContextShare({children}) {
    // register data state
    const [registerData, setRegisterData] = useState('')

    // delete data state
    const [deleteData, setDeleteData] = useState('')
  return (
    <>
       <registerContext.Provider value={{ registerData, setRegisterData }}>
         <deleteContext.Provider value={{deleteData,setDeleteData}}> 
         {children}
         </deleteContext.Provider>
       </registerContext.Provider>
    </>
  )
}

export default ContextShare
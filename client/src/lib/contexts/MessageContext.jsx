import { useState, createContext, useEffect } from "react"
import { nanoid } from "nanoid"

export const MessageContext = createContext()

const MessageProvider = ({ children }) => {
  const [errorsArray, setErrorsArray] = useState([])
  const [successArray, setSuccessArray] = useState([])

  const addSuccess = (text, isDeleted = false, isClickable = false, onClick = () => {}) => {
    const newSuccess = {
      id: nanoid(10),
      text,
      isDeleted,
      isClickable,
      onClick,
    }
    setSuccessArray((prev) => [...prev, newSuccess])
  }

  const removeSuccess = (id) => {
    setSuccessArray((prev) => prev.filter((success) => success.id !== id))
  }

  const addError = (text) => {
    let newError = {
      id: nanoid(10),
      text,
    }
    setErrorsArray((prev) => [...prev, newError])
  }

  const removeError = (id) => {
    setErrorsArray((prev) => prev.filter((error) => error.id !== id))
  }

  return (
    <MessageContext.Provider
      value={{
        errorsArray,
        setErrorsArray,
        addError,
        removeError,
        successArray,
        setSuccessArray,
        addSuccess,
        removeSuccess,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider

import { useContext, useEffect } from "react"
import { MessageContext } from "../contexts/MessageContext"

//components
import Error from "./components/Error/Error"
import Success from "./components/Success/Success"

import styles from "./MessageStack.module.scss"

const MessageStack = () => {
  const { errorsArray, removeError, successArray, removeSuccess } = useContext(MessageContext)

  return (
    <div className={styles.errorStack}>
      {errorsArray?.map((error) => (
        <Error error={error} remove={() => removeError(error.id)} key={error.id} />
      ))}
      {successArray?.map((success) => (
        <Success success={success} remove={() => removeSuccess(success.id)} key={success.id} />
      ))}
    </div>
  )
}

export default MessageStack

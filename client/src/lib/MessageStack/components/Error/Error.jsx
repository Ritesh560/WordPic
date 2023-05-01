import { useEffect, useRef } from "react"

import styles from "./Error.module.scss"

//component
import { Caution, Close } from "../../../assets/icons"
import { BACKEND_URL } from "../../../../../config"

const Error = ({ error, remove }) => {
  const timeoutId = useRef()

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      remove()
    }, 10000)
  })

  console.log(error, BACKEND_URL)

  const handleClose = (e) => {
    e.preventDefault()
    clearTimeout(timeoutId.current)
    setTimeout(() => remove(), 100)
  }

  return (
    <div className={`${styles.errorBox} ${styles.isActive}`}>
      <span
        className={styles.closeIcon}
        onClick={(e) => {
          handleClose(e)
        }}
      >
        <Close />
      </span>
      <div className={styles.errorText}>
        <div>
          <Caution color={"#ffffff"} />
        </div>
        <div className={styles.text}>{error?.text}</div>
      </div>
    </div>
  )
}

export default Error

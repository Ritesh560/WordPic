import { useEffect, useRef } from "react"

//component
import { Close, PartyPopper, RoundedTick } from "../../../assets/icons"

import styles from "./Success.module.scss"

const Success = ({ success, remove }) => {
  const timeoutId = useRef()

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      remove()
    }, 10000)
  })

  const handleClose = (e) => {
    e.stopPropagation()
    clearTimeout(timeoutId.current)
    setTimeout(() => remove(), 100)
  }

  const handleClick = (e) => {
    if (success.isClickable) success.onClick()
  }

  return (
    <div className={`${styles.errorBox} ${styles.isActive}`} onClick={handleClick}>
      <span
        className={styles.closeIcon}
        onClick={(e) => {
          handleClose(e)
        }}
      >
        <Close />
      </span>
      <div className={styles.errorText}>
        <div>{success.isDeleted ? <RoundedTick color={"#ffffff"} /> : <PartyPopper color={"#ffffff"} />}</div>
        <div className={styles.text}>{success.text}</div>
      </div>
    </div>
  )
}

export default Success

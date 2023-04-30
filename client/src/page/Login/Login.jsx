import React, { useState } from "react"
import styles from "./Login.module.scss"

// import { useLogin } from "@ro-email-ticketing/data-access"
// import { Input, ThemedButton, Label } from "@ro-email-ticketing/widgets"
// import { InputThemes, ThemedButtonThemes } from "@ro-email-ticketing/themes"
import { wordpic } from "../../assets"
import { Eye, FilledEye } from "../../lib/assets/icons"
import { Link } from "react-router-dom"

const Login = () => {
  // const { login, loading, error } = useLogin()
  const [input, setInput] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  // const setUser = useSetRecoilState(userInfo)

  // const saveUser = (usr) => {
  //   setUser(usr)
  //   window.location.href = "/"
  // }

  // const onSubmit = async (e) => {
  //   e.preventDefault()
  //   await login(input, (usr) => saveUser(usr))
  // }

  return (
    <div onKeyDown={(e) => e.key === "Enter" && onSubmit(e)} className={styles.loginContainer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={wordpic} alt="" />
          <div>
            <span>WordPic</span>
          </div>
        </div>
        <div className={styles.header_text}>Sign in</div>
        <div className={styles.inputBox}>
          <label>Email</label>
          <div>
            <input height="53px" type="text" value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} name="email" placeholder="Email" />
          </div>
        </div>
        <div className={styles.inputBox}>
          <label>Password</label>
          <div className={styles.inputPassword}>
            <input height="53px" type={showPassword ? "text" : "password"} value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })} name="password" placeholder="Password" />
            {showPassword ? <FilledEye className={styles.eye} onClick={() => setShowPassword(!showPassword)} /> : <Eye className={styles.eye} color="#567191" onClick={() => setShowPassword(!showPassword)} />}
          </div>
        </div>
        <button
          onClick={(e) => {
            onSubmit(e)
          }}
        >
          Sign in
        </button>
        <Link to="/signup">
          <button className={styles.signup}>Sign up</button>
        </Link>
      </div>
    </div>
  )
}

export default Login

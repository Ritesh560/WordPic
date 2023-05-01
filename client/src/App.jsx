import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Home, CreatePost } from "./page"
import "./App.scss"
import MessageProvider from "./lib/contexts/MessageContext"
import MessageStack from "./lib/MessageStack/MessageStack"
import Login from "./page/Login/Login"
import Signup from "./page/Signup/Signup"

const App = () => (
  <BrowserRouter>
    <MessageProvider>
      <MessageStack />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </MessageProvider>
  </BrowserRouter>
)

export default App

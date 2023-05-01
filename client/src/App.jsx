import React, { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

import { Home, CreatePost } from "./page"
import "./App.scss"
import MessageProvider from "./lib/contexts/MessageContext"
import MessageStack from "./lib/MessageStack/MessageStack"
import Login from "./page/Login/Login"
import Signup from "./page/Signup/Signup"

const App = () => {
  const [user, setUser] = useState({})

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MessageProvider>
          <MessageStack />
          <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create-post" element={<CreatePost user={user} setUser={setUser} />} />
          </Routes>
        </MessageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

import React from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

import { Home, CreatePost } from "./page"
import { wordpic } from "./assets"
import "./app.scss"

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-[#b5d6e5] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/" className="flex items-center gap-3">
        <img src={wordpic} alt="logo" className="h-12 object-contain" />
        <span className="font-inter font-bold text-lg">WordPic</span>
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
        Create
      </Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)] wordPic_container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
)

export default App

import React from "react"
import { Link } from "react-router-dom"
import { wordpic } from "../assets"

function Header() {
  return (
    <header className="w-full flex justify-between items-center bg-[#b5d6e5] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/" className="flex items-center gap-3">
        <img src={wordpic} alt="logo" className="h-12 object-contain" />
        <span className="font-inter font-bold text-lg">WordPic</span>
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
        Create
      </Link>
    </header>
  )
}

export default Header

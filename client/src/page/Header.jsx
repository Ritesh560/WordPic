import React from "react"
import { Link } from "react-router-dom"
import { wordpic } from "../assets"

function Header({ user }) {
  return (
    <header className="w-full flex justify-between items-center bg-[#b5d6e5] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/" className="flex items-center gap-3">
        <img src={wordpic} alt="logo" className="h-12 object-contain" />
        <span className="font-inter font-bold text-lg">WordPic</span>
      </Link>

      <div className="flex gap-[15px]">
        <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
          Create
        </Link>
        <Link to="/profile">
          <div className="w-10 h-10 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-md font-bold">{user.name?.[0] ?? "A"}</div>
        </Link>
      </div>
    </header>
  )
}

export default Header

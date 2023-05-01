import React from "react"
import { Link } from "react-router-dom"
import { wordpic } from "../assets"
import { LogOut } from "../lib/assets/icons"

function Header({ user }) {
  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    window.location.href = "/login"
  }
  return (
    <header className="w-full flex justify-between items-center bg-[#b5d6e5] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/" className="flex items-center gap-3">
        <img src={wordpic} alt="logo" className="h-12 object-contain" />
        <span className="font-inter font-bold text-lg">WordPic</span>
      </Link>

      <div className="flex gap-[15px]">
        <Link to="/profile">
          <div className="w-10 h-10 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-md font-bold">{user.name?.[0] ?? "A"}</div>
        </Link>
        <div onClick={handleLogout} className="cursor-pointer">
          <LogOut className="w-10 h-10" />
        </div>
      </div>
    </header>
  )
}

export default Header

import React, { useEffect, useState } from "react"

import { download } from "../assets"
import { downloadImage } from "../utils"
import { ThumbsUp } from "../lib/assets/icons"
import useProfile from "../lib/data-access/src/lib/useProfile"

const Card = ({ _id, name, user_posted, prompt, photo, likes, user }) => {
  const { likePost, likingPost } = useProfile()

  const user_name = name || user_posted
  const [isLiked, setIsLiked] = useState(likes.some((obj) => obj._id === user._id) || likes.includes(user._id))

  const handleLike = () => {
    setIsLiked((prev) => !prev)
    likePost(
      { post_id: _id },
      {
        onSuccess: async (res) => {
          // console.log(res)
          likes.push(user._id)
        },
        onError: (err) => {
          addError(err)
          setIsLiked((prev) => !prev)
        },
      }
    )
  }

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img className="w-full h-auto object-cover rounded-xl" src={photo} alt={prompt} />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#f7f7f7]  p-4 rounded-xl opacity-70">
        <p className="text-black text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{user_name?.[0]}</div>
            <p className="text-black text-sm">{user_name}</p>
          </div>
          <div className="flex gap-[10px]">
            <div className="flex gap-[5px]">
              {isLiked ? <ThumbsUp color="green" className="cursor-pointer" /> : <ThumbsUp color="white" onClick={handleLike} className="cursor-pointer" />}
              <div className="mt-auto">{likes?.length}</div>
            </div>
            <button type="button" onClick={() => downloadImage(_id, photo)} className="w-6 h-6 outline-none bg-[#10131f] border-none rounded-xl">
              <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

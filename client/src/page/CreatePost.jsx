import React, { useContext, useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { preview } from "../assets"
import { getRandomPrompt } from "../utils"
import { FormField, Loader } from "../components"
import { MessageContext } from "../lib/contexts/MessageContext"
import Header from "./Header"
import { BACKEND_URL } from "../../config"
import { useUser } from "../lib/data-access/src"

const CreatePost = ({ user, setUser }) => {
  const navigate = useNavigate()
  const { addError, addSuccess } = useContext(MessageContext)
  const { fetchUser, fetchingUser } = useUser()

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  })

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  const generateImage = async () => {
    if (generatingImg) {
      return
    }

    if (form.prompt && form.name) {
      try {
        setGeneratingImg(true)
        const response = await fetch(`${BACKEND_URL}/api/v1/dalle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
        } else {
          addError("Error Generating Image")
        }
      } catch (err) {
        addError(err)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      addError("Please provide proper prompt")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.prompt && form.photo && form.name) {
      setLoading(true)
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
            user_posted: form.name,
            posted_by: user._id,
            photo: form.photo,
          }),
        })

        if (response.ok) {
          await response.json()
          addSuccess("Success")
          navigate("/")
        } else {
          addError("Error while posting")
        }
      } catch (err) {
        addError(err)
      } finally {
        setLoading(false)
      }
    } else {
      addError("Please generate an image with proper details")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      generateImage()
    }
    return
  }

  const checkAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken")
    if (!accessToken?.length) return false
    return true
  }

  const handleFetchUser = () => {
    fetchUser(
      {},
      {
        onSuccess: (res) => {
          setUser(res)
        },
        onError: (err) => {
          console.log(err)
        },
      }
    )
  }

  useEffect(() => {
    if (Object.keys(user).length === 0) handleFetchUser()
  }, [])

  return (
    <div>
      {checkAccessToken() ? (
        <div>
          <Header />
          <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)] wordPic_container">
            <section className="w-4/5 mx-auto">
              <div className="flex flex-wrap gap-10 justify-between items-center">
                <div>
                  <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
                  <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through AI and share it with the community</p>
                </div>
                {form.photo && (
                  <div>
                    <button type="button" onClick={handleSubmit} className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                      {loading ? "Sharing..." : "Share"}
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-16 w-full">
                <div className="flex flex-wrap justify-between">
                  <div className="flex flex-col gap-5 w-[100%] max-w-[600px]">
                    <FormField labelName="Your Name" type="text" name="name" placeholder="Ex., john doe" value={form.name} handleChange={handleChange} onKeyPress={handleKeyPress} />

                    <FormField labelName="Prompt" type="text" name="prompt" placeholder="An Impressionist oil painting of sunflowers in a purple vase…" value={form.prompt} handleChange={handleChange} isSurpriseMe handleSurpriseMe={handleSurpriseMe} onKeyPress={handleKeyPress} />

                    <div className="mt-5 flex gap-5">
                      <button type="submit" onClick={generateImage} className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        {generatingImg ? "Generating..." : "Generate"}
                      </button>
                    </div>
                  </div>
                  <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 mt-5 flex justify-center items-center">
                    {form.photo ? <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" /> : <img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />}

                    {generatingImg && (
                      <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                        <Loader />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  )
}

export default CreatePost

import React, { useEffect, useState } from "react"
import Header from "../Header"
import { useProfile, useUser } from "../../lib/data-access/src"
import { Card, Loader } from "../../components"

function Profile({ user, setUser }) {
  const { fetchUser, fetchingUser } = useUser()
  const { fetchProfile, fetchingProfile } = useProfile()
  const [allPosts, setAllPosts] = useState([])
  const { name, email } = user

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

  const fetchPosts = async () => {
    if (fetchingProfile) return

    try {
      fetchProfile(
        {},
        {
          onSuccess: async (res) => {
            setAllPosts(res.posts.reverse())
          },
          onError: (err) => {
            addError(err)
          },
        }
      )
    } catch (err) {
      addError(err)
    }
  }

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />)
    }

    return <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  }

  useEffect(() => {
    if (Object.keys(user).length === 0) handleFetchUser()

    if (user?._id) fetchPosts()
  }, [user])

  return (
    <div>
      <Header user={user} />
      <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)] wordPic_container">
        {!fetchingUser ? (
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center   mb-10 space-x-4">
              {/* <img src={profilePictureUrl || profilePlaceholder} alt={name} className="w-20 h-20 rounded-full" /> */}
              <div className="w-[10rem] h-[10rem] faimly-os rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-[6rem] font-bold">{user.name?.[0]}</div>
              <div>
                <h2 className="text-[3rem] font-bold">{name}</h2>
                <p className="text-gray-500 text-[1.5rem]">{email}</p>
                {!fetchingProfile && <p className="text-gray-500 text-[1.5rem]">{allPosts?.length} Posts</p>}
              </div>
            </div>
            {fetchingProfile ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                <RenderCards data={allPosts} title="No Posts Yet" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}
      </main>
    </div>
  )
}

export default Profile

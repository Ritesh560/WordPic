import { AuthorizedApi } from "./api"
import { useMutation } from "react-query"

const useProfile = () => {
  const fetchProfileApi = async () => {
    return AuthorizedApi.get("/api/v1/profile")
      .then((res) => res.data)
      .catch((err) => {
        throw err
      })
  }

  const { mutate: fetchProfile, isLoading: fetchingProfile } = useMutation(fetchProfileApi)

  const likePostApi = async (data) => {
    return AuthorizedApi.post("/api/v1/profile/like", data)
      .then((res) => res.data)
      .catch((err) => {
        throw err
      })
  }

  const { mutate: likePost, isLoading: likingPost } = useMutation(likePostApi)

  return {
    fetchProfile,
    fetchingProfile,
    likePost,
    likingPost,
  }
}

export default useProfile

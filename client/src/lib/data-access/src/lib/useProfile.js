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

  return {
    fetchProfile,
    fetchingProfile,
  }
}

export default useProfile

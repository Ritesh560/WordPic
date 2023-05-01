import { AuthorizedApi } from "./api"
import { useMutation } from "react-query"

const useUser = () => {
  const fetchUserApi = async () => {
    return AuthorizedApi.get("/api/v1/auth")
      .then((res) => res.data)
      .catch((err) => {
        throw err
      })
  }

  const { mutate: fetchUser, isLoading: fetchingUser } = useMutation(fetchUserApi)

  return {
    fetchUser,
    fetchingUser,
  }
}

export default useUser

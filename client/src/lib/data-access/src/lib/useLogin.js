import { PublicApi } from "./api"
import { useMutation } from "react-query"

const useLogin = () => {
  const loginApi = async (data) => {
    return PublicApi.post("/api/v1/auth", data)
      .then((res) => res.data)
      .catch((err) => {
        throw err
      })
  }

  const { mutate: login, isLoading: logging } = useMutation(loginApi)

  return {
    login,
    logging,
  }
}

export default useLogin

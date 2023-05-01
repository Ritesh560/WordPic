import { PublicApi } from "./api"
import { useMutation } from "react-query"

const useSignup = () => {
  const signupApi = async (data) => {
    return PublicApi.post("/api/v1/user", data)
      .then((res) => res.data)
      .catch((err) => {
        throw err
      })
  }

  const { mutate: signup, isLoading: signing } = useMutation(signupApi)

  return {
    signup,
    signing,
  }
}

export default useSignup

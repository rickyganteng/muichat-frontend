import axiosApiInstances from "../../utils/axios";

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: axiosApiInstances.post("auth/login", data),
  };
};
export const registerAccount = (data) => {
  return {
    type: "REGISTER",
    payload: axiosApiInstances.post("auth/register", data),
  };
};
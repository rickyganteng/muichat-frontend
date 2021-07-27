import axiosApiIntances from "../../utils/axios";

export const getDataChatId = (id) => {
  return {
    type: "GET_DATA_CHAT",
    payload: axiosApiIntances.get(`/chat/${id}`),
  };
};
export const postData = (setData) => {
  return {
    type: "POST_DATA",
    payload: axiosApiIntances.post("/chat", setData),
  };
};
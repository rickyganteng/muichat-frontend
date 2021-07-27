import axiosApiIntances from "../../utils/axios";

export const getAllData = () => {
  return {
    type: "GET_ALL_DATA",
    payload: axiosApiIntances.get(`/roomchat`),
  };
};
export const getDataIdRoom = (id) => {
  return {
    type: "GET_ALL_DATA_ID_ROOM",
    payload: axiosApiIntances.get(`/roomchat/${id}`),
  };
};
export const postData = (setData) => {
  return {
    type: "POST_DATA",
    payload: axiosApiIntances.post("/roomchat", setData),
  };
};
export const deleteRoom = (id) => {
  return {
    type: "DELETE_DATA",
    payload: axiosApiIntances.delete(`/roomchat/${id}`),
  };
};
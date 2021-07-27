import axiosApiIntances from "../../utils/axios";

export const getAllData = (id) => {
  return {
    type: "GET_ALL_DATA_ID",
    payload: axiosApiIntances.get(`/contact/${id}`),
  };
};
export const getAllDataContact = () => {
  return {
    type: "GET_ALL_DATA",
    payload: axiosApiIntances.get(`/contact`),
  };
};
export const postData = (setData) => {
  return {
    type: "POST_DATA",
    payload: axiosApiIntances.post("/contact", setData),
  };
};
export const deleteContact = (id) => {
  return {
    type: "DELETE_DATA_CONTACT",
    payload: axiosApiIntances.delete(`/contact/${id}`),
  };
};
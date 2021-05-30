import axiosApiIntances from "../../utils/axios";

export const getAllData = () => {
  return {
    type: "GET_ALL_DATA",
    payload: axiosApiIntances.get("/user"),
  };
};
export const getDataId = (id) => {
  return {
    type: "GET_DATA_ID",
    payload: axiosApiIntances.get(`user/${id}`),
  };
};
export const updatePhone = (id, setData) => {
  return {
    type: "UPDATE_PHONE",
    payload: axiosApiIntances.patch(`user/phone/${id}`, setData),
  };
};

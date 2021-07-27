import axiosApiIntances from "../../utils/axios";

export const getAllData = (search) => {
  return {
    type: "GET_ALL_DATA",
    payload: axiosApiIntances.get(`/user?search=${search}`),
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
export const updateImage = (id, setData) => {
  return {
    type: "UPDATE_IMAGE",
    payload: axiosApiIntances.patch(`user/image/${id}`, setData),
  };
};
export const updateData = (id, setData) => {
  return {
    type: "UPDATE_DATA",
    payload: axiosApiIntances.patch(`user/${id}`, setData),
  };
};

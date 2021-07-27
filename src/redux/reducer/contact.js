const initialState = {
  data: [],
  isLoading: false,
  isError: false,

  msg: "",
};

const contact = (state = initialState, action) => {
  switch (action.type) {

    case "GET_ALL_DATA_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_DATA_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_ALL_DATA_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    case "POST_DATA_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_DATA_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "POST_DATA_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      }; case "DELETE_CONTACT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "DELETE_CONTACT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [],
        msg: "",
      };
    case "DELETE_CONTACT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "DELETE_DATA_CONTACT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_DATA_CONTACT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "DELETE_DATA_CONTACT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default contact;
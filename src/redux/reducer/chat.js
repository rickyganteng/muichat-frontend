const initialState = {
  data: [],
  isLoading: false,
  isError: false,

  msg: "",
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_CHAT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_DATA_CHAT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_DATA_CHAT_REJECTED":
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
      };
    default:
      return state;
  }
};

export default chat;
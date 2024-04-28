import axios from "./baseUrl";

export const getAllFriendRequests = async (token) => {
  try {
    const config = {
      headers: {
        "api-key": token,
      },
    };
    const response = await axios.get(`friend/request/all`, config);
    return response?.data;
  } catch (err) {
    return err.response;
  }
};

export const blockUser = async (token, id,body) => {
  try {
    // debugger
    const config = {
      headers: {
        "api-key": token,
      },
    };
    const response = await axios.post(`friend/${id}/block`,body, config);
    return response?.data;
  } catch (err) {
    return err.response;
  }
};
export const deleteRequest = async (token, id) => {
  try {
    // debugger
    const config = {
      headers: {
        "api-key": token,
      },
    };
    const response = await axios.delete(`friend/request/${id}`, config);
    return response?.data;
  } catch (err) {
    return err.response;
  }
};

export const deleteRequestReciever = async (token, id) => {
  try {
    // debugger
    const config = {
      headers: {
        "api-key": token,
      },
    };
    const response = await axios.delete(`friend/request/${id}/reject`, config);
    return response?.data;
  } catch (err) {
    return err.response;
  }
};

export const sendRequest = async (token, id,body) => {
  try {
    // debugger
    const config = {
      headers: {
        "api-key": token,
      },
    };
    const response = await axios.post(`friend/request/${id}`,body, config);
    return response?.data;
  } catch (err) {
    return err.response;
  }
};

export const acceptRequest = async (token, id) => {
  try {
    // debugger
    const config = {
      headers: {
        "api-key": token,
      },
    };
    const response = await axios.get(`friend/request/${id}/accept`, config);
    return response?.data;
  } catch (err) {
    return err.response;
  }
};

import axios from "./baseUrl";

export const getUserDetail = async (token) => {
  try {
    const config = {
      headers: {
        "api-key": token,
      },
    };
    const response = await axios.get(`user`, config);
    return response?.data;
  } catch (err) {
    return err.response;
  }
};
export const getAllUsers = async (token) => {
  try {
    const config = {
      headers: {
        "api-key": token,
      },
    };
    const response = await axios.get(`user/all`, config);
    return response?.data;
  } catch (err) {
    return err.response;
  }
};

export const getUserFeeds = async (token) => {
  try {
    const config = {
      headers: {
        "api-key": token,
      },
    };
    const response = await axios.get(`user/feed`, config);
    return response?.data;
  } catch (err) {
    return err.response;
  }
};

export const userLogin = async (body) => {
  try {
    const response = await axios.post(`user`, body);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const createUser = async (body) => {
  try {
    const response = await axios.post(`user/create`, body);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const updateUser = async (token, body) => {
  try {
    const config = {
      headers: {
        "api-key": token,
      },
    };
    const response = await axios.put(`user`, body, config);
    return response?.data;
  } catch (err) {
    return err.response;
  }
};

export const updateUserStatus = async (token, body) => {
  try {
    const config = {
      headers: {
        "api-key": token,
      },
    };
    const response = await axios.put(`user/status`, body, config);
    return response?.data;
  } catch (err) {
    return err.response;
  }
};

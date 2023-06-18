import axios from "axios";

export const getRequest = async (url) => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        return Promise.reject(error.response);
    }
};

export const postRequest = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const putRequest = async (url, data) => {
    try {
        const response = await axios.put(url, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
}

export const deleteRequest = async (url) => {
    try {
        const response = await axios.delete(url);
        return response;
    } catch (error) {
        return Promise.reject(error.response);
    }
};



export const API_URL = process.env.REACT_APP_API_BASE_URL;
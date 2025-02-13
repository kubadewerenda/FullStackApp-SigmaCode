import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const getAdvertisements = async ( queryParams = "" ) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/advertisements/?${queryParams}`);
        return {
            results: response.data.results || response.data,
            count: response.data.count,
            next: response.data.next,
            previous: response.data.previous,
        }
    } catch (error) {
        console.error("Błąd pobierania ogłoszeń", error);
        return {
            results: [],
            next: null,
            previous: null,
        };
    } 
};

export const deleteAdvertisement = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/advertisements/${id}/`);
        return true;
    } catch (error) {
        console.error("Błąd usuwania ogloszenia", error);
        return false;
    }
};

export const createAdvertisement = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/advertisements/`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }            
        });
        return response.data;
    } catch(error) {
        console.error("Błąd dodawania ogłoszenia:", error.response?.data || error.message);
        
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("Problem z siecia");
    }
};

export const editAdvertisement = async (id, data) => {
    try {
        const formData = new FormData();

        for (const key in data) {
            if (data[key]) {
                formData.append(key, data[key]);
            }
        }
        const response = await axios.put(`${API_BASE_URL}/advertisements/${id}/`, formData);
        return response.data;
    } catch (error) {
        console.error("Błąd edycji ogłoszenia:", error.response?.data || error.message);
        
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("Problem z siecia");
    }
};
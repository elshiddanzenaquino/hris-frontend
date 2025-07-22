import API from '../utils/axiosWithAuth';

export const getAllEmployees = async () => {
    const response = await API.get('/employees');
    return response.data;
};

import axios from 'axios';



const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const getUsers = async () => {
  try {

    const response = await axios.get(`${API_BASE_URL}/api/user`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const destroyUser = async (userId) => {
  try {

    const response = await axios.delete(`${API_BASE_URL}/api/user/delete/${userId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};


  export const loginfunc = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user/login`,{
            email: email,
            password: password,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateUserProfile =async (userId, updatedData) => {
    const accessToken = localStorage.getItem('accessToken');

    try {

          const response =await axios.put(`${API_BASE_URL}/api/user/update/${userId}`,updatedData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

      return response.data;
        }catch(error)
      {
        throw error;
      }
  }

  export const updatePassword =async (userId, updatedData) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
          const response =await axios.put(`${API_BASE_URL}/api/user/updatepassword/${userId}`,updatedData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

      return response.data;
        }catch(error)
      {
        throw error;
      }
  }

export const logout =async () =>{
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/logout`);

    return response;
  }
  catch (error){
    console.error('Erreur lors de la déconnexion :', error);
  }
}

  export const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user/register`,{
            username,
            email,
            password,
      });

      return response;
    }   catch (error) {
        throw error;

      }
  };

  export const fetchUserData = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return null;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/current`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {

      return null;
    }
  };

  export const getProducts = async (page, limit) => {
    try {
      const token = localStorage.getItem("accessToken");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

      const response = await axios.get(`${API_BASE_URL}/api/products?page=${page}&limit=${limit}`,{ headers });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const toggleFavorite = async (productId) => {
    try {
      const token = localStorage.getItem('accessToken');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `${API_BASE_URL}/api/products/${productId}/favorite`,
        {},
        { headers }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getOneProduct = async (productId) => {
    try {

      const token = localStorage.getItem("accessToken");

      const headers = {
        Authorization: `Bearer ${token}`,
      };


      const response = await axios.get(`${API_BASE_URL}/api/products/showProductAdmin/${productId}`, {headers});


      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const addProduct = async (productData) => {

    try {
       const formData = new FormData();
       formData.append('name_fr', productData.name_fr);
       formData.append('name_en', productData.name_en);
       formData.append('name_fl', productData.name_fl);
       formData.append('description_fr', productData.description_fr);
       formData.append('description_en', productData.description_en);
       formData.append('description_fl', productData.description_fl);
       formData.append('image', productData.image);

      const response = await axios.post(`${API_BASE_URL}/api/products/addProduct`,formData,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }

  };

  export const updateProduct = async (productId, productData, accessToken) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      };

      const updatedFormData = new FormData();
       updatedFormData.append('name_fr', productData.name_fr);
       updatedFormData.append('name_en', productData.name_en);
       updatedFormData.append('name_fl', productData.name_fl);
       updatedFormData.append('description_fr', productData.description_fr);
       updatedFormData.append('description_en', productData.description_en);
       updatedFormData.append('description_fl', productData.description_fl);
       updatedFormData.append('image', productData.image);

      const response = await axios.put(
        `${API_BASE_URL}/api/products/${productId}`,
        updatedFormData,
        { headers }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export  const reserverProduct =async(reservationData) =>{
    try{
      const response =await axios.post(`${API_BASE_URL}/api/reservation/`, reservationData);

      return response.data;

    }catch(error){
      throw error ;
    }
  };

  export async function getAllReservation(page, limit){
    try {
      const response = await axios.get(`${API_BASE_URL}/api/reservation/getAll?page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      throw error;
    }

  }


  export const acceptReservation = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/reservation/reservations/${id}/accept`);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const rejectReservation = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/reservation/reservations/${id}/reject`);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export  const countTotalReservations =async() =>{
    try{
      const response =await axios.get(`${API_BASE_URL}/api/reservation/total`);

      return response.data;

    }catch(error){
      throw error ;
    }
  };

  export  const countAcceptedReservations =async() =>{
    try{
      const response =await axios.get(`${API_BASE_URL}/api/reservation/totalAccepted`);

      return response.data;

    }catch(error){
      throw error ;
    }
  };

  export  const countRejectedReservations =async() =>{
    try{
      const response =await axios.get(`${API_BASE_URL}/api/reservation/totalRejected`);

      return response.data;

    }catch(error){
      throw error ;
    }
  };

  export  const countPendingReservations =async() =>{
    try{
      const response =await axios.get(`${API_BASE_URL}/api/reservation/totalPending`);

      return response.data;

    }catch(error){
      throw error ;
    }
  };

  export  const weeklyReservationStats =async() =>{
    try{
      const response =await axios.get(`${API_BASE_URL}/api/reservation/weeklyReservationStats`);

      return response.data;

    }catch(error){
      throw error ;
    }
  };

  export  const dailyReservationStats =async() =>{
    try{
      const response =await axios.get(`${API_BASE_URL}/api/reservation/dailyReservationStats`);

      return response.data;
    }catch(error){
      throw error ;
    }
  };

  export const getAllMessage = async (page, limit) =>{
    try{
      const response = await axios.get(`${API_BASE_URL}/api/contact/displayMessage?page=${page}&limit=${limit}`)

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch messages');
      }
    }catch(error){
      throw error;
    }
  };


  export const createNotification = async (content) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/notifications`, { content });

      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const markNotificationAsRead = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/notifications/${id}/markAsRead`);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteNotification = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/notifications/${id}`);
    } catch (error) {
      throw error;
    }
  };

  export const markAllNotificationsAsRead = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/notifications/markAllRead`);
    } catch (error) {
      throw error;
    }
  };

  export const getPaginatedNotifications = async (page, pageSize) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/notifications/getpaginated?page=${page}&pageSize=${pageSize}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  };





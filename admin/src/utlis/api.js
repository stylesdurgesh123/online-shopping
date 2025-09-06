import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

 export async function postData(url, data, token = '') {
  try {
    const response = await axios.post(
      apiUrl + url,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in postData:", error.response?.data || error.message);
    return error.response?.data || { error: true, message: "Something went wrong!" };
  }
}
/*
  export async function postData(url, formData) {
  try {
    const response = await fetch(apiUrl + url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

   const data = await response.json();
    return data;
   } catch (error) {
    console.error("Error in postData:", error);
    throw error;
    }
  }*/

  /*
 export async function fetchDataFromApi(url) {
  try {
   const {data} = await axios.get(apiUrl + url,{
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  });
  return data;
  } catch (error) {
    console.log(error);
    return error;
   }
  }*/
 
export async function fetchDataFromApi(url, token = '') {
  try {
    const response = await axios.get(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${token || localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error in fetchDataFromApi:", error.response?.data || error.message);
    return error.response?.data || { error: true, message: "Something went wrong!" };
  }
}

 export async function uploadImage(url,formData) {
  try {
   const {data} = await axios.put(apiUrl + url,formData,{
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data',
  });
 // console.log(data);
  return data;
 } catch (error) {
  console.log(error);
  return error;
 }
}
 
 export async function uploadAddressImage(url,formData) {
  try {
   const {data} = await axios.post(apiUrl + url,formData,{
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data',
  });
 // console.log(data);
  return data;
 } catch (error) {
  console.log(error);
  return error;
 }
}

export async function deleteImage(url, token = '') {
  try {
    const response = await axios.delete(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${token || localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteDataFromApi:", error.response?.data || error.message);
    return error.response?.data || { error: true, message: "Something went wrong!" };
  }
}

export async function deleteData(url, token = '') {
  try {
    const response = await axios.delete(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${token || localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteDataFromApi:", error.response?.data || error.message);
    return error.response?.data || { error: true, message: "Something went wrong!" };
  }
}

/*
 export async function profileEditData(url,updateData) {
  try {
   const {data} = await axios.put(apiUrl + url,updateData,{
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  });
 // console.log(data);
  return data;
 } catch (error) {
  console.log(error);
  return error;
 }
}
 */
export async function profileEditData(url, updateData, token) {
  try {
    const { data } = await axios.put(apiUrl + url, updateData, {
      headers: {
        Authorization: `Bearer ${token || localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log("Error in profileEditData:", error.response?.data || error.message);
    return error.response?.data || { error: true, message: "Something went wrong!" };
  }
}

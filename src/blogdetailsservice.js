import axios from 'axios';

const URL_1= 'http://localhost:5100/userdetails'; 
const URL_2= 'http://localhost:5100/posts';

const saveUserDetails = (userData) => {
  return axios.post(`${URL_1}/register`, userData);
};

const validateUser = (mobileNumber, password) => {
  return axios.post(`${URL_1}/login`, {
    mobileNumber,
    password
  });
};

const saveBlogDetails = (postData) => {
    return axios.post(`${URL_2}/posts`, postData);
}

const getPosts = () => {
    return axios.get(`${URL_2}`);
} 


const deletePost = (id) => {
    return axios.delete(`${URL_2}/${id}`);
}


const updatePost = (id, postData) => {
    return axios.put(`${URL_2}/${id}`, postData);
  };
  
  const getTravelPosts = () => {
    return axios.get(`${URL_2}/category/travel`);
} 

const getMoviesPosts = () => {
    return axios.get(`${URL_2}/category/movies`);
} 

const getFoodPosts = () => {
    return axios.get(`${URL_2}/category/food`);
}

const getGamesPosts = () => {
    return axios.get(`${URL_2}/category/games`);
}

export default {
  saveUserDetails,
  validateUser,
  saveBlogDetails,
  getPosts,
  deletePost,
  updatePost,
  getTravelPosts,
  getMoviesPosts,
  getFoodPosts,
  getGamesPosts
};






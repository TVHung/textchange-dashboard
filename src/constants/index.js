import { getCookie } from "../utils/cookie";
export const api = "http://127.0.0.1:8000/api";
//api user
export const apiLogin = `${api}/auth/login`;
export const apiRegister = `${api}/auth/register`;
export const apiLogout = `${api}/auth/logout`;
export const apiGetUserProfile = `${api}/auth/user-profile`;
export const apiGetAccountProfile = `${api}/auth/profile-user`;
export const apiUserProfile = `${api}/profile-user`;
export const apiGetUser = `${api}/users`;
export const apiChangePass = `${api}/auth/change-pass`;
export const apiSetBlockUser = `${api}/auth/set-block-user`;
export const apiSetAdminUser = `${api}/auth/set-admin-user`;
//profile
export const apiProfile = `${api}/profiles`;

//api post
export const apiPost = `${api}/posts`;
export const apiPostManager = `${api}/post-manager`;
export const apiPostRecently = `${api}/posts-recently`;
export const apiPostHasTrade = `${api}/posts-has-trade`;
export const apiGetAllPost = `${api}/posts`;
export const apiFetchPostDetail = `${api}/posts`;
export const apiFetchPostDetailWithCheck = `${api}/get-post-edit`;
export const apiFetchMyPosts = `${api}/my-posts`;
export const apiFetchUserPosts = `${api}/user-posts`;
export const apiFetchRecommendPosts = `${api}/recommend-posts`;
export const apiWishList = `${api}/wish-list`;
export const apiSetBlockPost = `${api}/set-block-post`;

//api post trade
export const apiPostTrade = `${api}/post-trades`;

//api image
export const apiImages = `${api}/post-image`;
export const apiUpload = `${api}/upload`;
export const apiUploadVideo = `${api}/upload-video`;

//api address
export const apiAddress = `https://provinces.open-api.vn/api`;
export const apiCity = `${apiAddress}/?depth=1`; //get all city
export const apiDistrict = `${apiAddress}/p`; //get district by city depth=2
export const apiWard = `${apiAddress}/d`; //get ward by district depth=2

//brand
export const apiGetBrandByCategory = `${api}/get-by-category`;

//search
export const apiSearch = `${api}/search`;

export const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${getCookie("access_token")}`,
};

export const headerFiles = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${getCookie("access_token")}`,
};

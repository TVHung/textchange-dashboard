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
export const apiGetCountUser = `${api}/auth/user-count`;
export const apiUserRecently = `${api}/auth/user-recently`;
export const apiUserStatic = `${api}/auth/new-user-static`;

//profile
export const apiProfile = `${api}/profiles`;
export const apiChangeAvatar = `${api}/change-avatar`;

//api product
export const apiPost = `${api}/products`;
export const apiPostManager = `${api}/product-manager`;
export const apiPostRecently = `${api}/products-recently`;
export const apiPostHasTrade = `${api}/products-has-trade`;
export const apiGetAllPost = `${api}/products`;
export const apiFetchPostDetail = `${api}/products`;
export const apiFetchPostDetailWithCheck = `${api}/get-product-edit`;
export const apiFetchMyPosts = `${api}/my-products`;
export const apiFetchUserPosts = `${api}/user-products`;
export const apiFetchRecommendPosts = `${api}/recommend-products`;
export const apiWishList = `${api}/wish-list`;
export const apiSetBlockPost = `${api}/set-block-product`;
export const apiFetchMostView = `${api}/most-view`;
export const apiRecently = `${api}/dashboard-recently-product`;
export const apiViewStatic = `${api}/view-static`;
export const apiProductStatic = `${api}/new-product-static`;

//api product trade
export const apiPostTrade = `${api}/product-trades`;

//api image
export const apiImages = `${api}/product-image`;
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

export const typePostInfor = {
  mostView: "most-view",
  recently: "recently",
};

export const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${getCookie("access_token")}`,
};

export const headerFiles = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${getCookie("access_token")}`,
};

export const maxNumImage = 6;
export const maxSizeImage = 2097152; //2mb
export const maxSizeVideo = 10485760; //10mb

export const storageData = [
  { value: 8 },
  { value: 16 },
  { value: 32 },
  { value: 64 },
  { value: 128 },
  { value: 256 },
  { value: 512 },
  { value: 1024 },
  { value: 2048 },
];

export const statusData = [
  { id: 1, value: "Mới" },
  { id: 2, value: "Cũ (90-99%)" },
  { id: 3, value: "Cũ (<90%)" },
];
export const sexData = [
  { id: 1, value: "Nam" },
  { id: 2, value: "Nữ" },
  { id: 3, value: "Khác" },
];
export const storageTypeData = [
  { id: 1, value: "HDD", type: 0 },
  { id: 2, value: "SSD", type: 1 },
  { id: 3, value: "SSHD", type: 2 },
];
export const categoryData = [
  { id: 1, value: "Mobile" },
  { id: 2, value: "Laptop" },
  { id: 3, value: "Pc" },
];
export const videoData = [
  { id: 1, value: "Có video" },
  { id: 0, value: "Không có video" },
];
export const blockStatus = [
  { id: 1, value: "Khóa" },
  { id: 0, value: "Không khóa" },
];
export const soldStatus = [
  { id: 1, value: "Đã bán" },
  { id: 0, value: "Chưa bán" },
];
export const roleStatus = [
  { id: 1, value: "Quản trị viên" },
  { id: 0, value: "Người dùng" },
];
//filter
export const priceStep = 200000;
export const marksPrice = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 30,
  },
  {
    value: 40,
  },
  {
    value: 50,
  },
  {
    value: 60,
  },
  {
    value: 70,
  },
  {
    value: 80,
  },
  {
    value: 90,
  },
  {
    value: 100,
    label: "20tr",
  },
];
export const guaranteeStep = 0.3;
export const marksGuarantee = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "3",
  },
  {
    value: 20,
    label: "6",
  },
  {
    value: 30,
    label: "9",
  },
  {
    value: 40,
    label: "12",
  },
  {
    value: 50,
    label: "15",
  },
  {
    value: 60,
    label: "18",
  },
  {
    value: 70,
    label: "21",
  },
  {
    value: 80,
    label: "24",
  },
  {
    value: 90,
    label: "27",
  },
  {
    value: 100,
    label: "30",
  },
];
export const ramStep = 8 / 25;
export const marksRam = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 12.5,
    label: "4",
  },
  {
    value: 25,
    label: "8",
  },
  {
    value: 37.5,
    label: "12",
  },
  {
    value: 50,
    label: "16",
  },
  {
    value: 62.5,
    label: "20",
  },
  {
    value: 75,
    label: "32",
  },
  {
    value: 87.5,
    label: "64",
  },
  {
    value: 100,
    label: "128",
  },
];
export const displaySizeData = [
  { id: 1, value: "< 13 inch" },
  { id: 2, value: "13 - 13.9 inch" },
  { id: 3, value: "14 - 14.9 inch" },
  { id: 4, value: "15 - 15.9 inch" },
  { id: 5, value: "> 16 inch" },
];
export const cardData = [
  { id: 1, value: "Có GPU" },
  { id: 0, value: "Không có CPU" },
];
export const marksStorage = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "",
  },
  {
    value: 20,
    label: "",
  },
  {
    value: 30,
    label: "",
  },
  {
    value: 40,
    label: "",
  },
  {
    value: 50,
    label: "",
  },
  {
    value: 60,
    label: "",
  },
  {
    value: 70,
    label: "",
  },
  {
    value: 80,
    label: "",
  },
  {
    value: 90,
    label: "",
  },
  {
    value: 100,
    label: "4TB",
  },
];
export const marksStorageData = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "8",
  },
  {
    value: 20,
    label: "16",
  },
  {
    value: 30,
    label: "32",
  },
  {
    value: 40,
    label: "64",
  },
  {
    value: 50,
    label: "128",
  },
  {
    value: 60,
    label: "256",
  },
  {
    value: 70,
    label: "512",
  },
  {
    value: 80,
    label: "1024",
  },
  {
    value: 90,
    label: "2048",
  },
  {
    value: 100,
    label: "4096",
  },
];
export const commandData = [
  { id: 1, value: "Sử dụng cơ bản" },
  { id: 2, value: "Sử dụng giải trí nhẹ nhàng" },
  { id: 3, value: "Sử dụng để chơi game" },
  { id: 4, value: "Sử dụng để làm các tác vụ nặng" },
];
export const resolutionData = [
  { id: 1, value: "HD (1366x768)" },
  { id: 2, value: "HD+ (1600x900)" },
  { id: 3, value: "FullHD (1920x1080)" },
  { id: 4, value: "2K (2560x1440)" },
  { id: 5, value: "4K (3840x2160)" },
  { id: 6, value: "5K (5120x2880)" },
];

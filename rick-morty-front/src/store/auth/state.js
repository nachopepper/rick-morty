export default {
  token:
    localStorage.getItem("token") || sessionStorage.getItem("token") || null,
  userInfo: null,
  infoResponse: {},
};

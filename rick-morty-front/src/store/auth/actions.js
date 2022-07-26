import axios from "axios";

export default {
  async logOut(context) {
    localStorage.removeItem("Authorization");
    await context.commit("setToken", null);
    await context.commit("setUserInfo", null);
  },
  async login(context, data) {
    try {
      const response = await axios.post("user/login", data);

      const token = response.data.token;
      await context.commit("setToken", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      await localStorage.setItem(
        "Authorization",
        "Bearer " + response.data.token
      );
      await context.commit("setUserInfo", response.data.user);
      const r = {
        status: response.status,
        message: response.data.message,
      };
      await context.commit("setInfoResponse", r);
    } catch (e) {
      const r = {
        status: e.response.status,
        message: e.response.data.message,
      };
      await context.commit("setInfoResponse", r);
    }
  },
  async signIn(context, data) {
    try {
      const response = await axios.post("user/signIn", data);

      const token = response.data.token;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      await context.commit("setToken", token);
      await localStorage.setItem(
        "Authorization",
        "Bearer " + response.data.token
      );
      await context.commit("setUserInfo", response.data.user);
      const r = {
        status: response.status,
        message: response.data.message,
      };
      console.log(r);
      await context.commit("setInfoResponse", r);
    } catch (e) {
      const r = {
        status: e.response.status,
        message: e.response.data.message,
      };
      await context.commit("setInfoResponse", r);
    }
  },
  async checkUserInfo(context) {
    try {
      const { data } = await axios.get("user/checkUser");
      await context.commit("setUserInfo", data.user);
    } catch {
      await localStorage.removeItem("Authorization");
      await context.commit("setUserInfo", null);
    }
  },
};

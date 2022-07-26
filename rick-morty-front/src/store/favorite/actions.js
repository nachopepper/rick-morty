import axios from "axios";
export default {
  async addFavorite(context, { id }) {
    let r = {
      message: "",
      status: null,
    };

    try {
      const { status: statusR, data } = await axios.post("favorite", {
        characterId: id,
      });
      r.status = statusR;
      r.message = data.message;
    } catch (e) {
      r.status = e.response.status;
      r.message = e.response.data.message;
    } finally {
      await context.commit("setResponse", r);
    }
  },
  async getFavorites(context) {
    try {
      await context.commit("setLoadingTrue");
      const { data } = await axios.get("favorite");
      await context.commit("setFavorites", data.results);
    } catch (e) {
      console.log(e);
    } finally {
      await context.commit("setLoadingFalse");
    }
  },
  async deleteFavorite(context, { id }) {
    let r = {
      message: "",
      status: null,
    };
    try {
      await context.commit("setLoadingTrue");
      const { status: statusR, data } = await axios.delete("favorite", {
        data: { characterId: id },
      });
      r.status = statusR;
      r.message = data.message;
      await context.commit("setFavorites", data.results);
    } catch (e) {
      console.log(e);
      r.status = e.response.status;
      r.message = e.response.data.message;
    } finally {
      await context.commit("setLoadingFalse");
      await context.commit("setResponse", r);
    }
  },
};

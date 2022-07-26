import axios from "axios";

export default {
  async fetchCharacters(context, page) {
    try {
      await context.commit("setLoadingTrue");
      const { data } = await axios.get("character/getCharacters/?page=" + page);
      await context.commit("setCharacters", data.results);
      await context.commit("setInfo", data.info);
    } catch (e) {
      console.log(e);
    } finally {
      await context.commit("setLoadingFalse");
    }
  },
  async filterCharacters(context, dataFilter) {
    try {
      await context.commit("setLoadingTrue");
      const { data } = await axios.post("character/filterCharacters", dataFilter);
      await context.commit("setCharacters", data.results);
      await context.commit("setInfo", data.info);
    } catch (e) {
      const { data } = e.response;
      await context.commit("setCharacters", data.results);
      await context.commit("setInfo", data.info);
    } finally {
      await context.commit("setLoadingFalse");
    }
  },
};

export default {
  setFavorites(state, payload) {
    state.favorites = payload;
  },
  setLoadingTrue(state) {
    state.loading = true;
  },
  setLoadingFalse(state) {
    state.loading = false;
  },
  setResponse(state, payload) {
    state.response = payload;
  },
};

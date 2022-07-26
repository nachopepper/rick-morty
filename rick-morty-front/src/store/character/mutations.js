export default {
  setCharacters(state, payload) {
    state.characters = payload;
  },
  setInfo(state, payload) {
    state.info = payload;
  },
  setLoadingTrue(state) {
    state.loading = true;
  },
  setLoadingFalse(state) {
    state.loading = false;
  },
};

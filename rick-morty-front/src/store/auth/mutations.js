export default {
    async setToken(state, payload) {
        state.token = payload;
    },
    async setUserInfo(state, payload) {
        state.userInfo = payload;
    },
    async setInfoResponse(state, payload) {
        state.infoResponse = payload;
    },
}

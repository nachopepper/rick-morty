import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";


export default {
    state() {
        return state
    },
    getters,
    mutations,
    actions
}

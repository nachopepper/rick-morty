import Vuex from 'vuex';
import Vue from 'vue';
import charactersModule from './character/index';
import authModule from './auth/index';
import favoritesModule from './favorite/index';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user: {
            modules: {
                auth: authModule,
                characters: charactersModule,
                favorites: favoritesModule,
            }
        },

    },


})

export default store;

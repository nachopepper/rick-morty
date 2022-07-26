<template>
    <v-app-bar app color="success" dark>
        <div v-if="userInfo">Bienvenid@: {{ userInfo.name }}</div>
        <v-spacer></v-spacer>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on">
                    <span class="mr-2">Usuario</span>
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </template>
            <v-list v-if="!userInfo">
                <v-list-item link>
                    <v-list-item-title>
                        <log-in-component />
                    </v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title>
                        <sign-component />
                    </v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <v-list-item link v-if="$route.path === '/home'">
                    <v-list-item-title v-text="'Favoritos'" @click="$router.replace('/favorite')">
                    </v-list-item-title>
                </v-list-item>
                <v-list-item link v-if="$route.path === '/favorite'">
                    <v-list-item-title v-text="'Home'" @click="$router.replace('/home')"></v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-title v-text="'Cerrar sesión'" @click="logOut">
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

    </v-app-bar>
</template>

<script>
import LogInComponent from '../components/LogInComponent.vue'
import SignComponent from '../components/SignComponent.vue';

export default {
    components: {
        SignComponent,
        LogInComponent,
    },
    computed: {
        currentRouteName() {
            return this.$router.history.current.path;
        },
        userInfo() {
            return this.$store.getters.getUserInfo;
        }
    },
    methods: {
        async logOut() {
            await this.$store.dispatch('logOut');
            if (this.$route.path === '/favorite') {
                await this.$router.replace('/home');
            }
        }
    }
};
</script>
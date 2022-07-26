<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" max-width="290">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" rounded x-small>
                    Episodios
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                    Episodios
                </v-card-title>
                <v-card-text v-for="(episode, i) in episodes" :key="i">Episodio: {{ episode }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialog = false">
                        Salir
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>


<script>
export default {
    props: {
        episodes: {
            type: Array,
        }
    },
    data() {
        return {
            dialog: false,
        }
    },
}
</script>
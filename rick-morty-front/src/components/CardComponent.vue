<template>
    <v-card dark>
        <div class="d-flex flex-no-wrap justify-space-between">
            <v-avatar class="ma-3" size="150" tile>
                <v-img :src="character.image"></v-img>
            </v-avatar>
            <div>
                <v-card-title class="justify-center" v-text="character.name"></v-card-title>
                <v-card-subtitle class="justify-center py-0">
                    <v-icon x-small :color="getColorIcon(character.status)">mdi-circle</v-icon>{{
                            statusSpanish(character)
                    }}
                </v-card-subtitle>

                <v-card-subtitle class="justify-center py-0">
                    {{ genderSpanish(character) }}
                </v-card-subtitle>

                <v-card-actions class="justify-center mt-1">
                    <episodes-component :episodes="getEpisodes(character)"/>
                </v-card-actions>
                <v-card-actions class="justify-center mt-1">
                    <slot name="action"></slot>
                </v-card-actions>
            </div>

        </div>
    </v-card>
</template>

<script>
import EpisodesComponent from './EpisodesComponent.vue';

export default {
  components: { EpisodesComponent },
    props: {
        character: {
            type: Object,
            required: true
        },
    },
    methods: {
        getEpisodes({ episode }) {
            const episodesList = episode.map(el => {
                const split = el.split('/');
                return split[split.length - 1]
            });
            return episodesList;
        },
        genderSpanish({ gender }) {
            if (gender === 'Male') return 'Hombre';
            if (gender === 'Female') return 'Mujer';
            if (gender === 'unknown') return 'Desconocido';
            return 'Sin género';
        },
        statusSpanish({ status }) {
            if (status === 'Alive') return 'Vivo';
            if (status === 'Dead') return 'Muert@';
            return 'Desconocido';
        },
        getColorIcon(status) {
            if (status === 'unknown') {
                return 'grey';
            } else if (status === 'Alive') {
                return 'green';
            } else {
                return 'red';
            }
        }
    }
}
</script>


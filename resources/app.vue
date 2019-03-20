<template>
    <div id="app">
        <app-header></app-header>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import AppHeader from './components/header.vue'

    @Component( {
        name: "app",
        components: { AppHeader }
    } )
    export default class extends Vue {
        // Initial variables
        isMounted: Boolean = false;

        // Mounted
        mounted() {
        }
    }
</script>
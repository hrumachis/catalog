<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Chunks from '../ts/Chunks'

    @Component( {
        name: "app"
    } )
    export default class App extends Vue {
        private chunks: Chunks = new Chunks();

        // ---> Initialize parameters
        created(): void {
            this.$api.setPathOrigin = this.getPathOrigin;
        }

        mounted(): void{
            console.log( this.getPathOrigin)
            this.build();
        }

        // ---> Build view
        build(): void {
            this.loadCookies();
        }

        // ---> Getters || Computers
        get getPathOrigin(): string { return `${ window.location.origin }${ ( this as any ).$router.history.base }/`; }

        // ---> Methods
        // -> Actions
        loadCookies(): void {
            // Initialize cookies settings
        }
    }
</script>
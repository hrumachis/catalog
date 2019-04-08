<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component( {
        name: "app"
    } )
    export default class App extends Vue {

        // ---> Initialize parameters
        private created(): void {
            this.$api.setPathOrigin = this.getPathOrigin;
        }

        private mounted(): void{
            console.log( this.getPathOrigin)
            this.build();
        }

        // ---> Build view
        private build(): void {
            this.loadCookies();
        }

        // ---> Getters || Computers
        get getPathOrigin(): string { return `${ window.location.origin }${ ( this as any ).$router.history.base }/`; }

        // ---> Methods
        // -> Actions
        private loadCookies(): void {
            // Initialize cookies settings
        }
    }
</script>
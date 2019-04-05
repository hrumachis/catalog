<template>
    <div class="app-logo">
        <!-- * Image -->
        <img :src="getPathOrigin + '/images/logo.png'">

        <div class="text-block">
            <!-- * Name -->
            <span class="name">Indra</span>
            
            <!-- * Undertext -->
            <div class="undertext">Digital Catalog</div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({ name: "app-logo", }) export default class AppLogo extends Vue {
        get getPathOrigin(): string { return `${ window.location.origin }${ ( this as any ).$router.history.base }/`; }
    }
</script>

<style lang="scss">
    @import '~@/variables';

    // ----------------------> App Logo ---------------------- //
    .app-logo {
        font-family: $font-SegoeUI;
        font-weight: 100;
        position: relative;
        text-transform: uppercase;
    
        > img {
            position: absolute;
            left: 0px;
            top: scaling( 3px );
            height: 110%;
        }

        > .text-block {
            margin-left: scaling( 16px ) + scaling( 20px );
        }

        .name {
            line-height: scaling( 40px );
            font-size: scaling( 30px );
            color: white;
        }

        .undertext {
            font-size: scaling( 12px );
            line-height: scaling( 12px );
            color: #d8d8d8;
        }

        // Tablet style adjustments
        @media ( max-width: $size-pc ) {
            > img {
                top: -3px;
                height: 140%;
            }

            > .text-block {
                margin-left: 25px;
            }

             .name {
                line-height: 20px;
                font-size: 20px;
            }

            .undertext {
                font-size: 12px;
                line-height: 10px;
            }
        }

        // Mobile style adjustments
        @media ( max-width: $size-mobile ) {
            > img {
                height: 40px;
                top: -1px;
            }
            .text-block { margin-left: 24px; }
            .undertext { font-size: 10px; }
        }
    }
</style>
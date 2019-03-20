<template>
    <header>
        <div class="grid flex-middle">
            <div class="pad">
                <app-logo></app-logo>
            </div>
            
            <app-cart>
                <div class="options">

                </div>
            </app-cart>
        </div> 
    </header>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import AppLogo from './logo.vue'
    import AppCart from './cart.vue'

    @Component( {
        name: "app-header",
        components: { AppLogo, AppCart }
    } )
    export default class extends Vue { }
</script>

<style lang="scss">
    @import '~@/variables';
    
    header {
        box-sizing: content-box;
        position: relative;
        vertical-align: middle;

        &::before {
            background-color: rgba( 255, 255, 255, 0.1 );
            content: '';
            bottom: 0px;
            height: 1px;
            left: scaling( $pad-large );
            position: absolute;
            right: 60%;
        }

        .pad { padding: scaling( $pad-large ); }

        @media ( max-width: $size-pc ) {
            .pad { padding: $pad-large; }
        }

    }
</style>
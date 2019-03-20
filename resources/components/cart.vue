<template>
    <div class="app-cart flex">
        <div class="vw-1-2 vh-full pos-rel">
            <div class="name pos-left-top">Cart</div>
            <div class="counter pos-left-bottom">$25401.59</div>
        </div>
        <div class="vw-1-2 vh-full pos-rel">
            <app-svg class="icon pos-center" name="cart"></app-svg>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import AppSvg from './svg.vue'
    
    @Component( { 
        name: "app-cart",
        components: { AppSvg }
    } )
    export default class ComponentCart extends Vue {}
</script>

<style lang="scss">
    @import '~@/variables';

    .app-cart {
        
        box-sizing: border-box;
        cursor: pointer;
        display: block;
        width: scaling( 160px );
        height: scaling( 70px );
        margin-left: scaling( $pad-large );
        position: relative;
        transition: transform 0.3s ease-in-out;

        &:hover {
            transform: scale(1.1);

            &::before { border-color: $col-primary; opacity: 1;}
            &::after { opacity: 1;}
        }

        &::before {
            bottom: 0px;
            border: solid 5px white;
            border-top-color: transparent !important;
            border-left-color: transparent !important;
            content: '';
            height: 0px;
            opacity: 0.2;
            position: absolute;
            right: 0px;
            transition: opacity 0.3s, border-color 0.3s;
            width: 0px;
        }

        &::after {
            background-color: rgba( 255, 255, 255, 0.05 );
            bottom: scaling( -10px );
            content: '';
            left: scaling( -10px );
            opacity: 0;
            position: absolute;
            right: scaling( -10px );
            top:scaling( -10px );
            transition: opacity 0.3s;
        }
        
        .icon {
            color: $col-font-highlight;
            display: block;
            opacity: 0.5;
        }

        .name, .counter {
            font-weight: 100;
            text-align: left;
        }

        .name {
            font-size: scaling( $font-size-h4 );
        }

        .counter {
            color: $col-primary;
            font-size: scaling( $font-size-h5 );
        }

        @media ( max-width: $size-pc ) {
            width: 160px;
            height: 70px;

            .name {
                font-size: $font-size-h4;
            }

            .counter {
                font-size: $font-size-h5;
            }
        }
    }
</style>
<template>
    <div class="app-logo">
        <img src="images/logo.png">

        <div class="text-block">
            <span class="name">Indra</span>
            <div class="undertext">Digital Catalog</div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({ name: "app-logo", }) export default class extends Vue {}
</script>

<style lang="scss">
    @import '~@/variables';

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

        @media ( max-width: $size-pc ) {
            > img {
                top: 3px;
            }

            > .text-block {
                margin-left: 16px + 20px;
            }

             .name {
                line-height: 40px;
                font-size: 30px;
            }

            .undertext {
                font-size: 12px;
                line-height: 12px;
            }
        }
    }
</style>
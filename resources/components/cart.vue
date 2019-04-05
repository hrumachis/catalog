<template>
    <div v-on:click="goTo" class="app-cart" :class="[ { 'active': isActive && isCartLoaded }, { 'loading': !isCartLoaded } ]">
        <!-- Padded Content -->
        <div class="wrapper">
            <!-- * Title -->
            <div class="title pos-left-top">
                <span>Cart</span>
            </div>

            <!-- * Price counter -->
            <div class="counter pos-left-bottom">
                <span class="col-primary">€ </span>
                <span>{{ formatInt( totalPrice ) }}</span>
                <span class="decimals">{{ numberDecimals( totalPrice, 2 ) }}</span>
            </div>

            <!-- * Icon -->
            <div class="icon">
                <app-svg class="cart-ico pos-center" name="cart"></app-svg>
            </div>

            <!-- * Badge -->
            <div class="badge" :class="{ 'active': totalItems > 0 }">
                <span>{{ totalItems }}</span>
            </div>
        </div>
        <!-- /Padded Content -->
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import Util from '../ts/Util'
    import AppSvg from './svg.vue'
    import { ChunkElement } from '../models/ChunkElement'
    import Chunks from '../ts/Chunks'
    
    @Component( { 
        name: "app-cart",
        components: { AppSvg },
        props: { href: String },
        methods: {
            formatInt: Util.formatInt,
            numberDecimals: Util.numberDecimals
        }
    } )
    export default class AppCart extends Vue {
        private chunks: Chunks = new Chunks();

        // -> Props
        @Prop( String ) readonly href!: string;

        // ---> Initialize parameters
        mounted(): void {
            if ( this.$route.name == "CartShared" ) {
                this.isCartLoaded = false;
            }

            this.build();
        }

        // ---> Build view
        build(): void {
            this.loadContent();
        }

        // ---> Setters
        set isCartLoaded( value: boolean ) { this.$store.commit( 'setCartLoaded', value ); }

        // ---> Getters || Computers
        get getRoot(): string { return String( this.$router.currentRoute.name ); }
        get getChunk(): ChunkElement[] { return this.$store.getters.getCartChunk; }
        get isCartLoaded(): boolean { return this.$store.getters.isCartLoaded; }
        get isActive() : boolean{ return this.getRoot == "Cart" || this.getRoot == "CartShared"; }
        get totalItems(): number { return this.getChunk.length; }
        get totalPrice(): number {
            let value: number = 0;

            for ( let i: number = 0; i < this.totalItems; i++ )
                value += this.getChunk[ i ].price;

            return value;
        }

        // ---> Methods
        // -> Actions
        goTo(): void {
            if ( this.href )
                this.$router.push( this.href );
        }

        loadContent(): void {
            this.$store.commit( 'incTotalLoad' );

            if ( this.$route.name == "CartShared" ) {
                let sharedCartBase64: string = this.$route.params.pathMatch;

                // Get data with id array in base64 format. Import it
                this.$api.GET.productsByBase64( ( response: any ) => {
                    if ( response[ 0 ] != null ) {
                        this.$store.commit( 'setCartChunk', this.chunks.import( response.data ) );
                        this.$cookies.set( 'cart', sharedCartBase64 );
                    }

                    this.complete();
                }, sharedCartBase64 );
            } else if ( this.$cookies.get( 'cart' ) != null ) {

                // Get cart cookie and import it
                this.$api.GET.productsByBase64( ( response: any ) => {
                    this.$store.commit( 'setCartChunk', this.chunks.import( response.data ) );
                    this.complete();
                }, this.$cookies.get( 'cart' ) );
            } else
                this.complete();
        }

        // Run this when view is loaded
        complete(): void {
            setTimeout( ():void => {
                    this.$store.commit( 'incTotalLoaded' );
                    this.isCartLoaded = true;
            }, 418 );
        }
    }
</script>

<style lang="scss">
    @import '~@/variables';

    // ----------------------> App Cart ---------------------- //
    .app-cart {
        background-color: transparent;
        display: block;
        height: scaling( 70px );
        margin-right: scaling( 20px );
        padding: scaling( 10px );
        position: relative;
        transition: transform .2s ease-in-out, background-color .3s ;
        width: scaling( 160px );

        // ---> Table & Mobile style adjustemnt
        @media ( max-width: $size-pc ) {
            padding: 0;
            padding-left: $pad-normal;
        }

        // ---> Wrapper
        .wrapper { height: 100%; position: relative; width: 100%; }
        
        // ---> Icon
        .icon {
            color: $col-font-highlight;
            height: 100%;
            left: 50%;
            opacity: .5;
            position: absolute;
            transition: opacity .3s;
            width: 50%;

            .app-svg { width: scaling( 40px ); }
            .back-ico { visibility: hidden; };
        }
        
        .title, .counter {
            font-weight: 100;
            text-align: left;
        }

        // ---> Title
        .title {
            font-size: scaling( $font-size-h4 );
            height: scaling( $font-size-h4 );
            line-height: scaling( $font-size-h4 );
            min-width: scaling( 60px );
        }

        // ---> Counter
        .counter {
            color: white;
            font-size: scaling( $font-size-h5 );
            height: scaling( 26px );
            min-width: scaling( 60px );

            .decimals {
                font-size: scaling( $font-size-h8 );
                vertical-align: top;
            }
        }

        // ---> Badge
        .badge {
            background-color: $col-highlight;
            border-radius: 15%;
            color: $col-primary;
            font-size: scaling( 12px );
            font-weight: 700;
            opacity: 0;
            padding: 0px scaling( 4px );
            position: absolute;
            right: scaling( 4px );
            text-align: center;
            top: scaling( 4px );
            transition: opacity .3s;
            vertical-align: middle;

            &.active { opacity: 1; }
        }

        &:hover:not( .active ) {
            background-color: $col-highlight;
            transform: scale( 1.1 );
            .icon { opacity: 1; }
        }
        
        &.opened {
            .icon {
                animation: cart-slide-left .5s forwards ease-out;
                animation-delay: .2s;
            }
            .counter, .title, .cart-ico, .badge {
                display: none;
            }
            .back-ico { visibility: visible !important; }
        }

        // ---> Table & Mobile style adjustemnt
        @media ( max-width: $size-pc ) {
            box-sizing: border-box;
            height: 80%;
            margin-right: 10px;
            margin-left: $pad-normal;
            padding: 10px;
            width: auto;

            .title, .icon { display: none; }
            .icon {
                height: 50px;
                left: initial;
                position: relative;
                width: 50px;
            }

            .badge {
                font-size: 12px;
                padding: 0px 4px;
                right: -10px;
                top: -10px;
            }

            .counter {
                bottom: initial;
                box-sizing: border-box;
                font-size: $font-size-h4;
                height: 50px;
                min-width: 50px;
                padding-top: 10px;
                position: relative;

                .decimals { font-size: $font-size-h7; }
            }

            @media ( max-width: $size-mobile ) {
                .counter {
                    font-size: $font-size-h6;

                    .decimals { font-size: $font-size-h8; }
                }
            }
        }

        // ---> Loading Preview
        &.loading {
            pointer-events: none;

            .title, .counter, .icon {
                background-color: $col-highlight;
                opacity: 1;
                > * { display: none; }
            }

            .badge { opacity: 0; }
        }

        @keyframes cart-slide-left {
            from { left: 50% }
            to { left: 0% }
        }
    }
</style>
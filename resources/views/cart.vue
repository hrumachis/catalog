<template>
    <div class="view view-cart" :class="[ { 'loading': !isMounted } ]">
        <!-- Header -->
        <app-header class="viewport-full">
            <!-- * Cart -->
            <app-cart></app-cart>

            <!-- * Back -->
            <div v-on:click="goTo( '/' )" class="button-icon button-corner">
                <div class="wrapper">
                    <app-svg class="icon pos-center" name="back"></app-svg>
                </div>
            </div>

            <!-- * Empty cart -->
            <div v-on:click="emptyChunk()" class="button-icon button-corner hidden@mobile" :class="{ 'hidden': isMounted && isEmpty }">
                <div class="wrapper">
                    <app-svg class="icon pos-center" name="trash"></app-svg>
                </div>
            </div>

            <!-- * Checkout -->
            <div class="checkout-message pos-right-top text-right hidden@mobile" :class="{ 'hidden': isMounted && isEmpty }">
                <div class="marg-s-bottom label">
                    <span class="hidden@pc">Click below to continue</span>
                </div>
                <button class="scale">Checkout</button>
            </div>


            <!-- * Share link -->
            <div class="share hidden@pc" :class="{ 'hidden': isMounted && isEmpty }">
                <button @click.stop.prevent="clipboard()" class="secondary pos-left-top">
                    <app-svg class="pos-center" name="copy"></app-svg>
                </button>
                <input id="url-share" v-model="urlShare" class="scale" type="text" readonly>
            </div>
        </app-header>
        <!-- /Header -->

        <!-- Cart List -->
        <div class="cart-list pos-cover">
            <div v-if="isMounted && isEmpty" class="pos-center text-center anima-fade-in">
                <app-svg class="vw-medium marg-s-bottom col-darker" name="cart"></app-svg>
                 <div class="marg-bottom label small col-darker">
                    <span>Cart is empty</span>
                </div>
                <div class="marg-bottom label">
                    <span>Go to catalog to explore more</span>
                </div>
                <button v-on:click="goTo( '/' )" class="scale">Catalog</button>
            </div>
            <div  class="share hidden@not-tablet" :class="{ 'hidden': isMounted && isEmpty }">
                <input id="url-share-mobile" v-model="urlShare" class="scale" type="text" readonly>
                <button @click.stop.prevent="clipboard()" class="secondary pos-left-top">
                    <app-svg class="pos-center" name="copy"></app-svg>
                </button>
            </div>
            <div v-for="( item, n ) in chunk" :key="n" class="item">
                <div class="container-bordered">
                    <!-- * Image -->
                    <div class="image">
                        <img :src="item.src" :alt="item.title" class="pos-cover pos-center" :class="[ { 'portrait': item.portrait } ]">
                    </div>

                    <!-- * Title -->
                    <div class="title">
                        <div class="name">
                            <span>{{ item.title }}</span>
                        </div>
                        <div class="group">
                            <span>{{ item.group }}</span>
                        </div>
                    </div>
                    
                    <!-- * Price -->
                    <div class="price">
                        <span class="col-primary">€ </span>
                        <span>{{ formatInt( item.price ) }}</span>
                        <span class="decimals">{{ numberDecimals( item.price, 2 ) }}</span>
                    </div>

                    <!-- * Remove -->
                    <div v-on:click="removeCartItem( item, n )" class="remove button-icon">
                        <div class="wrapper">
                            <app-svg class="icon pos-center" name="close"></app-svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Cart List -->
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import Util from '../ts/Util'
    import AppHeader from '../components/header.vue'
    import AppSvg from '../components/svg.vue'
    import AppCart from '../components/cart.vue'
    import { ChunkElement } from '../models/ChunkElement'
    import Chunks from '../ts/Chunks'

    @Component( {
        name: 'ViewCart',
        components: { AppHeader, AppSvg, AppCart },
        methods: {
            formatInt: Util.formatInt,
            numberDecimals: Util.numberDecimals
        }
    } )
    export default class ViewCart extends Vue {
        private chunks: Chunks = new Chunks();
        private isMounted: boolean = false; // Finished state to show view

        // ---> Initialize parameters
        private created(): void { this.isMounted = false; }
        private mounted(): void {

            if ( this.isCartLoaded ) 
                this.build();
        }

        // ---> Build view
        // ! Build called after cart component retrieves data and stores it to store
        private build(): void {
            this.loadChunk();
        }

        // ---> Getter || Computers
        public get chunk(): ChunkElement[] { return this.chunks.list.length > 0 ? this.chunks.list[ 0 ] : []; }
        private get isEmpty(): boolean { return this.chunks.list.length <= 0; }
        private get getChunk(): ChunkElement[] { return this.$store.getters.getCartChunk; }
        public get isCartLoaded(): boolean { return this.$store.getters.isCartLoaded; }
        get getPathOrigin(): string { return `${ window.location.origin }${ ( this as any ).$router.history.base }/`; }
        public get urlShare(): string { return `${ this.getPathOrigin }cart/${ this.$cookies.get( 'cart' ) }`; }

        // ---> Methods
        // -> Events
        @Watch( 'isCartLoaded' )
        private onNavChange(): void { this.build(); }

        // -> Actions
        public removeCartItem( chunkElement: ChunkElement, index: number ): void {
            this.chunk.splice( index, 1 );
            this.$store.commit( 'removeCart', chunkElement.setInCart( false ).id );
            this.$cookies.set( 'cart', this.chunks.export( this.chunk ) );
        }

        public clipboard(): void {
            let target: HTMLInputElement;

            if ( window.innerWidth <= 1200 )
                target = document.getElementById( 'url-share-mobile' )  as HTMLInputElement;
            else
                target = document.getElementById( 'url-share' )  as HTMLInputElement;
            
            if ( target ) {
                // Focus #url-search input
                target.select();
                console.log( window.getSelection());
                document.execCommand('copy');
                
                // Unfocus process
                let windowSelection: Selection | null = window.getSelection();

                if ( windowSelection )
                    windowSelection.removeAllRanges();
            }
        }

        public goTo( path: string ): void {
            this.$router.push( path );
        }

        // Empty chunks array
        private emptyChunk(): void {
            this.$store.commit( 'setCartChunk', [] );
            this.chunks.list = [];
            this.$cookies.set( 'cart', this.chunks.export( this.chunk ) );
        }

        // Load chunk data( images ) && add data to chunks array
        private loadChunk(): void {
            this.$store.commit( 'incTotalLoad' );

            // Add chunk to chunks array
            if ( this.getChunk.length > 0)
                this.chunks.add( this.chunks.import( this.getChunk ), null, (): void => {
                    this.complete();
                } );
            else
                this.complete();
        }

        // Run this when chunk is loaded
        private complete(): void {
            setTimeout( ():void => {
                this.$store.commit( 'incTotalLoaded' );
                this.isMounted = true;
            }, 418 );
        }
    }
</script>

<style lang="scss">
    @import '~@/variables';

    // ----------------------> View Cart ---------------------- //
    .view-cart {
        @media ( max-width: $size-pc ) {
            height: calc( 100% - #{ $size-header } ) !important;
            margin-top: $size-header !important;
            overflow: hidden;
        }
    }

    // ----------------------> Checkout Field ---------------------- //
    .checkout-message {
        margin-top: scaling( $pad-normal );
        padding: 0;

        @media ( max-width: $size-pc ) {
            margin: 0;
            right: 10px !important; 
        }
    }

    // ----------------------> Share ---------------------- //
    .share {
        margin-left: scaling( $pad-large );
        padding-left: scaling( 50px) ;
        position: relative;

        button {
            height: 100%;
            width: scaling( 40px );
        }

        input {
            color: rgba( 255, 255, 255, 0.4 );
        }

        .app-svg { width: 50%; }

        @media ( max-width: $size-pc ) {
            bottom: initial;
            margin: 0;
            margin-bottom: 10px;
            position: relative;
            right: initial;
            padding-left: 50px;

            input{
                box-sizing: border-box;
                width: 100%;
            }
        }
    }

    // ----------------------> Cart list ---------------------- //
    .cart-list {
        background-clip: content-box;
        box-sizing: border-box;
        height: calc( 100% - #{ scaling( 135px ) } );
        overflow: hidden;
        overflow-y: auto;
        padding: scaling( $pad-normal );
        top: scaling( 135px ) !important;
        transition: opacity .3s ease-out;

        // ---> Table & Mobile style adjustemnt
        @media ( max-width: $size-pc ) {
            height: 100%;
            padding: 10px;
            top: initial !important;
        }

        .item {
            background-color: $col-highlight;
            padding-bottom: 6%;
            position: relative;
            width: 100%;

            &:not(:last-child) { margin-bottom: 1px; }

            .container-bordered {
                align-items: center;
                bottom: 0;
                box-sizing: border-box;
                display: flex;
                left: 0;
                overflow: hidden;
                position: absolute;
                right: 0;
                top: 0;
            }

            .title {
                font-size: scaling( $font-size-h5 );
                font-weight: 100;
                margin-left: 2%;
                width: 76%;

                .group {
                    font-size: scaling( $font-size-h6 );
                    opacity: .5;
                }
            }

            .image {
                height: 100%;
                overflow: hidden;
                position: relative;
                width: 6%;

                img {
                    height: 100%;
                    opacity: 1;
                    width: auto;
                    transition: opacity .4s ease-in-out;

                    &.portrait { height: auto; width: 100%; }
                }
            }

            .price {
                color: white;
                font-size: scaling( $font-size-h6 );
                font-weight: 100;
                min-width: 4%;

                .decimals {
                    font-size: scaling( $font-size-h8 );
                    vertical-align: top;
                }
            }

            .remove {
                bottom: 10%;
                box-sizing: border-box;
                cursor: pointer;
                height: 80%;
                margin: 0;
                opacity: .6;
                position: absolute;
                right: .7%;
                top: 10%;
                transition: transform .2s ease-in-out, opacity .3s ;
                width: 4.5%;

            }

            // ---> Table & Mobile style adjustemnt
            @media ( max-width: $size-pc ) {
                padding-bottom: 80px;

                .image { min-width: 80px; width: 80px;}
                .title {
                    font-size: $font-size-h6;
                    margin-left: 20px;
                    max-width: calc( 100% - 230px );
                    white-space: nowrap;
                    width: auto;
                    
                    > * {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 100%;
                    }
                    .group { font-size: $font-size-h7; opacity: .5; }
                }
                .price {
                    font-size: $font-size-h6;
                    min-width: 70px;
                    position: absolute;
                    right: 45px;
                    top: 50%;
                    transform: translate( 0, -50% );
                    .decimals { font-size: $font-size-h8; }
                }
                .remove { width: 40px; }
            }
        }
    }

    // ----------------------> Loading ---------------------- //
    .view-cart {
        &.loading {
            .button-icon, .remove {
                pointer-events: none;
                .icon { display: none; }
                .wrapper { background-color: $col-highlight; }
            }
            .cart-list {
                .title span, .price span { background-color: $col-highlight; color: transparent; pointer-events: none; }
                .image {
                    background-color: $col-highlight;

                    > img { display: none; }
                }
            }
            .checkout-message { 
                > * {
                    background-color: $col-highlight;
                    color:transparent;
                    pointer-events: none;
                }
            }
            .share > * {
                color: transparent;
            }
        }
    }
</style>
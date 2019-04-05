<template>
    <div class="view view-catalog">
        <!-- * Header -->
        <app-header :useNav="true">
            <app-cart href="/cart" class="button-corner"></app-cart>

            <div class="flex flex-column">
                <app-svg v-on:click.native="setSortAlphabet( 2 )" name="sort-za" class="app-icon margin-small-bottom hidden@pc" :class="{ 'active': sortAlphabet == 2 }"></app-svg>
                <app-svg v-on:click.native="setSortAlphabet( 1 )" name="sort-az" class="app-icon hidden@pc" :class="{ 'active': sortAlphabet == 1 }"></app-svg>
            </div>

            <app-svg name="menu" class="menu pos-center-right hidden@not-tablet"></app-svg>
        </app-header>

        <!-- * Grid -->
        <div class="app-grid">
            <!-- Grid Item -->
            <div class="container">
                <!-- Chunks -->
                <div v-for="( chunk, n0 ) in chunks.list" :key="n0" class="chunk" :class="[ { 'loading': chunks.isProcessing && n0 == chunks.list.length-1 } ]">
                    <!-- Chunk -->
                    <div v-for="( item, n1 ) in chunk" :key="n1" class="item" :class="{ 'active': item.inCart }" :style="{ width: width+'%' }">
                        <div class="wrapper">
                            <!-- * Title -->
                            <div class="title">
                                <span>{{ item.title }}</span>
                            </div>

                            <!-- * Price -->
                            <div class="price">
                                <span class="col-primary">€ </span>
                                <span>{{ formatInt( item.price ) }}</span>
                                <span class="decimals">{{ numberDecimals( item.price, 2 ) }}</span>
                            </div>

                            <!-- * Cart Icon -->
                            <div v-on:click="toggleCart( n0, n1 )" class="cart-it">
                                <app-svg class="icon pos-center" name="cart"></app-svg>
                            </div>
                            
                            <!-- * Background Image -->
                            <div class="image anima-fade-in">
                                <img :src="item.src" :alt="item.title" class="pos-cover pos-center" :class="[ { 'portrait': item.portrait } ]">
                            </div>
                        </div>
                    </div>
                    <!-- /Chunk -->
                </div>
                <!-- /Chunks -->
                
                <!-- * Loadmore -->
                <div v-on:click="loadChunk" class="loadmore" :class="{ 'active': isLoading || isEmpty }">
                    <div class="pos-center">
                        <div class="button">
                            <div class="text">Load more</div>
                            <app-svg name="more"></app-svg>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Grid Item -->
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import AppHeader from '../components/header.vue'
    import AppSvg from '../components/svg.vue'
    import AppCart from '../components/cart.vue'
    import Const from '../ts/Const'
    import Util from '../ts/Util'
    import Chunks from '../ts/Chunks'
    import { ChunkElement } from '../models/ChunkElement'

    @Component( {
        name: 'ViewCatalog',
        components: { AppHeader, AppSvg, AppCart },
        methods: {
            formatInt: Util.formatInt,
            numberDecimals: Util.numberDecimals
        }
    } )
    export default class ViewCatalog extends Vue {
        private chunks: Chunks = new Chunks();
        private sortAlphabet: number = 0; // 0: false, 1: [A-Z], 2: [Z-A]
        private itemsPerScreen: number = 0;
        private width: number = 0;
        private screenWidth: number = 0; // Mainly for screen resize event 
        private screenHeight: number = 0; // Mainly for screen resize event 
        private isWaiting: boolean = false; // Mainly for screen resize event
        
        // ---> Initialize parameters
        created(): void { }
        mounted(): void {
            this.calcWidth();
            this.calcItemsPerScreen();
            this.build();
        }

        // ---> Build view
        build(): void {
            this.onResize();
            this.loadChunk();
        }

         // ---> Getters || Computers
        get getCartChunk(): ChunkElement[] { return this.$store.getters.getCartChunk; }
        get getNavCurrent(): string { return this.$store.getters.getNavCurrent; }
        get isLoading(): boolean { return this.$store.getters.isLoading; }
        get isEmpty(): boolean { return this.chunks.list.length <= 0; }

        // ---> Methods
        // -> Events
        onResize(): void {
            window.addEventListener( 'resize', (): boolean => {
                this.calcWidth();
                
                if ( !this.calcItemsPerScreen() ) return false;
                if ( this.isWaiting ) return false;


                this.$store.commit( 'incTotalLoad' );
                this.waitForIdle();
                return true;
            } );
        }

        @Watch( 'getNavCurrent')
        onNavChange(): void { this.resetChunk(); }

        @Watch( 'sortAlphabet')
        onSortChange(): void { this.resetChunk(); }
        
        // -> Actions
        toggleCart( n0: number, n1: number ): void {
            var chunkElement: ChunkElement = ( this.chunks.list[ n0 ] )[ n1 ];

            if ( chunkElement.inCart ) this.$store.commit( 'removeCart', chunkElement.setInCart( false ).id );
            else this.$store.commit( 'addCart', chunkElement.setInCart( true ) );

            this.$cookies.set( 'cart', this.chunks.export( this.getCartChunk ) );
        }

        setSortAlphabet( value: number ): void {
            // If values is equal then toggle off sorting
            this.sortAlphabet = this.sortAlphabet == value ? 0 : value;
        }

        // Reload chunks array
        resetChunk(): void {
            this.chunks.empty();
            this.loadChunk();
        }

        // Load chunk data && add data to chunks array
        loadChunk(): void {
            this.$store.commit( 'incTotalLoad' );
            this.$api.GET.products( ( response: any ) => {
                // Add chunk to chunks array
                this.chunks.add( this.chunks.import( response.data ), ( element: ChunkElement ): void => {
                    // Check if element is in cart
                    if ( this.getCartChunk.filter( ( value: ChunkElement ): boolean => value.id == element.id ).length )
                        element.setInCart( true );
                }, (): void => {
                    this.$store.commit( 'incTotalLoaded' );
                } );
            }, this.itemsPerScreen, this.chunks.page, this.getNavCurrent, this.sortAlphabet );
        }

        // Wait for idle to avoid intensive activity
        waitForIdle(): boolean {
            this.isWaiting = true;

            // Repeat until resizing stoped
            if ( this.screenWidth != window.innerWidth || this.screenHeight != window.innerHeight ) {
                this.screenWidth = window.innerWidth;
                this.screenHeight = window.innerHeight;
                setTimeout( this.waitForIdle, 418 );

                return false;
            }

            this.resetChunk();
            this.isWaiting = false;
            this.$store.commit( 'incTotalLoaded' );
            return true;
        }

        // If value changed return true
        calcItemsPerScreen(): boolean {
            var horiz: number = 100 / this.width ;
            var vertic: number = Math.ceil( window.innerHeight / Const.minGridWidth );
            var value: number = horiz * vertic * 2;

            if ( this.itemsPerScreen == value ) return false;

            // Minimum integer value: 18
            this.itemsPerScreen = value >= 18 ? value : 18;
            return true;
        }

        calcWidth(): void {
            // Calculate width in percentages of one grid item
            // Minimum width: Const.minGridWidth
            var percents: number = 100 / Math.floor( window.innerWidth / Const.minGridWidth );

            // Maximum integer value: 50
            this.width = percents < 50 ? percents : 50;
        }
    }
</script>

<style lang="scss">
    @import '~@/variables';

    // ----------------------> View ---------------------- //
    .view-catalog {
        @media ( max-width: $size-pc ) {
            height: calc( 100% - #{ $size-header } - 40px ) !important;
            margin-top: $size-header + 40px !important;
            overflow: hidden;
        }

        @media ( max-width: $size-mobile ) {
            height: calc( 100% - #{ $size-header } ) !important;
            margin-top: $size-header !important;
        }
    }

    // ----------------------> App Grid ---------------------- //
    .app-grid {
        box-sizing: border-box;
        left: 0px;
        position: absolute;
        top: 0px;
        vertical-align: top;
        width: 100%;
        z-index: 1;

        // ---> Grid item
        .item {
            box-sizing: border-box;
            height: auto;
            // margin: scaling( 2px );
            position: relative;
            width: auto;
            transition: opacity 0.2s;
            z-index: 11;

            // Perfect square height == width
            &::before {
                content: '';
                display: block;
                padding-top: 100%;
                position: relative;
                width: 100%;
            }

            // -> Wrapper
            // Need for scalable gap otherwise it conflicts with image size
            .wrapper {
                bottom: 2px;
                box-sizing: border-box;
                display: block;
                left: 2px;
                overflow: hidden;
                position: absolute;
                right: 2px;
                top: 2px;
            }

            // -> Background image
            .image {
                bottom: 0;
                left: 0;
                height: 100%;
                pointer-events: none;
                position: absolute;
                right: 0;
                top: 0;
                width: 100%;

                img {
                    height: 100%;
                    opacity: 1;
                    width: auto;
                    transition: opacity .4s ease-in-out;

                    &.portrait { height: auto; width: 100%; }
                }
            }

            // -> Cart icon
            .cart-it {
                background-color: rgba(34, 34, 34, .8);
                border-radius: 100%;
                color: rgba( 255, 255, 255, 0.5 );
                cursor: pointer;
                height: 40px;
                opacity: .9;
                position: absolute;
                left: 15px;
                top: 15px;
                transition: transform 0.2s ease-in-out;
                width: 40px;
                z-index: 6;

                // -> Plastic surrounding effect
                &::before {
                    background-color: rgba(255, 255, 255, .2);
                    border-radius: 100%;
                    bottom: -2px;
                    content: '';
                    cursor: pointer;
                    left: -2px;
                    opacity: .6;
                    pointer-events: none;
                    position: absolute;
                    right: -2px;
                    top: -2px;
                    transition: opacity .3s;
                    z-index: -1;
                }

                // Click ascent
                &::after {
                    border: solid 2px transparent;
                    border-bottom-color: rgba(255, 255, 255, 0.2);
                    border-radius: 1000px;
                    bottom: 1px;
                    content: '';
                    left: 1px;
                    opacity: .9;
                    pointer-events: none;
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    transform: rotate( -45deg );
                    transition: opacity 0.3s;
                    z-index: -1;
                }

                .app-svg { width: 50%; }

                // -> Hover
                &:hover {
                    color: white;
                    transform: scale( 1.1 );
                    &::before { opacity: 1; }
                    &::after { border-bottom-color: $col-primary; }
                }
            }

            // -> Price
            .price {
                background-color: rgba(34, 34, 34, 0.8);
                border-radius: 1000px;
                box-sizing: border-box;
                color: white;
                font-size: $font-size-h5;
                font-weight: 100;
                height: 40px;
                left: 65px;
                opacity: .9;
                min-width: 70px;
                padding: 5px 15px 0px 15px;
                position: absolute;
                text-align: left;
                top: 15px;
                z-index: 5;

                .decimals {
                    font-size: $font-size-h8;
                    vertical-align: top;
                }
            }

            // -> Title
            .title {
                bottom: 15px;
                box-sizing: border-box;
                font-size: 15px;
                font-weight: 100;
                height: 30px;
                left: 15px;
                line-height: 30px;
                opacity: .9;
                overflow: hidden;
                padding: 0px;
                position: absolute;
                right: 15px;
                text-align: left;
                text-shadow: 1px 0px 2px rgba( 0, 0, 0, .9 ), -1px 0px 2px rgba( 0, 0, 0, .9 ), 0px 1px 2px rgba( 0, 0, 0, .9 ), 0px -1px 2px rgba( 0, 0, 0, .9 );
                z-index: 5;
            }
            
            // -> Chunk item size variaties
            &.high::before { padding-top: 200%; }
            &.wide {
                &::before { padding-top: 50%; }
                img { height: auto; width: 100%; }
            }
            &.large::before { padding-top: 100%; }

            &:hover {
                .title, .cart-it, .price { opacity: 1; transition: opacity 0.4s, background-color 0.3s, color 0.3s, transform 0.2s ease-in-out; }
            }

            @media ( max-width: $size-pc ) {
                .title, .cart-it, .price { opacity: 1; transition: opacity 0.4s, background-color 0.3s, color 0.3s, transform 0.2s ease-in-out; }
            }
            @media ( max-width: $size-mobile ) {
                .cart-it {
                    left: 10px;
                    top: 10px;
                }

                .price {
                    font-size: $font-size-h6;
                    left: 55px;
                    padding: 10px 10px 0px 10px;
                    top: 10px;
                }
            }

            // -> Item is activated
            &.active {
                .cart-it {
                    background-color: $col-primary !important;
                    color: white;
                    opacity: 1;
                    transform: scale( 1.1 );
                    transition: opacity 0.4s, background-color 0.3s, color 0.3s, transform 0.2s ease-in-out;
                    &::before { opacity: 1; }
                    &::after { border-bottom-color: $col-primary; }
                }
                .title, .price { opacity: 1; transition: opacity 0.4s, background-color 0.3s, color 0.3s, transform 0.2s ease-in-out; }
            }
        }

        // ---> Loadmore
        .loadmore {
            box-sizing: border-box;
            cursor: pointer;
            height: scaling( 120px );
            opacity: 1;
            position: relative;
            width: 100%;
            text-align: center;
            transition: opacity .2s ease-in-out;

            .button{
                background-color: transparent;
                opacity: .5;
                padding: scaling( 14px );
                transition: transform .2s ease-in-out, opacity .3s;
            }

            .text {
                font-size: scaling( $font-size-h5 );
                font-weight: 100;
            }

            .app-svg {
                display: inline-block;
                width: scaling( 35px );
            }

            &:hover .button {
                background-color: $col-highlight;
                opacity: 1;
                transform: scale( 1.1 );

                .app-svg { color: $col-primary; }
            }

            &.active {
                opacity: 0;
                pointer-events: none;
                transition: opacity 0s ease-in-out;
            }

            @media ( max-width: $size-pc ) {
                height: 100px;

                .button { padding: 14px; }
                .text { font-size: $font-size-h5; }
                .app-svg { width: 35px; }
            }
        }

        // ---> Container
        .container {
            height: 100%;
            position: relative;
            width: 100%;
        }

        // ---> Chunk
        .chunk {
            align-content: flex-start;
            align-items: flex-start;
            display: flex;
            flex-wrap: wrap;
            height: 100%;
            list-style: none;
            position: relative;
            width: 100%;

            // Only last chunk is loaded so here is visuals
            &.loading .item {
                pointer-events: none; 

                .image, .cart-it, .title, .price {
                    background-color: $col-highlight;
                    opacity: 1;
                    > * { display: none; }
                }
                .image img { display: block; opacity: 0; }
                .cart-it { &::before, &::after { opacity: 0; } }

                &.active {
                    .cart-it {
                        opacity: .6;
                        &::before { display: initial !important; opacity: 1; }
                    }
                }
            }
        }
    }
</style>
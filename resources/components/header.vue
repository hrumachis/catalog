<template>
    <header class="flex flex-middle">
        <!-- Loading indicator -->
        <div class="indicator-loading-mobile" :class="{ 'active': isLoading }"></div>
        
        <!-- Logo Link -->
        <div class="logo">
            <router-link to="/">
                <app-logo></app-logo>
            </router-link>
        </div>

        <!-- Digital Catalog Navigation Menu -->
        <nav v-if="useNav" class="hidden@mobile">
            <div class="label">
                <span class="name">Categories</span>

                <div v-if="!isCategoriesLoaded" class="groups" :class="{ 'loading': !isCategoriesLoaded }">
                    <li v-for="(i, n) in 4" :key="n"><span>0</span></li>
                </div>
                <ul v-else class="groups">
                    <li v-for="( nav, index ) in categories" :key="index" v-on:click="switchNavCurrent( nav )" :class="{ 'active': isActive( nav ) }">{{ nav }}</li>
                </ul>
            </div>
        </nav>

        <!-- Component Slot -->
        <slot></slot>
    </header>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import AppLogo from './logo.vue'
    import AppCart from './cart.vue'
    import AppSvg from './svg.vue'

    @Component( {
        name: "app-header",
        components: { AppLogo, AppCart, AppSvg },
    } )
    export default class AppHeader extends Vue {

        // -> Props
        @Prop( Boolean ) readonly useNav!: boolean;

        // ---> Initialize parameters
        private created(): void { if ( !this.isCategoriesLoaded && this.useNav ) this.$store.commit( 'incTotalLoad' ); }
        private mounted(): void {
            this.build();
        }

        // ---> Build view
        private build(): void {

            if ( this.useNav && !this.isCategoriesLoaded )
                this.loadCategories();
        }

        // ---> Setters
        set isCategoriesLoaded( value: boolean ) { this.$store.commit( 'setCategoriesLoaded', value ); }
        set categories( value: string[] ) { this.$store.commit( 'setCategories', value ); }

        // ---> Getters || Computers
        get getNavCurrent(): string { return this.$store.getters.getNavCurrent; }
        get categories(): string[] { return this.$store.getters.getCategories; }
        get isCategoriesLoaded(): boolean { return this.$store.getters.isCategoriesLoaded; }
        get isLoading(): boolean { return this.$store.getters.isLoading; }

        // ---> Methods
        // -> Actions
        loadCategories(): void {
            console.log( "load categories" );
                
            this.$api.GET.productsCategories( ( response: any ) => {
                this.categories = response.data;
                this.complete();
            } );
        }

        switchNavCurrent( nav: string ): void {
            this.$store.commit( 'setNavCurrent', nav );
        }

        // Run this when view is loaded
        complete(): void {
            setTimeout( ():void => {
                this.$store.commit( 'incTotalLoaded' );
                this.isCategoriesLoaded = true;
            }, 418 );
        }

        // -> States
        isActive( nav: string ): boolean {
            return nav == this.getNavCurrent;
        }
    }
</script>

<style lang="scss">
    @import '~@/variables';

    // ----------------------> Mobile menu ---------------------- //
    .menu {
        opacity: .3;
        width: 30px;
    }
    
    // ----------------------> App Header ---------------------- //
    header {
        background-color: $body-bg;
        box-sizing: content-box;
        left: 0;
        position: fixed;
        top: 0;
        z-index: 2;

        &.viewport-full {
            width: calc( 100% - #{ scaling( $pad-normal ) } );
        }

        // ---> Table & Mobile style adjustemnt
        @media ( max-width: $size-pc ) {
            height: $size-header;
            min-width: 100%;
            // overflow: hidden;
            top: 0;
        }

        // For <slot></slot> elements
        > * {
            padding-right: scaling( 30px );
        }

        // ---> Logo
        .logo {
            padding: scaling( $pad-large );
            padding-left: scaling( $pad-normal );

            @media ( max-width: $size-pc ) {
                padding: 0;
                margin-left: $pad-normal;
            }
        }

        // ---> Nav menu
        nav {
            background-color: $body-bg;
            background-clip: content-box;
            bottom: scaling( -39px );
            box-sizing: border-box;
            font-size: scaling( $font-size-h6 );
            height: scaling( 40px );
            left: 0;
            min-width: scaling( 350px );
            overflow: hidden;
            padding-right: scaling( 60px );
            position: absolute;

            .label {
                margin: 0 scaling( $pad-normal );
            }

            .label > .name {
                font-size: scaling( $font-size-h7 );
                opacity: 0.4;
                text-transform: uppercase;
                vertical-align: middle;
            }

            .label > .groups {
                display: inline-block;
                margin: 0;
                padding: 0;
                list-style: none;
                vertical-align: middle;

                li {
                    background-color: transparent;
                    display: inline-block;
                    cursor: pointer;
                    opacity: .7;
                    margin-left: scaling( 8px );
                    min-width: scaling( 30px );
                    padding: scaling( 4px ) scaling( 8px );
                    text-align: center;

                    &:hover, &.active {
                        background-color: $col-highlight;
                        opacity: 1;
                        transform: scale( 1.1 );
                        transition: opacity .2s, transform .2s ease-in-out;
                    }
                }

                // ---> Loading Preview
                &.loading li {
                    background-color: $col-highlight;
                    opacity: 1;
                    transition: opacity .2s, transform .2s ease-in-out;

                    span { visibility: hidden; }
                }
            }

            &::before {
                border: solid scaling( 30px ) transparent;
                border-left-color: $body-bg;
                border-top-color: $body-bg;
                content: '';
                position: absolute;
                right: 10px;
                top: 0;
            }

            // ---> Table & Mobile style adjustemnt
            @media ( max-width: $size-pc ) {
                bottom: -40px;
                font-size: $font-size-h6;
                height: 40px;
                min-width: 350px;
                padding: 0 20px;

                .label { margin: 0 $pad-normal; }
                .label > .name { font-size: $font-size-h7; }
                .label > .groups li {
                    margin-left: 8px;
                    min-width: 30px;
                    padding: 4px 8px;
                }
                &::before { display: none; }
            }
        }
    }

    // ----------------------> Loading Indicator ---------------------- //
    .indicator-loading-mobile {
        background-color: $col-highlight;
        height: 2px;
        left: 0;
        overflow: hidden;
        padding: 0;
        position: fixed;
        right: 0;
        top: 0;

        &::before {
            background-color: $col-primary;
            content: '';
            height: 100%;
            left: -100%;
            position: absolute;
            top: 0;
            width: 100%;
        }

        &.active::before { animation: slide-loading-indicator 3s infinite ease-out; }

        @keyframes slide-loading-indicator {
            0% { transform: translate( 0%, 0); }
            100% { transform: translate( 100%, 0 ); }
        }
    }

    .indicator-loading {
        left: scaling( $pad-normal );
        position: absolute;
        top: scaling( $pad-normal / 2 );

        .app-svg {
            width: scaling( 30px );

            .circle-0 { animation-delay: -.2s !important; opacity: .3; }
            .circle-1 { animation-delay: -.1s !important; opacity: .2; }
            .circle-2 { opacity: .1; }
        }

        &.active {
            color: $col-primary;

            .circle-0 { animation: pulse .85s infinite ease-in-out; opacity: .1; }
            .circle-1 { animation: pulse .85s infinite ease-in-out; opacity: .1; }
            .circle-2 { animation: pulse .85s infinite ease-in-out; opacity: .1; }
        }

        @keyframes pulse {
            0% { }
            50% { opacity: 1; }
            100% { }
        }

        // ---> Table & Mobile style adjustemnt
        @media ( max-width: $size-pc ) {
            left: initial;
            margin-left: $pad-normal;
            position: relative;
            padding-right: $pad-normal;
            top: initial;

            .app-svg {
                width: 20px;
            }
        }
    }
</style>
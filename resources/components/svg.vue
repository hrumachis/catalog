<template>
    <div class="app-svg">
        <!-- * Logo Icon -->
        <svg v-if="name == 'logo-icon'" viewBox="0 0 20 20" :xmlns="this.xmlns">
            <path fill="none" d="M1,10.5 L19,10.5"></path>
            <path fill="none" d="M2.35,15.5 L17.65,15.5"></path>
            <path fill="none" d="M2.35,5.5 L17.523,5.5"></path>
            <path fill="none" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z"></path>
            <circle fill="none" cx="10" cy="10.5" r="9"></circle>
        </svg>
        
        <!-- * Cart -->
        <svg v-if="name == 'cart'" viewBox="0 0 20 20" :xmlns="this.xmlns">
            <circle stroke="none" cx="7.3" cy="17.3" r="1.4"></circle>
            <circle stroke="none" cx="13.3" cy="17.3" r="1.4"></circle>
            <polyline fill="none" points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5"></polyline>
        </svg>

        <!-- * Sort A-Z -->
        <svg v-if="name == 'sort-az'" viewBox="0 0 1024 1024" :xmlns="this.xmlns" class="flipX">
            <path d="M453.301 749.899c-9.997-9.997-26.206-9.997-36.203 0l-161.098 161.098v-885.397c0-14.138-11.462-25.6-25.6-25.6s-25.6 11.462-25.6 25.6v885.397l-161.099-161.098c-9.997-9.997-26.206-9.997-36.203 0s-9.998 26.206 0 36.203l204.8 204.8c5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.101-7.499l204.8-204.8c9.998-9.997 9.998-26.205 0-36.202z"></path>
            <path d="M1021.93 373.915l-153.6-358.4c-4.032-9.413-13.29-15.515-23.53-15.515s-19.498 6.102-23.53 15.515l-153.6 358.4c-5.57 12.995 0.45 28.045 13.445 33.614 13 5.57 28.045-0.451 33.614-13.446l59.179-138.083h141.781l59.179 138.085c4.16 9.707 13.61 15.523 23.542 15.522 3.365 0 6.784-0.667 10.072-2.075 12.997-5.57 19.018-20.621 13.446-33.616zM795.851 204.8l48.949-114.211 48.949 114.211h-97.898z"></path>
            <path class="flipX-origin" d="M947.2 1024h-204.8c-9.125 0-17.562-4.858-22.142-12.75-4.579-7.894-4.613-17.629-0.085-25.552l182.914-320.098h-160.686c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h204.8c9.125 0 17.562 4.858 22.142 12.75 4.579 7.894 4.613 17.629 0.085 25.552l-182.914 320.098h160.686c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"></path>
        </svg>

        <!-- * Sort Z-A -->
        <svg v-if="name == 'sort-za'" viewBox="0 0 1024 1024" :xmlns="this.xmlns" class="flipX">
            <path class="rot-180" d="M453.301 749.899c-9.997-9.997-26.206-9.997-36.203 0l-161.098 161.098v-885.397c0-14.138-11.462-25.6-25.6-25.6s-25.6 11.462-25.6 25.6v885.397l-161.099-161.098c-9.997-9.997-26.206-9.997-36.203 0s-9.998 26.206 0 36.203l204.8 204.8c5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.101-7.499l204.8-204.8c9.998-9.997 9.998-26.205 0-36.202z"></path>
            <path d="M1021.93 373.915l-153.6-358.4c-4.032-9.413-13.29-15.515-23.53-15.515s-19.498 6.102-23.53 15.515l-153.6 358.4c-5.57 12.995 0.45 28.045 13.445 33.614 13 5.57 28.045-0.451 33.614-13.446l59.179-138.083h141.781l59.179 138.085c4.16 9.707 13.61 15.523 23.542 15.522 3.365 0 6.784-0.667 10.072-2.075 12.997-5.57 19.018-20.621 13.446-33.616zM795.851 204.8l48.949-114.211 48.949 114.211h-97.898z"></path>
            <path class="flipX-origin" d="M947.2 1024h-204.8c-9.125 0-17.562-4.858-22.142-12.75-4.579-7.894-4.613-17.629-0.085-25.552l182.914-320.098h-160.686c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h204.8c9.125 0 17.562 4.858 22.142 12.75 4.579 7.894 4.613 17.629 0.085 25.552l-182.914 320.098h160.686c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"></path>
        </svg>

        <!-- * Image -->
        <svg v-if="name == 'image'" viewBox="0 0 20 20" :xmlns="this.xmlns">
            <circle cx="16.1" cy="6.1" r="1.1"></circle>
            <rect x=".5" y="2.5" width="19" height="15"></rect>
            <polyline stroke-width="1.01" points="4,13 8,9 13,14"></polyline>
            <polyline stroke-width="1.01" points="11,12 12.5,10.5 16,14"></polyline>
        </svg>

        <!-- * More Vertical -->
        <svg v-if="name == 'more-vertical'" viewBox="0 0 20 30" :xmlns="this.xmlns">
            <circle class="circle-0" cx="10" cy="3" r="2"></circle>
            <circle class="circle-1" cx="10" cy="15" r="2"></circle>
            <circle class="circle-2" cx="10" cy="27" r="2"></circle>
        </svg>

        <!-- * Loading -->
        <svg v-if="name == 'loading'"  viewBox="0 0 30 20" :xmlns="this.xmlns">
            <circle stroke="none" class="circle-0" cx="3" cy="10" r="2"></circle>
            <circle stroke="none" class="circle-1" cx="15" cy="10" r="2"></circle>
            <circle stroke="none" class="circle-2" cx="27" cy="10" r="2"></circle>
        </svg>

        <!-- * More -->
        <svg v-if="name == 'more'"  viewBox="0 0 20 20" :xmlns="this.xmlns">
            <polyline fill="none" stroke-width="1.03" points="16 7 10 13 4 7"></polyline>
        </svg>

        <!-- * Back -->
        <svg v-if="name == 'back'" viewBox="0 0 20 20" :xmlns="this.xmlns">
            <polyline fill="none" stroke-width="1.03" points="13 16 7 10 13 4"></polyline>
        </svg>

        <!-- * Close -->
        <svg v-if="name == 'close'" viewBox="0 0 20 20" :xmlns="this.xmlns">
            <path fill="none" stroke-width="1.06" d="M16,16 L4,4"></path>
            <path fill="none" stroke-width="1.06" d="M16,4 L4,16"></path>
        </svg>

        <!-- * Trash -->
        <svg v-if="name == 'trash'" viewBox="0 0 20 20" :xmlns="this.xmlns">
            <polyline fill="none" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3"></polyline>
            <polyline fill="none" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4"></polyline>
            <rect stroke="none" x="8" y="7" width="1" height="9"></rect>
            <rect stroke="none" x="11" y="7" width="1" height="9"></rect>
            <rect stroke="none" x="2" y="3" width="16" height="1"></rect>
        </svg>

        <!-- * Copy -->
        <svg v-if="name == 'copy'" viewBox="0 0 20 20" :xmlns="this.xmlns">
            <rect fill="none" x="3.5" y="2.5" width="12" height="16"></rect>
            <polyline fill="none" points="5 0.5 17.5 0.5 17.5 17"></polyline>
        </svg>

        <!-- * Copy -->
        <svg v-if="name == 'menu'" viewBox="0 0 20 20" :xmlns="this.xmlns">
            <rect stroke="none" x="2" y="4" width="16" height="1"></rect>
            <rect stroke="none" x="2" y="9" width="16" height="1"></rect>
            <rect stroke="none" x="2" y="14" width="16" height="1"></rect>
        </svg>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component( {
        name: "app-svg",
        props: { name: String }
    } )
    export default class AppSvg extends Vue {
        private xmlns: string = "http://www.w3.org/2000/svg";
    }
</script>

<style lang="scss">
    @import '~@/variables';
    
    .app-svg {
        display: block;
        height: auto;
        width: 100%;

        svg { display: block; }

        .rot-180 { transform: rotate( 180deg ); transform-origin: 24% 50%; }
        .flipX { transform: scaleX(-1); }
        .flipX-origin { transform: scaleX(-1); transform-origin: 83% 0%; }
        &.vw-medium { width: scaling( 60px ); display: inline-block; }

        @media ( max-width: $size-pc ) {
            &.vw-medium { width: 60px; }
        }
    }
</style>
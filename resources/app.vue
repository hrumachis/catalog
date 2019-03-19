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
        data: () => ( { 
            mounted: false
        } ),
        components: { },
        mounted() {
            var self: any = this;

            setTimeout(function() {
                self.mounted = true;
            }, 500);
        },
        computed: {
        },
        methods: {
        }
    } )
    
	export default class App extends Vue {}
</script>
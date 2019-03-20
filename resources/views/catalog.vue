<template>
    <div id="Catalog">
        
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component( {
        name: 'Catalog'
    } )
    export default class ViewCatalog extends Vue {
        // Initial variables
        
        mounted = false;
    }
</script>

<style lang="scss">
    @import '~@/variables';


    
    body {
        background-color: $green;
    }
</style>
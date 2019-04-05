import Vue from 'vue'
import Vuex from "vuex"
import { ChunkElement } from './models/ChunkElement'
import { RootState } from './models/system'

// Attach vuex to Vue
Vue.use( Vuex );

export default new Vuex.Store( {
    // ---> Initaited variables
    state: {
        cartLoaded: false,
        cartChunk: [],
        categoriesLoaded: false,
        categories: [],
        navCurrent: "All",
        totalLoad: 0,
        totalLoaded: 0
    },
    // ---> Getters
    getters: {
        // -> Valuables
        getCartChunk( state: RootState ): ChunkElement[] { return state.cartChunk; },
        getNavCurrent( state: RootState ): string { return state.navCurrent; },
        getCategories( state: RootState ): string[] { return state.categories; },

        // -> States
        isLoading( state: RootState ): boolean { return state.totalLoad > state.totalLoaded; },
        isCategoriesLoaded( state: RootState ): boolean { return state.categoriesLoaded; },
        isCartLoaded( state: RootState): boolean { return state.cartLoaded; }
    },
    // ---> Methods
    mutations: { 
        // -> Setters
        setCartChunk( state: RootState, chunk: ChunkElement[] ): void { state.cartChunk = chunk; },
        setNavCurrent( state: RootState, value: string ): void { state.navCurrent = value; },
        setCartLoaded( state: RootState, value: boolean ): void { state.cartLoaded = value; },
        setCategoriesLoaded( state: RootState, value: boolean ): void { state.categoriesLoaded = value; },
        setCategories( state: RootState, value: string[] ): void { state.categories = value; },

        // -> Actions
        incTotalLoad( state: RootState ): void { state.totalLoad++; },
        incTotalLoaded( state: RootState ): void { state.totalLoaded++; },
        addCart( state: RootState, element: ChunkElement ): void { state.cartChunk.push( element ); },
        removeCart( state: RootState, id: number ): void {
            let index: number = state.cartChunk.findIndex( ( value: ChunkElement ): boolean => value.id == id );

            state.cartChunk.splice( index, 1 );
        }
    } 
} );
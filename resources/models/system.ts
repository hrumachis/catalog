import { ChunkElement } from './ChunkElement'

// Model for Vuex.store.state mainly
interface RootState {
    cartLoaded: boolean;
    cartChunk: ChunkElement[];
    categoriesLoaded: boolean;
    categories: string[];
    navCurrent: string;
    totalLoad: number;
    totalLoaded: number;
}

export { RootState };
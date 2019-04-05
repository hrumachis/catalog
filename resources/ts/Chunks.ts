import Util from './Util'
import Const from './Const'
import { ChunkElement } from '../models/ChunkElement'

export default class Chunks {
    public list: ChunkElement[][] = [];
    public isProcessing: boolean = false;
    public page: number = 1;
    private totalLoaded: number = 0;
    private totalNeedToLoad: number = 0;

    // ---> Initialize parameters
    constructor() { }

    // ---> Methods
    // -> Actions
    // Add chunk to chunks list. Track chunks page.
    public add( chunk: ChunkElement[], condition?: CallableFunction | null, callback?: CallableFunction ): void {
        this.page++;
        this.totalLoaded = 0;
        this.isProcessing = true;
        this.totalNeedToLoad = chunk.length;

        chunk.forEach( ( element: ChunkElement ):void => {
            // Preload image
            this.loadImage( element, callback );
            
            // Conditioning element
            if ( condition )
                condition( element );
        } );

        this.list.push( chunk );
    }

    // Reset chunks list, chunks page. 
    public empty(): void {
        this.page = 1;
        this.list = [];
    }

    // Import data into system as type ChunkElement. Set totalNeedToLoad if data is array.
    public import( object: any): ChunkElement[] {
        let data: ChunkElement[] = [];

        if ( Array.isArray( object ) ) {
            for ( let i: number = 0; i < object.length; i++ )
                data.push( this.objToElement( object[ i ] ) );
        } else
            data.push( this.objToElement( object ) );

        return data;
    }

    // Export ChunkElement[] as optimized, hashed JSON form
    public export( chunkElement: ChunkElement[] ): string {
        var hash: string = "";

        chunkElement.forEach( ( element: ChunkElement, index: number, array: ChunkElement[] ): void => {
            hash = `${ hash }${ element.id }${ index < array.length-1 ? "," : "" }`;
        } );

        return btoa( hash );
    }

    // -> Functionalities
    // Turn single data piece into ChunkElement. Callback after done.
    private objToElement( elm: any, callback?: CallableFunction ): ChunkElement {
        let chunkElement = new ChunkElement( elm.id );

        if ( elm.title ) chunkElement.setTitle( elm.title );
        if ( elm.price ) chunkElement.setPrice( elm.price );
        if ( elm.src ) chunkElement.setSrc( elm.src );
        if ( elm.groups ) chunkElement.setGroup( elm.groups );
        if ( elm.group ) chunkElement.setGroup( elm.group );


        return chunkElement;
    }

    // Handle image loading. Keep track of image chunk load state. Callback after done.
    private loadImage( chunkElement: ChunkElement, callback?: CallableFunction ) {
        let img: HTMLImageElement = new Image();

        img.onload = () => {
            chunkElement.loaded = true;
            this.totalLoaded++;

            // Check if image is portrait
            chunkElement.portrait = img.height > img.width ? true : false;

            // Chunk loaded
            if ( this.totalLoaded >= this.totalNeedToLoad ) {
                this.isProcessing = false;
                if ( callback ) callback()
            }
        };

        img.src = chunkElement.src;
    }
}
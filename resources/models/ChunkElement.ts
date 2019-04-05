class ChunkElement {
    public id: number;
    public title: string = "";
    public src: string = "";
    public group: string = "";
    public price: number = 0.00;
    public loaded: boolean = false;
    public inCart: boolean = false;
    public portrait: boolean = false;

    // ---> Initialize parameters
    constructor( id: number) {
        this.id = id;
        return this;
    }

    // Methods
    public setTitle( value: string ): ChunkElement { this.title = value; return this; }
    public setSrc( value: string ): ChunkElement { this.src = value; return this; }
    public setPrice( value: number ): ChunkElement { this.price = value; return this; }
    public setGroup( value: string ): ChunkElement { this.group = value; return this; }
    public setInCart( value: boolean ): ChunkElement { this.inCart = value; return this; }
}

export { ChunkElement }
import Vue from 'vue'
import axios, { AxiosResponse } from 'axios'

//  -----------------------------------------------
/*  |   API
    |   * Need better GET,POST,DELETE.. classes structure
*/

class GET {
    public path: string = "";

    // ---> Methods
    // -> '/products/{n}/{page}/{group}/{sort}' 
    // * Callback should be optional
    // ! One method name must be used for all 2 api /products paths
    public products( callback: CallableFunction, n: number, page: number, group: string, sort?: number ): boolean {
        if ( isUnstPath( this.path ) ) return false;
        let path: string = `${ this.path }products/${ n }/${ page }/${ group }`;
        if ( sort == 1 ) path = `${ path }/a-z`; // Add value to path /{sort}
        else if ( sort == 2 ) path = `${ path }/z-a`; // Add value to path /{sort}

        // Use axios get
        axiosGetCall( path, callback );
        return true;
    }

    // -> '/products/{base64}' 
    public productsByBase64( callback: CallableFunction, base64: string ): boolean {
        if ( isUnstPath( this.path ) ) return false;
        let path: string = `${ this.path }products/${ base64 }`;

        // Use axios get
        axiosGetCall( path, callback );
        return true;
    };

    // -> '/products/categories' 
    public productsCategories( callback: CallableFunction ): boolean {
        if ( isUnstPath( this.path ) ) return false;
        let path: string = `${ this.path }products/categories`;

        // Use axios get
        axiosGetCall( path, callback );
        return true;
    };
}

// --> Global Functions
// -> Console Error if origin path is unset
function isUnstPath( path: string ): boolean {
    if ( path != "" ) return false;
    
    console.error( "Set Api Origin Path." );
    return true;
}

// -> Axios get function with callback
function axiosGetCall( path: string, callback: CallableFunction ): void {
    axios.get( path )
        .then( ( response: AxiosResponse<any> ): boolean => {
            if ( !response || !callback ) return false;
            if ( Array.isArray( response ) && response[0] == null ) return false;
            
            // Give time for visual effects appear and time for system to chill a bit :)
            callback( response );

            return true;
    } );
}

// ---> Main API class
class Api {
    // ---> Setters
    // -> Set Origin Path
    set setPathOrigin( path: string ) {
        this.GET.path = path + "api/";
    }

    // -> GET Packets
    public GET = new GET();
}

// -> Export Vue Prototype Javascript
// Export API class as prototype of Vue variable in JavaScript
export default function ApiPlugin( _Vue: typeof Vue ): void {
    _Vue.prototype.$api = new Api();
}

//  -> Declare Type
// Declare Type for Vue.$api variable in TypeScript
declare module 'vue/types/vue' {
    interface Vue {
      $api: Api;
    }
}
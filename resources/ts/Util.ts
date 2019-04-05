export default class Util {
    public static randInt( min: number, max: number ): number {
        return Math.floor( Math.random()*( max-min+1 )+min );
    }

    public static formatNumber( value: number, decimal: number ): string {
        let val = ( value / 1 ).toFixed( decimal ).replace( '.', ',' );
        return val.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "." );
    }

    public static numberDecimals( value: number, decimals: number ): string {
        return ( value / 1 ).toFixed( decimals ).split( '.' )[ 1 ];
    }

    public static formatInt( value: number ): string {
        return String( Math.floor( ( value / 1 ) ) ).replace( /\B(?=(\d{3})+(?!\d))/g, "." );;
    }
}
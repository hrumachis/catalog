<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Product;
use App\Http\Resources\Product as ProductResource;

class ProductController extends Controller {

    // Get regular chunk
    public function index( $base64 ) {
        $chunk = explode( ",", base64_decode( $base64 ) );
        $respond = array();

        foreach ( $chunk as &$value ) {
            array_push( $respond , Product::find( $value ) );
        }
    
        return $respond;
    }

    // Get chunk by specif group
    public function group( $n, $page, $group ) {
        $collection = ProductResource::collection( Product::all() );
        
        if ( $group != 'All' ) $collection = $this->filterByGroup( $collection, $group );

        return $collection->forPage( $page, $n )->values();
    }

    // Get sorted chunk by specif group or all
    public function sortedGroup( $n, $page, $group, $sort ) {
        $collection = ProductResource::collection( Product::all() );

        if ( $group != 'All' ) $collection = $this->filterByGroup( $collection, $group );
        if ( $sort == 'a-z') $collection = $collection->sortBy( 'title' );
        if ( $sort == 'z-a') $collection = $collection->sortByDesc( 'title' );

        return $collection->forPage( $page, $n )->values();
    }

    public function categories() {
        return array( "All", "Food", "Material", "Tool" );
    }

    private function filterByGroup( $collection, $group ) {
        return $collection->filter( function( $value ) use ( $group ) {
            return $value->groups == $group;
        } );
    }
}

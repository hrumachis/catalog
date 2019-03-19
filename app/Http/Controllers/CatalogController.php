<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function main() {
        $data = array(
            'title' => "Catalog"
        );

        return view( 'catalog' )->with( $data );
    }
}

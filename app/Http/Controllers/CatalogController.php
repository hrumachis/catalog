<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public $data = array(
        'title' => "Digital Catalog"
    );

    public function main() {
        return view( 'app' )->with( $this->data );
    }
}


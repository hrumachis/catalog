<?php

    /*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register web routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | contains the "web" middleware group. Now create something great!
    |
    */
    
    Route::get( '/', 'CatalogController@main' );
    Route::get( '/cart', 'CatalogController@main' );
    Route::get( '/cart/{base64}', 'CatalogController@main' );
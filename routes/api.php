<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

// ---> Products
Route::get( '/products/categories', 'ProductController@categories' );
Route::get( '/products/{base64}', 'ProductController@index' );
Route::get( '/products/{n}/{page}/{group}', 'ProductController@group')->where(['page' => '[0-9]+', 'n' => '[0-9]+']);
Route::get( '/products/{n}/{page}/{group}/{sort}', 'ProductController@sortedGroup')->where(['page' => '[0-9]+', 'n' => '[0-9]+']);
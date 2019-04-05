<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create( 'products', function ( Blueprint $table ) {
            $table->bigIncrements( 'id' );
            $table->string( 'title' );
            $table->string( 'src' );
            $table->double( 'price', 12, 2 );
            $table->mediumText( 'groups' );
            $table->timestamps();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists( 'products' );
    }
}

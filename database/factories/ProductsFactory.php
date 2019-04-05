<?php

use Faker\Generator as Faker;

$factory->define( App\Product::class, function ( Faker $faker ) {
    $group = $faker->randomElement( [ 'Material', 'Food', 'Tool' ] );

    return [
        'title' => $faker->text( rand( 10, 50 ) ),
        'price' => $faker->randomFloat( 2, 1, 9999 ),
        'src' => '/images/products/' . $group . '-' . rand( 0, 10 ) . '.jpg',
        'groups' => $group
    ];
} );

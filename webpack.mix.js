const mix = require( 'laravel-mix' );

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .options({ extractVueStyles: true })
    .ts( 'resources/main.ts', 'public/js' )
    .sass( 'resources/sass/app.scss', 'public/css' )
    .webpackConfig( {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: { appendTsSuffixTo: [/\.vue$/] },
                    exclude: /node_modules/,
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules(?!\/foundation-sites)|bower_components/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: Config.babel()
                        }
                    ]
                }
            ],
        },
        resolve: {
            extensions: [ '*', '.js', '.jsx', '.vue', '.ts', '.tsx' ],
            alias: {
                '@': path.resolve('resources/sass')
            }
        },
    } );
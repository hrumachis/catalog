# <img src="https://i.imgur.com/7hvjdOa.png"  width="256">

**<big>Indra Digital Catalog</big>** <br>
Is a modern web application with fluent experience for users to find things they need.

- *Works with browsers such as **Chrome, Opera, Firefox, Microsoft Edge, Safari***.
- *Supports most of mobile browsers.*
- *Supports High Resolution screens.*
- *Modern, intuitive design.*

**<big>Features</big>**
- Rich items listing in a grid mode.
- Ability to save favourite items into cart.
- Share cart content with others.

Demo version: [http://indra-digital-catalog.herokuapp.com](http://indra-digital-catalog.herokuapp.com)

# For Developers
Want to take a peek into code? Well wait, read this before jumping into rabbit hole.<br>
Project is in alpha state. It works, has good foundation, but it's still hungry for code.

## Run Application Locally

 1. Make sure you have installed web development environment such <br> as [WampServer](http://www.wampserver.com/en/) or [XAMPP](https://www.apachefriends.org/index.html). 
 2. **[Download](https:///hrumachis/catalog/archive/master.zip)** project .zip and extract to     corresponding folder. <br>
WampServer:`C:\wamp64\www\`.<br>
XAMPP: `C:\xampp\htdocs\`.
 4. **[Download](https://getcomposer.org/Composer-Setup.exe)**  [Composer](https://getcomposer.org/) dependency manager for PHP and install it.
 5. Run your Apache server
 6. Create .env file in your root. And drop there [Local Variables](https://github.com/laravel/laravel/blob/master/.env.example).
 7. Open [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/)
        initialise MySQL variables into .env file.<br>
        Create database: "digital-catalog"<br>
        *Username: root* <br>
        *Password: empty*
 8. Open Command Prompt or Terminal in project directive.<br>
And run these commands<br>
<code>$ composer update</code><br>
<code>$ php artisan key:generate</code><br>
<code>$ php artisan migrate</code><br>
<code>$ php artisan db:seed</code><br>

## Application Project
*Project created with <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png" width="32" align="top"> [Laravel](https://laravel.com/) framework.*


>**Server side**<br>
<small>Logic: **PHP** ^7.2.4</small><br>
<small>Database: **MySQL** ^5.7.21</small>


>**Client side**<br>
<small>Logic: **TypeScript**, targeting **ESNext**</small><br>
<small>Templates **Vue  / Blade**</small><br>
<small>Markups: **HTML5**</small><br>
<small>Style: **SASS**</small>

## Architecture
Below you can see directories which are used most. The main structure which was generated by Laravel is slighty changed by adding few folders within *resources* directive.

**Why we add additional folders?**<br>
Such changes has been made to support objective **[TypeScript](https://www.typescriptlang.org/)** and **[Vue routing](https://vuejs.org/v2/guide/routing.html)**. Yes, Vue routing, we think that most of processes should stay on client side and processes which needs authorisation has to happen on server side. That way not only we provide more interactive experience to user but also minimize the weight on servers. We want to deliver website view fast as we can, in that mather we mainly use API requeasts to get data.

    * app
    	* Http
    		# Controllers
    		# Resources
    * database
    	# factories
    	# migrations
    	# seeds
    * public
    * resources
    	# components // Vue components
    	# models // TypeScript interfaces, abstracts
    	# sass
    	# ts // TypeScript handlers
    	# views // .vue and .blade
    	api.ts // API requeasts (Axios)
    	main.ts
    	router.ts // Vue routes (Vue router)
    	store.ts // Variables shared via components (Vuex)
    	vue-shim.ts // Targets ts compiler to .vue files
    * routes
<br>

**<big>Vue Views</big>**<br>
As mentioned before most of routing happens on client side using  **.vue** files. Below you can see template format which we use for all **.vue** files to keep code organised and tidy. 

    <template>
	    // View content HTML5
    </template>
    
    <script lang="ts">
    ...imports
    
    @Component(
	    // Few vue component parameters such as { name, components, props }
    )
    export default class NameView extends Vue {
	    ... Variables
	    
	    // ---> Initialize parameters
		created():  void { ... initialised variables before view }
		mounted():  void { ... initialised variables after view }
		
		// ---> Initialize parameters
		build(): void {
			... Event listeners
			... View build functions
		}
		
		// ---> Setters
		... Setters
		
		// ---> Getters || Computers
		... Getters, setters
		
		// ---> Methods
		// -> Events
		.. Event listeners, watchers

		// -> Actions
		... All needed methods
    }
    </script
    
    <style lang="scss">
	    // Unique SCSS classes for individual elements
    </style>
 <br>
 
**<big>SCSS</big>**<br>
In every .vue there is unique classes for individual elements. What style code does ***default.scss*** file contains? **default.scss*** file is for: <br>
* HTML elements such as ***body, html, a, span, input, button ...***
* Class library for abstract styles such as ***.flex, .margin, .position, .visibility ...*** <br>
 We use library idea from amazing project  <img src="https://getuikit.com/images/favicon.png" width="32" align="top"> **[UIkit](https://getuikit.com/)**<br>
 Most of style solutions is used from UIkit.

**What else about style?**<br>
* **default.scss*** file might contain style classes which is't used, but  they can be needed later. 
* ***_variables.scss*** file contains all SCSS variables. 
* What's ***function scaling()*** used for ?<br>
   We use this function to change value from *absolute length unit* to *relative length unit*, from ***pixels*** to ***vw*** . Using ***vw*** elements scale proportionally to screen dimensions. There is exception for grid element, goal is to use maximum visual space, that's why we keep their original size.

# Credits
<img src="https://stackedit.io/icons-c75a9472175cc17394ba6428d867fbcf/favicon-32x32.png" align="top" /> [StackEdit](https://stackedit.io)  - For neat readme editing tool.
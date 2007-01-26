<?php

/**
 * A class to control the setup of a cms application.
 * It exposes methods which define the runtime environment of the app
 * which also allow other plugins to register themselves with the application.
 *
 * @package PHP-WAX CMS
 **/

 
class CMSApplication {
	
	static public $modules = array();
	
	
	/**
	 * Lets the application know there is a module available
	 * the array is made up of the following:
	 * array("name"=>"value", "controller"=>"value")
	 * @param array $module
	 **/

	static public function register_module($module) {
		self::$modules = $module;
	}
	
}
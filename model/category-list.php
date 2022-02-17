<?php
define('RUTA_CLASS', dirname(dirname(__FILE__))); 
require_once RUTA_CLASS."/class/Category-class.php";
$category = new Category();
$data = $category->getAllCategory();
die(json_encode($data));
?>
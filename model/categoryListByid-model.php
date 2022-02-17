<?php
define('RUTA_CLASS', dirname(dirname(__FILE__)));
require_once RUTA_CLASS."/class/Category-class.php";
$shoppingCart = new Category();
$id=isset($_GET['id']) ? $_GET['id'] : '';
$data =  $shoppingCart->getCategoryProductById($id);

die(json_encode($data));

?>
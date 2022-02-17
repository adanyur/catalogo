<?php
define('RUTA_CLASS', dirname(dirname(__FILE__)));
require_once RUTA_CLASS."/class/Carrito-class.php";
$shoppingCart = new Carrito();
$id=$_GET['id'];
$data =  $shoppingCart->cartProductList($id);

die(json_encode($data));

?>
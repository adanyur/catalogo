<?php 
define('RUTA_CLASS', dirname(dirname(__FILE__))); 
require_once  RUTA_CLASS.'/include/head.php';
require_once RUTA_CLASS."/class/Carrito-class.php"; 
$carrito = new Carrito();
$data = $carrito->cartProductList(10000);
die($data);
?>
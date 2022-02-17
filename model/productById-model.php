<?php
define('RUTA_CLASS', dirname(dirname(__FILE__)));
require_once RUTA_CLASS."/class/Producto-class.php";
$shoppingCart = new Producto();
$idProduct = isset($_GET['id']) ? $_GET['id'] : '';
$data =  $shoppingCart->getProductById($idProduct)[0];
$imagenes = $shoppingCart->getProductImagen($idProduct);
$data['imagenes']=$imagenes;
die(json_encode($data));

?>
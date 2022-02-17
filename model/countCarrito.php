<?php
define('RUTA_CLASS', dirname(dirname(__FILE__)));
require_once RUTA_CLASS."/class/Carrito-class.php";
$shoppingCart = new Carrito();
$id=$_GET['id'];
$data =  $shoppingCart->countCarrito($id);
die(json_encode($data));
?>
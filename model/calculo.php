<?php 
session_start();
define('RUTA_CLASS', dirname(dirname(__FILE__))); 
require_once RUTA_CLASS."/class/Carrito-class.php"; 
$carrito = new Carrito();
$id=$_GET['id'];
$data = $carrito->CalculoCart($id);
die(json_encode($data));
?>
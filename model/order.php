<?php
define('RUTA_CLASS', dirname(dirname(__FILE__))); 
require_once RUTA_CLASS."/class/Order-class.php";
require_once RUTA_CLASS."/class/Carrito-class.php";

//Intancia
$cart = new Carrito();
$order = new Order();

$id = $_POST['idusuario'];
$formaDePago = $_POST['pago'];

$data = $cart->cartProductList($id);
$idorder = $order->orderRegistrar($id,$formaDePago,'PENDIENTE',date("Y-m-d H:i:s"));
foreach ($data as $key=>$valor){   
    $order->orderRegistrarItem($idorder,$valor['product_id'],$valor['price'],$valor['quantity']);
}

//$cart->deleteCartByUser($id);

?>
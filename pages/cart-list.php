<?php 
define('RUTA_CLASS', dirname(dirname(__FILE__)));
require_once RUTA_CLASS."/class/Carrito-class.php";
$shoppingCart = new Carrito();

$idproducto = isset($_POST['idproducto']) ? $_POST['idproducto'] : '';
$cantidad = isset($_POST['cantidad']) ? $_POST['cantidad'] : '';
$usuario = isset($_POST['usuario']) ? $_POST['usuario'] : '';

$insert= $shoppingCart->addToCart($idproducto,$cantidad,$usuario);

if($insert){
    echo "Se agrego al carrito";
    return;
}
echo "No se agrego error!";
?>
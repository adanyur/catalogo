<?php
define('__RUTA__', dirname(dirname(__FILE__)));
require_once __RUTA__."/Controller/ProductoController.php";
$productoController = new ProductoController();


$idshow = isset($_GET['idshow'])? $_GET['idshow']:null;
$method = isset($_POST['method'])? $_POST['method']:null;

$id = isset($_POST['id'])? $_POST['id']:null;
$name = isset($_POST['name'])? $_POST['name']:null;
$image = isset($_FILES["image"])? $_FILES["image"]:null;
$detalil1 = isset($_POST['detalil1'])? $_POST['detalil1']:null;
$detalil2 = isset($_POST['detalil2'])? $_POST['detalil2']:null;
$code='prueba_01';
$price = isset($_POST['price'])? $_POST['price']:null;
$category = isset($_POST['category'])? $_POST['category']:null;
$REQUEST_METHOD = $method ? $method:$_SERVER['REQUEST_METHOD'];

switch ($REQUEST_METHOD) {
    case 'POST':
        return die($productoController->store($name,$code,$image,$price,$detalil1,$detalil2,$category));  
        break;
    case 'GET':
        if(!isset($_GET['idshow'])){
            return die($productoController->index());  

        }else{
            return die($productoController->show($idshow));
        }

        break;    
    case 'PUT':
        return die($productoController->update($name,$code,$image,$price,$detalil1,$detalil2,$category,$id));
        break;   
    case 'DELETE':
        return die($productoController->delete($id));
        break;
    default:
        
}




?>
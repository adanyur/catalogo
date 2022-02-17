<?php
define('RUTA_CLASS', dirname(dirname(__FILE__))); 
require_once RUTA_CLASS."/class/Favorite-class.php"; 
$favorite = new Favorite();


$codigoProducto=isset($_POST['codigoProducto'])?$_POST['codigoProducto']:'';
$method=isset($_POST['methods'])?$_POST['methods']:'';
$idUser=isset($_POST['idUser'])?$_POST['idUser']:'';
$id=isset($_POST['id'])?$_POST['id']:'';
$idUserGet=isset($_GET['id'])?$_GET['id']:'';

$REQUEST_METHOD = $method ? $method:$_SERVER['REQUEST_METHOD'];

switch ($REQUEST_METHOD) {
    case 'POST':
        return die($favorite->addFavorite($codigoProducto,$idUser));  
        break;
    case 'GET':
        return die($favorite->getFavoriteById($idUserGet));
        break;    
    case 'DELETE':
        if(isset($_POST['id'])){
            return die($favorite->deleteFavorite($id));
        }else{
            return die($favorite->deleteFavoriteCheck($idUser,$codigoProducto));
        }
        break;
    default:       
}


?>
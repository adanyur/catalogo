<?php
define('__RUTA__', dirname(dirname(__FILE__)));
require_once __RUTA__."/Controller/CategoriaController.php";
$categoria = new CategoriaController();


$idshow = isset($_GET['idshow'])? $_GET['idshow']:null; 
$id = isset($_POST['id'])? $_POST['id']:null;
$name = isset($_POST['name'])? $_POST['name']:null;
$image = isset($_FILES['image'])?$_FILES['image']:null;
$method =isset($_POST['method'])? $_POST['method']:null;
$REQUEST_METHOD = $method ? $method:$_SERVER['REQUEST_METHOD'];

switch ($REQUEST_METHOD) {
    case 'POST':
        return die($categoria->store($name,$image));  
        break;
    case 'GET':
        if(!isset($_GET['idshow'])){
            return die($categoria->index());
        }else{
            return die($categoria->show($idshow));
        }
        break;    
    case 'PUT':
        return die($categoria->update($name,$image,$id));
        break;
    case 'DELETE':
        return die($categoria->delete($id));
        break;    
    default:
        return die($categoria->index());
        break;
}

?>
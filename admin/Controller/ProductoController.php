<?php
define('__RUTA__model', dirname(dirname(__FILE__)));
require_once __RUTA__model."/Model/ProductoModel.php";

class ProductoController extends ProductoModel{

     
    function index(){
        $producto = new ProductoModel();
        return json_encode($producto->getProductAll());
    }

    function store($name,$code,$image=array(),$price,$detalil1,$detalil2,$categoria){
        $producto = new ProductoModel();
        $id = $producto->postAddProduct($name,$code,$image,$price,$detalil1,$detalil2,$categoria);    
        if($id>0){
            $this->uploadimage($image);  
        }
        $message = array(); 
        $message[] = array('status'=>true,'message'=> 'Se grabo correctamente');
        return json_encode($message);
    }

    function show($id){
        $producto = new ProductoModel();
        return json_encode($producto->getCategoriaById($id));    
    }

    function update($name,$code,$image,$price,$detalil1,$detalil2,$category,$id){
        $producto = new ProductoModel();
        return json_encode($producto->putEdiProduct($name,$code,$image,$price,$detalil1,$detalil2,$category,$id));    
    }

    function delete($id){
        $producto = new ProductoModel();
        return json_encode($producto->deleteCategoria($id));    
    }

    function uploadimage($image=array()){
        // $validextensions = array("jpeg", "jpg", "png");
        // $temporary = explode(".", $_FILES["file"]["name"]);
        // $file_extension = end($temporary);
        $sourcePath = $image['tmp_name'];
        $targetPath = '../../assets/img/'.$image['name'];
        move_uploaded_file($sourcePath,$targetPath); 
    }

}













?>
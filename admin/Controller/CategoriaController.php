<?php
define('__RUTA__model', dirname(dirname(__FILE__)));
require_once __RUTA__model."/Model/CategoriaModel.php";


class CategoriaController extends CategoriaModel{
     
     
    function index(){
        $categoria = new CategoriaModel();
        return json_encode($categoria->getCategoriatAll());
    }

    function store($name,$image=array()){
        $categoria = new CategoriaModel();               
        $id =  $categoria->postAddCategory($name,$image);
        if($id>0){
            $this->uploadimage($image);  
        }

        $message = array(); 
        $message[] = array('status'=>true,'message'=> 'Se grabo correctamente');
        return json_encode($message);
    }

    function show($id){
        $categoria = new CategoriaModel();
        return json_encode($categoria->getCategoriaById($id));    
    }

    function update($name,$image,$id){
        $categoria = new CategoriaModel();
        return json_encode($categoria->putCategoria($name,$image,$id));    
    }

    function delete($id){
        $categoria = new CategoriaModel();
        return json_encode($categoria->deleteCategoria($id));    
    }

    function uploadimage($image=array()){
        $validextensions = array("jpeg", "jpg", "png");
        // $temporary = explode(".", $image['name']);
        // $file_extension = end($temporary);
        $sourcePath = $image['tmp_name'];
        $targetPath = '../../assets/img/category/'.$image['name'];
        move_uploaded_file($sourcePath,$targetPath); 
    }

}




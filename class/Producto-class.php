<?php
define('RUTA_PRODUCTO', dirname(dirname(__FILE__)));
require_once RUTA_PRODUCTO."/config/DBController.php";

class Producto extends DBController
{

    function getAllProduct()
    {
        $query = "SELECT * FROM tbl_product";
        $productResult = $this->getDBResult($query);
        return $productResult;
    }

    function getProductById($idProduct){
        $query = "SELECT * FROM tbl_product where id=?";
        $params = array(array("param_type" => "s","param_value" => $idProduct));    
        
        return $this->getDBResult($query, $params);
    }

    function getProductImagen($idProduct){
        $query = "SELECT * FROM tbl_imagen where idproduct=?";
        $params = array(array("param_type" => "s","param_value" => $idProduct));    
        
        return $this->getDBResult($query, $params);
    }

}

<?php
define('RUTA', dirname(dirname(dirname(__FILE__))));
require_once RUTA."/config/DBController.php";

class ProductoModel extends DBController{

   function getProductAll(){
   $query ="
        SELECT a.name AS nameproducto,
                b.name AS namecategory,    
                price,
                category,
                a.id,
                a.image
        FROM tbl_product a
        JOIN tbl_category b ON (a.category=b.id)";
        return $this->getDBResult($query);;
   } 

   function getCategoriaById($idCategoria){
        $query = "SELECT * FROM tbl_product where id=?";
        $params = array(array("param_type" => "s","param_value" => $idCategoria));    
        return $this->getDBResult($query, $params);
    }


   function postAddProduct($name,$code,$image=array(),$price,$detail1,$detail2,$category){
        $imageRuta='../assets/img/'.$image["name"];
       $query = "INSERT INTO tbl_product (name,code,image,price,detail1,detail2,category) VALUES ('$name','$code','$imageRuta', $price,'$detail1','$detail2','$category')";
       return $this->insertDB2($query);
   }


   function putEdiProduct($name,$code,$image,$price,$detalil1,$detalil2,$category,$id){
      $query = "UPDATE tbl_product SET name='$name',image='$image',price=$price,detail1='$detalil1',detail2='$detalil2',
                category='$category',code='$code'
                WHERE  id=?";

      $params = array(
        array(
            "param_type" => "i",
            "param_value" => $id
            )
        );
    return $this->updateDB($query,$params);

   }


   function deleteCategoria($id){
        $query ="DELETE FROM tbl_product WHERE id=?";
        $params = array(
            array(
                "param_type" => "i",
                "param_value" => $id
            )
        );
        return $this->deleteDB($query, $params);
   }



}

?>
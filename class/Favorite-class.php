<?php
define('RUTA', dirname(dirname(__FILE__)));
require_once RUTA."/config/DBController.php";

class Favorite extends DBController
{   

    function getFavoriteById($idUser){
        $query = "SELECT
                        	b.id as idProducto,
                            b.name as descripcionProducto,
                            b.image as imagenProducto,
                            b.price as precioProducto,
                            a.id as idFavorite
                    FROM
                    tbl_favorite a
                    JOIN tbl_product b ON (a.product_id=b.id) 
                    WHERE  a.user_id=?";

                    $params = array(
                        array(
                            "param_type" => "s",
                            "param_value" => $idUser
                        )
                    );

        return json_encode($this->getDBResult($query,$params));        

    }

    function addFavorite($codigoProducto,$idUser){
        $query = "INSERT INTO tbl_favorite (product_id,user_id) VALUES($codigoProducto,$idUser)";
        return $this->insertDB2($query);
    }

    function deleteFavorite($id){
        $query = "DELETE FROM tbl_favorite where id=?";

        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $id
            )
        );

        return $this->deleteDB($query,$params);
    }

    function deleteFavoriteCheck($idUser,$idProducto){
        $query = "DELETE FROM tbl_favorite WHERE user_id=?  AND product_id=?";

        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $idUser
            ),
            array(
                "param_type" => "s",
                "param_value" => $idProducto
            )
        );

        return $this->deleteDB($query,$params);

    }




}

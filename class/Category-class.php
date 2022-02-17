<?php
define('RUTA_PRODUCTO', dirname(dirname(__FILE__)));
require_once RUTA_PRODUCTO."/config/DBController.php";

class Category extends DBController
{

    function getAllCategory()
    {
        $query = "SELECT * FROM tbl_category";
        $productResult = $this->getDBResult($query);
        return $productResult;
    }

    function getCategoryProductById($id)
    {
        $query = "SELECT b.*
                      FROM tbl_category a
                      JOIN tbl_product b ON (a.id = b.category)
                      WHERE  a.id= ?";

        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $id
            )
        );

        $categoryProduct = $this->getDBResult($query, $params);
        return $categoryProduct;
    }

}

<?php
define('RUTA', dirname(dirname(__FILE__)));
require_once RUTA."/config/DBController.php";

class Carrito extends DBController
{   

    function getAllCarrito()
    {
        $query = "SELECT * FROM tbl_cart";
        $productResult = $this->getDBResult($query);
        return $productResult;
    }

    function getCarritoByCode($id)
    {
        $query = "SELECT * FROM tbl_cart WHERE member_id=?";

        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $id
            )
        );

        $productResult = $this->getDBResult($query, $params);
        return $productResult;
    }


    function addToCart($product_id, $quantity, $member_id)
    {
        $query = "INSERT INTO tbl_cart (product_id,quantity,member_id) VALUES (?, ?, ?)";
        $params = array(
            array(
                "param_type" => "i",
                "param_value" => $product_id
            ),
            array(
                "param_type" => "i",
                "param_value" => $quantity
            ),
            array(
                "param_type" => "i",
                "param_value" => $member_id
            )
        );
        
        return $this->insertDB($query, $params);
    }

    function  countCarrito($id){
        $query = "SELECT count(*) AS count FROM tbl_cart WHERE member_id=?";
        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $id
            )
        );
        return $this->getDBResult($query, $params);
    }

    function cartProductList($id){
        $query = "SELECT a.id,
                    b.name,
                    b.image,
                    b.price,
                    a.quantity,
                    a.product_id,
                    round(b.price * a.quantity,2) as total
                    from tbl_cart a
                    join tbl_product b on (a.product_id=b.id) 
                    WHERE member_id=?";
        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $id
            )
        );
        return $this->getDBResult($query, $params);
    }

    function deleteCart($id){
        $query ="DELETE FROM tbl_cart WHERE id=?";

        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $id
            )
        );
        return $this->deleteDB($query, $params);
    }

    function deleteCartByUser($id){

        $query ="DELETE FROM tbl_cart WHERE member_id=?";

        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $id
            )
        );
        return $this->deleteDB($query, $params);

    }


    function CalculoCart($id){
        $query = "SELECT 
                    round(sum(b.price * a.quantity),2) as subtotal
                    from tbl_cart a
                    join tbl_product b on (a.product_id=b.id)  
                    WHERE member_id=?";
            $params = array(                
            array(
                "param_type" => "s",
                "param_value" => $id
            ));
            return $this->getDBResult($query, $params);
    }
}

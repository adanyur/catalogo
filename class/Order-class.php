<?php
define('RUTA_PRODUCTO', dirname(dirname(__FILE__)));
require_once RUTA_PRODUCTO."/config/DBController.php";

class Order extends DBController
{


    function orderRegistrar($customer_id,$payment_type,$order_status,$order_at){
        $query = "INSERT INTO tbl_order (customer_id,payment_type,order_status,order_at) VALUES ($customer_id,'$payment_type','$order_status','$order_at')";
            return $this->insertDB2($query);
    }

    function orderRegistrarItem($order_id,$product_id,$item_price,$quantity){
        $query = "INSERT INTO tbl_order_item (order_id,product_id,item_price,quantity) VALUES 
                            ($order_id,'$product_id','$item_price','$quantity')";
            return $this->insertDB2($query);
    }

}
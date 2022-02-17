<?php
define('RUTA', dirname(dirname(dirname(__FILE__))));
require_once RUTA."/config/DBController.php";

class OrderModel extends DBController{

    function getListOrder($fecha ){      
        $query = "SELECT 
                  a.id,   
                  b.Firstname as client,
		          a.payment_type,a.order_status,
		          cast(order_at as date) as fecha
                  from tbl_order a
                 join tbluser b on(a.customer_id =b.id)
                 where cast(order_at as date)=?";
        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $fecha
            )
        );

        return json_encode($this->getDBResult($query, $params));

    }

    function getOrderById($id){
        $query = "SELECT a.order_id as idOrder,a.id,b.name,b.price,b.image,a.quantity,
                 (a.quantity * b.price)as total
        from tbl_order_item a
        join tbl_product b on (a.product_id=b.id)
        where order_id = ?";

        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $id
            )
        );

        return json_encode($this->getDBResult($query, $params));
    }

    function countOrder(array $params){

       $query="SELECT order_status AS status,COUNT(*)AS cantidad
                FROM tbl_order a
                WHERE CAST(a.order_at AS date)=?
                AND  order_status=?
                group by order_status
                ";

        $params = array(
            array(
                "param_type" => "s",
                "param_value" => $params['fecha']
            ),
            array(
                "param_type" => "s",
                "param_value" => $params['status']
            )
        );

        return json_encode($this->getDBResult($query, $params));


    }


    function updateStatus($id){
        $query = "UPDATE tbl_order SET order_status='ATENDIDO' WHERE id =?";
        $params = array(
            array(
                "param_type" => "i",
                "param_value" => $id
                )
            );

        return $this->updateDB($query,$params);
    }

}


 
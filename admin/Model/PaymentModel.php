<?php
define('RUTA', dirname(dirname(dirname(__FILE__))));
require_once RUTA."/config/DBController.php";



class PaymentModel extends DBController{

    function salesTotal(){ 

        $query = "SELECT  type_payment AS wayToPay, 
		         sum(venta) AS salesTotal
                FROM tbl_payment_detail
                GROUP BY type_payment
                UNION ALL
                SELECT 'TOTAL',
                        sum(venta) AS salesTotal
                FROM tbl_payment_detail";

        $params = array();

        return json_encode($this->getDBResult($query, $params));

    }


    function topProduct(){
       $query="
       select c.image,c.name,count(c.name) as count,b.item_price as price
       from tbl_order a
       join tbl_order_item b on (a.id=b.order_id)
       join tbl_product c on (b.product_id=c.id)
       group by c.image,c.name,b.item_price
       order by 1";

        $params = array();

        return json_encode($this->getDBResult($query, $params));
    }



 
 }


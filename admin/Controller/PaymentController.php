<?php
define('__RUTA__model', dirname(dirname(__FILE__)));
require_once __RUTA__model."/Model/PaymentModel.php";


class PaymentController extends PaymentModel{

    function SalesTotal(){
        $payment = new PaymentModel();
        $data = $payment->salesTotal();
        return json_encode(array('status'=>true,'data'=>$data));
    }

    function topProduct(){
        $payment = new PaymentModel();
        $data = $payment->topProduct();
        return json_encode(array('status'=>true,'data'=>$data));
    }


}
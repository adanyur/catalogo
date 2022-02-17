<?php
    define('__RUTA__', dirname(dirname(__FILE__)));
    require_once __RUTA__."/Controller/PaymentController.php";
    $payment = new PaymentController();

    $consulta = $_GET['consulta'];


    switch ($consulta) {
        case 'TOTALES':
            return die($payment->SalesTotal());
            break;
        case 'TOP':
            return die($payment->topProduct());
            break;            
    }


    
?>
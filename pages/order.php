<?php 
define('RUTA_CLASS', dirname(dirname(__FILE__))); 
require_once  RUTA_CLASS.'/include/head.php';
?>
<div class="container-content">
    <div id="cartProductList"></div>
    <div class="container-button">
        <button class="btn-add btn-payment">
            <span id="subtotal" class="info-payment"></span> |
            <span class="info-payment">payment</span>
        </button>
    </div>
</div>
<?php require_once  RUTA_CLASS.'/include/footer.php'?>
<?php require_once  RUTA_CLASS.'/include/modal.php'?>
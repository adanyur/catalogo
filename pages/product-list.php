<?php
define('RUTA_CLASS', dirname(dirname(__FILE__))); 
require_once  RUTA_CLASS.'/include/head.php';
require_once  RUTA_CLASS.'/include/nav.php';
require_once RUTA_CLASS."/class/Producto-class.php";
?>
<div class="container-imgen" id="listCategory"></div>
<div id="searchCategoryProduct"></div>
<div id="listAll">
<div class="container-content">
<?php 
$shoppingCart = new Producto();
$product_array = $shoppingCart->getAllProduct();
foreach ($product_array as $key => $value) {
?>
<div class="card mb-4 card-shadow card-width card-position">
  <img class="card-img-top img-border-radius" src="<?=$product_array[$key]["image"];?>" alt="Card image cap">
  <div class="card-body">
      <div class="card-info">
         <div class="info-title">
            <?=$product_array[$key]["name"];?>
         </div>
         <div class="info-price-quanty">
            <div class="info-price">
              Unidad $<?=$product_array[$key]["price"];?>
            </div>
            <!--div class="info-quanty">
               <input type="number" id="quantity<?=$product_array[$key]["id"];?>" name="quantity"  value=1 class="input-control quantity<?=$product_array[$key]["id"];?>">
            </div-->
      </div>
	   <input type="hidden" id="idproduct<?=$product_array[$key]["id"];?>" name="id" value="<?=$product_array[$key]["id"];?>">	   
      </div>
      <div class="container-button">
            <!--button  type="button" id="product<?=$product_array[$key]['id'];?>" onclick="AddCart(<?=$product_array[$key]['id'];?>)" class="btn-add button-add-product">
               <img src="../assets/icon/add-to-cart.svg" class="img-icon">
            </button-->
            <button  type="button" id="product<?=$product_array[$key]['id'];?>" onclick="viewDetail(<?=$product_array[$key]['id'];?>)" class="btn-add btn-secondary-product">
               <img src="../assets/icon/loupe.svg" class="img-icon">
            </button>
      </div>
  </div>
  <div class="icon-favorite" >
      <label for="favorite<?=$product_array[$key]['id'];?>">
         <div id="image-favorite-chance<?=$product_array[$key]['id'];?>"></div>
         <img src="../assets/icon/star.svg" 
              class="image-icon-favorite-success" 
              id="image-favorite-default<?=$product_array[$key]['id'];?>">
      </label>
      <input type="checkbox" 
             id="favorite<?=$product_array[$key]['id'];?>"  
             onclick="favorite(<?=$product_array[$key]['id'];?>,event.target.checked)">
  </div>
</div>
<?php } ?>
</div>
</div>

<?php require_once  RUTA_CLASS.'/include/modal.php'?>
<?php require_once  RUTA_CLASS.'/include/footer.php'?>

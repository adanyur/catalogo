<?php
define('RUTA_CLASS', dirname(dirname(__FILE__))); 
require_once  RUTA_CLASS.'/include/head.php';
?>
    <div class="container-form container-form-login">       
            <div class="card-form">
                <form >
                    <h1 class="form-title">Sign un</h1>
                    <div class="group-form">
                        <input type="text" id="user" class="form-input" placeholder=" ">
                        <label class="label-control">Email</label>
                    </div>
                    <div class="group-form">
                        <input type="text" id="password" class="form-input" placeholder=" ">
                        <label class="label-control">Password</label>
                    </div>
                    <div class="group-form">
                        <button type="button" onclick="login()" class="btn-login">Sign un</button>
                    </div>
                </form>
                <div class="group-form">
                        <a class="link" href="index.php?action=registrar" >Registrarse</a>
                </div>
            </div>
    </div>
<?php require_once  RUTA_CLASS.'/include/footer.php'?>
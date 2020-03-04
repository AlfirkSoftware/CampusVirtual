<?php

require_once '../util/functions/Helper.class.php';
require_once '../logic/Usuario.class.php';


//Haciendo lectura de la variable $_POST["dniUsuarioSesion"] que viene del archivo perfil.usuario.view.php
//$dni = $_POST["dniUsuarioSesion"];
$dni = $_POST["s_usuario"];

try {
    $objUsuario = new Usuario();
    $resultado = $objUsuario->leerDatos($dni);
    
//    echo '<pre>';
//    print_r($resultado);
//    echo '</pre>';
    
} catch (Exception $exc) {
    Helper::mensaje($exc->getMessage(), "e");
}


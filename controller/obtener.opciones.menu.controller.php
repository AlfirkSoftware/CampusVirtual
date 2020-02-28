<?php

require_once '../logic/Sesion.class.php';
require_once '../util/functions/Helper.class.php';

try {
    
    /*Recibir la variable POST que le envía la vista*/
    $codigoCargo = $_POST["codigo_cargo_usuario"];
    /*Recibir la variable POST que le envía la vista*/
//    print_r($s_codigoCargo);
    $objSesion = new Sesion();
    $resultadoOpcionesMenuBD = $objSesion->obtenerOpcionesMenu($codigoCargo);
            
} catch (Exception $exc) {
    Helper::mensaje($exc->getMessage(), "e");
}

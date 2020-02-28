<?php

require_once '../logic/Parametro.class.php';
require_once '../util/functions/Helper.class.php';

try {
    $obj = new Parametro();
    if 
        (
            !isset($_POST["p_cod_par"]) ||
            empty($_POST["p_cod_par"]) 
            
                    
        )
    {
            Helper::imprimeJSON(500, "Falta completar datos", "");
            exit();
    }
    
    $p_cod_par = $_POST["p_cod_par"];
    
    $resultado = $obj->obtenerValorParametro($p_cod_par);
    Helper::imprimeJSON(200, "", $resultado);
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}


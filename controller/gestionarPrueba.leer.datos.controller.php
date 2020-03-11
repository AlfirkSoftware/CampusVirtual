<?php

try {
    require_once '../logic/Prueba.class.php';
    require_once '../util/functions/Helper.class.php';
    
    if 
        (
            !isset($_POST["p_codigo_prueba"]) ||
            empty($_POST["p_codigo_prueba"])
            
        )
    {
            Helper::imprimeJSON(500, "Falta completar datos", "");
            exit();
    }
    
    $codCodigo = $_POST["p_codigo_prueba"];
    
    $objPrueba = new Prueba();
    $resultado = $objPrueba->leerDatos($codCodigo);
    
    Helper::imprimeJSON(200, "", $resultado);
    
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}



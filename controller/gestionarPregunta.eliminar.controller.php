<?php

try {
    require_once '../logic/Pregunta.class.php';
    require_once '../util/functions/Helper.class.php';
    
    if 
        (
            !isset($_POST["p_codigo_pregunta"]) ||
            empty($_POST["p_codigo_pregunta"])
            
        )
    {
            Helper::imprimeJSON(500, "Falta completar datos", "");
            exit();
    }
    
    $codPregunta = $_POST["p_codigo_pregunta"];
    
    $objPregunta = new Pregunta();
    $objPregunta->setPregunta_id($codPregunta);
    $resultado = $objPregunta->eliminar();
    
    if ($resultado){
        Helper::imprimeJSON(200, "Se eliminó correctamente", "");
    }
    
    
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}



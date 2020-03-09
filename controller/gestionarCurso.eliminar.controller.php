<?php

try {
    require_once '../logic/Curso.class.php';
    require_once '../util/functions/Helper.class.php';
    
    if 
        (
            !isset($_POST["p_codigo_curso"]) ||
            empty($_POST["p_codigo_curso"])
            
        )
    {
            Helper::imprimeJSON(500, "Falta completar datos", "");
            exit();
    }
    
    $codCurso = $_POST["p_codigo_curso"];
    
    $objCurso= new Curso();
    $objCurso->setCodigo_curso($codCurso);
    $resultado = $objCurso->eliminar();
    
    if ($resultado){
        Helper::imprimeJSON(200, "Se eliminó correctamente", "");
    }
    
    
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}



<?php

try {

    require_once '../logic/Pregunta.class.php';
    require_once '../util/functions/Helper.class.php';

    if
    (
            //!isset($_POST["p_pregunta_id"]) ||
           //empty($_POST["p_pregunta_id"]) ||

            !isset($_POST["p_curso_id"]) ||
            empty($_POST["p_curso_id"]) ||

            !isset($_POST["p_descripcion"]) ||
            empty($_POST["p_descripcion"]) ||

            !isset($_POST["p_respuesta"]) ||
            empty($_POST["p_respuesta"]) ||            
            
            !isset($_POST["p_tipo_ope"]) ||
            empty($_POST["p_tipo_ope"])
    ) {
        Helper::imprimeJSON(500, "Falta completar datos", "");
        exit();
    }
    // $Pregunta_id       = $_POST["p_pregunta_id"];
     $Nombre_pregunta   = $_POST["p_descripcion"];
     $Respuesta         = $_POST["p_respuesta"];
     $Curso_id          = $_POST["p_curso_id"];     
     
     $tipoOperacion = $_POST["p_tipo_ope"];

    $objPregunta = new Pregunta();

    if ($tipoOperacion == "agregar") {
        //$objPregunta->setPregunta_id($Pregunta_id);
        $objPregunta->setNombre_pregunta($Nombre_pregunta);
        $objPregunta->setRespuesta($Respuesta);
        $objPregunta->setCurso_id($Curso_id);
        
        $resultado = $objPregunta->agregar();
        if ($resultado) {
            Helper::imprimeJSON(200, "Agregado correctamente", "");
        }
    } else { //Editar
        if (
                !isset($_POST["p_codigo_pregunta"]) ||
                empty($_POST["p_codigo_pregunta"])
        ) {
            Helper::imprimeJSON(500, "Falta completar datos para editar", "");
            exit();
        }

        $codigo = $_POST["p_codigo_pregunta"];
        $objPregunta->setPregunta_id($codigo);
        
        $objPregunta->setNombre_pregunta($Nombre_pregunta);
        $objPregunta->setRespuesta($Respuesta);
        $objPregunta->setCurso_id($Curso_id);

        $resultado = $objPregunta->editar();
        if ($resultado) {
            Helper::imprimeJSON(200, "Agregado correctamente", "");
        }
    }
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}

<?php

try {

    require_once '../logic/Curso.class.php';
    require_once '../util/functions/Helper.class.php';

    if
    (
            !isset($_POST["p_nombre_curso"]) ||
            empty($_POST["p_nombre_curso"]) ||
            
            !isset($_POST["p_tipo_ope"]) ||
            empty($_POST["p_tipo_ope"])
    ) {
        Helper::imprimeJSON(500, "Falta completar datos", "");
        exit();
    }
     $nombre_curso = $_POST["p_nombre_curso"];
    $tipoOperacion = $_POST["p_tipo_ope"];

    $objCurso = new Curso();

    if ($tipoOperacion == "agregar") {
        $objCurso->setNombre_curso($nombre_curso);
        $resultado = $objCurso->agregar();
        if ($resultado) {
            Helper::imprimeJSON(200, "Agregado correctamente", "");
        }
    } else { //Editar
        if (
                !isset($_POST["p_codigo_curso"]) ||
                empty($_POST["p_codigo_curso"])
        ) {
            Helper::imprimeJSON(500, "Falta completar datos para editar", "");
            exit();
        }

        $codigo = $_POST["p_codigo_curso"];
        $objCurso->setCodigo_curso($codigo);
        $objCurso->setNombre_curso($nombre_curso);
        $resultado = $objCurso->editar();
        if ($resultado) {
            Helper::imprimeJSON(200, "Agregado correctamente", "");
        }
    }
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}

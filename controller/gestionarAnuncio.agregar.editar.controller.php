<?php

try {

    require_once '../logic/Anuncio.class.php';
    require_once '../util/functions/Helper.class.php';

    if
    (
            !isset($_POST["p_titulo"]) ||
            empty($_POST["p_titulo"]) ||

            !isset($_POST["p_tipoAnuncio"]) ||
            empty($_POST["p_tipoAnuncio"]) ||

            !isset($_POST["p_descripcion"]) ||
            empty($_POST["p_descripcion"]) ||
            
            !isset($_POST["p_tipo_ope"]) ||
            empty($_POST["p_tipo_ope"])
    ) {
        Helper::imprimeJSON(500, "Falta completar datos", "");
        exit();
    }
    $titulo         = $_POST["p_titulo"];
    $tipoAnuncio    = $_POST["p_tipoAnuncio"];
    $descripcion    = $_POST["p_descripcion"];
    $tipoOperacion  = $_POST["p_tipo_ope"];

    $objAnuncio = new Anuncio();

    if ($tipoOperacion == "agregar") {
        $objAnuncio->setTitulo_evento($titulo);
        $objAnuncio->setTipo_anuncio($tipoAnuncio);
        $objAnuncio->setDescripcion_evento($descripcion);
        $resultado = $objAnuncio->agregar();
        if ($resultado) {
            Helper::imprimeJSON(200, "Agregado correctamente", "");
        }
    } else { //Editar
        if (
                !isset($_POST["p_cod_anuncio"]) ||
                empty($_POST["p_cod_anuncio"])
        ) {
            Helper::imprimeJSON(500, "Falta completar datos para editar", "");
            exit();
        }

        $codigo = $_POST["p_cod_anuncio"];
        $objAnuncio->setAnuncio_id($codigo);
        $objAnuncio->setTitulo_evento($titulo);
        $objAnuncio->setTipo_anuncio($tipoAnuncio);
        $objAnuncio->setDescripcion_evento($descripcion);
        $resultado = $objAnuncio->editar();
        if ($resultado) {
            Helper::imprimeJSON(200, "Agregado correctamente", "");
        }
    }
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}

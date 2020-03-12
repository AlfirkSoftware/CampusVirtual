<?php

require_once '../logic/Pregunta.class.php';
require_once '../util/functions/Helper.class.php';

try {
    $objPregunta = new Pregunta();
    $resultado = $objPregunta->listar();
    Helper::imprimeJSON(200, "", $resultado);
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}


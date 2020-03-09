<?php

require_once '../logic/Curso.class.php';
require_once '../util/functions/Helper.class.php';

try {
    $objCurso = new Curso();
    $resultado = $objCurso->listar();
    Helper::imprimeJSON(200, "", $resultado);
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}


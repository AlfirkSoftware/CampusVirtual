<?php
    
    try {

    require_once '../logic/Usuario.class.php';
    require_once '../util/functions/Helper.class.php';

    if
    (
            !isset($_POST["p_doc_ident"]) ||
            empty($_POST["p_doc_ident"]) ||
            
            !isset($_POST["p_nombres"]) ||
            empty($_POST["p_nombres"]) ||
            
            !isset($_POST["p_apellidos"]) ||
            empty($_POST["p_apellidos"]) ||
            
            !isset($_POST["p_direccion"]) ||
            empty($_POST["p_direccion"]) ||
            
            !isset($_POST["p_email"]) ||
            empty($_POST["p_email"]) ||
            
            !isset($_POST["p_telefono"]) ||
            empty($_POST["p_telefono"]) ||
            
            !isset($_POST["p_sexo"]) ||
            empty($_POST["p_sexo"]) ||
            
            !isset($_POST["p_edad"]) ||
            empty($_POST["p_edad"]) ||
            
            !isset($_POST["p_cargo"]) ||
            empty($_POST["p_cargo"]) ||
            
            !isset($_POST["p_contrasenia"]) ||
            empty($_POST["p_contrasenia"]) ||
            
            !isset($_POST["p_tipo"]) ||
            empty($_POST["p_tipo"]) ||
            
            !isset($_POST["p_estado"]) ||
            empty($_POST["p_estado"]) ||
            
         //   !isset($_POST["p_cuenta"]) ||
        //    empty($_POST["p_cuenta"]) ||
            
            !isset($_POST["p_tipo_ope"]) ||
            empty($_POST["p_tipo_ope"])
    ) 
        {
        Helper::imprimeJSON(500, "Falta completar datos", "");
        exit();
    }

    $Dni                = $_POST["p_doc_ident"];
    $Nombres            = $_POST["p_nombres"];
    $Apellidos          = $_POST["p_apellidos"];
    $Direccion          = $_POST["p_direccion"];
    $Email              = $_POST["p_email"];
    $Telefono           = $_POST["p_telefono"];
    $Sexo               = $_POST["p_sexo"];
    $Edad               = $_POST["p_edad"];
    $Cargo              = $_POST["p_cargo"];
    $Constrasenia       = $_POST["p_contrasenia"];
    $Tipo               = $_POST["p_tipo"];
    $Estado             = $_POST["p_estado"];
    //$Cuenta             = $_POST["p_cuenta"];
    $tipoOperacion      = $_POST["p_tipo_ope"];

    $objUsuario = new Usuario();

    if ($tipoOperacion == "agregar") {
        $objUsuario->setDni($Dni);
        $objUsuario->setNombres($Nombres);
        $objUsuario->setApellidos($Apellidos);
        $objUsuario->setDireccion($Direccion);
        $objUsuario->setEmail($Email);
        $objUsuario->setTelefono($Telefono);
        $objUsuario->setSexo($Sexo);
        $objUsuario->setEdad($Edad);
        $objUsuario->setCargo($Cargo);
        $objUsuario->setConstrasenia($Constrasenia);
        $objUsuario->setTipo($Tipo);
        $objUsuario->setEstado($Estado);
        //$objUsuario->setCuenta($Cuenta);
        $resultado = $objUsuario->agregar();
        if ($resultado) {
            Helper::imprimeJSON(200, "Agregado correctamente", "");
        }
    } else 
        { //Editar
            if (
                    !isset($_POST["p_cod_usuario"]) ||
                    empty($_POST["p_cod_usuario"])
            ) {
                Helper::imprimeJSON(500, "Falta completar datos para editar", "");
                exit();
            }

            //$codigo = $_POST["p_cod_usuario"];
            $objUsuario->setDni($Dni);
            $objUsuario->setNombres($Nombres);
            $objUsuario->setApellidos($Apellidos);
            $objUsuario->setDireccion($Direccion);
            $objUsuario->setEmail($Email);
            $objUsuario->setTelefono($Telefono);
            $objUsuario->setSexo($Sexo);
            $objUsuario->setEdad($Edad);
            $objUsuario->setCargo($Cargo);
            $objUsuario->setConstrasenia($Constrasenia);
            $objUsuario->setTipo($Tipo);
            $objUsuario->setEstado($Estado);
            
            $resultado = $objUsuario->editar();
            if ($resultado) {
                Helper::imprimeJSON(200, "Agregado correctamente", "");
            }
        }
} catch (Exception $exc) {
    Helper::imprimeJSON(500, $exc->getMessage(), "");
}



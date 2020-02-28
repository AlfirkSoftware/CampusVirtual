<?php

require_once '../data/Conexion.class.php';

class Cargo extends Conexion {
    
    public function listar() {
        try {
            $sql = "select * from cargo order by 2";
            $sentencia = $this->dbLink->prepare($sql);
            $sentencia->execute();
            $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (Exception $exc) {
            throw $exc;
        }
    }
    
}

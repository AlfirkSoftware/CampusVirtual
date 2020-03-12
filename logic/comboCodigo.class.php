<?php

require_once '../data/Conexion.class.php';

class comboCodigo extends Conexion {

    private $CodigoCurso;
    //private $CodigoFormacion;
    
    public function getCodigoCurso() {
        return $this->CodigoCurso;
    }
/*
    public function getCodigoFormacion() {
        return $this->codigoFormacion;
    }
*/
    public function setCodigoCurso($CodigoCurso) {
        $this->CodigoCurso = $CodigoCurso;
    }
/*
    public function setCodigoFormacion($codigoFormacion) {
        $this->codigoFormacion = $codigoFormacion;
    }

  */  
    public function cargarDatos_CodigoCurso($codigo_curso) {
        try {
            $sql = "select 
                        curso_id,
                        nombre_curso
                    from 
                        curso 
                    where 
                        curso_id = :p_curso_id";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_curso_id", $codigo_curso);
            $sentencia->execute();
            $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function cargarDatos_CodigoCursoPregunta() {
        try {
            $sql = "select                         
                        c.curso_id,
                        c.nombre_curso
                    from 
                        curso c inner join prueba p
                    on
                        c.curso_id = p.curso_id 
                    order by 
                            1";
            $sentencia = $this->dblink->prepare($sql);
           // $sentencia->bindParam(":p_curso_id", $codigo_curso);
            $sentencia->execute();
            $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (Exception $exc) {
            throw $exc;
        }
    }
    
}

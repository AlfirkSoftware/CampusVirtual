<?php

require_once '../data/Conexion.class.php';

class Prueba extends Conexion {

    private $Prueba_id;
    private $Curso_id;
    private $CantPregunta;
    private $Tiempo;
    private $Puntaje;
    private $Instrucciones;

    public function getPrueba_id() {
        return $this->Prueba_id;
    }

    public function getCurso_id() {
        return $this->Curso_id;
    }

    public function getCantPregunta() {
        return $this->CantPregunta;
    }

    public function getTiempo() {
        return $this->Tiempo;
    }

    public function getPuntaje() {
        return $this->Puntaje;
    }

    public function getInstrucciones() {
        return $this->Instrucciones;
    }

    public function setPrueba_id($Prueba_id) {
        $this->Prueba_id = $Prueba_id;
    }

    public function setCurso_id($Curso_id) {
        $this->Curso_id = $Curso_id;
    }

    public function setCantPregunta($CantPregunta) {
        $this->CantPregunta = $CantPregunta;
    }

    public function setTiempo($Tiempo) {
        $this->Tiempo = $Tiempo;
    }

    public function setPuntaje($Puntaje) {
        $this->Puntaje = $Puntaje;
    }

    public function setInstrucciones($Instrucciones) {
        $this->Instrucciones = $Instrucciones;
    }

    public function agregar() {
        $this->dblink->beginTransaction();

        try {
            $sql = "select * from f_generar_correlativo('prueba') as nc";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->execute();

            if ($sentencia->rowCount()) {
                $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
                $nuevoCodigo = $resultado["nc"];
                $this->setCodigo_curso($nuevoCodigo);

                /* Insertar en la tabla laboratorio */
                $sql = "
                    INSERT INTO prueba(
                                            prueba_id, 
                                            cant_preguntas,
                                            tiempo_prueba,
                                            puntaje_aprobacion,
                                            instrucciones,
                                            curso_id
                                            )
                    VALUES (
                            :p_prueba_id, 
                            :p_cant_preguntas,
                            :p_tiempo_prueba,
                            :p_puntaje_aprobacion,
                            :p_instrucciones,
                            :p_curso_id
                            );

                    ";
                $sentencia = $this->dblink->prepare($sql);
                $sentencia->bindParam(":p_prueba_id", $this->getPrueba_id());
                $sentencia->bindParam(":p_cant_preguntas", $this->getCantPregunta());
                $sentencia->bindParam(":p_tiempo_prueba", $this->getTiempo());
                $sentencia->bindParam(":p_puntaje_aprobacion", $this->getPuntaje());
                $sentencia->bindParam(":p_instrucciones", $this->getInstrucciones());
                $sentencia->bindParam(":p_curso_id", $this->getCurso_id());
                $sentencia->execute();
                /* Insertar en la tabla laboratorio */

                /* Actualizar el correlativo */
                $sql = "update correlativo set numero = numero + 1 
                    where tabla='curso'";
                $sentencia = $this->dblink->prepare($sql);
                $sentencia->execute();
                /* Actualizar el correlativo */
                $this->dblink->commit();
                return true;
            } else {
                throw new Exception("No se ha configurado el correlativo para la tabla curso");
            }
        } catch (Exception $exc) {
            $this->dblink->rollBack();
            throw $exc;
        }

        return false;
    }

    public function leerDatos($p_codigoCurso) {
        try {
            $sql = "
                    select * from curso 
                    where curso_id = :p_codigo_curso
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_codigo_curso", $p_codigoCurso);
            $sentencia->execute();
            $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function editar() {
        try {
            $sql = "
                update 
                    curso 
                set  
                    nombre_curso = :p_nombre_curso
                where
                    curso_id = :p_curso_id
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_nombre_curso", $this->getNombre_curso());
            $sentencia->bindParam(":p_curso_id", $this->getCodigo_curso());
            $sentencia->execute();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
        return false;
    }

    public function eliminar() {
        try {
            $sql = "
                delete from 
                    curso 
                where
                    curso_id = :p_curso_id
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_curso_id", $this->getCodigo_curso());
            $sentencia->execute();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
        return false;
    }

}
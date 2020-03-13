<?php

require_once '../data/Conexion.class.php';

class Pregunta extends Conexion {

    private $Pregunta_id;
    private $Nombre_pregunta;
    private $Respuesta;
    private $Curso_id;

    public function getPregunta_id() {
        return $this->Pregunta_id;
    }

    public function getNombre_pregunta() {
        return $this->Nombre_pregunta;
    }

    public function getRespuesta() {
        return $this->Respuesta;
    }

    public function getCurso_id() {
        return $this->Curso_id;
    }

    public function setPregunta_id($Pregunta_id) {
        $this->Pregunta_id = $Pregunta_id;
    }

    public function setNombre_pregunta($Nombre_pregunta) {
        $this->Nombre_pregunta = $Nombre_pregunta;
    }

    public function setRespuesta($Respuesta) {
        $this->Respuesta = $Respuesta;
    }

    public function setCurso_id($Curso_id) {
        $this->Curso_id = $Curso_id;
    }

    public function listar() {
        try {
            $sql = "
                    select 
                        r.pregunta_id,
                        r.nombre_pregunta,
                        r.respuesta,
                        p.prueba_id,
                        c.nombre_curso
                    from 
                        curso c inner join prueba p
                    on
                        c.curso_id = p.curso_id inner join pregunta r
                    on
                        p.prueba_id = r.prueba_id
                    order by 
                            1
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->execute();
            $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function agregar() {
        $this->dblink->beginTransaction();

        try {
            $sql = "select * from f_generar_correlativo('pregunta') as nc";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->execute();

            if ($sentencia->rowCount()) {
                $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
                $nuevoCodigo = $resultado["nc"];
                $this->setPregunta_id($nuevoCodigo);

                /* Insertar en la tabla laboratorio */
                $sql = "
                    select * from fn_registrarPregunta
                                            (
                                            :p_pregunta_id,
                                            :p_nombre_pregunta,
                                            :p_respuesta,
                                            :p_curso_id
                                            );

                    ";
                $sentencia = $this->dblink->prepare($sql);
                $sentencia->bindParam(":p_pregunta_id", $this->getPregunta_id());
                $sentencia->bindParam(":p_nombre_pregunta", $this->getNombre_pregunta());
                $sentencia->bindParam(":p_respuesta", $this->getRespuesta());
                $sentencia->bindParam(":p_curso_id", $this->getCurso_id());
                $sentencia->execute();
                /* Insertar en la tabla laboratorio */

                /* Actualizar el correlativo */
                $sql = "update correlativo set numero = numero + 1 
                    where tabla='pregunta'";
                $sentencia = $this->dblink->prepare($sql);
                $sentencia->execute();
                /* Actualizar el correlativo */
                $this->dblink->commit();
                return true;
            } else {
                throw new Exception("No se ha configurado el correlativo para la tabla pregunta");
            }
        } catch (Exception $exc) {
            $this->dblink->rollBack();
            throw $exc;
        }

        return false;
    }

    public function leerDatos($codPregunta) {
        try {
            $sql = "
                    select                         
                            *
                    from 
                        prueba p inner join pregunta r 
                    on
                        p.prueba_id = r.prueba_id 
                    where
                        r.pregunta_id = :p_pregunta_id;
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_pregunta_id", $codPregunta);
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
                select * from fn_registrarPregunta
                                                (
                                                    p_pregunta_id,
                                                    p_nombre_pregunta,
                                                    p_respuesta,
                                                    p_curso_id
                                                )
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_pregunta_id", $this->getPregunta_id());
            $sentencia->bindParam(":p_nombre_pregunta", $this->getNombre_pregunta());
            $sentencia->bindParam(":p_respuesta", $this->getRespuesta());
            $sentencia->bindParam(":p_curso_id", $this->getCurso_id());
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
                    pregunta 
                where
                    pregunta_id = :p_pregunta_id
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_pregunta_id", $this->getPregunta_id());
            $sentencia->execute();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
        return false;
    }

}

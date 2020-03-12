<?php

require_once '../data/Conexion.class.php';

class Pregunta extends Conexion {

    private $Pregunta_id;
    private $Nombre_pregunta;
    private $Respuesta;
    private $Prueba_id;

    public function getPregunta_id() {
        return $this->Pregunta_id;
    }

    public function getNombre_pregunta() {
        return $this->Nombre_pregunta;
    }

    public function getRespuesta() {
        return $this->Respuesta;
    }

    public function getTPrueba_id() {
        return $this->Prueba_id;
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

    public function setPrueba_id($Prueba_id) {
        $this->Prueba_id = $Prueba_id;
    }

    public function listar() {
        try {
            $sql = "
                    select 
                        r.pregunta_id,
                        r.nombre_pregunta,
                        r.respuesta,
                        p.prueba_id,
                        c.curso_id
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
            $sql = "select * from f_generar_correlativo('prueba') as nc";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->execute();

            if ($sentencia->rowCount()) {
                $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
                $nuevoCodigo = $resultado["nc"];
                $this->setPrueba_id($nuevoCodigo);

                /* Insertar en la tabla laboratorio */
                $sql = "
                    select * from fn_registrarEditarPrueba
                                    (
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
                    where tabla='prueba'";
                $sentencia = $this->dblink->prepare($sql);
                $sentencia->execute();
                /* Actualizar el correlativo */
                $this->dblink->commit();
                return true;
            } else {
                throw new Exception("No se ha configurado el correlativo para la tabla prueba");
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
                    select 
                        p.prueba_id,
                        p.cant_preguntas,
                        p.tiempo_prueba,
                        p.puntaje_aprobacion,
                        p.instrucciones,
                        p.curso_id,
                        c.nombre_curso
                    from 
                        prueba p inner join curso c
                    on
                        c.curso_id = p.curso_id
                    where 
                        p.curso_id = :p_codigo_curso
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
                    prueba 
                set  
                    cant_preguntas = :p_nombre_curso,
                    tiempo_prueba = :p_nombre_curso,
                    puntaje_aprobacion = :p_nombre_curso,
                    instrucciones = :p_nombre_curso
                where
                    prueba_id = :p_prueba_id
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_prueba_id", $this->getPrueba_id());
            $sentencia->bindParam(":p_cant_preguntas", $this->getCantPregunta());
            $sentencia->bindParam(":p_tiempo_prueba", $this->getTiempo());
            $sentencia->bindParam(":p_puntaje_aprobacion", $this->getPuntaje());
            $sentencia->bindParam(":p_instrucciones", $this->getInstrucciones());
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

<?php

require_once '../data/Conexion.class.php';
// session_name("seleccion_personal_v2");
 //session_start();
//require_once '../logic/Sesion.class.php';
//$DOC = $_SESSION["s_doc_id"];
class Estudios extends Conexion {
    private $codigo_estudio;
    private $institucion_educativa;
    private $titulo_estudio;
    private $grado_estudio;
    private $fecha_inicio;
    private $fecha_fin;
    private $estado_estudio;
    
    public function getCodigo_estudio() {
        return $this->codigo_estudio;
    }

    public function getInstitucion_educativa() {
        return $this->institucion_educativa;
    }

    public function getTitulo_estudio() {
        return $this->titulo_estudio;
    }

    public function getGrado_estudio() {
        return $this->grado_estudio;
    }

    public function getFecha_inicio() {
        return $this->fecha_inicio;
    }

    public function getFecha_fin() {
        return $this->fecha_fin;
    }

    public function getEstado_estudio() {
        return $this->estado_estudio;
    }

    public function setCodigo_estudio($codigo_estudio) {
        $this->codigo_estudio = $codigo_estudio;
    }

    public function setInstitucion_educativa($institucion_educativa) {
        $this->institucion_educativa = $institucion_educativa;
    }

    public function setTitulo_estudio($titulo_estudio) {
        $this->titulo_estudio = $titulo_estudio;
    }

    public function setGrado_estudio($grado_estudio) {
        $this->grado_estudio = $grado_estudio;
    }

    public function setFecha_inicio($fecha_inicio) {
        $this->fecha_inicio = $fecha_inicio;
    }

    public function setFecha_fin($fecha_fin) {
        $this->fecha_fin = $fecha_fin;
    }

    public function setEstado_estudio($estado_estudio) {
        $this->estado_estudio = $estado_estudio;
    }


    public function listar() {
       
        try {
            $sql = "
                    select 
                        codigo_estudio_candidato,
                        institucion_educativa,
                        titulo_estudio,
                        grado_estudio,
                        fecha_inicio,
                        fecha_fin
                    from 
                        estudio_candidato 
                    where doc_id = '$_SESSION[s_doc_id]'    
                ";
//            $sql = "
//                    select * from estudio_candidato 
//                    where doc_id = '$_SESSION[s_doc_id]'
//                ";
            $sentencia = $this->dblink->prepare($sql);
//            $sentencia->bindParam(":p_id", $_SESSION["s_doc_id"]);
//            $sentencia->bindParam(":p_fecha2", $p_fecha2);
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
            $sql = "select * from f_generar_correlativo('estudio_candidato') as nc";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->execute();
            
            if ($sentencia->rowCount()){
                $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
                $nuevoCodigo = $resultado["nc"];
                $this->setCodigo_estudio($nuevoCodigo);
                
                /*Insertar en la tabla laboratorio*/
                $sql = "
                    insert into estudio_candidato
                            (
                                codigo_estudio_candidato,
                                institucion_educativa,
                                titulo_estudio,
                                grado_estudio,
                                fecha_inicio,
                                fecha_fin,
                                doc_id
                            )
                    values(
                            :p_cod_estudio,
                            :p_institucion_educativa,
                            :p_titulo_estudios,
                            :p_grado_estudio,
                            :p_fecha_inicio,
                            :p_fecha_fin,
                            '$_SESSION[s_doc_id]'
                           );
                    ";
                $sentencia = $this->dblink->prepare($sql);
                $sentencia->bindParam(":p_cod_estudio", $this->getCodigo_estudio());
                $sentencia->bindParam(":p_institucion_educativa", $this->getInstitucion_educativa());
                $sentencia->bindParam(":p_titulo_estudios", $this->getTitulo_estudio());
                $sentencia->bindParam(":p_grado_estudio", $this->getGrado_estudio());
                $sentencia->bindParam(":p_fecha_inicio", $this->getFecha_inicio());
                $sentencia->bindParam(":p_fecha_fin", $this->getFecha_fin());
//                $sentencia->bindParam(":p_doc_id", $this->getCodigo_estudio());
                $sentencia->execute();
                /*Insertar en la tabla laboratorio*/
                
                /*Actualizar el correlativo*/
                $sql = "update correlativo set numero = numero + 1 
                    where tabla='estudio_candidato'";
                $sentencia = $this->dblink->prepare($sql);
                $sentencia->execute();
//                /*Actualizar el correlativo*/
                $this->dblink->commit();
                return true;
                
            }else{
                throw new Exception("No se ha configurado el correlativo para la tabla estudio_candidato");
            }
            
        } catch (Exception $exc) {
            $this->dblink->rollBack();
            throw $exc;
        }
        
        return false;
    }
    
    public function leerDatos($p_codigoEstudio) {
        try {
            $sql = "
                    select * from estudio_candidato 
                    where codigo_estudio_candidato = :p_cod_est
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_cod_est", $p_codigoEstudio);
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
                    estudio_candidato 
                set 
                    institucion_educativa = :p_institucion_educativa,
                    titulo_estudio = :p_titulo_estudio,
                    grado_estudio = :p_grado_estudio,
                    fecha_inicio = :p_fecha_inicio,
                    fecha_fin = :p_fecha_fin
                where
                    codigo_estudio_candidato = :p_codigo_estudio
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_institucion_educativa", $this->getInstitucion_educativa());
            $sentencia->bindParam(":p_titulo_estudio", $this->getTitulo_estudio());
            $sentencia->bindParam(":p_grado_estudio", $this->getGrado_estudio());
            $sentencia->bindParam(":p_fecha_inicio", $this->getFecha_inicio());
            $sentencia->bindParam(":p_fecha_fin", $this->getFecha_fin());
            $sentencia->bindParam(":p_codigo_estudio", $this->getCodigo_estudio());
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
                    estudio_candidato 
                where
                    codigo_estudio_candidato = :p_cod_est
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_cod_est", $this->getCodigo_estudio());
            $sentencia->execute();
            return true;
            
        } catch (Exception $exc) {
            throw $exc;
        }
        return false;
    }
    
    
    


}

<?php

require_once '../data/Conexion.class.php';

class Anuncio extends Conexion {

    private $Anuncio_id;
    private $Titulo_evento;
    private $P_foto;
    private $Descripcion_evento;
    private $Tipo_anuncio;


    public function getAnuncio_id() {
        return $this->Anuncio_id;
    }

    public function getTitulo_evento() {
        return $this->Titulo_evento;
    }

    public function getP_foto() {
        return $this->P_foto;
    }

    public function getDescripcion_evento() {
        return $this->Descripcion_evento;
    }

    public function getTipo_anuncio() {
        return $this->Tipo_anuncio;
    }


    public function setAnuncio_id($Anuncio_id) {
        $this->Anuncio_id = $Anuncio_id;
    }

    public function setTitulo_evento($Titulo_evento) {
        $this->Titulo_evento = $Titulo_evento;
    }

    public function setP_foto($P_foto) {
        $this->P_foto = $P_foto;
    }

    public function setDescripcion_evento($Descripcion_evento) {
        $this->Descripcion_evento = $Descripcion_evento;
    }

    public function setTipo_anuncio($Tipo_anuncio) {
        $this->Tipo_anuncio = $Tipo_anuncio;
    }

    public function listar() {
       
        try {
            $sql = "
                    select 
                        anuncio_id,
                        titulo_evento,
                        descripcion_evento,
                        tipo_anuncio
                    from
                        anuncio
                    order by 
                            2
                ";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->execute();
            $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (Exception $exc) {
            throw $exc;
        }
    }
   
    public function leerDatos($p_anuncio_id) {
        try {
            $sql = "
                    select 
                        anuncio_id,
                        titulo_evento,
                        descripcion_evento,
                        tipo_anuncio
                    from
                        anuncio
                    where anuncio_id = :p_anuncio_id

                ";
            
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_anuncio_id", $p_anuncio_id);
            $sentencia->execute();
            $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function leerFoto($p_anuncio_id) {
        try {
            $sql = "
                    select 
                        anuncio_id
                    from 
                        anuncio
                    where 
                        anuncio_id = :p_anuncio_id;

                ";
            
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_anuncio_id", $p_anuncio_id);
           // $sentencia->bindParam(":p_foto", $this->getP_foto);
            $sentencia->execute();
            $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function agregar() {
        $this->dblink->beginTransaction();
        
        try {
            $sql = "select * from f_generar_correlativo('anuncio') as nc";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->execute();
            
            if ($sentencia->rowCount()){
                $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
                $nuevoCodigo = $resultado["nc"];
                $this->setAnuncio_id($nuevoCodigo);
                
                /*Insertar en la tabla candidato*/
//                $sql = "
//                    insert into laboratorio(codigo_laboratorio,nombre,codigo_pais) 
//                    values(:p_cod_lab, :p_nomb, :p_codigo_pais)
//                    ";
                
                $sql = "insert into 
                                anuncio
                                    (
                                        anuncio_id,titulo_evento,descripcion_evento,tipo_anuncio
                                    )
                        values(
                                :p_anuncio_id,
                                :p_titulo_evento,
                                :p_descripcion_evento,
                                :p_tipo_anuncio
                            );";
                $sentencia = $this->dblink->prepare($sql);
                // $sentencia->bindParam(":p_codigoCandidato", $this->getCodigoCandidato());
                $sentencia->bindParam(":p_anuncio_id", $this->getAnuncio_id());
                $sentencia->bindParam(":p_titulo_evento", $this->getTitulo_evento());
                $sentencia->bindParam(":p_descripcion_evento", $this->getDescripcion_evento());
                $sentencia->bindParam(":p_tipo_anuncio", $this->getTipo_anuncio());
                $sentencia->execute();
                /*Insertar en la tabla laboratorio*/
                
                /*Actualizar el correlativo*/
                $sql = "update correlativo set numero = numero + 1 
                        where tabla='anuncio'";
                $sentencia = $this->dblink->prepare($sql);
                $sentencia->execute();
                /*Actualizar el correlativo*/
                $this->dblink->commit();
                return true;
                
            }else{
                throw new Exception("No se ha configurado el correlativo para la tabla anuncio");
            }
            
        } catch (Exception $exc) {
            $this->dblink->rollBack();
            throw $exc;
        }
        
        return false;
    }

    public function editar() {
        try {
            $sql = "update 
                        anuncio
                    set 
                        titulo_evento       = :p_titulo_evento,
                        descripcion_evento  = :p_descripcion_evento,
                        tipo_anuncio        = :p_tipo_anuncio
                    where 
                        anuncio_id= :p_anuncio_id;";

            $sentencia = $this->dblink->prepare($sql);            
            $sentencia->bindParam(":p_anuncio_id", $this->getAnuncio_id());
            $sentencia->bindParam(":p_titulo_evento", $this->getTitulo_evento());
            $sentencia->bindParam(":p_descripcion_evento", $this->getDescripcion_evento());
            $sentencia->bindParam(":p_tipo_anuncio", $this->getTipo_anuncio());
            $sentencia->execute();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
        return false;
    }

    public function eliminar() {
        try {
            $sql = "delete from anuncio where anuncio_id = :p_anuncio_id;";
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_anuncio_id", $this->getAnuncio_id());
            $sentencia->execute();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
        return false;
    }
}

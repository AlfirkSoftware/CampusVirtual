<?php

require_once '../data/Conexion.class.php';

class Usuario extends Conexion {

   // private $codigo_usuario;
    
    public function listar() {
       
        try {
            $sql = "
                    select 
                        codigo_usuario,
                        clave,
                        tipo,
                        estado,
                        fecha_registro,
                        doc_id
                        
                    from 
                        credenciales_acceso   
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
   
    public function leerDatos($p_dni) {
        try {
            $sql = "
                    select
                        u.doc_id,
                        u.nombres,
                        u.apellidos,
                        u.direccion,
                        u.telefono,
                        u.sexo,
                        u.edad,                          
                        c.descripcion
                    from 
                        usuario u inner join cargo c
                    on  
                        (u.cargo_id = c.cargo_id)
                    where
                        u.doc_id = :p_dni

                ";
            
            $sentencia = $this->dblink->prepare($sql);
            $sentencia->bindParam(":p_dni", $p_dni);
            $sentencia->execute();
            $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
            return $resultado;
        } catch (Exception $exc) {
            throw $exc;
        }
    }
}

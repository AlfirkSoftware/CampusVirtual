<?php
    require_once 'validar.datos.sesion.view.php';
//      $dniSesion= $_SESSION["s_doc_id"] ;
    
//require_once '../logic/Sesion.class.php';
    
?>
<!DOCTYPE html>
<html>
<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="icon" href="../images/IPEV.jpg">
        <title> Campus Virtual | Inicio</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <?php include_once 'estilos.view.php'; ?>
    </head>
<style>
    #modal{
      padding: 0 0 0 220px;  
      width: 80% !important;
    }
  </style>
<body class="hold-transition skin-blue sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">

  <?php include_once './menu-arriba.admin.view.php'; ?>

  <!-- =============================================== -->

  <!-- Left side column. contains the sidebar -->
  <?php include_once 'menu-izquierda.admin.view.php';?>

  <!-- =============================================== -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
      <section class="content-header">
            <h3>Mis Estudios</h3>
            <ol class="breadcrumb">
                <li><a href="menu.principal.view.php"><i class="fa fa-dashboard"></i> Inicio</a></li>
                <li class="active">Mis Estudios</li>
              <!--<li class="active">User profile</li>-->
            </ol>
            <button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#myModal" id="btnagregar"><i class="fa fa-plus"> AGREGAR </i></button>
            <!--<button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#myModal" id="btnagregar"><img src="../images/actualizar_2.png"> AGREGAR </button>-->
        </section>  
    <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="box box-warning">
                        <div class="box-body">
                            <div id="listado"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- INICIO del formulario modal -->
            <small>
                <form id="frmgrabar">
                    <div class="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="titulomodal">Título de la ventana</h4>
                          </div>
                          <div class="modal-body">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <p>
                                            <input type="hidden" value="" id="txtTipoOperacion" name="txtTipoOperacion">
                                            Código <input type="text" 
                                                          name="txtCodigo" 
                                                          id="txtCodigo" 
                                                          class="form-control input-sm text-bold" 
                                                          readonly="">
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-9">
                                        <p>
                                            Institución Educativa<input type="text" 
                                                          name="txtInstitucion" 
                                                          id="txtInstitucion" 
                                                          required=""
                                                          class="form-control input-sm text-bold">
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-9">
                                        <p>
                                            Profesión                                            
                                                        <select required="" name="cboFormacionAcademico" id="cboFormacionAcademico" class="form-control input-sm">
                                                            <option> - </option>
                                                            <option value="Abogado">Abogado</option>
                                                            <option value="Administrador">Administrador</option>
                                                            <option value="Arquitecto">Arquitecto</option>
                                                            <option value="Asistente Social">Asistente Social</option>
                                                            <option value="Contador">Contador</option>
                                                            <option value="Ingeniero Civil y Ambiental">Ingeniero civil y Ambiental</option>
                                                            <option value="Ingeniero Electricista">Ingeniero Electricista</option>
                                                            <option value="Ingeniero de Software">Ingeniero de software</option>
                                                            <option value="Ingeniero Hidráulico">Ingeniero hidráulico</option>
                                                            <option value="Obrero Constructor">Obrero constructor</option>                                                            
                                                            <option value="Secretariado">Secretariado</option>
                                                            <option value="Técnico en mantenimiento y reparaciones de pcs">Técnico en mantenimiento y reparaciones de pcs</option>
                                                            <option value="Técnico en maquinarías de construcción">Técnico en maquinarías de construcción</option>
                                                            <option value="Topógrafo">Topógrafo</option>
                                                        </select>
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-9">
                                        <p>
                                            Grado Académico <input type="text" 
                                                          name="txtGrado" 
                                                          id="txtGrado" 
                                                          required=""
                                                          class="form-control input-sm text-bold">
                                        </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 form-inline">
                                        Desde:  <input type="date" name="txtFecha1" id="txtFecha1" class="form-control" style="width:175px;" value="<?php echo date('Y-m-d'); ?>">
                                        Hasta:  <input type="date" name="txtFecha2" id="txtFecha2" class="form-control" style="width:175px;" value="<?php echo date('Y-m-d'); ?>">
                                    </div>
                                </div>
                          </div>
                          <div class="modal-footer">
                              <button type="submit" class="btn btn-warning" aria-hidden="true"><i class="fa fa-save"></i> Grabar</button>
                              <button type="button" class="btn btn-default" data-dismiss="modal" id="btncerrar"><i class="fa fa-close"></i> Cerrar</button>
                          </div>
                        </div>
                      </div>
                    </div>
                </form>
            </small>
            <!-- FIN del formulario modal -->
            
        </section>
        
  </div>
  <!-- /.content-wrapper -->

  <?php include_once 'pie.view.php'; ?>

  <!-- Control Sidebar -->
  <?php include_once 'opciones-derecha.view.php'; ?>
  <!-- /.control-sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->
    <?php include_once 'scripts.view.php'; ?>
    <script>
        $(function() {

      // We can attach the `fileselect` event to all file inputs on the page
      $(document).on('change', ':file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
      });

      // We can watch for our custom `fileselect` event like this
      $(document).ready( function() {
          $(':file').on('fileselect', function(event, numFiles, label) {

              var input = $(this).parents('.input-group').find(':text'),
                  log = numFiles > 1 ? numFiles + ' files selected' : label;

              if( input.length ) {
                  input.val(log);
              } else {
                  if( log ) alert(log);
              }

          });
      });

    });
    </script>    
    
    <!--<script src="js/cbCodigo.js" type="text/javascript"></script>-->
    <script src="js/datos.estudios.js" type="text/javascript"></script>
</body>
</html>
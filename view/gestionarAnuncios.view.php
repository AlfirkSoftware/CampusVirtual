<?php
    require_once 'validar.datos.sesion.view.php';

    //$_POST["s_usuario"] = $dniSesion;
    
   // require_once '../controller/perfil.usuario.leer.datos.controller.php';
    
?>
<!DOCTYPE html>
<html>
<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="icon" href="../images/IPEV.jpg">
        <title> Campus Virtual | Anuncio</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <?php include_once 'estilos.view.php'; ?>
</head>

<body class="hold-transition skin-purple-light sidebar-mini">
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
                    <h3></h3>
                    <ol class="breadcrumb">
                        <li><a href="menu.principal.view.php"><i class="fa fa-dashboard"></i> Inicio</a></li>
                        <li class="active">Gestionar Anuncio</li>
                        <!--<li class="active">User profile</li>-->
                    </ol>

<!--<button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#myModal" id="btnagregar"><img src="../images/actualizar_2.png"> AGREGAR </button>-->
                </section> 
                <section class="content">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="box box-primary">
                                <section class="content-header">
                                    <h3>Anuncio</h3>
                                    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" id="btnagregar"><i class="fa fa-bullhorn"></i> Agregar nuevo Anuncio</button>
                                </section>
                                <div class="box-body">
                                    <div id="listado" class="table table-responsive"></div>
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
                                            <h4 class="modal-title" id="titulomodal">Crear Convocatoria</h4>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-xs-3">
                                                    <p>
                                                        <input type="hidden" value="" id="txtTipoOperacion" name="txtTipoOperacion">
                                                        Código<input type="text" 
                                                                      name="txtCodigo" 
                                                                      id="txtCodigo" 
                                                                      class="form-control input-sm"
                                                                      readonly="true">
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-6">
                                                    <p>
                                                        Título del Anuncio (*) <input type="text" class="form-control" id="txtTitulo" style="font-weight:normal; " name="txtTitulo" required="" autofocus="">
                                                    </p>
                                                </div>
                                                <div class="col-xs-3">
                                                    <p>
                                                        Tipo de anuncio (*)
                                                        <select size="1" style="font-weight:normal;" id="tipoAnuncio" name="tipoAnuncio" class="form-control has-feedback-left" required> 
                                                            <option></option>
                                                            <option value="Informativo">Informativo</option>
                                                            <option value="Celebraciones">Celebraciones</option>
                                                            <option value="Pago">Pago</option>
                                                        </select>
                                                    </p>
                                                </div>
                                                <div class="col-xs-9">
                                                    <p>
                                                        Descripción (*)
                                                        <textarea type="text" class="form-control" id="txtDescripcion" style="font-weight:normal; " name="txtDescripcion" required="" rows="8">

                                                        </textarea>
                                                    </p>
                                                </div>
                                            </div>
                                            
                                                
                                            
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-primary" aria-hidden="true"><i class="fa fa-save"></i> Grabar</button>
                                            <button type="button" class="btn btn-danger" data-dismiss="modal" id="btncerrar"><i class="fa fa-close"></i> Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </small>
                    <small>
                        <form role="form" enctype="multipart/form-data" action="../controller/anuncio.actualizar.foto.datos.controller.php" method="post">
                        <div class="box-body col-md-offset-1">
                            <div class="modal fade" id="myModalFoto" name="myModalFoto" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                            <h4 class="modal-title" id="titulomodal">Subir Foto</h4>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-xs-3">
                                                    <p>
                                                        código (*) <input type="text" class="form-control has-feedback-left" style="font-weight:normal;"
                                                                       id="txtCodigoA" name="txtCodigoA" 
                                                                       required="" autofocus="" 
                                                                       maxlength="8" readonly="true"
                                                                       onkeypress="ValidaSoloNumeros();">
                                                    </p>
                                                </div>
                                            </div><br/><br/><br/><br/>
                                            <div class="row">
                                                <div class="col-xs-6 col-md-offset-3">
                                                    <section id="file-preview-zone" name="file-preview-zone"
                                                    class="card-body d-flex justify-content-between align-items-center thumbnail">

                                                            
                                                       
                                                    

                                                    </section>  
                                                </div>   
                                            </div>   
                                            <div class="row">
                                                <div class="col-xs-8 col-md-offset-2">
                                                    <div id="foto_id" name="foto_id"
                                                    class="card-body d-flex justify-content-between align-items-center input-group">
                                                        <label class="input-group-btn">
                                                            <span class="btn btn-info">
                                                               <i class="fa fa-image"></i><input type="file" style="display: none;" multiple accept="image/png,image/jpeg" id="file-upload" name="file-upload">
                                                            </span>
                                                        </label>
                                                        <input type="text" id="p_foto" name="p_foto" class="form-control" readonly>
                                                    </div>
                                                    <span class="help-block">
                                                    Seleccione una foto 
                                                </span>
                                                </div>
                                                
                                            </div>
                                       
                                    
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-primary" aria-hidden="true"><i class="fa fa-save"></i> Guardar Foto</button>
                                            <button type="button" class="btn btn-danger" data-dismiss="modal" id="btncerrar"><i class="fa fa-close"></i> Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                          </div>
                        </form>
                    </small>
                </section>
                <!-- /.content -->
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
        
        <script src="js/gestionarAnuncio.js" type="text/javascript"></script>

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
        <script>
            function readFile(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
         
                    reader.onload = function (e) {
                        var filePreview = document.createElement('img');
                        filePreview.id = 'file-preview';
                        //e.target.result contents the base64 data from the image uploaded
                        filePreview.src = e.target.result;
                        console.log(e.target.result);
         
                        var previewZone = document.getElementById('file-preview-zone');
                        previewZone.appendChild(filePreview);
                    }
         
                    reader.readAsDataURL(input.files[0]);
                }
            }
         
            var fileUpload = document.getElementById('file-upload');
            fileUpload.onchange = function (e) {
                readFile(e.srcElement);
            }
         
        </script>  
    </body>
</html>
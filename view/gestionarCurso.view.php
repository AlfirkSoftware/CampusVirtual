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
        <title> Campus Virtual | Gestionar Anuncios</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <?php include_once 'estilos.view.php'; ?>
</head>
    <style>
        #modal{
            padding: 0 0 0 220px;  
            width: 80% !important;
        }
        #modalPrueba{
            padding: 0 0 0 220px;  
            width: 80% !important;
        }
    </style>
    <body class="hold-transition skin-purple-light sidebar-mini">
        <!-- Site wrapper -->
        <div class="wrapper">

            <?php include_once './menu-arriba.admin.view.php'; ?>

            <!-- =============================================== -->

            <!-- Left side column. contains the sidebar -->
            <?php include_once './menu-izquierda.admin.view.php'; ?>

            <!-- =============================================== -->

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <section class="content-header">
                    <h3></h3>
                    <ol class="breadcrumb">
                        <li><a href="menu.principal.view.php"><i class="fa fa-dashboard"></i> Inicio</a></li>
                        <li class="active">Puestos de Trabajo</li>
                        <!--<li class="active">User profile</li>-->
                    </ol>

<!--<button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#myModal" id="btnagregar"><img src="../images/actualizar_2.png"> AGREGAR </button>-->
                </section>  
                <!-- Main content -->
                <section class="content">
                    <div class="row">
                        <div class="col-md-">
                            <div class="box box-primary">
                                <section class="content-header">
                                    <h3>Cursos</h3>
                                    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" id="btnagregar"><i class="fa fa-plus"> Agregar nuevo curso </i></button>
                                </section>
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
                                            <h4 class="modal-title" id="titulomodal">Registrar curso</h4>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-xs-2">
                                                    <p>
                                                        <input type="hidden" value="" id="txtTipoOperacion" name="txtTipoOperacion">
                                                        Código <input type="text" 
                                                                      name="txtCodigo" 
                                                                      id="txtCodigo" 
                                                                      class="form-control input-sm" 
                                                                      readonly="">
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-6">
                                                    <p>
                                                        Nombre del curso<input type="text" 
                                                                                name="txtCurso" 
                                                                                id="txtCurso" 
                                                                                required=""
                                                                                class="form-control input-sm">
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-warning" aria-hidden="true"><i class="fa fa-save"></i> Grabar</button>
                                            <button type="button" class="btn btn-danger" data-dismiss="modal" id="btncerrar"><i class="fa fa-close"></i> Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </small>

                    <!-- INICIO del formulario modal -->
                    <small>
                        <form id="frmgrabarPrueba">
                            <div class="modal fade" id="myModalPrueba" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                            <h4 class="modal-title" id="titulomodal">Registrar prueba</h4>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-xs-3">
                                                    <p>
                                                        <input type="hidden" value="" id="txtTipoOperacion" name="txtTipoOperacion">
                                                        Código <input type="text" 
                                                                      name="txtrueba_id" 
                                                                      id="txtrueba_id" 
                                                                      class="form-control input-sm" 
                                                                      readonly="">
                                                    </p>
                                                </div>
                                                <div class="col-xs-6">
                                                    <p>
                                                        Curso
                                                        <select size="1" style="font-weight:normal;" id="textCursoId" name="textCursoId" class="form-control has-feedback-left" required>
                                                            <option>-</option>
                                                        </select>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-3">
                                                    <p>
                                                        #Preguntas
                                                        <select size="1" style="font-weight:normal;" id="textCant_preguntas" name="textCant_preguntas" class="form-control has-feedback-left" required>
                                                            <option>-</option>
                                                            <option value="10">10</option>
                                                            <option value="15">15</option>
                                                            <option value="20">20</option>
                                                            <option value="25">25</option>
                                                            <option value="30">30</option>
                                                            <option value="35">35</option>
                                                            <option value="40">40</option>
                                                            <option value="45">45</option>
                                                            <option value="50">50</option>

                                                        </select>
                                                    </p>
                                                </div>
                                                <div class="col-xs-3">
                                                    <p>
                                                        Tiempo
                                                        <select size="1" style="font-weight:normal;" id="textTiempo" name="textTiempo" class="form-control has-feedback-left" required>
                                                            <option>-</option>
                                                            <option value="10">10 minutos</option>
                                                            <option value="15">15 minutos</option>
                                                            <option value="20">20 minutos</option>
                                                            <option value="25">25 minutos</option>
                                                            <option value="30">30 minutos</option>
                                                            <option value="35">35 minutos</option>
                                                            <option value="40">40 minutos</option>
                                                            <option value="45">45 minutos</option>
                                                            <option value="50">50 minutos</option>
                                                            <option value="55">55 minutos</option>
                                                            <option value="60">60 minutos</option>

                                                        </select>
                                                    </p>
                                                </div>
                                                <div class="col-xs-3">
                                                    <p>
                                                        Puntaje Aprobado
                                                        <select size="1" style="font-weight:normal;" id="txtPuntaje" name="txtPuntaje" class="form-control has-feedback-left" required>
                                                            <option>-</option>
                                                            <option value="10">10</option>
                                                            <option value="15">15</option>
                                                            <option value="20">20</option>
                                                            <option value="25">25</option>
                                                            <option value="30">30</option>
                                                            <option value="35">35</option>
                                                            <option value="40">40</option>
                                                            <option value="45">45</option>
                                                            <option value="50">50</option>
                                                            <option value="55">55</option>
                                                            <option value="60">60</option>

                                                        </select>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-9">
                                                    <p>
                                                        Instrucciones (*)
                                                        <textarea type="text" class="form-control" id="txtInstrucciones" style="font-weight:normal; " name="txtInstrucciones" required="" rows="8">

                                                        </textarea>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-warning" aria-hidden="true"><i class="fa fa-save"></i> Grabar</button>
                                            <button type="button" class="btn btn-danger" data-dismiss="modal" id="btncerrar"><i class="fa fa-close"></i> Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </small>
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
            $(function () {

                // We can attach the `fileselect` event to all file inputs on the page
                $(document).on('change', ':file', function () {
                    var input = $(this),
                            numFiles = input.get(0).files ? input.get(0).files.length : 1,
                            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                    input.trigger('fileselect', [numFiles, label]);
                });

                // We can watch for our custom `fileselect` event like this
                $(document).ready(function () {
                    $(':file').on('fileselect', function (event, numFiles, label) {

                        var input = $(this).parents('.input-group').find(':text'),
                                log = numFiles > 1 ? numFiles + ' files selected' : label;

                        if (input.length) {
                            input.val(log);
                        } else {
                            if (log)
                                alert(log);
                        }

                    });
                });

            });
        </script>    
       <script src="js/gestionarCurso.js" type="text/javascript"></script>
       <script src="js/cbCodigo.js" type="text/javascript"></script>
       <!--
        <script src="js/cbCodigo.js" type="text/javascript"></script>
        <script src="js/convocatoria.js" type="text/javascript"></script>
        <script src="js/puesto.js" type="text/javascript"></script>
        

    -->
    </body>
</html>
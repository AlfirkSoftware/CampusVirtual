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
        #myModalPreguntaForm{
            padding: -250px 0 0 0;  
            width: 100% !important;
            height: 325px !important;
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
                                                        <input type="hidden" value="" id="txtTipoOperacionPrueba" name="txtTipoOperacionPrueba">
                                                        Código <input type="text" 
                                                                      name="txtPrueba_id" 
                                                                      id="txtPrueba_id" 
                                                                      class="form-control input-sm">
                                                    </p>
                                                </div>
                                                <div class="col-xs-6">
                                                    <p>
                                                        Curso
                                                        <select size="1" style="font-weight:normal;" id="textCursoId" name="textCursoId" class="form-control has-feedback-left" required>
                                                            <option>-</option>
                                                            <option value="1">Agile Coach</option>
                                                            <option value="2">Innovation Management</option>
                                                            <option value="3">Kanban</option>
                                                            <option value="4">Scrum Master</option>
                                                            <option value="5">Scrum Foundation</option>
                                                            <option value="6">Scrum Developer</option>
                                                            <option value="7">Scrum Advanced</option>
                                                            <option value="8">Scrum Product Owner</option>
                                                            <option value="9">Iso 27001 Auditor</option>
                                                            <option value="0">Iso 27001 Lead Auditor</option>
                                                            <option value="11">Iso 27001 Foundation</option>
                                                            <option value="12">Iso 22301 Auditor</option>
                                                            <option value="13">Iso 22301 Lead Auditor</option>
                                                            <option value="14">Iso 22301 Foundation</option>
                                                            <option value="15">Iso 20000 Auditor</option>
                                                            <option value="16">Iso 20000 Lead Auditor</option>
                                                            <option value="17">Iso 20000 Foundation</option>
                                                            <option value="18">Cybersecurity</option>
                                                            <option value="19">Six Sigma</option>
                                                            <option value="20">DevOps Essentials</option>
                                                            <option value="21">DevOps Culture</option>
                                                            <option value="22">Marketing Digital</option>
                                                            <option value="23">Big Data</option>
                                                            <option value="24">Design Thinking</option>
                                                            <option value="25">Service Desk</option>
                                                            <option value="26">Agile Business Owner</option>

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
                                            <button type="button" class="btn btn-danger" data-dismiss="modal" id="btncerrarP"><i class="fa fa-close"></i> Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </small>
                </section>
                <section class="content">
                    <div class="row">
                        <div class="col-md-">
                            <div class="box box-primary">
                                <section class="content-header">
                                    <h3>Pregunta</h3>
                                    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalPregunta" id="btnagregarPregunta"><i class="fa fa-plus"> Agregar nueva pregunta </i></button>
                                </section>
                                <div class="box-body">
                                    <div id="listadoPregunta"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- INICIO del formulario modal -->
                    <small>
                        <form id="frmgrabarPregunta">
                            <div class="modal fade" id="myModalPregunta" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                            <h4 class="modal-title" id="titulomodal">Registrar pregunta</h4>
                                        </div>
                                        <div class="modal-body">
                                            <div class="row">
                                                <div class="col-xs-3">
                                                    <p>
                                                        <input type="hidden" value="" id="txtTipoOperacionPregunta" name="txtTipoOperacionPregunta">
                                                        Código <input type="text" 
                                                                      name="txtPregunta_id" 
                                                                      id="txtPregunta_id" 
                                                                      class="form-control input-sm" 
                                                                      readonly="">
                                                    </p>
                                                </div>
                                                <div class="col-xs-6">
                                                    <p>
                                                        Prueba
                                                        <select size="1" style="font-weight:normal;" id="textCurso_id" name="textCurso_id" class="form-control has-feedback-left" required>
                                                            <option>-</option>
                                                            <option value="1">Agile Coach</option>
                                                            <option value="2">Innovation Management</option>
                                                            <option value="3">Kanban</option>
                                                            <option value="4">Scrum Master</option>
                                                            <option value="5">Scrum Foundation</option>
                                                            <option value="6">Scrum Developer</option>
                                                            <option value="7">Scrum Advanced</option>
                                                            <option value="8">Scrum Product Owner</option>
                                                            <option value="9">Iso 27001 Auditor</option>
                                                            <option value="0">Iso 27001 Lead Auditor</option>
                                                            <option value="11">Iso 27001 Foundation</option>
                                                            <option value="12">Iso 22301 Auditor</option>
                                                            <option value="13">Iso 22301 Lead Auditor</option>
                                                            <option value="14">Iso 22301 Foundation</option>
                                                            <option value="15">Iso 20000 Auditor</option>
                                                            <option value="16">Iso 20000 Lead Auditor</option>
                                                            <option value="17">Iso 20000 Foundation</option>
                                                            <option value="18">Cybersecurity</option>
                                                            <option value="19">Six Sigma</option>
                                                            <option value="20">DevOps Essentials</option>
                                                            <option value="21">DevOps Culture</option>
                                                            <option value="22">Marketing Digital</option>
                                                            <option value="23">Big Data</option>
                                                            <option value="24">Design Thinking</option>
                                                            <option value="25">Service Desk</option>
                                                            <option value="26">Agile Business Owner</option>

                                                        </select>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <div class="box box-primary">
                                                        <div class="box-header">
                                                            <h3 class="box-title">Pregunta
                                                                <small>Utilice el editor de texto</small>
                                                            </h3>
                                                            <!-- tools box -->
                                                            <div class="pull-right box-tools">
                                                                <button type="button" class="btn btn-info btn-sm" data-widget="collapse" data-toggle="tooltip"
                                                                        title="Collapse">
                                                                    <i class="fa fa-minus"></i></button>
                                                                <button type="button" class="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip"
                                                                        title="Remove">
                                                                    <i class="fa fa-times"></i></button>
                                                            </div>
                                                            <!-- /. tools -->
                                                        </div>
                                                        <!-- /.box-header -->
                                                        <div class="box-body pad">

                                                            <textarea id="editor1" 
                                                                      name="editor1" 
                                                                      class = "ckeditor">

                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-3">
                                                    <p>
                                                        Respuesta
                                                        <select size="1" style="font-weight:normal;" id="txtRespuesta" name="txtRespuesta" class="form-control has-feedback-left" required>
                                                            <option>-</option>
                                                            <option value="a">a</option>
                                                            <option value="b">b</option>
                                                            <option value="c">c</option>
                                                            <option value="d">d</option>

                                                        </select>
                                                    </p>
                                                </div>                                      
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-warning" aria-hidden="true"><i class="fa fa-save"></i> Grabar</button>
                                            <button type="button" class="btn btn-danger" data-dismiss="modal" id="btncerrarPregunta"><i class="fa fa-close"></i> Cerrar</button>
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
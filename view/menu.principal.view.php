<?php
require_once 'validar.datos.sesion.view.php';
$_POST["s_usuario"] = $dniSesion;


require_once '../controller/perfil.usuario.leer.datos.controller.php';
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

    <body class="hold-transition skin-purple-light sidebar-mini">
        <!-- Site wrapper -->
        <div class="wrapper">

            <?php include_once './menu-arriba.admin.view.php'; ?>

            <!-- =============================================== -->

            <!-- Left side column. contains the sidebar -->
            <?php include_once 'menu-izquierda.admin.view.php'; ?>

            <!-- =============================================== -->

            <!-- Content Wrapper. Contains page content -->
            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">

                <!-- Main content -->
                <section class="content">
                    <div class="row">
                        <div class="col-md-8">
                            <!-- Main content -->
                            <section class="invoice">
                              <!-- title row -->
                              <div class="row">
                                <div class="col-xs-12">
                                  <h2 class="page-header text-primary text-bold">
                                    <i class="fa fa-bullhorn"></i> Anuncios
                                    <small class="pull-right">Fecha: <?php echo date('d/m/yy'); ?></small>
                                  </h2>
                                </div>
                                <!-- /.col -->
                              </div>

                              <div class="row">
                                        <div class="col-md-12 col-xs-12">
                                            <div class="x_title">
                                                <header class="text-center">      
                                                    <label>
                                                        <img src="../images/evento1.png" class="img-thumbnail" alt="Responsive image">
                                                    </label>
                                                    <br/><br/>
                                                    <label>
                                                        <img src="../images/evento2.jpg" class="img-thumbnail" alt="Responsive image">
                                                    </label>
                                                    <br/><br/>
                                                    <label>
                                                        <img src="../images/evento3.jpg" class="img-thumbnail" alt="Responsive image">
                                                    </label>
                                                </header>
                                                <br/>
                                                <section class="text-center"> 
                                                    <header>
                                                        <span class="section">

                                                        </span>
                                                    </header>
                                                </section>    
                                            </div>
                                        </div>
                                    </div>

                            </section>
                            <!-- /.content -->
                        </div>  
                        <div class="col-md-3">

                            <!-- Profile Image -->
                            
                                <div class="row">
                                        <div class="col-md-12 col-xs-12">
                                            <div class="x_title">
                                                <header class="text-center">      
                                                    <label>
                                                        <?php
                                                            if($_SESSION["cargo_id"] >= 1 && $_SESSION["cargo_id"] <= 4)
                                                                echo '<img src="../images/bienvenido_admin.png" class="img-thumbnail">';
                                                            if($_SESSION["cargo_id"] == 5)
                                                                echo '<img src="../images/bienvenido_docente.png" class="img-thumbnail">';
                                                            if($_SESSION["cargo_id"] == 6)
                                                                echo '<img src="../images/bienvenido_estudiante.png" class="img-thumbnail">';
                                                        ?>
                                                    </label>
                                                </header>
                                                <br/>
                                                <section class="text-center"> 
                                                    <header>
                                                        <span class="section">

                                                        </span>
                                                    </header>
                                                </section>    
                                            </div>
                                        </div>
                                    </div>
                                <!-- /.box-body -->
                            
                           
                        </div>  
                    </div>
                    <!-- /.row -->

                </section>
                <section class="content">
                    <small>
                        <div class="modal fade" id="myModalA" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 class="modal-title" id="titulomodal2">Título de la ventana</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="box box-warning">
                                                    <div class="box-body">
                                                        <div id="listadoP"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="modal-footer">
          <!--                              <button type="submit" class="btn btn-warning" aria-hidden="true"><i class="fa fa-save"></i> Grabar</button>-->
                                        <button type="button" class="btn btn-danger" data-dismiss="modal" id="btncerrar"><i class="fa fa-close"></i> Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </small>
                </section>
                <!-- /.content -->
            </div>
            <!-- /.content-wrapper -->
            <!-- /.content-wrapper -->

            <?php include_once 'pie.view.php'; ?>

            <!-- Control Sidebar -->
            <?php // include_once 'opciones-derecha.view.php'; ?>
            <!-- /.control-sidebar -->
            <div class="control-sidebar-bg"></div>
        </div>  
        <!-- ./wrapper -->
        <?php include_once 'scripts.view.php'; ?>
    <!--
        <script src="js/convocatoriaVigente.js" type="text/javascript"></script>
        <script src="js/convocatoriaConcluida.js" type="text/javascript"></script>
        <script src="js/reporte.resultadoCurriculo.js" type="text/javascript"></script>
        <script src="js/reporte.resultadoPruebas.js" type="text/javascript"></script>
        <script src="js/reporte.resultadoFinal.js" type="text/javascript"></script>
    -->
    </body>
</html>
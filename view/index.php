<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="icon" href="../images/IPEV.jpg">
        <title> Campús Virtual | Inicio de Sesión</title>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <?php include_once 'estilos.view.php'; ?>
    </head>
    <body class="hold-transition login-page"><!-- bg-gray-light: fondo de página -->
        <div class="login-box">
            
            <div class="login-box-body">  
                <div class="logo">
                    <img src="../images/IPEV.jpg" class="img-responsive center-block">   
                </div>    
                <div class="login-logo">
            
                    <p class="text-primary text-bold">Campus Virtual</p>
                </div>

                <!-- /.login-->

                <form class="form-horizontal" action="../controller/sesion.validar.controller.php" method="post">
                  <div class="box-body">
                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-3 control-label">Usuario</label>

                      <div class="col-sm-9">
                        <input type="email" class="form-control"
                            style="background-color:#394394; color:white" name="txtEmail" required="" autofocus="">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword3" class="col-sm-3 control-label">Constraseña</label>

                      <div class="col-sm-9">
                        <input type="password" class="form-control" style="background-color:#394394; color:white" name="txtClave" required="">
                      </div>
                    </div>
                  </div>
                   <div class="form-group">
                    <label for="inputPassword3" class="col-sm-6 control-label">¿Olvidó su contraseña?</label>
                    <div class="col-sm-5">
                         <button type="button" class="btn btn-default" data-toggle="modal" data-target="#myModal" id="btnagregar"><i class="fa fa-key"> </i></button>
                    </div>
                   </div>
                   <!--<div class="col-xs-10; display: flex; align-items: center; justify-content: center;">
                        <button type="submit" class="btn btn-primary btn-block btn-flat"> 
                          <p class="text-bold"> Iniciar Sesión </p>
                        </button>
                   </div>

                 -->

                   <div class="modal-footer col-md-4 center-block">
                                    <button type="submit" class="btn btn-primary" aria-hidden="true"><i class="fa fa-user"></i> Iniciar Sesión </button>
                                    <!--<button type="button" class="btn btn-danger" data-dismiss="modal" id="btncerrar"><i class="fa fa-close"></i> Cerrar</button> -->
                                </div>
                </form>
                <br/><br/><br/><br/>
                <div class="text-center">
                  <p class="text-black">
                      ©<?php echo date('Y'); ?> 
                      Copyright - IPEV. Todos los derechos reservados.
                  </p>
                </div>
            </div>
        </div>
            <!-- Fin login -->
            
        </div>
        <section class="">

            <!-- INICIO del formulario modal -->
            <small>
                <form id="frmgrabar">
                    <div class="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title" id=""><b>Recuperar contraseña</b></h4>
                                </div>
                                <div class="modal-body">
                                    <div class="login-box">
            
                                      <div class="login-box-body">  
                                          <div class="logo">
                                              <img src="../images/IPEV.jpg" class="img-responsive center-block">   
                                          </div>    
                                          <div class="login-logo">
                                      
                                              <!--<p class="text-primary text-bold">Recuperar contraseña</p>-->
                                          </div>

                                          <!-- /.login-->

                                          <form class="form-horizontal" action="../controller/sesion.validar.controller.php" method="post">
                                            <div class="box-body">
                                              <div class="form-group">
                                                <label for="inputEmail3" class="col-sm-3 control-label" style="font-size: 18px">Usuario</label>

                                                <div class="col-sm-9">
                                                  <input type="email" class="form-control"
                                                      style="background-color:#394394; color:white" name="txtEmail" required="" autofocus="">
                                                </div>
                                              </div>
                                            </div>
                                          </form>
                                          <br/>
                                          <div class="text-center">
                                            <p class="text-black">
                                                ©<?php echo date('Y'); ?> 
                                                Copyright - IPEV. Todos los derechos reservados.
                                            </p>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary" aria-hidden="true"><i class="fa fa-mail-forward"></i> Enviar </button>
                                    <!--<button type="button" class="btn btn-danger" data-dismiss="modal" id="btncerrar"><i class="fa fa-close"></i> Cerrar</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </small>
            <!-- FIN del formulario modal -->

        </section>
        <?php include_once './scripts.view.php'; ?>
        <!-- /.login-box -->

        <!-- jQuery 2.2.3 -->
<!--        <script src="../util/plugins/jQuery/jquery-2.2.3.min.js"></script>
         Bootstrap 3.3.6 
        <script src="../util/bootstrap/js/bootstrap.min.js"></script>
         iCheck 
        <script src="../util/plugins/iCheck/icheck.min.js"></script>-->
<!--        <script>
            $(function () {
                $('input').iCheck({
                    checkboxClass: 'icheckbox_square-blue',
                    radioClass: 'iradio_square-blue',
                    increaseArea: '20%' // optional
                });
            });
        </script>-->
        <!--<script src="js/registrate.usuario.js" type="text/javascript"></script> -->
    </body>
</html>

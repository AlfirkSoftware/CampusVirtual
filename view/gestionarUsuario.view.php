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
        <title> Campus Virtual | Usuarios</title>
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
                        <li class="active">Gestionar Usuario</li>
                        <!--<li class="active">User profile</li>-->
                    </ol>

<!--<button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#myModal" id="btnagregar"><img src="../images/actualizar_2.png"> AGREGAR </button>-->
                </section> 
                <section class="content">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="box box-primary">
                                <section class="content-header">
                                    <h3>Usuarios</h3>
                                    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" id="btnagregar"><i class="fa fa-bullhorn"></i> Agregar nuevo usuario</button>
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
                                                <div class="col-xs-3">
                                                    <p>
                                                        Documento (*) <input type="text" class="form-control has-feedback-left" style="font-weight:normal;"
                                                                       id="txtDoc_identidad" name="txtDoc_identidad" 
                                                                       required="" autofocus="" 
                                                                       maxlength="8"
                                                                       onkeypress="ValidaSoloNumeros();">
                                                    </p>
                                                </div>
                                                <div class="col-xs-3">
                                                    <p>
                                                        Cargo (*)
                                                        <select size="1" style="font-weight:normal;" id="cargo" name="cargo" class="form-control has-feedback-left" required> 
                                                            <option></option>
                                                            <option value="1">Director</option>
                                                            <option value="2">Gerente</option>
                                                            <option value="3">Coordinadora</option>
                                                            <option value="4">Programador</option>
                                                            <option value="5">Docente</option>
                                                            <option value="6">Estudiante</option>
                                                        </select>
                                                    </p>
                                                </div>
                                                <div class="col-xs-3">
                                                    <p>
                                                        Rol (*)
                                                        <select size="1" style="font-weight:normal;" id="tipo" name="tipo" class="form-control has-feedback-left" required> 
                                                            <option></option>
                                                            <option value="A">Admin</option>
                                                            <option value="D">Docente</option>
                                                            <option value="E">Estudiante</option>
                                                        </select>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-6">
                                                    <p>
                                                        Nombres (*)
                                                        <input type="text" class="form-control" id="txtNombre" style="font-weight:normal; " name="txtNombre" required="" autofocus="">
                                                    </p>
                                                </div>
                                                <div class="col-xs-6">
                                                    <p>
                                                        Apellidos (*)
                                                        <input type="text" style="font-weight:normal;" class="form-control" id="txtApellidos" name="txtApellidos" required="">
                                                    </p>
                                                </div>
                                                <div class="col-xs-6">
                                                    <p>
                                                        Dirección (*)
                                                        <input type="text" style="font-weight:normal;" class="form-control" id="txtDireccion" name="txtDireccion" required="">
                                                    </p>
                                                </div>
                                                <div class="col-xs-6">
                                                    <p>
                                                        Email (*)
                                                        <input type="email" style="font-weight:normal;" id="txtEmail" class="form-control" name="txtEmail" required="" onChange="javascript:document.getElementById('cuenta').value = this.value;">
                                                    </p>
                                                </div>
                                                <div class="col-xs-3">
                                                    <p>
                                                        Teléfono (*)
                                                        <input type="text" style="font-weight:normal;" id="txtTelefono" class="form-control" name="txtTelefono" required="" maxlength="20" onkeypress="ValidaSoloNumeros();">
                                                    </p>
                                                </div>
                                                <div class="col-xs-3">
                                                    <p>
                                                        Sexo (*)
                                                        <select size="1" style="font-weight:normal;" id="sexo" name="sexo" class="form-control has-feedback-left" required> 
                                                            <option></option>
                                                            <option value="H">Hombre</option>
                                                            <option value="M">Mujer</option>
                                                        </select>
                                                    </p>
                                                </div>
                                                <div class="col-xs-2">
                                                    <p>
                                                        Edad (*)
                                                        <select size="1" style="font-weight:normal;" id="edad" name="edad" class="form-control has-feedback-left" required> 
                                                            <option></option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                            <option value="24">24</option>
                                                            <option value="25">25</option>
                                                            <option value="26">26</option>
                                                            <option value="27">27</option>
                                                            <option value="28">28</option>
                                                            <option value="29">29</option>
                                                            <option value="30">30</option>
                                                            <option value="31">31</option>
                                                            <option value="32">32</option>
                                                            <option value="33">33</option>
                                                            <option value="34">34</option>
                                                            <option value="35">35</option>
                                                            <option value="36">36</option>
                                                            <option value="37">37</option>
                                                            <option value="38">38</option>
                                                            <option value="39">39</option>
                                                            <option value="40">40</option>
                                                            <option value="41">41</option>
                                                            <option value="42">42</option>
                                                            <option value="43">43</option>
                                                            <option value="44">44</option>
                                                            <option value="45">45</option>
                                                            <option value="46">46</option>
                                                            <option value="47">47</option>
                                                            <option value="48">48</option>
                                                            <option value="49">49</option>
                                                            <option value="50">50</option>
                                                            <option value="51">51</option>
                                                            <option value="52">52</option>
                                                            <option value="53">53</option>
                                                            <option value="54">54</option>
                                                            <option value="55">55</option>
                                                            <option value="56">56</option>
                                                            <option value="57">57</option>
                                                            <option value="58">58</option>
                                                            <option value="59">59</option>
                                                            <option value="60">60</option>
                                                        </select>
                                                    </p>
                                                </div>
                                                <div class="col-xs-3">
                                                    <p>
                                                        Estado (*)
                                                        <select size="1" style="font-weight:normal;" id="estado" name="estado" class="form-control has-feedback-left" required> 
                                                            <option></option>
                                                            <option value="A">Habilitado</option>
                                                            <option value="I">Deshabilitado</option>
                                                        </select>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="modal-header">
                                                    <h4 class="modal-title" id=""><b>Usuario</b></h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="col-xs-6">
                                                            <p>
                                                                <b>Usuario (*)</b>
                                                                <input type="text" style="font-weight:normal;" name="cuenta" class="form-control has-feedback-left" id="cuenta" readonly="">
                                                            </p>
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <p>
                                                                <b>Contraseña (*)</b>
                                                                <input type="text" style="font-weight:normal;" name="contrasenia" class="form-control has-feedback-left" id="contrasenia" required>
                                                            </p>
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <p>
                                                                (*) Campo Obligatorio
                                                            </p>
                                                        </div>
                                                    </div>
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
                        <form role="form" enctype="multipart/form-data" action="../controller/usuario.actualizar.foto.datos.controller.php" method="post">
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
                                                        Documento (*) <input type="text" class="form-control has-feedback-left" style="font-weight:normal;"
                                                                       id="txtDocID" name="txtDocID" 
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
                                                               <i class="fa fa-camera"></i><input type="file" style="display: none;" multiple accept="image/png,image/jpeg" id="file-upload" name="file-upload">
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
        
        <script src="js/gestionarUsuario.js" type="text/javascript"></script>

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
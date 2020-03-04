<header class="main-header">    
    <a href="menu.principal.view.php"class="logo">      
      <span class="logo-lg"><b><img src="../images/logo_blanco_IPEV.png" class="img-responsive center-block">   </span>
    </a>
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown messages-menu">
            <ul class="dropdown-menu">
              <li>                
                <ul class="menu">
                  <li>
                    <a href="#">
                      <div class="pull-left">
                          <img src="fotos/<?php echo $fotoUsuario; ?>" class="img-responsive" alt="User Image">
                      </div>
                    </a>
                  </li>
                </ul>
              </li>              
            </ul>
          </li>
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="fotos/<?php echo $fotoUsuario; ?>" class="user-image" alt="User Image">
              <span class="hidden-xs"><?php echo $nombreUsuario; ?></span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="fotos/<?php echo $fotoUsuario; ?>" class="img-circle" alt="User Image">

                <p>
                  <?php echo $nombreUsuario; ?>
                    <br>
                </p>
              </li>
              <li class="user-body">
              </li>
              <li class="user-footer">
                <div class="col-md-offset-0">
                    <a href="../controller/sesion.cerrar.controller.php" class="btn btn-default btn-flat col-md-12">
                        <img src="../images/cerrar_1.png"> Cerrar sesión
                    </a>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>
</header>
<aside class="control-sidebar control-sidebar-dark">
    <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
      <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
      <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane" id="control-sidebar-home-tab">
        <h3 class="control-sidebar-heading">Recent Activity</h3>
    </div>
  </aside>
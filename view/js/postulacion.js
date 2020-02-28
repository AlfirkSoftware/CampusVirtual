$(document).ready(function(){
    //Esto se ejecuta cuando carga la página
    //alert("ha cargado la página");
//    cargarComboPais("#cboPais", "seleccione");
//redireccionar();
});


function redireccionar(){
//  window.locationf="../view/misPostulaciones.view.php";
  header ("Location: ../view/misPostulaciones.view.php");
}



$("#frmgrabar").submit(function(event){
    event.preventDefault();
    
    swal({
            title: "Confirme",
            text: "¿Esta seguro de grabar los datos ingresados?",
            showCancelButton: true,
            confirmButtonColor: '#3d9205',
            confirmButtonText: 'Si',
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true,
            imageUrl: "../images/pregunta.png"
    },
    function(isConfirm){ 

        if (isConfirm){ //el usuario hizo clic en el boton SI     
            //procedo a grabar
            //Llamar al controlador para grabar los datos
            
            //var codLab = ($("#txtTipoOperacion").val()==="agregar")? 
            
            var codPos="";
            if ( $("#txtTipoOperacion").val()==="agregar" ){
                codPos = "0";
            }else{
                codPos = $("#txtCodigo").val();
            }
            
            $.post(
                "../controller/postulacion.agregar.editar.controller.php",
                {
                    p_codigo_puesto: $("#txtPuesto").val(),
                    p_tipo_ope: $("#txtTipoOperacion").val(),
                    p_cod_post: codPos
                }
              ).done(function(resultado){                    
                  var datosJSON = resultado;

                  if (datosJSON.estado===200){
                      swal("Exito", datosJSON.mensaje, "success");
                      $("#btncerrar").click(); //Cerrar la ventana 
                            redireccionar();
                      
                  }else{
                      swal("Mensaje del sistema", resultado , "warning");
                  }

              }).fail(function(error){
                    var datosJSON = $.parseJSON( error.responseText );
                    swal("Error", datosJSON.mensaje , "error");
              }) ;
            
        }
    });
    
});


$("#btnagregar").click(function(){
    $("#txtTipoOperacion").val("agregar");
    $("#txtCodigo").val("");
    $("#txtNombre").val("");
    $("#titulomodal").html("");
});


$("#myModal").on("shown.bs.modal", function(){
    $("#txtNombre").focus();
});


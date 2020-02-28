$(document).ready(function(){
    cargarComboTC("#cbotipocomp", "seleccione");
    obtenerParametro(1,"#txtigv");
});

$("#cbotipocomp").change(function(){
    var cod_tip = $("#cbotipocomp").val();
    cargarComboSerie("#cboserie", "seleccione", cod_tip);
});


function generarNumeroComprobante(){
    var tip_com = $("#cbotipocomp").val();
    var serie = $("#cboserie").val();
    
    $.post
    (
	"../controller/comprobante.generar.controller.php",
        {
           p_tip_com: tip_com,
           p_serie: serie
        }
    ).done(function(resultado){
	var datosJSON = resultado;
	
        if (datosJSON.estado===200){
            var nc = datosJSON.datos.nc;
            $("#txtnrocom").val(nc);
            
	}else{
            swal("Mensaje del sistema", resultado , "warning");
        }
    }).fail(function(error){
	var datosJSON = $.parseJSON( error.responseText );
	swal("Error", datosJSON.mensaje , "error");
    });
}

$("#cboserie").change(function(){
    generarNumeroComprobante();
});
        
$("#btnagregar").click(function(){
    if ($("#txtcodigoproducto").val().toString() === ""){
        $("#txtproducto").focus();
        swal("Verifique", "Debe seleccionar un producto", "warning");
        return 0; //detiene el programa
    }
    
    
    //capturar los varlores en variables para luego agregar a la tabla html
    var codigoProd      = $("#txtcodigoproducto").val();
    var nombreProd      = $("#txtproducto").val();
    var precioVenta     = $("#txtprecio").val();
    var cantidadVenta   = $("#txtcantidad").val();
    
    if (cantidadVenta === ""){
        $("#txtcantidad").focus();
        swal("Verifique", "Ingrese la cantidad a vender", "warning");
        return 0; //detiene el programa
    }
    var stock           = $("#txtstock").val();
    var presentacion    = $("#txtpresentacion").val();
    
    var cantidadVentaUnidades = 0;
    
    var unidadVenta = $("#cbounidad").val();
    
    
    if (unidadVenta==="E"){ //Venta de enteros
        cantidadVentaUnidades = cantidadVenta * presentacion;
    }else{
        cantidadVentaUnidades = cantidadVenta;
    }
    
    if (parseInt(cantidadVentaUnidades) > parseInt(stock)){
        $("#txtcantidad").val("");
        $("#txtcantidad").focus();
        swal("Verifique", "El stock es inferior a la cantidad que desea vender", "warning");
        return 0; //detiene el programa
    }
    
    //var importe   = (precioVenta / presentacion) * cantidadVentaUnidades;
    var precioUnidad = 0;
    if (unidadVenta==="F"){ //Venta en fracciones
        precioUnidad = (precioVenta / presentacion);
    }else{
        precioUnidad = precioVenta;
    }
    
    var importe   = (precioVenta / presentacion) * cantidadVentaUnidades;
    
    //Elaborar una variable con el HTML para agregar al detalle
    var fila = '<tr>'+
                    '<td class="text-center">' + codigoProd + '</td>' +
                    '<td>' + nombreProd + '</td>' +
                    '<td class="text-right">' + parseFloat(precioUnidad).toFixed(2) + '</td>' +
                    '<td class="text-right">' + cantidadVenta + '</td>' +
                    '<td class="text-center">' + unidadVenta + '</td>' +
                    '<td class="text-right">' + parseFloat(importe).toFixed(2) + '</td>' +
                    '<td id="col_eliminar" class="text-center"><a href="#"> <i style="font-size:20px;" class="fa fa-close text-danger"></i> </a></td>' +
                '</tr>';
        
        
    //Agregar el registro al detalle de la venta
    $("#detalleventa").append(fila);
    
    calcularTotales();
    
    //Limpiar las cajas de texto
    $("#txtcodigoproducto").val("");
    $("#txtproducto").val("");
    $("#txtprecio").val("");
    $("#txtcantidad").val("");
    $("#txtstock").val("");
    $("#cbounidad").html("");
    $("#cbounidad").val("");
    $("#txtpresentacion").val("");
    $("#txtproducto").focus();
    
    
});

/*Cuando el usuario presione ENTER en el cbounidad, el foco pasarà a la caja de texto txtunidad*/
$("#cbounidad").keypress(function(evento){
    if (evento.which === 13){ //Significa que el usuario ha presionado la tecla ENTER
        evento.preventDefault();
        $("#txtcantidad").focus();
    }
});


$("#txtcantidad").keypress(function(evento){
    if (evento.which === 13){ //Significa que el usuario ha presionado la tecla ENTER
        evento.preventDefault();
        $("#btnagregar").click();
    }
});


function calcularTotales(){
    var subTotal = 0;
    var igv = 0;
    var neto = 0;
    
    $("#detalleventa tr").each(function(){ //Leer cada fila de la tabla donde esta del detalle de la venta, utilizando el ID detalleventa. Como se necesita encontrar cada fila, entonces se lee los "tr"
        var importe = $(this).find("td").eq(5).html(); //Captura la columna 5 de la tabla (Importe) se cuenta desde 0
        neto = neto  + parseFloat(importe);
    });
    
    var porcentajeIGV = parseFloat($("#txtigv").val()); 
    
    subTotal = neto / (1 + (porcentajeIGV / 100));
    igv = neto - subTotal;
    
    //Mostrar los totales en las cajas de texto inferiores
    $("#txtimporteneto").val(neto.toFixed(2));
    $("#txtimportesubtotal").val(subTotal.toFixed(2));
    $("#txtimporteigv").val(igv.toFixed(2));
    
}


$(document).on("click", "#col_eliminar", function(){
    
    var filaEliminar = $(this).parents().get(0); //Capturar la fila que se desea eliminar
    
    swal({
		title: "Confirme",
		text: "¿Desea eliminar el registro seleccionado?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#ff0000',
		confirmButtonText: 'Si',
		cancelButtonText: "No",
		closeOnConfirm: true,
		closeOnCancel: true
	},
	function(isConfirm){ 
            if (isConfirm){ //el usuario hizo clic en el boton SI     
                filaEliminar.remove(); //Elimina la fila seleccionada
                calcularTotales();
                $("#txtproducto").focus();
            }
	});   
});





var arrayDetalle = new Array(); //permite almacenar todos los productos agregados en el detalle de la venta

$("#frmgrabar").submit(function(evento){
    evento.preventDefault(); //Descarta el evento submit que el formulario tiene por default
    
    swal({
        title: "Confirme",
        text: "¿Esta seguro de grabar los datos de la venta?",
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
            
            /*Inicio: capturar los datos del detalle de la venta*/
            
            /*limpiar el array*/
            arrayDetalle.splice(0, arrayDetalle.length);
            
            /*RECORREMOS CADA FILA DE LA TABLA DONDE ESTAN LOS PRODUCTOS VENDIDOS*/
            $("#detalleventa tr").each(function(){
                    var codigo_producto = $(this).find("td").eq(0).html();
                    var cantidad = $(this).find("td").eq(3).html();
                    var unidad = $(this).find("td").eq(4).html();
                    var precio = $(this).find("td").eq(2).html();
                    var importe = $(this).find("td").eq(5).html();
                    
                    var objDetalle = new Object(); //Crear un objeto para almacenar los datos

                    /*declaramos y asignamos los valores a los atributos*/
                    objDetalle.codigo_producto = codigo_producto;
                    objDetalle.cantidad  = cantidad;
                    objDetalle.unidad   = unidad;
                    objDetalle.precio    = precio;
                    objDetalle.importe   = importe;
                    
                    //Almacenar al objeto objDetalle en el array arrayDetalle
                    arrayDetalle.push(objDetalle); 

            });
            /*RECORREMOS CADA FILA DE LA TABLA DONDE ESTAN LOS PRODUCTOS VENDIDOS*/

            //Convertimos el array "arrayDetalle" a formato de JSON
            var jsonDetalle = JSON.stringify(arrayDetalle);

            //alert(jsonDetalle);
            
            /*Fin: capturar los datos del detalle de la venta*/
            
            
            /*Inicio: Cargar los datos que estan en el formulario utilizando el objeto datos_frm*/
            //Estos datos que estan el objeto datos_frm seràn enviados al controlador
            var datos_frm = new FormData();
            datos_frm.append( "p_datos_formulario", $("#frmgrabar").serialize() ); // serialize: capturar los datos del formulario
            datos_frm.append( "p_datosJSONDetalle", jsonDetalle ); // detalle en json
            /*Fin: Cargar los datos que estan en el formulario utilizando el objeto datos_frm*/

            $.ajax({
                type: "post",
                url: "../controller/venta.agregar.controller.php",
                cache: false,
                data: datos_frm,
                processData: false,
                contentType: false,
                success: function(resultado){
                    //alert(resultado);
                    
                    var datosJSON = resultado;
                    if (datosJSON.estado === 200){
                        
                        var td = $("#cbotipocomp").val();
                        var ser = $("#cboserie").val();
                        var nc = datosJSON.datos.nc;
                        var msj = "<h4>Comprobante generado<br><br>TD: <span style='color:#ff0000;'>" + td + "</span> SERIE: <span style='color:#ff0000;'>" + ser + "</span> N.COMP: <span style='color:#ff0000;'>" + nc + "</span></h4>"
                        
                        
                        $("#txtnrocom").val(nc);
                        
                        swal({
                            html:true,
                            title: msj,
                            text: datosJSON.mensaje,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonText: 'Ok',
                            closeOnConfirm: true,
                        },
                        function(){
                            document.location.href="venta.view.php";
                        });
                        
                    }
                },
                error: function(error){
                    var datosJSON = $.parseJSON( error.responseText );
                    swal("Error", datosJSON.mensaje , "error");
                }
            });
           
        }
    });   
});
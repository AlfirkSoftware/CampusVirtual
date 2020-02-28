$(document).ready(function(){
//    //Esto se ejecuta cuando carga la página
//    //alert("ha cargado la página");
//    cargarComboPais("#cboPais", "seleccione");
    listar();
});


function listar(){
    $.post
    (
        "../controller/reporte.resultadoCurriculo.controller.php"
        
    ).done(function(resultado){
        var datosJSON = resultado;
        
        if (datosJSON.estado===200){
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listadoCv" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">CODIGO</th>';
            html += '<th style="text-align: center">CONVOCATORIA</th>';
            html += '<th style="text-align: center">PUESTO</th>';
            html += '<th style="text-align: center">ESTADO</th>';
            html += '<th style="text-align: center">RESULTADOS</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
//                if(item.estado == 'concluido'){
                    html += '<tr>';
                    html += '<td align="center"><a class="text-black">'+item.codigo_puesto_laboral+'</a></td>';
                    html += '<td><a class="text-black">'+item.nombre_convocatoria+'</a></td>';
                    html += '<td><a class="text-black">'+item.nombre_puesto+'</a></td>';
                    html += '<td><a class="text-black">'+item.estado+'</a></td>';
                    html += '<td align="center">';
                    html += '<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myModal" onclick="resultadosCv(' + item.codigo_puesto_laboral + ')"><i class="fa fa-user"></i></button>';
                    html += '</td>';
                    html += '</tr>';
//                }    
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listadoCv").html(html);
            
            
            $('#tabla-listadoCv').dataTable({
                "aaSorting": [[0, "asc"]]
            });
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        //swal("Error", datosJSON.mensaje , "error"); 
    });
}
function resultadosCv(codPost){
      $.post
    (
        "../controller/reporte.resultadoCurriculo.candidatos.controller.php",
            { 
                p_cod_puest: codPost
            }
        
    ).done(function(resultado){
        var datosJSON = resultado;
        var jsonResultado = resultado;
        if (datosJSON.estado===200){
            var html = "";
            $("#txtTipoOperacion").val("editar");
                $("#txtCodigo").val( jsonResultado.datos.codigo_convocatoria );
                $("#titulomodal").html("Cronograma");
            html += '<small>';
            html += '<table id="tabla-listado" class="table table-condensed">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">DOC. ID</th>';
            html += '<th style="text-align: center">NOMBRE</th>';
            html += '<th style="text-align: center">FECHA DE POSTULACIÓN</th>';
            html += '<th style="text-align: center">ESTADO</th>';
//	    html += '<th style="text-align: center">OPCIONES</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
//                if(item.estado == 'concluido'){
                    html += '<tr>';
//                    html += '<td align="center">'+item.codigo_convocatoria+'</td>';
                    html += '<td align="center">'+item.doc_id+'</td>';
                    html += '<td align="center">'+item.nombre+'</td>';
                    html += '<td align="center">'+item.fecha_postulacion+'</td>';
                    html += '<td align="center">'+item.estado+'</td>';
                    html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listado").html(html);
            
            
            $('#tabla-listado').dataTable({
//                "aaSorting": [[1, "desc"]]
            });
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        swal("Error", datosJSON.mensaje , "error"); 
        
    });
}
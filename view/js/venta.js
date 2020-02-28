$(document).ready(function(){
    listar();
});


function listar(){
    /*
    var fecha1 = '2017/06/06';
    var fecha2 = '2017/06/06';
    */
   
    var fecha1 = $("#txtFecha1").val();
    var fecha2 = $("#txtFecha2").val();
    
    $.post
    (
        "../controller/venta.listar.controller.php",
        {
            p_fecha1: fecha1,
            p_fecha2: fecha2
        }
        
    ).done(function(resultado){
        var datosJSON = resultado;
        
        if (datosJSON.estado===200){
            var html = "";

            html += '<small>';
            html += '<table id="tabla-listado" class="table table-bordered table-striped">';
            html += '<thead>';
            html += '<tr style="background-color: #ededed; height:25px;">';
            html += '<th style="text-align: center">OPCIONES</th>';
            html += '<th>FECHA</th>';
            html += '<th>TC</th>';
            html += '<th>SERIE</th>';
            html += '<th>NDOC</th>';
            html += '<th>CLIENTE</th>';
            html += '<th>IMPU</th>';
            html += '<th>S.TOT</th>';
            html += '<th>IGV</th>';
            html += '<th>TOTAL</th>';
            html += '<th>USUARIO</th>';
            html += '<th>ESTADO</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //Detalle
            $.each(datosJSON.datos, function(i,item) {
                //html += '<tr>';
                if (item.estado === "Emitido"){
                    html += '<tr>';
                    html += '<td align="center">';
                    html += '<button type="button" class="btn btn-danger btn-xs" onclick="anular(' + item.nrovta + ')"><i class="fa fa-close"></i></button>';
                    html += '</td>';
                }else{
                    html += '<tr style="text-decoration:line-through; color:red">';
                    html += '<td align="center">';
                    html += '</td>';
                }
                
                html += '<td>'+item.fvta+'</td>';
                html += '<td>'+item.tc+'</td>';
                html += '<td>'+item.nser+'</td>';
                html += '<td>'+item.ndoc+'</td>';
                html += '<td>'+item.cliente+'</td>';
                html += '<td>'+item.porigv+'</td>';
                html += '<td>'+item.subt+'</td>';
                html += '<td>'+item.igv+'</td>';
                html += '<td>'+item.total+'</td>';
                html += '<td>'+item.usuario+'</td>';
                html += '<td>'+item.estado+'</td>';
		html += '</tr>';
            });

            html += '</tbody>';
            html += '</table>';
            html += '</small>';
            
            $("#listado").html(html);
            
            
            $('#tabla-listado').dataTable({
                "aaSorting": [[0, "desc"]],
                "sScrollX":       "100%",
                "sScrollXInner":  "120%"
            });
            
            
            
	}else{
            //swal("Mensaje del sistema", resultado , "warning");
        }
        
    }).fail(function(error){
        var datosJSON = $.parseJSON( error.responseText );
        //swal("Error", datosJSON.mensaje , "error"); 
    });
}



$("#btnFiltrar").click(function(){
    listar();
});

$("#btnagregar").click(function(){
    document.location.href = "venta.agregar.view.php";
});


create or replace function f_registrar_comanda
(
	p_fecha_comanda date,
	p_codigo_mesa integer,
	p_codigo_usuario integer,
	p_detalle_comanda json
)returns integer as
$body$
	declare
		v_numero_comanda int;
		v_comanda_detalle_cursor refcursor; --Sirve para almacenar los registros que devuelve un select
		v_comanda_detalle_registro record; --Sirve para almacenar 1 registro que esta dentgro de una variable refcursor

		--Variables para almacenar los datos del detalle
		v_codigo_producto int;
		v_cantidad int;
		v_precio_venta numeric;
		v_importe numeric;

		v_controla_stock character;
		v_stock int;
		
		
	begin
		begin
			--Generar el número de comanda a registrar
			select f_generar_correlativo('comanda') into v_numero_comanda;
			RAISE NOTICE 'Número de comanda:%',v_numero_comanda;

			--Insertar en la tabla comanda
			INSERT INTO comanda
				(
					numero_comanda, 
					fecha_comanda, 
					codigo_mesa, 
					codigo_usuario
				)
				VALUES 
				(
					v_numero_comanda, 
					p_fecha_comanda, 
					p_codigo_mesa, 
					p_codigo_usuario
				);
			--Insertar en la tabla comanda

			--Actualizar la tabla correlativo
			update correlativo set numero = numero + 1 where tabla = 'comanda';
			--Actualizar la tabla correlativo

			--Implementar un cursor para cargar los datos que vienen del detalle en formato JSON
			open v_comanda_detalle_cursor for
			select
				codigo_producto,
				precio_venta,
				cantidad,
				importe
			from
				json_populate_recordset
				(
					null::comanda_detalle,
					p_detalle_comanda
				);


			--Recorrer los registros que estan dentro del cursor "v_comanda_detalle_cursor"
			loop
				fetch v_comanda_detalle_cursor into v_comanda_detalle_registro;
				if FOUND then
					--Si hay registros pendientes de recorrer
					v_codigo_producto = v_comanda_detalle_registro.codigo_producto;
					v_precio_venta 	  = v_comanda_detalle_registro.precio_venta;
					v_cantidad	  = v_comanda_detalle_registro.cantidad;
					v_importe	  = v_comanda_detalle_registro.importe;

					RAISE NOTICE 'COD_PROD:%  PRECIO:%  CANTIDAD:%  IMPORTE:%', v_codigo_producto, v_precio_venta, v_cantidad, v_importe;


					--Validar que exista stock;
					select 
						controla_stock 
					into 
						v_controla_stock 
					from 
						producto 
					where 
						codigo_producto = v_codigo_producto;


					if v_controla_stock = 'S' then
						select
							stock
						into
							v_stock
						from
							producto
						where 
							codigo_producto = v_codigo_producto;

						--Veficar la cantidad en stock
						if v_stock < v_cantidad then
							RAISE EXCEPTION 'No hay stock suficiente del producto, con código:% El stock actual es:% La cantidad que intenta vender es:%', v_codigo_producto, v_stock, v_cantidad;
						end if;
					end if;

					

					insert into comanda_detalle
					(
						numero_comanda,
						codigo_producto,
						precio_venta,
						cantidad,
						importe
					)
					values
					(
						v_numero_comanda,
						v_codigo_producto,
						v_precio_venta,
						v_cantidad,
						v_importe
					);


					--Actualizar el stock de aquellos productos que se controla el stock
					if v_controla_stock = 'S' then
						update 
							producto
						set
							stock = stock - v_cantidad
						where
							codigo_producto = v_codigo_producto;
					end if;
					
				else
					--No hay registros pendientes de recorrer
					exit;
				end if;
			end loop;


			--Actualizar el estado de la mesa a ocupada(O)
			update
				mesa
			set
				estado = 'O'
			where
				codigo_mesa = p_codigo_mesa;
			

		EXCEPTION
			when others then
				RAISE EXCEPTION '%', SQLERRM;
				--SQLERRM: Obteniene el error que ha ocuurido dentro de la función
		end;
		return 1; --Si retorna 1, siginifica que todo ha grabado corractamente
	end;
	
$body$
language plpgsql;


select f_registrar_comanda
(
	'07-11-2017',
	1,
	1,
	'[
		{"codigo_producto":2,"precio_venta":90,"cantidad":2,"importe":90},
		{"codigo_producto":13,"precio_venta":3,"cantidad":2,"importe":6},
		{"codigo_producto":4,"precio_venta":7,"cantidad":3,"importe":7}
		
	]'
) as resultado;

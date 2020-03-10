CREATE DATABASE campusVirtual_bd

drop database campusVirtual_bd
drop table cargo

CREATE TABLE cargo
(
  cargo_id serial not NULL,
  descripcion character varying(50) NOT NULL,
  CONSTRAINT pk_cargo PRIMARY KEY (cargo_id)
);



CREATE TABLE USUARIO
(
	doc_id character varying(20) not null,
    nombres character varying(50) not null,
    apellidos character varying(50) not null,
	direccion character varying(200) not null,
    telefono character varying(25) not null,
    sexo char(1) not null, -- Mujer: 0, Hombre: 1 
    edad char(2) not null,
    email character varying(150) not null,
    cargo_id integer,
    constraint pk_usuario_doc_id primary key(doc_id),
    constraint fk_usuario_cargo_id foreign key(cargo_id) references cargo(cargo_id),
	CONSTRAINT uni_email UNIQUE (email)
);
-- alter table CREDENCIALES_ACCESO
-- drop column p_foto

select * from CREDENCIALES_ACCESO
CREATE TABLE CREDENCIALES_ACCESO
 ( 	
	codigo_usuario integer not null,
	clave character(32) not NULL,
	tipo char(1) not null, -- Amin: A, Docente: D, Estudiante: E
   -- p_foto bytea,
	estado char(1),
    fecha_registro varchar(50),
    doc_ID varchar(20),
    CONSTRAINT pk_codigo_usuario PRIMARY KEY (codigo_usuario),
    CONSTRAINT fk_usuario_doc_ID foreign key(doc_ID) references 
    USUARIO(doc_ID)
    
 );
 
 CREATE TABLE menu
(
  codigo_menu integer not NULL,
  nombre character varying(50) not NULL,
  CONSTRAINT menu_pkey PRIMARY KEY (codigo_menu)
);

CREATE TABLE menu_item
(
  codigo_menu integer not NULL,
  codigo_menu_item integer not NULL,
  nombre character varying(50) not NULL,
  archivo character varying(100) not NULL,
  CONSTRAINT pk_menu_item PRIMARY KEY (codigo_menu, codigo_menu_item),
  CONSTRAINT fk_menu_item_menu FOREIGN KEY (codigo_menu)
      REFERENCES menu (codigo_menu)
);

CREATE TABLE menu_item_accesos
(
  codigo_menu integer not NULL,
  codigo_menu_item integer not NULL,
  cargo_id integer not NULL,
  acceso character(1) not NULL,
  CONSTRAINT pk_menu_item_accesos PRIMARY KEY (codigo_menu, codigo_menu_item, cargo_id),
  CONSTRAINT fk_menu_item_accesos_cargo_id FOREIGN KEY (cargo_id)
      REFERENCES cargo (cargo_id),
  CONSTRAINT fk_menu_item_accesos_menu_item FOREIGN KEY (codigo_menu, codigo_menu_item)
      REFERENCES menu_item (codigo_menu, codigo_menu_item)
);

CREATE TABLE CURSO
(
	curso_id integer not null,
	nombre_curso varchar(200) not null,
	constraint pk_curso_curso_id primary key(curso_id)
);

CREATE TABLE PRUEBA
(
	prueba_id integer not null,
    cant_preguntas character varying(4) not null,
    tiempo_prueba character varying(50) not null,
    puntaje_aprobacion int not null,
    instrucciones character varying(500) not null,
    curso_id integer,
    constraint pk_prueba_prueba_id primary key(prueba_id),
    constraint fk_prueba_curso_id foreign key(curso_id) references curso (curso_id)
);

CREATE TABLE PREGUNTA
(
	pregunta_id integer not null,
    nombre_pregunta character varying(12000) not null,
    respuesta char(1) null,
    prueba_id integer,
    constraint pk_pregunta_pregunta_id primary key(pregunta_id),
    constraint fk_pregunta_prueba_id foreign key(prueba_id) references prueba(prueba_id)
);

CREATE TABLE RESULTADO_PRUEBA_USUARIO
(
	resultado_prueba_usuario_id integer not null,
    promedio integer not null,
    estado_promedio char(1) not null, -- aquí se comprueba si aprobó o no.
  --  doc_id character varying(20),
    prueba_id integer,
    constraint pk_resultado_prueba_usuario_resultado_prueba_usuario_id primary key(resultado_prueba_usuario_id),
   -- constraint fk_resultado_prueba_usuario_doc_id foreign key(doc_id) references usuario(doc_id),
    constraint fk_resultado_prueba_usuario_prueba_id foreign key(prueba_id) references prueba(prueba_id)
);

CREATE TABLE ANUNCIO
(
	anuncio_id integer not null,
	titulo_evento character varying(200) not null, 
	descripcion_evento varchar(500) not null,
	tipo_anuncio character varying(50)not null,
	constraint pk_anuncio_anuncio_id primary key(anuncio_id)
);

CREATE TABLE DETALLE_USUARIO_CURSO_EVENTO
(
	detalle_usuario_curso_evento_id integer not null,
    fecha character varying(50) not null,
	doc_id character varying(20),
    anuncio_id integer,
    curso_id integer,
    constraint pk_detalle_usuario_curso_evento_detalle_usuario_curso_evento_id primary key(detalle_usuario_curso_evento_id),
    constraint fk_detalle_usuario_curso_evento_doc_id foreign key(doc_id) references usuario(doc_id),
	constraint fk_detalle_usuario_curso_evento_anuncio_id foreign key(anuncio_id) references anuncio(anuncio_id),
    constraint fk_detalle_usuario_curso_evento_curso_id foreign key(curso_id) references curso(curso_id)
);

CREATE TABLE correlativo
 (
	tabla character varying(100) not null,
	numero integer not null,
	CONSTRAINT pk_correlativo PRIMARY KEY (tabla)
 );
 
 select * from cargo
 
 -- Registros
 -- Menú
insert into menu(codigo_menu,nombre)
values(1,'Inicio'); 
insert into menu(codigo_menu,nombre)
values(2,'Anuncio'); 
insert into menu(codigo_menu,nombre)
values(3,'Usuario');
insert into menu(codigo_menu,nombre)
values(4,'Perfil'); 
insert into menu(codigo_menu,nombre)
values(5,'Campus Virtual'); 
insert into menu(codigo_menu,nombre)
values(6,'Simulador'); 

select * from menu_item_accesos
--  Menú item acceso
delete from menu_item_accesos
-- Director General
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,1,1,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,2,1,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,3,1,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(2,4,1,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,5,1,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,6,1,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,7,1,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,8,1,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,9,1,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,10,1,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,11,1,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(6,12,1,1); 

-- select * from menu_item_accesos;
-- Gerente general
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,1,2,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,2,2,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,3,2,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(2,4,2,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,5,2,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,6,2,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,7,2,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,8,2,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,9,2,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,10,2,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,11,2,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(6,12,2,1); 

-- Coordinadora Académica
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,1,3,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,2,3,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,3,3,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(2,4,3,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,5,3,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,6,3,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,7,3,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,8,3,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,9,3,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,10,3,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,11,3,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(6,12,3,1); 

-- Analista Programador
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,1,4,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,2,4,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,3,4,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(2,4,4,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,5,4,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,6,4,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,7,4,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,8,4,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,9,4,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,10,4,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,11,4,2); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(6,12,4,1); 

-- Docente
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,1,5,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,2,5,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,3,5,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(2,4,5,2); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,5,5,2); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,6,5,2); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,7,5,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,8,5,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,9,5,2); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,10,5,1);
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,11,5,2); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(6,12,5,1); 

-- Estudiante
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,1,6,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,2,6,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(1,3,6,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(2,4,6,2); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,5,6,2); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(3,6,6,2); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,7,6,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(4,8,6,1); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,9,6,2); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,10,6,1);
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(5,11,6,2);
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(6,12,6,1); 

--  Menú item
-- delete from menu_item

insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(1,1,'Inicio', 'menu.principal.view.php'); 
insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(1,2,'Eventos', 'eventos.view.php'); 
insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(1,3,'Noticias', 'noticias.view.php'); 
insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(2,4,'Gestionar Anuncios', 'gestionarAnuncios.view.php'); 
insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(3,5,'Gestionar Usuario', 'gestionarUsuario.view.php'); 
insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(3,6,'Reporte Simulador', 'reporteSimulador.view.php'); 
insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(4,7,'Datos Personales', 'datosPersonales.view.php'); 
insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(4,8,'Perfil', 'perfil.view.php'); 
insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(5,9,'Gestionar Curso', 'gestionarCurso.view.php'); 
insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(5,10,'Gestionar Archivo', 'gestionarArchivos.view.php'); 
insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(5,11,'Gestionar Asignación', 'detalleAsignacion.view.php'); 
insert into menu_item(codigo_menu,codigo_menu_item,nombre,archivo)
values(6,12,'Simulador', 'pruebaSimulador.view.php'); 


 -- Correlativo
insert into correlativo(tabla, numero)
values('usuario',0);
insert into correlativo(tabla, numero)
values('cargo',0);
insert into correlativo(tabla, numero)
values('menu',0);
insert into correlativo(tabla, numero)
values('menu_item',0);
insert into correlativo(tabla, numero)
values('menu_item_accesos',0);
insert into correlativo(tabla, numero)
values('credenciales_acceso',0);

insert into correlativo(tabla, numero)
values('curso',0);
insert into correlativo(tabla, numero)
values('prueba',0);
insert into correlativo(tabla, numero)
values('pregunta',0);

insert into correlativo(tabla, numero)
values('anuncio',1);

insert into correlativo(tabla, numero)
values('detalle_usuario_curso_evento',0);

select * from correlativo

-- Rol
select * from usuario

insert into cargo(cargo_id, descripcion)
values(1,'Director general');
insert into cargo(cargo_id, descripcion)
values(2,'Gerente General');
insert into cargo(cargo_id, descripcion)
values(3,'Coordinadora académica');
insert into cargo(cargo_id, descripcion)
values(4,'Analista Programador');
insert into cargo(cargo_id, descripcion)
values(5,'Docente');
insert into cargo(cargo_id, descripcion)
values(6,'Estudiante');
-- Usuario

insert into usuario(doc_id,nombres,apellidos,direccion,telefono,sexo,edad,email,cargo_id)
values('45977448','Juan','Benito casas','Av. Guardia Civil, urb. Proceres #4456. Surco','996456547','M','28', 'juanBenito@hotmail.com',1);

insert into usuario(doc_id,nombres,apellidos,direccion,telefono,sexo,edad,email,cargo_id)
values('12345678','Maria','Trinida Asusta','Av. Guardia Civil, urb. Proceres #4450. Surco','996456514','M','25', 'maritri@hotmail.com',2);

insert into usuario(doc_id,nombres,apellidos,direccion,telefono,sexo,edad,email,cargo_id)
values('87654321','Jacinta','Venecia Chel','Av. Guardia Civil, urb. Proceres #4455. Surco','996456522','M','24', 'jacintabe@hotmail.com',3);

-- Credenciales de acceso
insert into credenciales_acceso(codigo_usuario,clave,tipo,estado,fecha_registro,doc_id)
values(2,(select MD5('123')),'A','A',(select now()), '12345678');

insert into credenciales_acceso(codigo_usuario,clave,tipo,estado,fecha_registro,doc_id)
values(2,(select MD5('123')),'D','A',(select now()), '12345678');

insert into credenciales_acceso(codigo_usuario,clave,tipo,estado,fecha_registro,doc_id)
values(3,(select MD5('123')),'E','A',(select now()), '87654321');

select now()
select MD5('123')

update correlativo
set numero = 3
where tabla = 'usuario';

update correlativo
set numero = 3
where tabla = 'credenciales_acceso';

update correlativo
set numero = 6
where tabla = 'cargo';
-- CONSULTAS:
select * from curso
-- registro de curso
insert into curso(curso_id, nombre_curso)
values(1,'Agile Coach');
insert into curso(curso_id, nombre_curso)
values(2,'Innovation Management');
insert into curso(curso_id, nombre_curso)
values(3,'Kanban');
insert into curso(curso_id, nombre_curso)
values(4,'Scrum Master');
insert into curso(curso_id, nombre_curso)
values(5,'Scrum Foundation');
insert into curso(curso_id, nombre_curso)
values(6,'Scrum Developer');
insert into curso(curso_id, nombre_curso)
values(7,'Scrum Advanced');
insert into curso(curso_id, nombre_curso)
values(8,'Scrum Product Owner');
insert into curso(curso_id, nombre_curso)
values(9,'Iso 27001 Auditor');
insert into curso(curso_id, nombre_curso)
values(10,'Iso 27001 Lead Auditor');
insert into curso(curso_id, nombre_curso)
values(11,'Iso 27001 Foundation');
insert into curso(curso_id, nombre_curso)
values(12,'Iso 22301 Auditor');
insert into curso(curso_id, nombre_curso)
values(13,'Iso 22301 Lead Auditor');
insert into curso(curso_id, nombre_curso)
values(14,'Iso 22301 Foundation');
insert into curso(curso_id, nombre_curso)
values(15,'Iso 20000 Auditor');
insert into curso(curso_id, nombre_curso)
values(16,'Iso 20000 Lead Auditor');
insert into curso(curso_id, nombre_curso)
values(17,'Iso 20000 Foundation');
insert into curso(curso_id, nombre_curso)
values(18,'Cybersecurity');
insert into curso(curso_id, nombre_curso)
values(19,'Six Sigma');
insert into curso(curso_id, nombre_curso)
values(20,'DevOps Essentials');
insert into curso(curso_id, nombre_curso)
values(21,'DevOps Culture');
insert into curso(curso_id, nombre_curso)
values(22,'Marketing Digital');
insert into curso(curso_id, nombre_curso)
values(23,'Big Data');
insert into curso(curso_id, nombre_curso)
values(24,'Design Thinking');
insert into curso(curso_id, nombre_curso)
values(25,'Service Desk');
insert into curso(curso_id, nombre_curso)
values(26,'Agile Business Owner');

-- ANUNCIO

insert into anuncio(anuncio_id,titulo_evento,descripcion_evento,tipo_anuncio)
values(1, 'Big Data 2020','jajknakjnkajnksnkanskas','pago');

-- PREGUNTAS

insert into 
	prueba
	(
		prueba_id,
		cant_preguntas,
		tiempo_prueba,
		puntaje_aprobacion,
		instrucciones,
		curso_id
	)
values(1,40,'15m',60, 'Responda correctamente y despacio.', 1);


-- FUNCIONES:

-- f_generar_correlativo(character varying)

 -- DROP FUNCTION f_generar_correlativo(character varying);

 CREATE OR REPLACE FUNCTION f_generar_correlativo(p_tabla character varying)
  RETURNS SETOF integer AS
 $$
	
	begin
		return query
		select 
			c.numero+1 
		from 
			correlativo c 
		where 
			c.tabla = p_tabla;
 end
 $$ language plpgsql;
 
 -- drop FUNCTION fn_registrarUsuario
 -- FUNCION PARA INSERTAR USUARIO AL SISTEMA
 CREATE OR REPLACE FUNCTION fn_registrarUsuario(
					
					p_codigo_usuario integer, p_doc_id character varying(20), p_nombres character varying(50),
					p_apellidos character varying(50), p_direccion character varying(200), 
	 				p_telefono character varying(25), p_sexo char(1), p_edad char(2), p_email character varying(150), 
	 				p_cargo_id integer,	p_clave character(32),p_tipo char(1),p_estado char(1)
					 )  RETURNS void AS   
 $$
 begin
							
							insert into usuario
									(
										doc_id,nombres,apellidos,direccion,
										telefono,sexo,edad, email,cargo_id
									)
							values
								(
									p_doc_id,p_nombres,p_apellidos,p_direccion,
									p_telefono,p_sexo,p_edad,p_email,p_cargo_id
								);




-- select * from candidato                    
				
								insert into credenciales_acceso(codigo_usuario, clave,tipo,estado,fecha_registro,doc_id) 
								values (p_codigo_usuario,(select md5(p_clave)),p_tipo,p_estado,(select now()),p_doc_id);
 end
 $$ language plpgsql;
 
 select * from credenciales_acceso
  -- FUNCION PARA ACTUALIZAR USUARIO AL SISTEMA
 CREATE OR REPLACE FUNCTION fn_editarUsuario
 								(
									p_codigo_usuario integer, p_doc_id character varying(20), 
									p_nombres character varying(50),p_apellidos character varying(50), 
									p_direccion character varying(200),p_telefono character varying(25), 
									p_sexo char(1), p_edad char(2), p_email character varying(150), 
									p_cargo_id integer,	p_clave character(32),p_tipo char(1),p_estado char(1)
 								)RETURNS void AS
 $$
 begin
 							-- update usuario
 								
								update 
									usuario
								set
									doc_id    = p_doc_id,
									nombres   = p_nombres,
									apellidos = p_apellidos,
									direccion = p_direccion,
									telefono  = p_telefono,
									sexo      = p_sexo,
									edad      = p_edad,
									email     = p_email,
									cargo_id  = p_cargo_id
								where 
									doc_id = p_doc_id;
								
								-- update credenciales_acceso
 								
								update 
									credenciales_acceso
								set
									
									clave  = (select md5(p_clave)),
									tipo   = p_tipo,
									estado = p_estado,
									doc_id = p_doc_id
								where 
									doc_id = p_doc_id;
 
 
 end
 $$ language plpgsql;
 
 -- FUNCIÓN PARA ELIMINAR USUARIO
 CREATE OR REPLACE FUNCTION fn_eliminarUsuario(p_doc_id character varying(20))RETURNS void AS
 
 $$
 BEGIN
 	
				-- Eliminar credenciales_acceso
						delete from credenciales_acceso
						where doc_id = p_doc_id;
						
				-- Eliminar usuario
 						delete from usuario
						where doc_id = p_doc_id;
						
						
 
 end
 $$ language plpgsql;
 
 -- FUNCIÓN PARA REGISTRAR EVENTO O ANUNCIO.
 CREATE OR REPLACE FUNCTION fn_registrarAnuncio
 							(
								p_curso_id integer, p_nombre_curso character varying(200),
								p_detalle_curso_evento_id integer, fecha character varying(50),
								p_evento_id integer, p_titulo_evento character varying(200),
								p_descripcion_evento character varying(500), 
								
							
							)RETURNS void AS
 
 $$
 BEGIN
 	
				-- Eliminar credenciales_acceso
						insert into curso
						
				-- Eliminar usuario
 						delete from usuario
						where doc_id = p_doc_id;
						
						
 
 end
 $$ language plpgsql;
 
select 
	* 
from 
	curso c inner join detalle_curso_evento d
on
	c.curso_id = d.curso_id inner join evento e
on
	d.evento_id = e.evento_id
	
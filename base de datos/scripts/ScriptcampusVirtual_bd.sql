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

CREATE TABLE CREDENCIALES_ACCESO
 ( 	
	codigo_usuario integer not null,
	clave character(32) not NULL,
	tipo char(1) not null, -- Amin: A, Docente: D, Estudiante: E
	-- p_foto varchar(50),
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
    doc_id character varying(20),
    prueba_id integer,
    constraint pk_resultado_prueba_usuario_resultado_prueba_usuario_id primary key(resultado_prueba_usuario_id),
    constraint fk_resultado_prueba_usuario_doc_id foreign key(doc_id) references usuario(doc_id),
    constraint fk_resultado_prueba_usuario_prueba_id foreign key(prueba_id) references prueba(prueba_id)
);


CREATE TABLE EVENTO
(
	evento_id integer not null,
	titulo_evento character varying(200) not null, 
	descripcion_evento varchar(500) not null,
	constraint pk_evento_evento_id primary key(evento_id)
);

CREATE TABLE DETALLE_CURSO_EVENTO
(
	detalle_curso_evento_id integer not null,
    fecha varchar(50) not null,
    evento_id integer,
    curso_id integer,
    constraint pk_detalle_curso_evento_detalle_curso_evento_id primary key(detalle_curso_evento_id),
    constraint fk_detalle_curso_evento_evento_id foreign key(evento_id) references evento(evento_id),
    constraint fk_detalle_curso_evento_curso_id foreign key(curso_id) references curso(curso_id)
);

CREATE TABLE correlativo
 (
	tabla character varying(100) not null,
	numero integer not null,
	CONSTRAINT pk_correlativo PRIMARY KEY (tabla)
 );
 
 select * from menu
 
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

select * from cargo
--  Menú item acceso
select * from cargo
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
values(6,11,1,2); 

select * from menu_item_accesos
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
values(6,11,2,1); 

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
values(6,11,3,1); 

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
values(6,11,4,1); 

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
values(6,11,5,1); 

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
values(5,10,6,2); 
insert into menu_item_accesos(codigo_menu,codigo_menu_item,cargo_id,acceso)
values(6,11,6,1); 

--  Menú item
select * from menu_item

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
values(6,11,'Simulador', 'pruebaSimulador.view.php'); 


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
values('00000000','Juan','Benito casas','Av. Guardia Civil, urb. Proceres #4456. Surco','996456547','M','28', 'juanBenito@hotmail.com',1);

insert into usuario(doc_id,nombres,apellidos,direccion,telefono,sexo,edad,email,cargo_id)
values('00000001','Maria','Trinida Asusta','Av. Guardia Civil, urb. Proceres #4450. Surco','996456514','M','25', 'maritri@hotmail.com',2);

insert into usuario(doc_id,nombres,apellidos,direccion,telefono,sexo,edad,email,cargo_id)
values('00000002','Jacinta','Venecia Chel','Av. Guardia Civil, urb. Proceres #4455. Surco','996456522','M','24', 'jacintabe@hotmail.com',3);

-- Credenciales de acceso
insert into credenciales_acceso(codigo_usuario,clave,tipo,estado,fecha_registro,doc_id)
values(1,(select MD5('123')),'A','A',(select now()), '00000000');

insert into credenciales_acceso(codigo_usuario,clave,tipo,estado,fecha_registro,doc_id)
values(2,(select MD5('123')),'D','A',(select now()), '00000001');

insert into credenciales_acceso(codigo_usuario,clave,tipo,estado,fecha_registro,doc_id)
values(3,(select MD5('123')),'E','A',(select now()), '00000002');

select now()
select MD5('123')
-- CONSULTAS:

select * from credenciales_acceso

select * from usuario

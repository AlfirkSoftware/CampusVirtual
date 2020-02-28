create database campusVirtual;

use campusVirtual;

-- drop database campusvirtual;

CREATE TABLE CARGO
(
	cargo_id int not null,
    nombre_cargo varchar(50) not null,
    constraint pk_cargo_cargo_id primary key(cargo_id)
);

CREATE TABLE USUARIO
(
	doc_id varchar(20) not null,
    nombres varchar(50) not null,
    apellidos varchar(50) not null,
	direccion varchar(200) not null,
    telefono varchar(25) not null,
    sexo char(1) not null, -- Mujer: 0, Hombre: 1 
    edad char(2) not null,
    email varchar(150) not null,
    cargo_id int,
    constraint pk_usuario_doc_id primary key(doc_id),
    constraint fk_usuario_cargo_id foreign key(cargo_id) references cargo(cargo_id)
);

CREATE TABLE CREDENCIALES_ACCESO
(
	codigo_usuario int not null auto_increment,
    clave varchar(100) not null,
    tipo char(1) not null, -- admin: a, docente: d, estudiante: e
    estado char(1) not null, -- a: habilitado, d: deshabilitado
    fecha_registro varchar(20) not null,
    doc_id varchar(20) not null,
    constraint pk_credenciales_acceso_codigo_usuario primary key(codigo_usuario),
    constraint fk_credenciales_acceso_doc_id foreign key(doc_id) references usuario(doc_id)
    
);

CREATE TABLE MENU
(
	codigo_menu int not null,
    nombre varchar(100) not null,
    constraint pk_menu_codigo_menu primary key(codigo_menu)
);

CREATE TABLE MENU_ITEM
(
	codigo_menu int not null,
    codigo_menu_item int not null,
    nombre varchar(100) not null,
    archivo varchar(100) not null,
    constraint pk_menu_item_codigo_menu_codigo_menu_item primary key(codigo_menu, codigo_menu_item),
    constraint fk_menu_item_codigo_menu foreign key(codigo_menu) references menu(codigo_menu)
);

CREATE TABLE MENU_ITEM_ACCESO
(
	codigo_menu int not null,
    codigo_menu_item int not null,
    acceso char(1) not null, -- no: 0, si: 1
    cargo_id int,
    constraint pk_menu_item_acceso_codigo_menu_codigo_menu_item_rol_id primary key(codigo_menu, codigo_menu_item, cargo_id),
    constraint fk_menu_item_acceso_cargo_id foreign key(cargo_id) references cargo(cargo_id),
    constraint fk_menu_item_acceso_codigo_menu_item_codigo_menu foreign key(codigo_menu, codigo_menu_item) references menu_item(codigo_menu, codigo_menu_item)
);
CREATE TABLE CURSO
(
	curso_id int not null,
	nombre_curso varchar(200) not null,
	constraint pk_curso_curso_id primary key(curso_id)
);
CREATE TABLE PRUEBA
(
	prueba_id int not null,
    cant_preguntas varchar(4) not null,
    tiempo_prueba varchar(50) not null,
    puntaje_aprobacion int not null,
    instrucciones varchar(500) not null,
    curso_id int,
    constraint pk_prueba_prueba_id primary key(prueba_id),
    constraint fk_prueba_curso_id foreign key(curso_id) references curso (curso_id)
);

CREATE TABLE PREGUNTA
(
	pregunta_id int not null,
    nombre_pregunta varchar(12000) not null,
    respuesta char(1) null,
    prueba_id int,
    constraint pk_pregunta_pregunta_id primary key(pregunta_id),
    constraint fk_pregunta_prueba_id foreign key(prueba_id) references prueba(prueba_id)
);

CREATE TABLE RESULTADO_PRUEBA_USUARIO
(
	resultado_prueba_usuario_id int not null,
    promedio int not null,
    estado_promedio char(1) not null, -- aquí se comprueba si aprobó o no.
    doc_id varchar(50),
    prueba_id int,
    constraint pk_resultado_prueba_usuario_resultado_prueba_usuario_id primary key(resultado_prueba_usuario_id),
    constraint fk_resultado_prueba_usuario_doc_id foreign key(doc_id) references usuario(doc_id),
    constraint fk_resultado_prueba_usuario_prueba_id foreign key(prueba_id) references prueba(prueba_id)
);



CREATE TABLE EVENTO
(
	evento_id int not null,
	titulo_evento varchar(200) not null, 
	descripcion_evento varchar(500) not null,
	constraint pk_evento_evento_id primary key(evento_id)
);

CREATE TABLE DETALLE_CURSO_EVENTO
(
	detalle_curso_evento_id int not null,
    fecha varchar(50) not null,
    evento_id int,
    curso_id int,
    constraint pk_detalle_curso_evento_detalle_curso_evento_id primary key(detalle_curso_evento_id),
    constraint fk_detalle_curso_evento_evento_id foreign key(evento_id) references evento(evento_id),
    constraint fk_detalle_curso_evento_curso_id foreign key(curso_id) references curso(curso_id)
);
-- Registro
-- Rol
insert into cargo()
values(1,'Director general');
insert into cargo()
values(2,'Gerente General');

insert into cargo()
values(3,'Coordinadora académica');
insert into cargo()
values(4,'Analista Programador');
-- Usuario
insert into usuario()
values('00000000','Juan','Benito casas','Av. Guardia Civil, urb. Proceres #4456. Surco','996456547','M','28', 'juanBenito@hotmail.com',1);

insert into usuario()
values('00000001','Maria','Trinida Asusta','Av. Guardia Civil, urb. Proceres #4450. Surco','996456514','M','25', 'maritri@hotmail.com',2);

insert into usuario()
values('00000002','Jacinta','Venecia Chel','Av. Guardia Civil, urb. Proceres #4455. Surco','996456522','M','24', 'jacintabe@hotmail.com',3);

-- Credenciales de acceso
insert into credenciales_acceso()
values(1,(select MD5('123')),'A','A',(select now()), '00000000');

insert into credenciales_acceso()
values(2,(select MD5('123')),'D','A',(select now()), '00000001');

insert into credenciales_acceso()
values(3,(select MD5('123')),'E','A',(select now()), '00000002');

select now()
select MD5('123')
-- CONSULTAS:

select 
	*
from cargo r inner join usuario u
on
	r.cargo_id = u.cargo_id inner join credenciales_acceso c
on
	u.doc_id = c.doc_id
    







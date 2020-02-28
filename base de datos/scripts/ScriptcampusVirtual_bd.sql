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
 
 -- Registro
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

select 
                            u.doc_ID,
                            u.nombres,
                            u.apellidos,
                            u.direccion,
                            u.telefono,
                            u.sexo,
                            u.edad,
                            r.clave,							
                            r.estado,
                            r.codigo_usuario,							
                            c.descripcion as cargo,
                            c.cargo_id
                    from
                            cargo c inner join usuario u 
                    on 
                            (c.doc_id = u.doc_id) inner join credenciales_acceso r
					
                    where
                            u.email = 'juanBenito@hotmail.com' 
    
	
	
	select 
                            u.doc_id,
                            u.nombres,
                            u.apellidos,
                            u.direccion,
                            u.telefono,
                            u.sexo,
                            u.edad,
                            r.clave,                            
                            r.estado,
                            r.codigo_usuario,                           
                            c.descripcion as cargo,
                            c.cargo_id
                    from
                            cargo c inner join usuario u 
                    on 
                            (c.cargo_id = u.cargo_id) inner join credenciales_acceso r
                    on
                            (r.doc_id = u.doc_id)
                    where
                            u.email = 'juanBenito@hotmail.com'  
							
							select
								u.doc_ID,
								u.nombres,
								u.apellidos,
								u.direccion,
								u.telefono,
								u.sexo,
								u.edad,                          
								c.descripcion
							from 
								usuario u inner join cargo c
							on	
								(u.cargo_id = c.cargo_id)
							where
								u.doc_id = '00000000'
								
								
								
								
								
								
								
select 
                            u.doc_id,
                            u.nombres,
                            u.apellidos,
                            u.direccion,
                            u.telefono,
                            u.sexo,
                            u.edad,
                            r.clave,                            
                            r.estado,
                            r.codigo_usuario,                           
                            c.descripcion as cargo,
                            c.cargo_id
                    from
                            cargo c inner join usuario u 
                    on 
                            (c.cargo_id = u.cargo_id) inner join credenciales_acceso r
                    on
                            (r.doc_id = u.doc_id)
                    where
                            u.email = :p_email 
								


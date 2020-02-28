-- ESTRUCTURA DE LA BASE DE DATOS V2 mejorado 2017-II - SCRIPT
 CREATE DATABASE seleccionpersonal_bd_v2;
	use seleccionpersonal_bd_v2;
	DROP DATABASE seleccionpersonal_bd_v2;

-- TABLAS

CREATE TABLE menu
(
  codigo_menu integer NOT NULL,
  nombre character varying(50) NOT NULL,
  CONSTRAINT menu_pkey PRIMARY KEY (codigo_menu)
);

CREATE TABLE menu_item
(
  codigo_menu integer NOT NULL,
  codigo_menu_item integer NOT NULL,
  nombre character varying(50) NOT NULL,
  archivo character varying(100) NOT NULL,
  CONSTRAINT pk_menu_item PRIMARY KEY (codigo_menu, codigo_menu_item),
  CONSTRAINT fk_menu_item_menu FOREIGN KEY (codigo_menu)
      REFERENCES menu (codigo_menu) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
 CREATE TABLE cargo
(
  codigo_cargo serial NOT NULL,
  descripcion character varying(50) NOT NULL,
  CONSTRAINT pk_cargo PRIMARY KEY (codigo_cargo)
);
CREATE TABLE menu_item_accesos
(
  codigo_menu integer NOT NULL,
  codigo_menu_item integer NOT NULL,
  codigo_cargo integer NOT NULL,
  acceso character(1) NOT NULL,
  CONSTRAINT pk_menu_item_accesos PRIMARY KEY (codigo_menu, codigo_menu_item, codigo_cargo),
  CONSTRAINT fk_menu_item_accesos_cargo FOREIGN KEY (codigo_cargo)
      REFERENCES cargo (codigo_cargo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_menu_item_accesos_menu_item FOREIGN KEY (codigo_menu, codigo_menu_item)
      REFERENCES menu_item (codigo_menu, codigo_menu_item) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

 CREATE TABLE DISPOSICION_LABORAL
 (
	Disposicion_laboral_id integer not null,
	trabaja_actualmente char(2)not null,
	cambio_residencia char(2)not null,
	CONSTRAINT pk_Disposicion_laboral PRIMARY KEY (Disposicion_laboral_id)
 );
 CREATE TABLE CANDIDATO
 (
	-- codigo_candidato integer not null,
    doc_ID character varying(20)not null, 
	nombre character varying(100)not null, 
	apellidos character varying(100)not null,
	direccion character varying(200)not null,  
	telefono character varying(20)not null, 
	hijos character varying(2) not null, 
	departamento_nacimiento character varying(50)not null,
	ciudad_nacimiento character varying(50)not null,
	estado_civil character varying(50)not null,
	sexo character varying(50) not null, 
	edad char(2)not null, 
	email character varying(300)not null,
	Disposicion_laboral_id integer,
	codigo_cargo integer,
	CONSTRAINT pk_doc_ID PRIMARY KEY (doc_ID),
	CONSTRAINT fk_candidato_Disposicion_laboral foreign key(Disposicion_laboral_id) references 
	Disposicion_laboral(Disposicion_laboral_id),
	CONSTRAINT fk_candidato_cargo FOREIGN KEY (codigo_cargo)
        REFERENCES cargo (codigo_cargo),
        CONSTRAINT uni_email UNIQUE (email)
 );
 
 -- Table: correlativo

 CREATE TABLE correlativo
 (
	tabla character varying(100) not null,
	numero integer not null,
	CONSTRAINT pk_correlativo PRIMARY KEY (tabla)
 );
 CREATE TABLE USUARIO
 ( 	
	codigo_usuario integer not null,
	-- p_cuenta varchar(8) not null,
	clave character(32) NOT NULL,
	tipo char(1) not null, -- postulante, jefe de recursos, asistente de recursos, psicólogo, académico
	-- p_foto varchar(50),
	estado char(1) DEFAULT 'P',
    fecha_registro varchar(50),
    doc_ID varchar(20),
    -- codigo_candidato integer,
    CONSTRAINT pk_codigo_usuario PRIMARY KEY (codigo_usuario),
    CONSTRAINT fk_usuario_doc_ID foreign key(doc_ID) references 
    candidato(doc_ID)
    
 );

 
 CREATE TABLE ESTUDIO_CANDIDATO
 (
	codigo_estudio_candidato integer,
	institucion_educativa character varying(100)not null,
	titulo_estudio character varying(100)not null,
	grado_estudio character varying(20)not null, -- universitario, magister, doctorado. MOSTRAR EL ESTUDIO MAS IMPORTANTE.
	fecha_inicio character varying(20)  not null, -- fecha de inicio de una experiencia laboral
	fecha_fin character varying(20)  not null, -- fecha fin de la experiencia laboral que tuvo el candidato
	doc_ID character varying(20),
	CONSTRAINT pk_codigo_estudio_candidato PRIMARY KEY (codigo_estudio_candidato),
	CONSTRAINT fk_estudio_candidato_doc_ID foreign key(doc_ID) references 
	candidato(doc_ID)
 );
 CREATE TABLE EXPERIENCIA_CANDIDATO -- DATO PARA PROFESIOGRAMA
 (
-- EXPERIENCIA DEL CANDIDATO
	codigo_experiencia_candidato integer,
	rubro_empresa character varying(100)not null, -- nombre del rubo de la empresa
	empresa character varying(100)not null,
	puesto character varying(100)not null, -- funciona con un combo de todos los puesto, para una constructora
	lugar character varying(20)not null,-- of:oficina, ob:obra/ca:campo
	descripcion_laboral character varying(500)not null, -- funciones que realizaba
	motivo_cambio varchar(200)not null,-- porque dejó de trabajar
	area character varying(100)not null,
	duracion character varying(100) not null, 
	-- fecha_fin date not null, -- fecha fin de la experiencia laboral que tuvo el candidato
	doc_ID character varying(20),
	CONSTRAINT pk_codigo_experiencia_candidato PRIMARY KEY (codigo_experiencia_candidato),
	CONSTRAINT fk_experiencia_candidato_doc_ID foreign key(doc_ID) references 
	candidato(doc_ID)
 );

insert into estudio_candidato(codigo_estudio_candidato,institucion_educativa,titulo_estudio,grado_estudio,fecha_inicio,fecha_fin,doc_id)
values(1,'-','-','-','-','-','12345678');
update estudio_candidato
set doc_id = '12345678'
where
	codigo_estudio_candidato = 1

  CREATE TABLE CONVOCATORIA
 (
	codigo_convocatoria integer not null,
	nombre_convocatoria character varying(2000)not null,
	estado character varying(50)not null,
	CONSTRAINT pk_codigo_convocatoria PRIMARY KEY (codigo_convocatoria)
	
);

-- alter table CONVOCATORIA alter column nombre_convocatoria type character varying(2000);

  CREATE TABLE ETAPA
 (
	codigo_etapa integer not null,
	nombre_etapa character varying(500) not null,
	CONSTRAINT pk_etapa_id PRIMARY KEY (codigo_etapa)
);
 CREATE TABLE CRONOGRAMA
 (
	codigo_cronograma integer not null,
	fecha_cronograma character varying(100) not null, 
	codigo_convocatoria integer,
	codigo_etapa integer,
	CONSTRAINT pk_codigo_cronograma PRIMARY KEY (codigo_cronograma),
	CONSTRAINT fk_codigo_convocatoria foreign key(codigo_convocatoria) references 
	convocatoria(codigo_convocatoria),
	CONSTRAINT fk_codigo_etapa foreign key(codigo_etapa) references 
	etapa(codigo_etapa)
	
);

CREATE TABLE FORMACION_DESEABLE
(
	codigo_formacion_deseable integer not null,
	formacion_deseable_nombre character varying(200)not null,
	CONSTRAINT pk_codigo_formacion_deseable PRIMARY KEY(codigo_formacion_deseable)
);
CREATE TABLE DEPARTAMENTO
(
	codigo_departamento integer not null,
	departamento_nombre character varying(200)not null,
	CONSTRAINT pk_codigo_departamento PRIMARY KEY(codigo_departamento)
);
 CREATE TABLE PUESTO_LABORAL
 (
	codigo_puesto_laboral integer not null,
	nombre_puesto character varying(100)not null,
	edad character varying(100) not null,
	sexo char(1) not null, -- H:hombre, M:Mujer, C:cualquiera
	-- historia_puesto varchar(200)not null,
	-- posición_organigrama LONGBLOB not null,
	objetivo_puesto character varying(200)not null,
	funciones_puesto character varying(1000)not null, -- funciones del puesto o cotidianas, o habituales y frecuentes
	horario_trabajo character varying(150)not null,
	condiciones_trabajo character varying(500)not null,
	relaciones_sociales_internas character varying(150)not null,
	relaciones_sociales_externas character varying(150)not null,
	responsabilidades character varying(250)not null,
	equipo_de_trabajo character varying(250)not null,
	observaciones_finales character varying(500)not null,
	sueldo int not null,
	-- formacion varchar(200)not null,
	-- experiencia_deseable varchar(200)not null, ESTA EN LA ENTIDAD EXPERIENCIA REQUERIDA
	-- deteccion_necesidad character varying(500)not null,
	-- informacion_empresa character varying(500)not null,
	tipo_jornada character varying(100),
	vacante character varying(3),
	codigo_formacion_deseable integer,
	codigo_departamento integer,
	codigo_convocatoria integer,
	CONSTRAINT pk_codigo_puesto_laboral PRIMARY KEY(codigo_puesto_laboral),
	CONSTRAINT fk_codigo_formacion_deseable foreign key(codigo_formacion_deseable) references 
	formacion_deseable(codigo_formacion_deseable),
	CONSTRAINT fk_codigo_departamento foreign key(codigo_departamento) references 
	departamento(codigo_departamento),
	CONSTRAINT fk_codigo_convocatoria foreign key(codigo_convocatoria) references 
	convocatoria(codigo_convocatoria)
 );
 
  /*
 ALTER TABLE PUESTO_LABORAL
ALTER COLUMN observaciones_finales TYPE character varying(500);

 ALTER TABLE PUESTO_LABORAL
ALTER COLUMN condiciones_trabajo TYPE character varying(500);
*/

  CREATE TABLE FORMACION_LABORAL -- DATO PARA PROFESIOGRAMA
 (
-- FORMACION: El puesto de trabajo requiere cierta formación qu debe tener el candida
	codigo_formacion_laboral integer,
	nombre_formacion_laboral character varying(100)not null, -- SE DEBE MANEJAR UN COMBO PARA COMPARAR CON LA ESPERIENCIA DEL CANDIDATO Y FILTRAR 1
	CONSTRAINT pk_codigo_formacion_laboral PRIMARY KEY(codigo_formacion_laboral)	
 );
  
   CREATE TABLE EXPERIENCIA_LABORAL -- DATO PARA PROFESIOGRAMA
 (
-- EXPERIENCIA: El puesto de trabajo quizás requiere cierta experiencia para cada formación del candidato
	codigo_experiencia_laboral integer,
	nombre_experiencia_laboral character varying(500)not null, -- SE DEBE MANEJAR UN COMBO PARA COMPARAR CON LA ESPERIENCIA DEL CANDIDATO Y FILTRAR 1
    duracion_experiencia_laboral character varying(20) not null, 
	codigo_puesto_laboral integer,
	codigo_formacion_laboral integer,	 
	CONSTRAINT pk_codigo_experiencia_laboral PRIMARY KEY(codigo_experiencia_laboral),
	CONSTRAINT fk_codigo_formacion_laboral foreign key(codigo_formacion_laboral) references 
	FORMACION_LABORAL(codigo_formacion_laboral),
	CONSTRAINT fk_codigo_puesto_laboral foreign key(codigo_puesto_laboral) references 
	puesto_laboral(codigo_puesto_laboral) 
 );

CREATE TABLE TIPO_PRUEBA
 (
	codigo_tipo_prueba integer,
	nombre_tipo_prueba character varying(100) not null,
	constraint pk_codigo_tipo_prueba primary key (codigo_tipo_prueba)
);

 CREATE TABLE PRUEBA
 (
	codigo_prueba integer,
	nombre_prueba character varying(100) not null, 
	instruccion character varying(500) not null,
	duracion character varying(100)not null,
	codigo_tipo_prueba integer,
	codigo_puesto_laboral integer,
	CONSTRAINT pk_codigo_prueba PRIMARY KEY(codigo_prueba),
	CONSTRAINT fk_codigo_tipo_prueba foreign key(codigo_tipo_prueba) 
	references tipo_prueba(codigo_tipo_prueba),
	CONSTRAINT fk_codigo_puesto_laboral foreign key(codigo_puesto_laboral) 
	references puesto_laboral(codigo_puesto_laboral)
);

 CREATE TABLE PONDERACION_DESEABLE
 (
	codigo_ponderacion_deseable integer not null,
	ponderacion_deseable_minimo integer not null,
	ponderacion_deseable_maximo integer not null,
	valoracion character varying(50) not null,
	estado character varying(50)not null,
	codigo_prueba integer,
	CONSTRAINT pk_codigo_ponderacion_deseable PRIMARY KEY(codigo_ponderacion_deseable),
	CONSTRAINT fk_codigo_prueba foreign key(codigo_prueba) 
	references prueba(codigo_prueba)
);

 CREATE TABLE PROMEDIO_PRUEBA
 (	
	codigo_promedio_prueba integer,
	promedio float default 0, 
	estado_promedio character varying(50),
	codigo_prueba integer,
	doc_id character varying(20),
	CONSTRAINT pk_codigo_promedio_prueba PRIMARY KEY(codigo_promedio_prueba),
	CONSTRAINT fk_codigo_prueba foreign key(codigo_prueba) 
	references prueba(codigo_prueba),
	CONSTRAINT fk_doc_id foreign key(doc_id) 
	references candidato(doc_id),
	UNIQUE (doc_id,codigo_prueba)
);
-- drop table PROMEDIO_PRUEBA
-- ALTER TABLE PROMEDIO_PRUEBA
-- ADD pruebas_valoradas int; -- numero de pruebas valoradas; es decir que tienen el estado 'C'


CREATE TABLE PREGUNTA
 (
	codigo_pregunta integer,
	numero_pregunta character varying(5),
	nombre_pregunta character varying(10000) not null,
	puntaje_correcto float not null,
	puntaje_incorrecto float not null,
	respuesta char(1)not null,
	-- respuesta_candidato char(1),
	estado character varying(50),
	codigo_prueba integer,
	CONSTRAINT pk_codigo_pregunta_numero_pregunta primary key(codigo_pregunta,numero_pregunta),
	CONSTRAINT fk_codigo_prueba foreign key(codigo_prueba) references 
	prueba(codigo_prueba),
	constraint UQ_codigo_prueba_numero_pregunta
	unique (codigo_prueba,numero_pregunta)
); 
alter table PREGUNTA
drop column respuesta_candidato
-- alter table PREGUNTA
--   add constraint UQ_codigo_pregunta_numero_pregunta
--   unique (codigo_prueba,numero_pregunta);
  
-- drop table pregunta
-- drop table RESPUESTA_CANDIDATO
-- ALTER TABLE PREGUNTA MODIFY nombre_pregunta varchar(10000);

CREATE TABLE RESPUESTA_CANDIDATO
 (
    codigo_respuesta_candidato integer,
    respuesta_candidato char(1)not null,
    doc_id character varying(20)not null,
    puntaje_correcto float, -- puntaje correcto - puntaje incorrecto de una pregunta (comparar respuesta pregunta, con respuesta candidato)
    puntaje_incorrecto float,
    estado character varying(100),
    codigo_pregunta int,
    numero_pregunta character varying(5),
    CONSTRAINT pk_codigo_respuesta_candidato primary key(codigo_respuesta_candidato),
    CONSTRAINT fk_codigo_pregunta_numero_pregunta foreign key(codigo_pregunta,numero_pregunta) references 
    pregunta(codigo_pregunta,numero_pregunta),		
    constraint codigo_pregunta_numero_pregunta_doc_id_uniq unique(codigo_pregunta,numero_pregunta,doc_id)
);
 CREATE TABLE FINALISTA (
    codigo_finalista integer,
    doc_id character varying(20),
    nombres character varying(100),
    apellidos character varying(100),
    email character varying(200),
    celular character varying(20),
    estado character(2),
    codigo_puesto_laboral int,
    CONSTRAINT pk_codigo_finalista primary key(codigo_finalista),
    CONSTRAINT fk_codigo_puesto_laboral foreign key(codigo_puesto_laboral) references 
    puesto_laboral(codigo_puesto_laboral),		
    constraint doc_id_codigo_puesto_uniq unique(doc_id,codigo_puesto_laboral)	
);

CREATE TABLE postulacion
    (
   -- postulacion_id INT NOT NULL AUTO_INCREMENT unique,
    codgio_postulacion integer not null,
    doc_id character varying(20),
    nombre character varying(100),
    estado character varying(100), -- SH: Si Habilitado, NH: No Hablitado, paso o no el filtro curricular
    fecha_postulacion character varying(100),
    finalista character varying(50),
    codigo_puesto_laboral integer,
    -- PRIMARY KEY (doc_id,puesto_laboral_id),
    CONSTRAINT PK_codigo_postulacion primary key(codgio_postulacion),
    CONSTRAINT fk_codigo_puesto_laboral foreign key(codigo_puesto_laboral) references puesto_laboral(codigo_puesto_laboral)
    );
    alter table postulacion
    add constraint uniq_doc_id_codigo_puesto_laboral unique(doc_id,codigo_puesto_laboral);

 
-- Agregar los nombres de las tablas a la tabla correlativo
insert into correlativo(tabla, numero)
values('candidato',0);
insert into correlativo(tabla, numero)
values('cargo',0);
insert into correlativo(tabla, numero)
values('convocatoria',0);
insert into correlativo(tabla, numero)
values('cronograma',0);
insert into correlativo(tabla, numero)
values('departamento',0);
insert into correlativo(tabla, numero)
values('disposicion_laboral',0);
insert into correlativo(tabla, numero)
values('estudio_candidato',0);
insert into correlativo(tabla, numero)
values('etapa',0);
insert into correlativo(tabla, numero)
values('experiencia_candidato',0);
insert into correlativo(tabla, numero)
values('experiencia_laboral',0);
insert into correlativo(tabla, numero)
values('finalista',0);
insert into correlativo(tabla, numero)
values('formacion_laboral',0);
insert into correlativo(tabla, numero)
values('menu',0);
insert into correlativo(tabla, numero)
values('menu_item',0);
insert into correlativo(tabla, numero)
values('menu_item_accesos',0);
insert into correlativo(tabla, numero)
values('ponderacion_deseable',0);
insert into correlativo(tabla, numero)
values('postulacion',0);
insert into correlativo(tabla, numero)
values('pregunta',0);
insert into correlativo(tabla, numero)
values('promedio_prueba',0);
insert into correlativo(tabla, numero)
values('prueba',0);
insert into correlativo(tabla, numero)
values('puesto_laboral',0);
insert into correlativo(tabla, numero)
values('respuesta_candidato',0);
insert into correlativo(tabla, numero)
values('tipo_prueba',0);
insert into correlativo(tabla, numero)
values('usuario',0);



select*from correlativo
-- drop table cronograma
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

select * from DISPOSICION_LABORAL

 -- FUNCION PARA INSERTAR USUARIO AL SISTEMA
 CREATE OR REPLACE FUNCTION fn_registrarCandidato(
					
					p_codigo_usuario integer, p_doc_id character varying(20), p_nombre character varying(100),
					p_apellidos character varying(100), p_direccion character varying(200), p_celular character varying(20),
					p_hijos character varying(2), p_departamento_nacimiento character varying(50),
					p_ciudad_nacimiento character varying(50), p_estado_civil character varying(20),
					p_sexo character varying(20), p_edad char(2), p_email character varying(200),
					p_clave character(32)
					 )  RETURNS void AS   
 $$
 begin
									
	
							insert into candidato
									(
									doc_id,nombre,apellidos,direccion,telefono,hijos,
									departamento_nacimiento,ciudad_nacimiento,estado_civil,
									sexo,edad,email, codigo_cargo
									)
							values(
									p_doc_id,p_nombre,p_apellidos,p_direccion,p_celular,p_hijos,
									p_departamento_nacimiento,p_ciudad_nacimiento,p_estado_civil,
									p_sexo,p_edad,p_email, 2
									
									);




-- select * from candidato                    
				
								insert into usuario(codigo_usuario, clave,tipo,estado,fecha_registro,doc_id) 
								values (p_codigo_usuario,(select md5(p_clave)),'P','A',(select now()),p_doc_id);
 end
 $$ language plpgsql;



-- probando funcion 

update 
                    candidato 
                set 
                    doc_id = '12345678',
                    nombre = 'Pedrito Jorge',
                    apellidos = 'Vasquez Ortiz',
                    direccion = 'La Victoria',
                    telefono = '987456547',
                    hijos = '0',
                    departamento_nacimiento = 'Lambayeque',
                    ciudad_nacimiento = 'Chiclayo',
                    estado_civil = 'Soltero',
                    sexo = 'Hombre',
                    edad = '24',
                    email = 'pedro@hotmail.com'
                where
                    doc_id = '12345678';
select * from usuario

select * from fn_registrarCandidato 
                                                (
                                               
                                                1,'45977448','Juanito','Vasquez','La Victoria',
                                                '979747415', '0', 'Lambayeque', 'Chiclayo',
                                                'Soltero', 'Hombre', '25', 'juanito@hotmail.com',
                                                '123'
                                                );


					op1, op2, 
					p_codigo_candidato, p_doc_id, p_nombre,
					p_apellidos, p_direccion, p_celular,
					p_hijos, p_departamento_nacimiento,
					p_ciudad_nacimiento, p_estado_civil,
					p_sexo, p_edad, p_email,
					p_clave, 


select * from usuario
insert into DISPOSICION_LABORAL(Disposicion_laboral_id,trabaja_actualmente, cambio_residencia)
values(1,'Si','Si');
insert into DISPOSICION_LABORAL(Disposicion_laboral_id,trabaja_actualmente, cambio_residencia)
values(2,'Si','No');
insert into DISPOSICION_LABORAL(Disposicion_laboral_id,trabaja_actualmente, cambio_residencia)
values(3,'No','No');
insert into DISPOSICION_LABORAL(Disposicion_laboral_id,trabaja_actualmente, cambio_residencia)
values(4,'No','Si');




select 
	*
from
	candidato c inner join usuario u 
on 
	(c.doc_id = u.doc_id)
where
	c.email = :p_mail

select * from convocatoria
-- CONSULTA DEL SABER EL CRONOGRAMA DE LA CONVOCATORIA CON SUS ETAPAS
select 
                        distinct(c.codigo_convocatoria),
                        c.nombre_convocatoria,
                        c.estado,
                        r.fecha_cronograma
                    from
                        convocatoria c right join cronograma r 
                    on
			(c.codigo_convocatoria = r.codigo_convocatoria)right join etapa e
		    on 
			(e.codigo_etapa = r.codigo_etapa)
                    where
                        c.estado = 'concluido'
                    order by 
                            2


                            select * from cronograma 

select 
                        c.codigo_cronograma,
                        c.fecha_cronograma,
                        e.nombre_etapa
                        
                    from 
                        cronograma c inner join etapa e
                    on
                        (c.codigo_etapa = e.codigo_etapa)
                    where 
                        c.codigo_convocatoria = 1




select 		
                    distinct r.fecha_cronograma,
                    e.nombre_etapa,
                    e.codigo_etapa
                 from 
                    convocatoria c inner join cronograma r
                 on
                    (c.codigo_convocatoria = r.codigo_convocatoria) inner join etapa e
                 on
                    (r.codigo_etapa = e.codigo_etapa)




select 
                        c.codigo_cronograma,
                        c.fecha_cronograma,
                        e.nombre_etapa
                    from 
                        cronograma c inner join etapa e
                    on
                        (c.codigo_etapa = e.codigo_etapa)
                    where 
                        c.codigo_convocatoria = 2
                    order by 
                            1

                        
insert into convocatoria
	(
	codigo_convocatoria,nombre_convocatoria,estado
	)
values
	(
	2,'Creación del servicio de saneamiento de los anexos Cruzpampa, 
	Esmeralda y Tambopata, ampliación y mejoramiento del servicio de 
	agua potable en Chiclayo','concluido'
	);


	select 
		codigo_puesto_laboral,
		nombre_puesto,
		tipo_jornada,
		sueldo
	from
		puesto_laboral
	where
		codigo_convocatoria = 2
-- Insertar registro en etapa

	insert into etapa 
	values
		(
		1,
		'En esta primera etapa se recepciona la postulación 
		de los candidatos, para que luego el sistema 
		evalúe el currículo y determine si está o no 
		apto para ser sometido a evaluación.'
		);
	insert into etapa 
	values
		(
		2,
		'En esta segunda etapa se muestra el resultado de 
		las evaluaciones y se determina quién pasa a 
		entrevista final realizado por la gerencia.'
		);
	insert into etapa 
	values
		(
		3,
		'En esta última etapa se publica el resultado de 
		de la entrevista, dando como seleccionado al
		candidato idóneo al puesto de trabajo.'
		);	

-- FUNCIÓN PARA INSERTAR formación y experiencia
 CREATE OR REPLACE FUNCTION fn_registrarFormacionExperiencia(
	 
	 				-- p_codigo_experiencia_laboral integer,
	 				p_codigo_puesto_laboral      integer,
	 				p_codigo_formacion_laboral   integer,
	 				p_nombre_formacion_laboral   character varying(100),
	 				p_nombre_experiencia_laboral character varying(500)
	 
					 )  RETURNS void AS   
 $$
 	DECLARE 
		_codigo_experiencia_laboral int;
 begin		
 	
	 _codigo_experiencia_laboral = (select count(codigo_experiencia_laboral)+1 from experiencia_laboral);
 		-- --------------------------------------------------------------
	        insert into formacion_laboral
									(
										codigo_formacion_laboral, 
										nombre_formacion_laboral
									)
			values 
				(
					p_codigo_formacion_laboral, 
					p_nombre_formacion_laboral
				);
                 
		-- --------------------------------------------------------------
			insert into experiencia_laboral
									(
										codigo_experiencia_laboral, 
										nombre_experiencia_laboral, 
										codigo_puesto_laboral, 
										codigo_formacion_laboral
									)
			values 
				(
					_codigo_experiencia_laboral, 
					p_nombre_experiencia_laboral, 
					p_codigo_puesto_laboral, 
					p_codigo_formacion_laboral
				);
                    
 end
 $$ language plpgsql;	

select * from experiencia_laboral;
select * from formacion_laboral;

delete from formacion_laboral
select * from puesto_laboral;
select * from formacion_laboral;

 select * from fn_registrarFormacionExperiencia 
                                                (
													1,
													1,
													'Topógrafo',
													'1 año en mediciones de áreas, usando estandares de calidad.
													 1 año como asistente de topografía en base a expedientes técnicos'
                                                );


-----------------------------------------------------------------------------


-- FUNCIÓN PARA INSERTAR CONVOCATORIA, CRONOGRAMA Y ETAPA
 CREATE OR REPLACE FUNCTION fn_registrarConvocatoria(
					
					P_codigo_convocatoria integer,
					p_nombre_convocatoria character varying(200),
					-- p_etapa1 character varying(500),
					-- p_fecha_cronograma1 character varying(100), 
					-- p_etapa2 character varying(500),
					-- p_fecha_cronograma2 character varying(100), 
					-- p_etapa3 character varying(500),
					-- p_fecha_cronograma3 character varying(100)
					 )  RETURNS void AS   
 $$
 begin
	-- DECLARE _puesto_laboral_id int;
    -- DECLARE _convocatoria_id int;
	-- set _puesto_laboral_id = (select max(puesto_laboral_id) from puesto_laboral);
    
-- ------------------------------------------------------------------------									
	            insert into convocatoria(codigo_convocatoria, nombre_convocatoria, estado)
                    values(P_codigo_convocatoria,p_nombre_convocatoria,'No Publicado');
                   /* insert into etapa(nombre_etapa)
                    values(p_etapa1);
                    insert into etapa(nombre_etapa)
                    values(p_etapa2);
                    insert into etapa(nombre_etapa)
                    values(p_etapa3);*/
   -- set _convocatoria_id = (select max(convocatoria_id) from convocatoria);                
    
					-- update puesto_laboral
                    -- set convocatoria_id = _convocatoria_id
                    -- where puesto_laboral_id = _puesto_laboral_id;
                    
                    insert into cronograma(fecha_cronograma,codigo_convocatoria,codigo_etapa)
                    values(p_fecha_cronograma1,P_codigo_convocatoria,1);
                    insert into cronograma(fecha_cronograma,codigo_convocatoria,codigo_etapa)
                    values(p_fecha_cronograma2,P_codigo_convocatoria,2);
                    insert into cronograma(fecha_cronograma,codigo_convocatoria,codigo_etapa)
                    values(p_fecha_cronograma3,P_codigo_convocatoria,3);
 end
 $$ language plpgsql;	

 select * from fn_registrarConvocatoria 
                                                (
                                               
                                                1,
                                                'Creación del servicio de saneamiento de 
                                                los anexos Cruzpampa, Esmeralda y Tambopata',
                                                'del 20 al 25 de setiembre',
                                                'del 20 al 25 de setiembre',
                                                'del 20 al 25 de setiembre'
                                                );


-----------------------------------------------------------------------------
-- FUNCIÓN DE INSERTAR CRITERIOS
/*
CREATE OR REPLACE FUNCTION fn_registrarCriterio(
				    
				    p_ponderacion_deseable_minimo1 integer,
                                    p_ponderacion_deseable_maximo1 integer,
                                    p_valoracion1 integer,
                                    p_estado1 character varying(50),
                                    p_ponderacion_deseable_minimo2 integer,
                                    p_ponderacion_deseable_maximo2 integer,
                                    p_valoracion2 integer,
                                    p_estado2 character varying(50),
                                    p_ponderacion_deseable_minimo3 integer,
                                    p_ponderacion_deseable_maximo3 integer,
                                    p_valoracion3 integer,
                                    p_estado3 character varying(50),
                                    p_ponderacion_deseable_minimo4 integer,
                                    p_ponderacion_deseable_maximo4 integer,
                                    p_valoracion4 integer,
                                    p_estado4 character varying(50),
                                    p_ponderacion_deseable_minimo5 integer,
                                    p_ponderacion_deseable_maximo5 integer,
                                    p_valoracion5 integer,
                                    p_estado5 character varying(50),
                                    p_codigo_prueba integer
				)  RETURNS void AS   
 $$
 begin   
        -- 1
		insert into ponderacion_deseable
									(
					ponderacion_deseable_minimo,
                                        ponderacion_deseable_maximo,
                                        valoracion,
                                        estado,
                                        codigo_prueba
									)
		values(
		p_ponderacion_deseable_minimo1,
                p_ponderacion_deseable_maximo1,
                p_valoracion1,
                p_estado1,
                p_codigo_prueba
			);
            -- 2
		insert into ponderacion_deseable
									(
					ponderacion_deseable_minimo,
                                        ponderacion_deseable_maximo,
                                        valoracion,
                                        estado,
                                        codigo_prueba
									)
		values(
		p_ponderacion_deseable_minimo2,
                p_ponderacion_deseable_maximo2,
                p_valoracion2,
                p_estado2,
                p_codigo_prueba
			);
            -- 3
		insert into ponderacion_deseable
									(
					ponderacion_deseable_minimo,
                                        ponderacion_deseable_maximo,
                                        valoracion,
                                        estado,
                                        codigo_prueba
									)
		values(
		p_ponderacion_deseable_minimo3,
                p_ponderacion_deseable_maximo3,
                p_valoracion3,
                p_estado3,
                p_codigo_prueba
			);
            -- 4
		insert into ponderacion_deseable
									(
					ponderacion_deseable_minimo,
                                        ponderacion_deseable_maximo,
                                        valoracion,
                                        estado,
                                        codigo_prueba
									)
		values(
		p_ponderacion_deseable_minimo4,
                p_ponderacion_deseable_maximo4,
                p_valoracion4,
                p_estado4,
                p_codigo_prueba
			);
            -- 5
		insert into ponderacion_deseable
									(
					ponderacion_deseable_minimo,
                                        ponderacion_deseable_maximo,
                                        valoracion,
                                        estado,
                                        codigo_prueba
									)
		values(
		p_ponderacion_deseable_minimo5,
                p_ponderacion_deseable_maximo5,
                p_valoracion5,
                p_estado5,
                p_codigo_prueba
			);
        
  end
 $$ language plpgsql;	
 
 drop function fn_registrarCriterio();
 
 select * from fn_registrarCriterio(
				    1,
                                    1,
                                    1,
                                    'Correcto',
                                    1,
                                    1,
                                    1,
                                    'Correcto',
                                    1,
                                    1,
                                    1,
                                    'Correcto',
                                    1,
                                    1,
                                    1,
                                    'Correcto',
                                    1,
                                    1,
                                    1,
                                    'Correcto',
                                    1
			   );


*/

	select
		count(*)
	from 
		experiencia_requerida er inner join experiencia_laboral el
	on
		(er.experiencia_requerida = el.puesto) = (select count (*) from experiencia_requerida)



-- ----------------------------------------------------------------------------------------
-- FUNCION: CALIFICAR PREGUNTAS

 CREATE OR REPLACE FUNCTION fn_CalificarPreguntas (
					p_doc_id character varying(20),
					p_respuesta_candidato character(1),
					-- p_codigo_prueba integer,
					p_codigo_respuesta_candidato integer,
					p_codigo_pregunta integer,
					p_numero_pregunta character varying(5)
				)  RETURNS void AS 
  $$
  declare
  -- respCandidato integer;
  -- respPregunta integer;
  puntaje_correcto_candidato double precision;
  puntaje_incorrecto_candidato double precision;
  numero_pregunta_candidato character varying(5);

  begin   

-----------------------------------------------------------------------------
-- puntaje correcto del candidato
	/* select	
		p.puntaje_correcto into puntaje_correcto_candidato
	from 
		pregunta p inner join respuesta_candidato r 
	on
		(p.codigo_pregunta = r.codigo_pregunta)
	where 
		p.codigo_pregunta = p_codigo_pregunta;
*/
-----------------------------------------------------------------------------
-- puntaje incorrecto del candidato
	select	
		p.puntaje_incorrecto into puntaje_incorrecto_candidato
	from 
		pregunta p inner join respuesta_candidato r 
	on
		(p.codigo_pregunta = r.codigo_pregunta)
	where 
		p.codigo_pregunta = p_codigo_pregunta;
-----------------------------------------------------------------------------
-- numero pregunta del candidato
	/*select	
		r.numero_pregunta into numero_pregunta_candidato
	from 
		pregunta p inner join respuesta_candidato r 
	on
		(p.codigo_pregunta = r.codigo_pregunta)
	where 
		p.codigo_prueba = p_codigo_prueba and 
		p.numero_pregunta  = p_numero_pregunta;	
	*/	
		if
		   (select count(respuesta) from pregunta where codigo_pregunta = p_codigo_pregunta and respuesta = p_respuesta_candidato) = 1 THEN
			

				INSERT INTO respuesta_candidato
                                                    (
                                                    codigo_respuesta_candidato, 
                                                    respuesta_candidato, 
                                                    doc_id,
                                                    puntaje_correcto,
                                                    puntaje_incorrecto,
                                                    codigo_pregunta,
                                                    numero_pregunta
                                                    )
				VALUES (
					p_codigo_respuesta_candidato, 
					p_respuesta_candidato, 
					p_doc_id, 
					(select	
						p.puntaje_correcto 
					from 
						pregunta p 
					where 
						p.codigo_pregunta = p_codigo_pregunta),
					0,
					p_codigo_pregunta,
					p_numero_pregunta
					);
		else
				INSERT INTO respuesta_candidato
                                                    (
                                                    codigo_respuesta_candidato, 
                                                    respuesta_candidato, 
                                                    doc_id,
                                                    puntaje_correcto,
                                                    puntaje_incorrecto,
                                                    codigo_pregunta,
                                                    numero_pregunta
                                                    )
				VALUES (
					p_codigo_respuesta_candidato, 
					p_respuesta_candidato, 
					p_doc_id, 
					0,
					(select	
						p.puntaje_incorrecto 
					from 
						pregunta p 
					where 
						p.codigo_pregunta = p_codigo_pregunta),
					p_codigo_pregunta,
					p_numero_pregunta
					);
		

		end if;
 end;
 $$ language plpgsql;	

 select * from fn_CalificarPreguntas(
				    '45977448',
				    'a',
                                    1,
                                    22,
                                   '1'
			   );


-- ----------------------------------------------------------------------------------------
-- FUNCION: CALIFICAR PRUEBA

 CREATE OR REPLACE FUNCTION fn_CalificarPrueba(
					p_doc_id character varying(20),
					p_codigo_prueba integer,
					p_codigo_promedio_prueba integer
					-- p_nombres character varying(100), 
					-- p_apellidos character varying(100), 
					-- p_email character varying(300), 
					-- p_celular character varying(20)
					
				)  RETURNS void AS 
  $$
  declare
  
  total_puntaje_correcto_candidato double precision;
  total_puntaje_incorrecto_candidato double precision;
  promedio_prueba_candidato double precision;

  begin   

-----------------------------------------------------------------------------
-- total puntaje correcto del candidato
	 select	
		(sum(r.puntaje_correcto)-
		sum(r.puntaje_incorrecto)) into promedio_prueba_candidato
	from 
		pregunta p inner join respuesta_candidato r 
	on
		(p.codigo_pregunta = r.codigo_pregunta)
	where 
		p.codigo_prueba = p_codigo_prueba and
		r.doc_id = p_doc_id;
-----------------------------------------------------------------------------
-- Insertamos valores a la tabla pomedio prueba.		
				INSERT INTO promedio_prueba( 
							codigo_promedio_prueba,
							promedio, 
							-- estado_promedio, 
							codigo_prueba, 
							doc_id
							)
				    VALUES (
						p_codigo_promedio_prueba,
						promedio_prueba_candidato, 
						p_codigo_prueba, 
						p_doc_id 
					   );

			if(select p.estado from ponderacion_deseable p inner join promedio_prueba r on (p.codigo_prueba = r.codigo_prueba)
				where r.doc_id = p_doc_id and p.codigo_prueba = 1 and promedio between p.ponderacion_deseable_minimo and p.ponderacion_deseable_maximo
			  ) = 'Correcto' then

				  update 
					promedio_prueba
				  set 
					estado_promedio = 'Correcto'
				  where
					codigo_promedio_prueba = p_codigo_promedio_prueba;				
			else
				 update 
					promedio_prueba
				  set 
					estado_promedio = 'Incorrecto'
				  where
					codigo_promedio_prueba = p_codigo_promedio_prueba;
			end if;
 end;
 $$ language plpgsql;	

  select * from fn_CalificarPrueba(
				    '12345678',
				    1,
				    2				
			   );

-- ----------------------------------------------------------------------------------------
-- FUNCION: Candidatos que han superado las evaluaciones y ahora pasarían a entrevista final

				select
					c.doc_id,nombre,apellidos
				from
					candidato c inner join promedio_prueba p 
				on
					(p.doc_id = c.doc_id)inner join prueba r
				on
					(p.codigo_prueba = r.codigo_prueba)inner join puesto_laboral l
				on
					(r.codigo_puesto_laboral = l.codigo_puesto_laboral)
				where
					p.estado_promedio = 'Correcto' and
					l.codigo_puesto_laboral = p_codigo_puesto_laboral;
					
-- CONSULTA PARA SELECCIONAR AL CANDIDATO QUE A SUPERADO LAS EVALUACIONES

select*from experiencia_laboral

update usuario
set tipo ='A'
where codigo_usuario = 2;

update candidato
set codigo_cargo =1
where doc_id = '12345678';


select 
                        e.codigo_puesto_laboral, 
                        f.nombre_formacion_laboral, 
                        e.nombre_experiencia_laboral 
                    from 
                        formacion_laboral f inner join experiencia_laboral e
                    on 
                        f.codigo_formacion_laboral = e.codigo_formacion_laboral
                    where f.codigo_formacion_laboral = 1;
					
select * from experiencia_laboral 
                    where codigo_formacion_laboral = 1;
					
					
					
UPDATE 
                    experiencia_requerida
                SET 
                    experiencia_requerida = :p_nomb_req, 
                    duracion = :p_dur, 
                    codigo_puesto_laboral = :p_codigo_puesto
                where
                    codigo_experiencia_requerida = :p_cod_req
					
					
					delete from 
                    formacion_laboral 
                where
                    codigo_experiencia_requerida = :p_cod_req
					
					
					
-- CONSULTA PARA FILTRAR CV, FECHA: 15/11/2019

CREATE OR REPLACE FUNCTION fn_FiltroCurriculo(
					p_codigo_postulacion integer,
					p_doc_id character varying(20),
					p_codigo_puesto_laboral integer
					
				)  RETURNS void AS 
  $$
  		
  begin   
  	
-- CREAMOS LA TABLA TEMPORAL @FORMACION_ACADEMICA Y AGREGAMOS SOLO EL REGISTRO DE titulo_estudio DE LA TABLA estudio_candidato

		CREATE TEMP TABLE tFORMACION_ACADEMICA AS
		SELECT * FROM estudio_candidato
		WHERE  doc_id = p_doc_id
		ORDER BY 1;
	
-- CREAMOS LA TABLA TEMPORAL @FORMACION_ACADEMICA Y AGREGAMOS SOLO EL REGISTRO DE titulo_estudio DE LA TABLA estudio_candidato	

		CREATE TEMP TABLE tFORMACION_LABORAL AS
		SELECT f.nombre_formacion_laboral 
		FROM   formacion_laboral f inner join experiencia_laboral e
		ON     f.codigo_formacion_laboral = e.codigo_formacion_laboral
		where  e.codigo_puesto_laboral = 1
		ORDER BY 1;

			if(
				select 
				    nombre_formacion_laboral
				from 
					tFORMACION_LABORAL
				where 
					nombre_formacion_laboral not in (select titulo_estudio from tFORMACION_ACADEMICA)
			
			  ) IS NULL
			  THEN
			  	insert into postulacion(codgio_postulacion,doc_id,nombre,estado,fecha_postulacion,codigo_puesto_laboral)
				values(
					p_codigo_postulacion, 
					p_doc_id,
					(
						select 
							nombre 
						from 
							candidato 
						where 
						doc_id = p_doc_id
					),
					'CURRICULO APTO',
					(
					SELECT TO_CHAR(NOW(), 'DD-Mon YYYY')as fecha
					),
					p_codigo_puesto_laboral);
				ELSE
					insert into postulacion(codgio_postulacion,doc_id,nombre,estado,fecha_postulacion,codigo_puesto_laboral)
				values(
					p_codigo_postulacion, 
					p_doc_id,
					(
						select 
							nombre 
						from 
							candidato 
						where 
						doc_id = p_doc_id
					),
					'CURRICULO NO APTO',
					(
					SELECT TO_CHAR(NOW(), 'DD-Mon YYYY')as fecha
					),
					p_codigo_puesto_laboral);
				 
			end if;
	drop table tFORMACION_ACADEMICA;
	drop table tFORMACION_LABORAL;
 end;
 $$ language plpgsql;	

select* from postulacion
delete from postulacion

  select * from fn_FiltroCurriculo(
				    1,
					'45977448',
					1			
			   );




	
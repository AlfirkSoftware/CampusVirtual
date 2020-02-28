create table categoria
(
	codigo_categoria int primary key,
	nombre varchar(70) not null
);

create table producto
(
	codigo_producto int primary key,
	nombre varchar(100) not null,
	descripcion varchar(300) not null,
	precio_venta numeric(14,2) not null,
	codigo_categoria int references categoria (codigo_categoria)
);

insert into categoria values (1, 'Platos a la carta')
insert into categoria values (2, 'Bebidas gaseosas')
insert into categoria values (3, 'Jugos/Refrescos')
insert into categoria values (4, 'Licores')
insert into categoria values (5, 'Otros')
select * from categoria

insert into producto values (1,'Parrila para 5 personas','Lomo fino, chuleta, chorizo, anticuchos, ubre', 140, 1);
insert into producto values (2,'Parrila para 3 personas','Lomo fino, chuleta, chorizo', 90, 1);
insert into producto values (3,'Arroz con pato','250 gr de pato, arroz', 25, 1);
insert into producto values (4,'Coca Cola 1.5 lt','-', 7, 2);
insert into producto values (5,'Coca Cola 0.5 lt','-', 3, 2);
insert into producto values (6,'Inca Kola 1.5 lt','-', 7, 2);
insert into producto values (7,'Inca Kola 0.5 lt','-', 3, 2);
insert into producto values (8,'Jugo de Lima 1/2 Jarra','-', 8, 3);
insert into producto values (9,'Jugo de Lima 1 Jarra','-', 14, 3);
insert into producto values (10,'Chicha morada 1/2 Jarra','-', 9, 3);
insert into producto values (11,'Chicha morada 1 Jarra','-', 15, 3);
insert into producto values (12,'Porción de papas fritas','-', 6, 5);
insert into producto values (13,'Porción de arroz','-', 3, 5);

alter table producto add controla_stock char(1);
alter table producto add stock integer;

--select * from producto

create table mesa
(
	codigo_mesa int primary key,
	mesa varchar (50) not null,
	descripcion varchar(100) not null,
	estado char(1) not null
);

insert into mesa values (1,'Mesa 1','Mesa para 4 personas', 'D');
insert into mesa values (2,'Mesa 2','Mesa para 4 personas', 'D');
insert into mesa values (3,'Mesa 3','Mesa para 6 personas', 'D');
insert into mesa values (4,'Mesa 4','Mesa para 6 personas', 'D');
insert into mesa values (5,'Mesa 5','Mesa para 8 personas - familiar', 'D');
insert into mesa values (6,'Mesa 6','Mesa para 10 personas - familiar', 'D');
select * from mesa

create table comanda
(
	numero_comanda int primary key,
	fecha_comanda date not null,
	codigo_mesa int not null references mesa (codigo_mesa),
	codigo_usuario int not null references usuario (codigo_usuario),
	estado char(1) not null default 'R'
);


create table comanda_detalle
(
	numero_comanda int,
	codigo_producto int not null,
	precio_venta numeric(14,2) not null,
	cantidad int not null,
	CONSTRAINT pk_comanda_detalle PRIMARY KEY (numero_comanda, codigo_producto),
	CONSTRAINT fk_comanda_detalle_comanda FOREIGN KEY (codigo_producto) 
	references producto (codigo_producto)
);




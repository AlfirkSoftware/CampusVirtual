CREATE TABLE public.tipo_comprobante
(
  codigo_tipo_comprobante int NOT NULL,
  descripcion character varying(50),
  CONSTRAINT pk_tipo_comprobante PRIMARY KEY (codigo_tipo_comprobante)
);


-- Table: public.cliente

-- DROP TABLE public.cliente;

CREATE TABLE public.cliente
(
  codigo_cliente integer NOT NULL,
  apellido_paterno character varying(30) NOT NULL,
  apellido_materno character varying(30) NOT NULL,
  nombres character varying(20) NOT NULL,
  tipo_doc_ide char(2),
  nro_doc_ide varchar(18),
  direccion character varying(50) NOT NULL,
  telefono  character varying(50) NOT NULL,
  CONSTRAINT pk_cliente PRIMARY KEY (codigo_cliente)
);


-- Table: public.venta

-- DROP TABLE public.venta;

CREATE TABLE public.venta
(
  codigo_tipo_comprobante int NOT NULL,
  numero_serie varchar(5) NOT NULL,
  numero_documento integer NOT NULL,
  codigo_cliente integer,
  fecha_venta date NOT NULL,
  porcentaje_igv numeric(10,2) NOT NULL,
  sub_total numeric(14,2) NOT NULL,
  igv numeric(10,2) NOT NULL,
  total numeric(14,2),
  fecha_registro date DEFAULT ('now'::text)::date,
  hora_registro time with time zone NOT NULL DEFAULT ('now'::text)::time with time zone,
  codigo_usuario integer,
  estado character(1) NOT NULL DEFAULT 'E'::bpchar,
  CONSTRAINT pk_venta PRIMARY KEY (codigo_tipo_comprobante, numero_serie, numero_documento),
  CONSTRAINT fk_codigo_cliente FOREIGN KEY (codigo_cliente)
      REFERENCES public.cliente (codigo_cliente) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_codigo_tipo_comprobante FOREIGN KEY (codigo_tipo_comprobante)
      REFERENCES public.tipo_comprobante (codigo_tipo_comprobante) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_codigo_usuario FOREIGN KEY (codigo_usuario)
      REFERENCES public.usuario (codigo_usuario) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);


-- Table: public.venta_detalle

-- DROP TABLE public.venta_detalle;

CREATE TABLE public.venta_detalle
(
  codigo_tipo_comprobante int NOT NULL,
  numero_serie varchar(5) NOT NULL,
  numero_documento integer NOT NULL,
  codigo_producto integer NOT NULL,
  cantidad integer NOT NULL,
  precio numeric(10,2),
  descuento1 numeric(14,2),
  descuento2 numeric(14,2),
  importe numeric(14,2),
  CONSTRAINT pk_venta_detalle PRIMARY KEY (codigo_tipo_comprobante, numero_serie, numero_documento, codigo_producto),
  CONSTRAINT fk_venta_detalle_articulo FOREIGN KEY (codigo_producto)
      REFERENCES public.producto (codigo_producto) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_venta_detalle_venta FOREIGN KEY (codigo_tipo_comprobante, numero_serie, numero_documento)
      REFERENCES public.venta (codigo_tipo_comprobante, numero_serie, numero_documento) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);




-- Table: public.serie_comprobante

-- DROP TABLE public.serie_comprobante;

CREATE TABLE public.serie_comprobante
(
  codigo_tipo_comprobante int NOT NULL,
  numero_serie varchar(5) NOT NULL,
  numero_documento integer NOT NULL,
  CONSTRAINT pk_serie_comprobante PRIMARY KEY (codigo_tipo_comprobante, numero_serie),
  CONSTRAINT serie_comprobante_codigo_tipo_comprobante_fkey FOREIGN KEY (codigo_tipo_comprobante)
      REFERENCES public.tipo_comprobante (codigo_tipo_comprobante) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
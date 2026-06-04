--
-- PostgreSQL database dump
--

\restrict u2vBUVZ1USqrWXgaVL4qvI4K7d1dxsBcHqi8hmtUdQMVu8YcTAavHLw6vNm0bXe

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-04 23:05:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 916 (class 1247 OID 66556)
-- Name: status_inspection; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_inspection AS ENUM (
    'Aprobado',
    'Rechazado',
    'Observacion',
    'Incompleta'
);


ALTER TYPE public.status_inspection OWNER TO postgres;

--
-- TOC entry 919 (class 1247 OID 66566)
-- Name: status_master; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_master AS ENUM (
    'Vigente',
    'Desuso'
);


ALTER TYPE public.status_master OWNER TO postgres;

--
-- TOC entry 913 (class 1247 OID 66551)
-- Name: status_users; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_users AS ENUM (
    'Activo',
    'Inactivo'
);


ALTER TYPE public.status_users OWNER TO postgres;

--
-- TOC entry 280 (class 1255 OID 74121)
-- Name: fn_obsolete_old_reference(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_obsolete_old_reference() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- 1. Buscamos el ID anterior que tiene la misma referencia en la tabla de origen
    -- 2. Marcamos ese ID como 'Desuso' en master_inputs
    EXECUTE format('
        UPDATE public.master_inputs 
        SET status = ''Desuso'', 
            update_at = CURRENT_DATE 
        WHERE inputs_id IN (
            SELECT id FROM public.%I WHERE reference = %L AND id != %L
        ) AND status = ''Vigente''', 
        TG_TABLE_NAME, NEW.reference, NEW.id);

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.fn_obsolete_old_reference() OWNER TO postgres;

--
-- TOC entry 279 (class 1255 OID 74132)
-- Name: fn_sync_to_master(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_sync_to_master() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO public.master_inputs (
        inputs_id, 
        type_inputs_id, 
        status, 
        created_at, 
        update_at
    ) VALUES (
        NEW.id,                         -- ID del nuevo insumo
        TG_ARGV[0]::INT,                -- ID del tipo (pasado por el trigger)
        'Vigente',                      -- Estado inicial
        CURRENT_DATE, 
        CURRENT_DATE
    );
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.fn_sync_to_master() OWNER TO postgres;

--
-- TOC entry 278 (class 1255 OID 74119)
-- Name: fn_validate_master_input_status(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_validate_master_input_status() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    input_status public.status_master;
BEGIN
    -- Buscamos el estado del insumo en la tabla maestra
    SELECT status INTO input_status 
    FROM public.master_inputs 
    WHERE id = NEW.master_inputs_id;

    -- Si el insumo está en 'Desuso', lanzamos un error y cancelamos la inserción
    IF input_status = 'Desuso' THEN
        RAISE EXCEPTION 'No se puede registrar una factura para el insumo (ID: %), ya que está marcado como Desuso.', NEW.master_inputs_id;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.fn_validate_master_input_status() OWNER TO postgres;

--
-- TOC entry 277 (class 1255 OID 74100)
-- Name: update_modified_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_modified_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.update_at = CURRENT_DATE;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_modified_column() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 250 (class 1259 OID 66899)
-- Name: bill_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bill_data (
    id integer NOT NULL,
    bill_nro character varying(100),
    billing_date date NOT NULL,
    odoo character varying(100) NOT NULL,
    nro_exp character varying(100),
    nro_reception character varying(100),
    receipt_date date NOT NULL,
    suppliers_id integer NOT NULL
);


ALTER TABLE public.bill_data OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 66898)
-- Name: bill_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bill_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bill_data_id_seq OWNER TO postgres;

--
-- TOC entry 5407 (class 0 OID 0)
-- Dependencies: 249
-- Name: bill_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bill_data_id_seq OWNED BY public.bill_data.id;


--
-- TOC entry 252 (class 1259 OID 66916)
-- Name: bill_inputs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bill_inputs (
    id integer NOT NULL,
    bill_data_id integer NOT NULL,
    master_inputs_id integer NOT NULL,
    oem_number character varying(100) NOT NULL,
    quantity numeric(15,4) NOT NULL
);


ALTER TABLE public.bill_inputs OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 66915)
-- Name: bill_inputs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bill_inputs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bill_inputs_id_seq OWNER TO postgres;

--
-- TOC entry 5408 (class 0 OID 0)
-- Dependencies: 251
-- Name: bill_inputs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bill_inputs_id_seq OWNED BY public.bill_inputs.id;


--
-- TOC entry 234 (class 1259 OID 66718)
-- Name: inputs_bags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inputs_bags (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    height numeric(7,4) NOT NULL,
    width numeric(7,4) NOT NULL,
    art numeric(7,4) NOT NULL,
    caliber numeric(7,4) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.inputs_bags OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 66717)
-- Name: inputs_bags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inputs_bags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inputs_bags_id_seq OWNER TO postgres;

--
-- TOC entry 5409 (class 0 OID 0)
-- Dependencies: 233
-- Name: inputs_bags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inputs_bags_id_seq OWNED BY public.inputs_bags.id;


--
-- TOC entry 242 (class 1259 OID 66812)
-- Name: inputs_cameras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inputs_cameras (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    thickness_a numeric(7,4) NOT NULL,
    thickness_b numeric(7,4) NOT NULL,
    thickness_c numeric(7,4) NOT NULL,
    thickness_d numeric(7,4) NOT NULL,
    ring_diameter_a numeric(7,4) NOT NULL,
    ring_diameter_b numeric(7,4) NOT NULL,
    ring_diameter_c numeric(7,4) NOT NULL,
    ring_diameter_d numeric(7,4) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.inputs_cameras OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 66811)
-- Name: inputs_cameras_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inputs_cameras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inputs_cameras_id_seq OWNER TO postgres;

--
-- TOC entry 5410 (class 0 OID 0)
-- Dependencies: 241
-- Name: inputs_cameras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inputs_cameras_id_seq OWNED BY public.inputs_cameras.id;


--
-- TOC entry 236 (class 1259 OID 66743)
-- Name: inputs_cardboard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inputs_cardboard (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    height numeric(7,4) NOT NULL,
    width numeric(7,4) NOT NULL,
    caliber numeric(7,4) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.inputs_cardboard OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 66742)
-- Name: inputs_cardboard_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inputs_cardboard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inputs_cardboard_id_seq OWNER TO postgres;

--
-- TOC entry 5411 (class 0 OID 0)
-- Dependencies: 235
-- Name: inputs_cardboard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inputs_cardboard_id_seq OWNED BY public.inputs_cardboard.id;


--
-- TOC entry 238 (class 1259 OID 66767)
-- Name: inputs_cases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inputs_cases (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    caliber numeric(7,4) NOT NULL,
    armed numeric(7,4) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.inputs_cases OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 66766)
-- Name: inputs_cases_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inputs_cases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inputs_cases_id_seq OWNER TO postgres;

--
-- TOC entry 5412 (class 0 OID 0)
-- Dependencies: 237
-- Name: inputs_cases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inputs_cases_id_seq OWNED BY public.inputs_cases.id;


--
-- TOC entry 232 (class 1259 OID 66695)
-- Name: inputs_chemicals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inputs_chemicals (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    presentation boolean NOT NULL,
    batch_date date NOT NULL,
    production_test boolean,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.inputs_chemicals OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 66694)
-- Name: inputs_chemicals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inputs_chemicals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inputs_chemicals_id_seq OWNER TO postgres;

--
-- TOC entry 5413 (class 0 OID 0)
-- Dependencies: 231
-- Name: inputs_chemicals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inputs_chemicals_id_seq OWNED BY public.inputs_chemicals.id;


--
-- TOC entry 244 (class 1259 OID 66841)
-- Name: inputs_collars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inputs_collars (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    internal_diameter numeric(7,4) NOT NULL,
    height numeric(7,4) NOT NULL,
    joint boolean NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.inputs_collars OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 66840)
-- Name: inputs_collars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inputs_collars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inputs_collars_id_seq OWNER TO postgres;

--
-- TOC entry 5414 (class 0 OID 0)
-- Dependencies: 243
-- Name: inputs_collars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inputs_collars_id_seq OWNED BY public.inputs_collars.id;


--
-- TOC entry 230 (class 1259 OID 66672)
-- Name: inputs_oring; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inputs_oring (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    internal_diameter numeric(7,4) NOT NULL,
    height numeric(7,4) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.inputs_oring OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 66671)
-- Name: inputs_oring_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inputs_oring_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inputs_oring_id_seq OWNER TO postgres;

--
-- TOC entry 5415 (class 0 OID 0)
-- Dependencies: 229
-- Name: inputs_oring_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inputs_oring_id_seq OWNED BY public.inputs_oring.id;


--
-- TOC entry 228 (class 1259 OID 66647)
-- Name: inputs_stamps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inputs_stamps (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    internal_diameter numeric(7,4) NOT NULL,
    external_diameter numeric(7,4) NOT NULL,
    height_a numeric(7,4) NOT NULL,
    height_b numeric(7,4) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.inputs_stamps OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 66646)
-- Name: inputs_stamps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inputs_stamps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inputs_stamps_id_seq OWNER TO postgres;

--
-- TOC entry 5416 (class 0 OID 0)
-- Dependencies: 227
-- Name: inputs_stamps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inputs_stamps_id_seq OWNED BY public.inputs_stamps.id;


--
-- TOC entry 226 (class 1259 OID 66623)
-- Name: inputs_stuffing_stamps_downspouts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inputs_stuffing_stamps_downspouts (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    internal_diameter numeric(7,4) NOT NULL,
    external_diameter numeric(7,4) NOT NULL,
    height numeric(7,4) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.inputs_stuffing_stamps_downspouts OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 66622)
-- Name: inputs_stuffing_stamps_downspouts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inputs_stuffing_stamps_downspouts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inputs_stuffing_stamps_downspouts_id_seq OWNER TO postgres;

--
-- TOC entry 5417 (class 0 OID 0)
-- Dependencies: 225
-- Name: inputs_stuffing_stamps_downspouts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inputs_stuffing_stamps_downspouts_id_seq OWNED BY public.inputs_stuffing_stamps_downspouts.id;


--
-- TOC entry 240 (class 1259 OID 66790)
-- Name: inputs_thermoplastics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inputs_thermoplastics (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    visual boolean NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.inputs_thermoplastics OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 66789)
-- Name: inputs_thermoplastics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inputs_thermoplastics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inputs_thermoplastics_id_seq OWNER TO postgres;

--
-- TOC entry 5418 (class 0 OID 0)
-- Dependencies: 239
-- Name: inputs_thermoplastics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inputs_thermoplastics_id_seq OWNED BY public.inputs_thermoplastics.id;


--
-- TOC entry 262 (class 1259 OID 67042)
-- Name: inspection_bags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_bags (
    id integer NOT NULL,
    bill_inputs_id integer NOT NULL,
    users_id integer NOT NULL,
    height numeric(7,4) NOT NULL,
    width numeric(7,4) NOT NULL,
    art numeric(7,4) NOT NULL,
    caliber numeric(7,4) NOT NULL,
    review_date date NOT NULL,
    delivery_date date NOT NULL,
    observation character varying(100),
    status public.status_inspection NOT NULL
);


ALTER TABLE public.inspection_bags OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 67041)
-- Name: inspection_bags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_bags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inspection_bags_id_seq OWNER TO postgres;

--
-- TOC entry 5419 (class 0 OID 0)
-- Dependencies: 261
-- Name: inspection_bags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_bags_id_seq OWNED BY public.inspection_bags.id;


--
-- TOC entry 270 (class 1259 OID 67144)
-- Name: inspection_cameras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_cameras (
    id integer NOT NULL,
    bill_inputs_id integer NOT NULL,
    users_id integer NOT NULL,
    thickness_a numeric(7,4) NOT NULL,
    thickness_b numeric(7,4) NOT NULL,
    thickness_c numeric(7,4) NOT NULL,
    thickness_d numeric(7,4) NOT NULL,
    ring_diameter_a numeric(7,4) NOT NULL,
    ring_diameter_b numeric(7,4) NOT NULL,
    ring_diameter_c numeric(7,4) NOT NULL,
    ring_diameter_d numeric(7,4) NOT NULL,
    review_date date NOT NULL,
    delivery_date date NOT NULL,
    observation character varying(100),
    status public.status_inspection NOT NULL
);


ALTER TABLE public.inspection_cameras OWNER TO postgres;

--
-- TOC entry 269 (class 1259 OID 67143)
-- Name: inspection_cameras_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_cameras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inspection_cameras_id_seq OWNER TO postgres;

--
-- TOC entry 5420 (class 0 OID 0)
-- Dependencies: 269
-- Name: inspection_cameras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_cameras_id_seq OWNED BY public.inspection_cameras.id;


--
-- TOC entry 264 (class 1259 OID 67069)
-- Name: inspection_cardboard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_cardboard (
    id integer NOT NULL,
    bill_inputs_id integer NOT NULL,
    users_id integer NOT NULL,
    height numeric(7,4) NOT NULL,
    width numeric(7,4) NOT NULL,
    caliber numeric(7,4) NOT NULL,
    review_date date NOT NULL,
    delivery_date date NOT NULL,
    observation character varying(100),
    status public.status_inspection NOT NULL
);


ALTER TABLE public.inspection_cardboard OWNER TO postgres;

--
-- TOC entry 263 (class 1259 OID 67068)
-- Name: inspection_cardboard_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_cardboard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inspection_cardboard_id_seq OWNER TO postgres;

--
-- TOC entry 5421 (class 0 OID 0)
-- Dependencies: 263
-- Name: inspection_cardboard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_cardboard_id_seq OWNED BY public.inspection_cardboard.id;


--
-- TOC entry 266 (class 1259 OID 67095)
-- Name: inspection_cases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_cases (
    id integer NOT NULL,
    bill_inputs_id integer NOT NULL,
    users_id integer NOT NULL,
    caliber numeric(7,4) NOT NULL,
    armed numeric(7,4) NOT NULL,
    review_date date NOT NULL,
    delivery_date date NOT NULL,
    observation character varying(100),
    status public.status_inspection NOT NULL
);


ALTER TABLE public.inspection_cases OWNER TO postgres;

--
-- TOC entry 265 (class 1259 OID 67094)
-- Name: inspection_cases_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_cases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inspection_cases_id_seq OWNER TO postgres;

--
-- TOC entry 5422 (class 0 OID 0)
-- Dependencies: 265
-- Name: inspection_cases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_cases_id_seq OWNED BY public.inspection_cases.id;


--
-- TOC entry 260 (class 1259 OID 67016)
-- Name: inspection_chemicals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_chemicals (
    id integer NOT NULL,
    bill_inputs_id integer NOT NULL,
    users_id integer NOT NULL,
    presentation boolean NOT NULL,
    batch_date date NOT NULL,
    production_test boolean NOT NULL,
    review_date date NOT NULL,
    delivery_date date NOT NULL,
    observation character varying(100),
    status public.status_inspection NOT NULL
);


ALTER TABLE public.inspection_chemicals OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 67015)
-- Name: inspection_chemicals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_chemicals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inspection_chemicals_id_seq OWNER TO postgres;

--
-- TOC entry 5423 (class 0 OID 0)
-- Dependencies: 259
-- Name: inspection_chemicals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_chemicals_id_seq OWNED BY public.inspection_chemicals.id;


--
-- TOC entry 272 (class 1259 OID 67175)
-- Name: inspection_collars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_collars (
    id integer NOT NULL,
    bill_inputs_id integer NOT NULL,
    users_id integer NOT NULL,
    internal_diameter numeric(7,4) NOT NULL,
    height numeric(7,4) NOT NULL,
    joint boolean NOT NULL,
    review_date date NOT NULL,
    delivery_date date NOT NULL,
    observation character varying(100),
    status public.status_inspection NOT NULL
);


ALTER TABLE public.inspection_collars OWNER TO postgres;

--
-- TOC entry 271 (class 1259 OID 67174)
-- Name: inspection_collars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_collars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inspection_collars_id_seq OWNER TO postgres;

--
-- TOC entry 5424 (class 0 OID 0)
-- Dependencies: 271
-- Name: inspection_collars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_collars_id_seq OWNED BY public.inspection_collars.id;


--
-- TOC entry 258 (class 1259 OID 66991)
-- Name: inspection_oring; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_oring (
    id integer NOT NULL,
    bill_inputs_id integer NOT NULL,
    users_id integer NOT NULL,
    internal_diameter numeric(7,4) NOT NULL,
    height numeric(7,4) NOT NULL,
    review_date date NOT NULL,
    delivery_date date NOT NULL,
    observation character varying(100),
    status public.status_inspection NOT NULL
);


ALTER TABLE public.inspection_oring OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 66990)
-- Name: inspection_oring_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_oring_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inspection_oring_id_seq OWNER TO postgres;

--
-- TOC entry 5425 (class 0 OID 0)
-- Dependencies: 257
-- Name: inspection_oring_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_oring_id_seq OWNED BY public.inspection_oring.id;


--
-- TOC entry 256 (class 1259 OID 66964)
-- Name: inspection_stamps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_stamps (
    id integer NOT NULL,
    bill_inputs_id integer NOT NULL,
    users_id integer NOT NULL,
    internal_diameter numeric(7,4) NOT NULL,
    external_diameter numeric(7,4) NOT NULL,
    height_a numeric(7,4) NOT NULL,
    height_b numeric(7,4) NOT NULL,
    review_date date NOT NULL,
    delivery_date date NOT NULL,
    observation character varying(100),
    status public.status_inspection NOT NULL
);


ALTER TABLE public.inspection_stamps OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 66963)
-- Name: inspection_stamps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_stamps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inspection_stamps_id_seq OWNER TO postgres;

--
-- TOC entry 5426 (class 0 OID 0)
-- Dependencies: 255
-- Name: inspection_stamps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_stamps_id_seq OWNED BY public.inspection_stamps.id;


--
-- TOC entry 254 (class 1259 OID 66938)
-- Name: inspection_stuffing_stamps_downspouts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_stuffing_stamps_downspouts (
    id integer NOT NULL,
    bill_inputs_id integer NOT NULL,
    users_id integer NOT NULL,
    dinternal_diameter numeric(7,4) CONSTRAINT inspection_stuffing_stamps_downspou_dinternal_diameter_not_null NOT NULL,
    external_diameter numeric(7,4) CONSTRAINT inspection_stuffing_stamps_downspout_external_diameter_not_null NOT NULL,
    height numeric(7,4) NOT NULL,
    review_date date NOT NULL,
    delivery_date date NOT NULL,
    observation character varying(100),
    status public.status_inspection NOT NULL
);


ALTER TABLE public.inspection_stuffing_stamps_downspouts OWNER TO postgres;

--
-- TOC entry 253 (class 1259 OID 66937)
-- Name: inspection_stuffing_stamps_downspouts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_stuffing_stamps_downspouts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inspection_stuffing_stamps_downspouts_id_seq OWNER TO postgres;

--
-- TOC entry 5427 (class 0 OID 0)
-- Dependencies: 253
-- Name: inspection_stuffing_stamps_downspouts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_stuffing_stamps_downspouts_id_seq OWNED BY public.inspection_stuffing_stamps_downspouts.id;


--
-- TOC entry 268 (class 1259 OID 67120)
-- Name: inspection_thermoplastics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_thermoplastics (
    id integer NOT NULL,
    bill_inputs_id integer NOT NULL,
    users_id integer NOT NULL,
    visual boolean NOT NULL,
    review_date date NOT NULL,
    delivery_date date NOT NULL,
    observation character varying(100),
    status public.status_inspection NOT NULL
);


ALTER TABLE public.inspection_thermoplastics OWNER TO postgres;

--
-- TOC entry 267 (class 1259 OID 67119)
-- Name: inspection_thermoplastics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_thermoplastics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inspection_thermoplastics_id_seq OWNER TO postgres;

--
-- TOC entry 5428 (class 0 OID 0)
-- Dependencies: 267
-- Name: inspection_thermoplastics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_thermoplastics_id_seq OWNED BY public.inspection_thermoplastics.id;


--
-- TOC entry 248 (class 1259 OID 66879)
-- Name: master_inputs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_inputs (
    id integer NOT NULL,
    inputs_id integer NOT NULL,
    type_inputs_id integer NOT NULL,
    status public.status_master NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.master_inputs OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 66878)
-- Name: master_inputs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_inputs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.master_inputs_id_seq OWNER TO postgres;

--
-- TOC entry 5429 (class 0 OID 0)
-- Dependencies: 247
-- Name: master_inputs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.master_inputs_id_seq OWNED BY public.master_inputs.id;


--
-- TOC entry 274 (class 1259 OID 74062)
-- Name: reports_approved; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports_approved (
    id integer NOT NULL,
    bill_data_id integer NOT NULL,
    approved_quantity numeric(15,4) NOT NULL,
    generated_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.reports_approved OWNER TO postgres;

--
-- TOC entry 273 (class 1259 OID 74061)
-- Name: reports_approved_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_approved_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reports_approved_id_seq OWNER TO postgres;

--
-- TOC entry 5430 (class 0 OID 0)
-- Dependencies: 273
-- Name: reports_approved_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_approved_id_seq OWNED BY public.reports_approved.id;


--
-- TOC entry 276 (class 1259 OID 74079)
-- Name: reports_refused; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports_refused (
    id integer NOT NULL,
    bill_data_id integer NOT NULL,
    claim_date date NOT NULL,
    claim_quantity numeric(15,4) NOT NULL,
    rejection_reason text NOT NULL,
    generated_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.reports_refused OWNER TO postgres;

--
-- TOC entry 275 (class 1259 OID 74078)
-- Name: reports_refused_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_refused_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reports_refused_id_seq OWNER TO postgres;

--
-- TOC entry 5431 (class 0 OID 0)
-- Dependencies: 275
-- Name: reports_refused_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_refused_id_seq OWNED BY public.reports_refused.id;


--
-- TOC entry 220 (class 1259 OID 66574)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 66573)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 5432 (class 0 OID 0)
-- Dependencies: 219
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 246 (class 1259 OID 66865)
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppliers (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(100)
);


ALTER TABLE public.suppliers OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 66864)
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_id_seq OWNER TO postgres;

--
-- TOC entry 5433 (class 0 OID 0)
-- Dependencies: 245
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- TOC entry 222 (class 1259 OID 66583)
-- Name: type_inputs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_inputs (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.type_inputs OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 66582)
-- Name: type_inputs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_inputs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.type_inputs_id_seq OWNER TO postgres;

--
-- TOC entry 5434 (class 0 OID 0)
-- Dependencies: 221
-- Name: type_inputs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_inputs_id_seq OWNED BY public.type_inputs.id;


--
-- TOC entry 224 (class 1259 OID 66592)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "user" character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    name character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL,
    ci character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    roles_id integer NOT NULL,
    status public.status_users NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 66591)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5435 (class 0 OID 0)
-- Dependencies: 223
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 5048 (class 2604 OID 66902)
-- Name: bill_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_data ALTER COLUMN id SET DEFAULT nextval('public.bill_data_id_seq'::regclass);


--
-- TOC entry 5049 (class 2604 OID 66919)
-- Name: bill_inputs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_inputs ALTER COLUMN id SET DEFAULT nextval('public.bill_inputs_id_seq'::regclass);


--
-- TOC entry 5026 (class 2604 OID 66721)
-- Name: inputs_bags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_bags ALTER COLUMN id SET DEFAULT nextval('public.inputs_bags_id_seq'::regclass);


--
-- TOC entry 5038 (class 2604 OID 66815)
-- Name: inputs_cameras id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_cameras ALTER COLUMN id SET DEFAULT nextval('public.inputs_cameras_id_seq'::regclass);


--
-- TOC entry 5029 (class 2604 OID 66746)
-- Name: inputs_cardboard id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_cardboard ALTER COLUMN id SET DEFAULT nextval('public.inputs_cardboard_id_seq'::regclass);


--
-- TOC entry 5032 (class 2604 OID 66770)
-- Name: inputs_cases id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_cases ALTER COLUMN id SET DEFAULT nextval('public.inputs_cases_id_seq'::regclass);


--
-- TOC entry 5023 (class 2604 OID 66698)
-- Name: inputs_chemicals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_chemicals ALTER COLUMN id SET DEFAULT nextval('public.inputs_chemicals_id_seq'::regclass);


--
-- TOC entry 5041 (class 2604 OID 66844)
-- Name: inputs_collars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_collars ALTER COLUMN id SET DEFAULT nextval('public.inputs_collars_id_seq'::regclass);


--
-- TOC entry 5020 (class 2604 OID 66675)
-- Name: inputs_oring id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_oring ALTER COLUMN id SET DEFAULT nextval('public.inputs_oring_id_seq'::regclass);


--
-- TOC entry 5017 (class 2604 OID 66650)
-- Name: inputs_stamps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_stamps ALTER COLUMN id SET DEFAULT nextval('public.inputs_stamps_id_seq'::regclass);


--
-- TOC entry 5014 (class 2604 OID 66626)
-- Name: inputs_stuffing_stamps_downspouts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_stuffing_stamps_downspouts ALTER COLUMN id SET DEFAULT nextval('public.inputs_stuffing_stamps_downspouts_id_seq'::regclass);


--
-- TOC entry 5035 (class 2604 OID 66793)
-- Name: inputs_thermoplastics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_thermoplastics ALTER COLUMN id SET DEFAULT nextval('public.inputs_thermoplastics_id_seq'::regclass);


--
-- TOC entry 5054 (class 2604 OID 67045)
-- Name: inspection_bags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_bags ALTER COLUMN id SET DEFAULT nextval('public.inspection_bags_id_seq'::regclass);


--
-- TOC entry 5058 (class 2604 OID 67147)
-- Name: inspection_cameras id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cameras ALTER COLUMN id SET DEFAULT nextval('public.inspection_cameras_id_seq'::regclass);


--
-- TOC entry 5055 (class 2604 OID 67072)
-- Name: inspection_cardboard id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cardboard ALTER COLUMN id SET DEFAULT nextval('public.inspection_cardboard_id_seq'::regclass);


--
-- TOC entry 5056 (class 2604 OID 67098)
-- Name: inspection_cases id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cases ALTER COLUMN id SET DEFAULT nextval('public.inspection_cases_id_seq'::regclass);


--
-- TOC entry 5053 (class 2604 OID 67019)
-- Name: inspection_chemicals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_chemicals ALTER COLUMN id SET DEFAULT nextval('public.inspection_chemicals_id_seq'::regclass);


--
-- TOC entry 5059 (class 2604 OID 67178)
-- Name: inspection_collars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_collars ALTER COLUMN id SET DEFAULT nextval('public.inspection_collars_id_seq'::regclass);


--
-- TOC entry 5052 (class 2604 OID 66994)
-- Name: inspection_oring id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_oring ALTER COLUMN id SET DEFAULT nextval('public.inspection_oring_id_seq'::regclass);


--
-- TOC entry 5051 (class 2604 OID 66967)
-- Name: inspection_stamps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_stamps ALTER COLUMN id SET DEFAULT nextval('public.inspection_stamps_id_seq'::regclass);


--
-- TOC entry 5050 (class 2604 OID 66941)
-- Name: inspection_stuffing_stamps_downspouts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_stuffing_stamps_downspouts ALTER COLUMN id SET DEFAULT nextval('public.inspection_stuffing_stamps_downspouts_id_seq'::regclass);


--
-- TOC entry 5057 (class 2604 OID 67123)
-- Name: inspection_thermoplastics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_thermoplastics ALTER COLUMN id SET DEFAULT nextval('public.inspection_thermoplastics_id_seq'::regclass);


--
-- TOC entry 5045 (class 2604 OID 66882)
-- Name: master_inputs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_inputs ALTER COLUMN id SET DEFAULT nextval('public.master_inputs_id_seq'::regclass);


--
-- TOC entry 5060 (class 2604 OID 74065)
-- Name: reports_approved id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_approved ALTER COLUMN id SET DEFAULT nextval('public.reports_approved_id_seq'::regclass);


--
-- TOC entry 5062 (class 2604 OID 74082)
-- Name: reports_refused id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_refused ALTER COLUMN id SET DEFAULT nextval('public.reports_refused_id_seq'::regclass);


--
-- TOC entry 5009 (class 2604 OID 66577)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 5044 (class 2604 OID 66868)
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- TOC entry 5010 (class 2604 OID 66586)
-- Name: type_inputs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_inputs ALTER COLUMN id SET DEFAULT nextval('public.type_inputs_id_seq'::regclass);


--
-- TOC entry 5011 (class 2604 OID 66595)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5375 (class 0 OID 66899)
-- Dependencies: 250
-- Data for Name: bill_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bill_data (id, bill_nro, billing_date, odoo, nro_exp, nro_reception, receipt_date, suppliers_id) FROM stdin;
\.


--
-- TOC entry 5377 (class 0 OID 66916)
-- Dependencies: 252
-- Data for Name: bill_inputs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bill_inputs (id, bill_data_id, master_inputs_id, oem_number, quantity) FROM stdin;
\.


--
-- TOC entry 5359 (class 0 OID 66718)
-- Dependencies: 234
-- Data for Name: inputs_bags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inputs_bags (id, reference, user_id, height, width, art, caliber, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5367 (class 0 OID 66812)
-- Dependencies: 242
-- Data for Name: inputs_cameras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inputs_cameras (id, reference, user_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5361 (class 0 OID 66743)
-- Dependencies: 236
-- Data for Name: inputs_cardboard; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inputs_cardboard (id, reference, user_id, height, width, caliber, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5363 (class 0 OID 66767)
-- Dependencies: 238
-- Data for Name: inputs_cases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inputs_cases (id, reference, user_id, caliber, armed, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5357 (class 0 OID 66695)
-- Dependencies: 232
-- Data for Name: inputs_chemicals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inputs_chemicals (id, reference, user_id, presentation, batch_date, production_test, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5369 (class 0 OID 66841)
-- Dependencies: 244
-- Data for Name: inputs_collars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inputs_collars (id, reference, user_id, internal_diameter, height, joint, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5355 (class 0 OID 66672)
-- Dependencies: 230
-- Data for Name: inputs_oring; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inputs_oring (id, reference, user_id, internal_diameter, height, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5353 (class 0 OID 66647)
-- Dependencies: 228
-- Data for Name: inputs_stamps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inputs_stamps (id, reference, user_id, internal_diameter, external_diameter, height_a, height_b, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5351 (class 0 OID 66623)
-- Dependencies: 226
-- Data for Name: inputs_stuffing_stamps_downspouts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inputs_stuffing_stamps_downspouts (id, reference, user_id, internal_diameter, external_diameter, height, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5365 (class 0 OID 66790)
-- Dependencies: 240
-- Data for Name: inputs_thermoplastics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inputs_thermoplastics (id, reference, user_id, visual, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5387 (class 0 OID 67042)
-- Dependencies: 262
-- Data for Name: inspection_bags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_bags (id, bill_inputs_id, users_id, height, width, art, caliber, review_date, delivery_date, observation, status) FROM stdin;
\.


--
-- TOC entry 5395 (class 0 OID 67144)
-- Dependencies: 270
-- Data for Name: inspection_cameras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_cameras (id, bill_inputs_id, users_id, thickness_a, thickness_b, thickness_c, thickness_d, ring_diameter_a, ring_diameter_b, ring_diameter_c, ring_diameter_d, review_date, delivery_date, observation, status) FROM stdin;
\.


--
-- TOC entry 5389 (class 0 OID 67069)
-- Dependencies: 264
-- Data for Name: inspection_cardboard; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_cardboard (id, bill_inputs_id, users_id, height, width, caliber, review_date, delivery_date, observation, status) FROM stdin;
\.


--
-- TOC entry 5391 (class 0 OID 67095)
-- Dependencies: 266
-- Data for Name: inspection_cases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_cases (id, bill_inputs_id, users_id, caliber, armed, review_date, delivery_date, observation, status) FROM stdin;
\.


--
-- TOC entry 5385 (class 0 OID 67016)
-- Dependencies: 260
-- Data for Name: inspection_chemicals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_chemicals (id, bill_inputs_id, users_id, presentation, batch_date, production_test, review_date, delivery_date, observation, status) FROM stdin;
\.


--
-- TOC entry 5397 (class 0 OID 67175)
-- Dependencies: 272
-- Data for Name: inspection_collars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_collars (id, bill_inputs_id, users_id, internal_diameter, height, joint, review_date, delivery_date, observation, status) FROM stdin;
\.


--
-- TOC entry 5383 (class 0 OID 66991)
-- Dependencies: 258
-- Data for Name: inspection_oring; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_oring (id, bill_inputs_id, users_id, internal_diameter, height, review_date, delivery_date, observation, status) FROM stdin;
\.


--
-- TOC entry 5381 (class 0 OID 66964)
-- Dependencies: 256
-- Data for Name: inspection_stamps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_stamps (id, bill_inputs_id, users_id, internal_diameter, external_diameter, height_a, height_b, review_date, delivery_date, observation, status) FROM stdin;
\.


--
-- TOC entry 5379 (class 0 OID 66938)
-- Dependencies: 254
-- Data for Name: inspection_stuffing_stamps_downspouts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_stuffing_stamps_downspouts (id, bill_inputs_id, users_id, dinternal_diameter, external_diameter, height, review_date, delivery_date, observation, status) FROM stdin;
\.


--
-- TOC entry 5393 (class 0 OID 67120)
-- Dependencies: 268
-- Data for Name: inspection_thermoplastics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_thermoplastics (id, bill_inputs_id, users_id, visual, review_date, delivery_date, observation, status) FROM stdin;
\.


--
-- TOC entry 5373 (class 0 OID 66879)
-- Dependencies: 248
-- Data for Name: master_inputs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_inputs (id, inputs_id, type_inputs_id, status, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5399 (class 0 OID 74062)
-- Dependencies: 274
-- Data for Name: reports_approved; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports_approved (id, bill_data_id, approved_quantity, generated_at) FROM stdin;
\.


--
-- TOC entry 5401 (class 0 OID 74079)
-- Dependencies: 276
-- Data for Name: reports_refused; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports_refused (id, bill_data_id, claim_date, claim_quantity, rejection_reason, generated_at) FROM stdin;
\.


--
-- TOC entry 5345 (class 0 OID 66574)
-- Dependencies: 220
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
\.


--
-- TOC entry 5371 (class 0 OID 66865)
-- Dependencies: 246
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suppliers (id, user_id, name) FROM stdin;
\.


--
-- TOC entry 5347 (class 0 OID 66583)
-- Dependencies: 222
-- Data for Name: type_inputs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_inputs (id, name) FROM stdin;
\.


--
-- TOC entry 5349 (class 0 OID 66592)
-- Dependencies: 224
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "user", password, name, lastname, ci, email, roles_id, status, created_at, update_at) FROM stdin;
\.


--
-- TOC entry 5436 (class 0 OID 0)
-- Dependencies: 249
-- Name: bill_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bill_data_id_seq', 1, false);


--
-- TOC entry 5437 (class 0 OID 0)
-- Dependencies: 251
-- Name: bill_inputs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bill_inputs_id_seq', 1, false);


--
-- TOC entry 5438 (class 0 OID 0)
-- Dependencies: 233
-- Name: inputs_bags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inputs_bags_id_seq', 1, false);


--
-- TOC entry 5439 (class 0 OID 0)
-- Dependencies: 241
-- Name: inputs_cameras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inputs_cameras_id_seq', 1, false);


--
-- TOC entry 5440 (class 0 OID 0)
-- Dependencies: 235
-- Name: inputs_cardboard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inputs_cardboard_id_seq', 1, false);


--
-- TOC entry 5441 (class 0 OID 0)
-- Dependencies: 237
-- Name: inputs_cases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inputs_cases_id_seq', 1, false);


--
-- TOC entry 5442 (class 0 OID 0)
-- Dependencies: 231
-- Name: inputs_chemicals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inputs_chemicals_id_seq', 1, false);


--
-- TOC entry 5443 (class 0 OID 0)
-- Dependencies: 243
-- Name: inputs_collars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inputs_collars_id_seq', 1, false);


--
-- TOC entry 5444 (class 0 OID 0)
-- Dependencies: 229
-- Name: inputs_oring_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inputs_oring_id_seq', 1, false);


--
-- TOC entry 5445 (class 0 OID 0)
-- Dependencies: 227
-- Name: inputs_stamps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inputs_stamps_id_seq', 1, false);


--
-- TOC entry 5446 (class 0 OID 0)
-- Dependencies: 225
-- Name: inputs_stuffing_stamps_downspouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inputs_stuffing_stamps_downspouts_id_seq', 1, false);


--
-- TOC entry 5447 (class 0 OID 0)
-- Dependencies: 239
-- Name: inputs_thermoplastics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inputs_thermoplastics_id_seq', 1, false);


--
-- TOC entry 5448 (class 0 OID 0)
-- Dependencies: 261
-- Name: inspection_bags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_bags_id_seq', 1, false);


--
-- TOC entry 5449 (class 0 OID 0)
-- Dependencies: 269
-- Name: inspection_cameras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_cameras_id_seq', 1, false);


--
-- TOC entry 5450 (class 0 OID 0)
-- Dependencies: 263
-- Name: inspection_cardboard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_cardboard_id_seq', 1, false);


--
-- TOC entry 5451 (class 0 OID 0)
-- Dependencies: 265
-- Name: inspection_cases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_cases_id_seq', 1, false);


--
-- TOC entry 5452 (class 0 OID 0)
-- Dependencies: 259
-- Name: inspection_chemicals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_chemicals_id_seq', 1, false);


--
-- TOC entry 5453 (class 0 OID 0)
-- Dependencies: 271
-- Name: inspection_collars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_collars_id_seq', 1, false);


--
-- TOC entry 5454 (class 0 OID 0)
-- Dependencies: 257
-- Name: inspection_oring_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_oring_id_seq', 1, false);


--
-- TOC entry 5455 (class 0 OID 0)
-- Dependencies: 255
-- Name: inspection_stamps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_stamps_id_seq', 1, false);


--
-- TOC entry 5456 (class 0 OID 0)
-- Dependencies: 253
-- Name: inspection_stuffing_stamps_downspouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_stuffing_stamps_downspouts_id_seq', 1, false);


--
-- TOC entry 5457 (class 0 OID 0)
-- Dependencies: 267
-- Name: inspection_thermoplastics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_thermoplastics_id_seq', 1, false);


--
-- TOC entry 5458 (class 0 OID 0)
-- Dependencies: 247
-- Name: master_inputs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_inputs_id_seq', 1, false);


--
-- TOC entry 5459 (class 0 OID 0)
-- Dependencies: 273
-- Name: reports_approved_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_approved_id_seq', 1, false);


--
-- TOC entry 5460 (class 0 OID 0)
-- Dependencies: 275
-- Name: reports_refused_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_refused_id_seq', 1, false);


--
-- TOC entry 5461 (class 0 OID 0)
-- Dependencies: 219
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- TOC entry 5462 (class 0 OID 0)
-- Dependencies: 245
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 1, false);


--
-- TOC entry 5463 (class 0 OID 0)
-- Dependencies: 221
-- Name: type_inputs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_inputs_id_seq', 1, false);


--
-- TOC entry 5464 (class 0 OID 0)
-- Dependencies: 223
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 5099 (class 2606 OID 66909)
-- Name: bill_data bill_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_data
    ADD CONSTRAINT bill_data_pkey PRIMARY KEY (id);


--
-- TOC entry 5101 (class 2606 OID 66926)
-- Name: bill_inputs bill_inputs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_inputs
    ADD CONSTRAINT bill_inputs_pkey PRIMARY KEY (id);


--
-- TOC entry 5083 (class 2606 OID 66736)
-- Name: inputs_bags inputs_bags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_bags
    ADD CONSTRAINT inputs_bags_pkey PRIMARY KEY (id);


--
-- TOC entry 5091 (class 2606 OID 66834)
-- Name: inputs_cameras inputs_cameras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_cameras
    ADD CONSTRAINT inputs_cameras_pkey PRIMARY KEY (id);


--
-- TOC entry 5085 (class 2606 OID 66760)
-- Name: inputs_cardboard inputs_cardboard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_cardboard
    ADD CONSTRAINT inputs_cardboard_pkey PRIMARY KEY (id);


--
-- TOC entry 5087 (class 2606 OID 66783)
-- Name: inputs_cases inputs_cases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_cases
    ADD CONSTRAINT inputs_cases_pkey PRIMARY KEY (id);


--
-- TOC entry 5081 (class 2606 OID 66711)
-- Name: inputs_chemicals inputs_chemicals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_chemicals
    ADD CONSTRAINT inputs_chemicals_pkey PRIMARY KEY (id);


--
-- TOC entry 5093 (class 2606 OID 66858)
-- Name: inputs_collars inputs_collars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_collars
    ADD CONSTRAINT inputs_collars_pkey PRIMARY KEY (id);


--
-- TOC entry 5079 (class 2606 OID 66688)
-- Name: inputs_oring inputs_oring_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_oring
    ADD CONSTRAINT inputs_oring_pkey PRIMARY KEY (id);


--
-- TOC entry 5077 (class 2606 OID 66665)
-- Name: inputs_stamps inputs_stamps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_stamps
    ADD CONSTRAINT inputs_stamps_pkey PRIMARY KEY (id);


--
-- TOC entry 5075 (class 2606 OID 66640)
-- Name: inputs_stuffing_stamps_downspouts inputs_stuffing_stamps_downspouts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_stuffing_stamps_downspouts
    ADD CONSTRAINT inputs_stuffing_stamps_downspouts_pkey PRIMARY KEY (id);


--
-- TOC entry 5089 (class 2606 OID 66805)
-- Name: inputs_thermoplastics inputs_thermoplastics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_thermoplastics
    ADD CONSTRAINT inputs_thermoplastics_pkey PRIMARY KEY (id);


--
-- TOC entry 5111 (class 2606 OID 67057)
-- Name: inspection_bags inspection_bags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_bags
    ADD CONSTRAINT inspection_bags_pkey PRIMARY KEY (id);


--
-- TOC entry 5119 (class 2606 OID 67163)
-- Name: inspection_cameras inspection_cameras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cameras
    ADD CONSTRAINT inspection_cameras_pkey PRIMARY KEY (id);


--
-- TOC entry 5113 (class 2606 OID 67083)
-- Name: inspection_cardboard inspection_cardboard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cardboard
    ADD CONSTRAINT inspection_cardboard_pkey PRIMARY KEY (id);


--
-- TOC entry 5115 (class 2606 OID 67108)
-- Name: inspection_cases inspection_cases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cases
    ADD CONSTRAINT inspection_cases_pkey PRIMARY KEY (id);


--
-- TOC entry 5109 (class 2606 OID 67030)
-- Name: inspection_chemicals inspection_chemicals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_chemicals
    ADD CONSTRAINT inspection_chemicals_pkey PRIMARY KEY (id);


--
-- TOC entry 5121 (class 2606 OID 67189)
-- Name: inspection_collars inspection_collars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_collars
    ADD CONSTRAINT inspection_collars_pkey PRIMARY KEY (id);


--
-- TOC entry 5107 (class 2606 OID 67004)
-- Name: inspection_oring inspection_oring_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_oring
    ADD CONSTRAINT inspection_oring_pkey PRIMARY KEY (id);


--
-- TOC entry 5105 (class 2606 OID 66979)
-- Name: inspection_stamps inspection_stamps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_stamps
    ADD CONSTRAINT inspection_stamps_pkey PRIMARY KEY (id);


--
-- TOC entry 5103 (class 2606 OID 66952)
-- Name: inspection_stuffing_stamps_downspouts inspection_stuffing_stamps_downspouts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_stuffing_stamps_downspouts
    ADD CONSTRAINT inspection_stuffing_stamps_downspouts_pkey PRIMARY KEY (id);


--
-- TOC entry 5117 (class 2606 OID 67132)
-- Name: inspection_thermoplastics inspection_thermoplastics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_thermoplastics
    ADD CONSTRAINT inspection_thermoplastics_pkey PRIMARY KEY (id);


--
-- TOC entry 5097 (class 2606 OID 66892)
-- Name: master_inputs master_inputs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_inputs
    ADD CONSTRAINT master_inputs_pkey PRIMARY KEY (id);


--
-- TOC entry 5123 (class 2606 OID 74072)
-- Name: reports_approved reports_approved_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_approved
    ADD CONSTRAINT reports_approved_pkey PRIMARY KEY (id);


--
-- TOC entry 5125 (class 2606 OID 74093)
-- Name: reports_refused reports_refused_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_refused
    ADD CONSTRAINT reports_refused_pkey PRIMARY KEY (id);


--
-- TOC entry 5065 (class 2606 OID 66581)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 5095 (class 2606 OID 66872)
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- TOC entry 5067 (class 2606 OID 66590)
-- Name: type_inputs type_inputs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_inputs
    ADD CONSTRAINT type_inputs_pkey PRIMARY KEY (id);


--
-- TOC entry 5069 (class 2606 OID 66616)
-- Name: users users_ci_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ci_key UNIQUE (ci);


--
-- TOC entry 5071 (class 2606 OID 66612)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 5073 (class 2606 OID 66614)
-- Name: users users_user_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_key UNIQUE ("user");


--
-- TOC entry 5177 (class 2620 OID 74143)
-- Name: inputs_bags a_tr_obs_bags; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER a_tr_obs_bags AFTER INSERT ON public.inputs_bags FOR EACH ROW EXECUTE FUNCTION public.fn_obsolete_old_reference();


--
-- TOC entry 5189 (class 2620 OID 74150)
-- Name: inputs_cameras a_tr_obs_cameras; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER a_tr_obs_cameras AFTER INSERT ON public.inputs_cameras FOR EACH ROW EXECUTE FUNCTION public.fn_obsolete_old_reference();


--
-- TOC entry 5180 (class 2620 OID 74147)
-- Name: inputs_cardboard a_tr_obs_cardboard; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER a_tr_obs_cardboard AFTER INSERT ON public.inputs_cardboard FOR EACH ROW EXECUTE FUNCTION public.fn_obsolete_old_reference();


--
-- TOC entry 5183 (class 2620 OID 74148)
-- Name: inputs_cases a_tr_obs_cases; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER a_tr_obs_cases AFTER INSERT ON public.inputs_cases FOR EACH ROW EXECUTE FUNCTION public.fn_obsolete_old_reference();


--
-- TOC entry 5174 (class 2620 OID 74146)
-- Name: inputs_chemicals a_tr_obs_chemicals; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER a_tr_obs_chemicals AFTER INSERT ON public.inputs_chemicals FOR EACH ROW EXECUTE FUNCTION public.fn_obsolete_old_reference();


--
-- TOC entry 5192 (class 2620 OID 74151)
-- Name: inputs_collars a_tr_obs_collars; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER a_tr_obs_collars AFTER INSERT ON public.inputs_collars FOR EACH ROW EXECUTE FUNCTION public.fn_obsolete_old_reference();


--
-- TOC entry 5171 (class 2620 OID 74145)
-- Name: inputs_oring a_tr_obs_oring; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER a_tr_obs_oring AFTER INSERT ON public.inputs_oring FOR EACH ROW EXECUTE FUNCTION public.fn_obsolete_old_reference();


--
-- TOC entry 5168 (class 2620 OID 74144)
-- Name: inputs_stamps a_tr_obs_stamps; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER a_tr_obs_stamps AFTER INSERT ON public.inputs_stamps FOR EACH ROW EXECUTE FUNCTION public.fn_obsolete_old_reference();


--
-- TOC entry 5165 (class 2620 OID 74152)
-- Name: inputs_stuffing_stamps_downspouts a_tr_obs_stuffing; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER a_tr_obs_stuffing AFTER INSERT ON public.inputs_stuffing_stamps_downspouts FOR EACH ROW EXECUTE FUNCTION public.fn_obsolete_old_reference();


--
-- TOC entry 5186 (class 2620 OID 74149)
-- Name: inputs_thermoplastics a_tr_obs_thermoplastics; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER a_tr_obs_thermoplastics AFTER INSERT ON public.inputs_thermoplastics FOR EACH ROW EXECUTE FUNCTION public.fn_obsolete_old_reference();


--
-- TOC entry 5178 (class 2620 OID 74137)
-- Name: inputs_bags tr_sync_master_bags; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_sync_master_bags AFTER INSERT ON public.inputs_bags FOR EACH ROW EXECUTE FUNCTION public.fn_sync_to_master('5');


--
-- TOC entry 5190 (class 2620 OID 74141)
-- Name: inputs_cameras tr_sync_master_cameras; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_sync_master_cameras AFTER INSERT ON public.inputs_cameras FOR EACH ROW EXECUTE FUNCTION public.fn_sync_to_master('9');


--
-- TOC entry 5181 (class 2620 OID 74138)
-- Name: inputs_cardboard tr_sync_master_cardboard; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_sync_master_cardboard AFTER INSERT ON public.inputs_cardboard FOR EACH ROW EXECUTE FUNCTION public.fn_sync_to_master('6');


--
-- TOC entry 5184 (class 2620 OID 74139)
-- Name: inputs_cases tr_sync_master_cases; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_sync_master_cases AFTER INSERT ON public.inputs_cases FOR EACH ROW EXECUTE FUNCTION public.fn_sync_to_master('7');


--
-- TOC entry 5175 (class 2620 OID 74136)
-- Name: inputs_chemicals tr_sync_master_chemicals; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_sync_master_chemicals AFTER INSERT ON public.inputs_chemicals FOR EACH ROW EXECUTE FUNCTION public.fn_sync_to_master('4');


--
-- TOC entry 5193 (class 2620 OID 74142)
-- Name: inputs_collars tr_sync_master_collars; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_sync_master_collars AFTER INSERT ON public.inputs_collars FOR EACH ROW EXECUTE FUNCTION public.fn_sync_to_master('10');


--
-- TOC entry 5172 (class 2620 OID 74135)
-- Name: inputs_oring tr_sync_master_oring; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_sync_master_oring AFTER INSERT ON public.inputs_oring FOR EACH ROW EXECUTE FUNCTION public.fn_sync_to_master('3');


--
-- TOC entry 5169 (class 2620 OID 74134)
-- Name: inputs_stamps tr_sync_master_stamps; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_sync_master_stamps AFTER INSERT ON public.inputs_stamps FOR EACH ROW EXECUTE FUNCTION public.fn_sync_to_master('2');


--
-- TOC entry 5166 (class 2620 OID 74133)
-- Name: inputs_stuffing_stamps_downspouts tr_sync_master_stuffing; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_sync_master_stuffing AFTER INSERT ON public.inputs_stuffing_stamps_downspouts FOR EACH ROW EXECUTE FUNCTION public.fn_sync_to_master('1');


--
-- TOC entry 5187 (class 2620 OID 74140)
-- Name: inputs_thermoplastics tr_sync_master_thermoplastics; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_sync_master_thermoplastics AFTER INSERT ON public.inputs_thermoplastics FOR EACH ROW EXECUTE FUNCTION public.fn_sync_to_master('8');


--
-- TOC entry 5179 (class 2620 OID 74113)
-- Name: inputs_bags tr_update_at_inputs_bags; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_inputs_bags BEFORE UPDATE ON public.inputs_bags FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5191 (class 2620 OID 74117)
-- Name: inputs_cameras tr_update_at_inputs_cameras; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_inputs_cameras BEFORE UPDATE ON public.inputs_cameras FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5182 (class 2620 OID 74114)
-- Name: inputs_cardboard tr_update_at_inputs_cardboard; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_inputs_cardboard BEFORE UPDATE ON public.inputs_cardboard FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5185 (class 2620 OID 74115)
-- Name: inputs_cases tr_update_at_inputs_cases; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_inputs_cases BEFORE UPDATE ON public.inputs_cases FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5176 (class 2620 OID 74112)
-- Name: inputs_chemicals tr_update_at_inputs_chemicals; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_inputs_chemicals BEFORE UPDATE ON public.inputs_chemicals FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5194 (class 2620 OID 74118)
-- Name: inputs_collars tr_update_at_inputs_collars; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_inputs_collars BEFORE UPDATE ON public.inputs_collars FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5173 (class 2620 OID 74111)
-- Name: inputs_oring tr_update_at_inputs_oring; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_inputs_oring BEFORE UPDATE ON public.inputs_oring FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5170 (class 2620 OID 74110)
-- Name: inputs_stamps tr_update_at_inputs_stamps; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_inputs_stamps BEFORE UPDATE ON public.inputs_stamps FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5167 (class 2620 OID 74109)
-- Name: inputs_stuffing_stamps_downspouts tr_update_at_inputs_stuffing_stamps_downspouts; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_inputs_stuffing_stamps_downspouts BEFORE UPDATE ON public.inputs_stuffing_stamps_downspouts FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5188 (class 2620 OID 74116)
-- Name: inputs_thermoplastics tr_update_at_inputs_thermoplastics; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_inputs_thermoplastics BEFORE UPDATE ON public.inputs_thermoplastics FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5195 (class 2620 OID 74108)
-- Name: master_inputs tr_update_at_master_inputs; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_master_inputs BEFORE UPDATE ON public.master_inputs FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5164 (class 2620 OID 74107)
-- Name: users tr_update_at_users; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_update_at_users BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- TOC entry 5196 (class 2620 OID 74120)
-- Name: bill_inputs tr_validate_bill_input_status; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_validate_bill_input_status BEFORE INSERT OR UPDATE ON public.bill_inputs FOR EACH ROW EXECUTE FUNCTION public.fn_validate_master_input_status();


--
-- TOC entry 5139 (class 2606 OID 66910)
-- Name: bill_data bill_data_suppliers_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_data
    ADD CONSTRAINT bill_data_suppliers_id_fkey FOREIGN KEY (suppliers_id) REFERENCES public.suppliers(id);


--
-- TOC entry 5140 (class 2606 OID 66927)
-- Name: bill_inputs bill_inputs_bill_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_inputs
    ADD CONSTRAINT bill_inputs_bill_data_id_fkey FOREIGN KEY (bill_data_id) REFERENCES public.bill_data(id);


--
-- TOC entry 5141 (class 2606 OID 66932)
-- Name: bill_inputs bill_inputs_master_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_inputs
    ADD CONSTRAINT bill_inputs_master_inputs_id_fkey FOREIGN KEY (master_inputs_id) REFERENCES public.master_inputs(id);


--
-- TOC entry 5131 (class 2606 OID 66737)
-- Name: inputs_bags inputs_bags_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_bags
    ADD CONSTRAINT inputs_bags_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 5135 (class 2606 OID 66835)
-- Name: inputs_cameras inputs_cameras_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_cameras
    ADD CONSTRAINT inputs_cameras_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 5132 (class 2606 OID 66761)
-- Name: inputs_cardboard inputs_cardboard_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_cardboard
    ADD CONSTRAINT inputs_cardboard_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 5133 (class 2606 OID 66784)
-- Name: inputs_cases inputs_cases_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_cases
    ADD CONSTRAINT inputs_cases_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 5130 (class 2606 OID 66712)
-- Name: inputs_chemicals inputs_chemicals_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_chemicals
    ADD CONSTRAINT inputs_chemicals_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 5136 (class 2606 OID 66859)
-- Name: inputs_collars inputs_collars_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_collars
    ADD CONSTRAINT inputs_collars_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 5129 (class 2606 OID 66689)
-- Name: inputs_oring inputs_oring_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_oring
    ADD CONSTRAINT inputs_oring_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 5128 (class 2606 OID 66666)
-- Name: inputs_stamps inputs_stamps_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_stamps
    ADD CONSTRAINT inputs_stamps_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 5127 (class 2606 OID 66641)
-- Name: inputs_stuffing_stamps_downspouts inputs_stuffing_stamps_downspouts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_stuffing_stamps_downspouts
    ADD CONSTRAINT inputs_stuffing_stamps_downspouts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 5134 (class 2606 OID 66806)
-- Name: inputs_thermoplastics inputs_thermoplastics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs_thermoplastics
    ADD CONSTRAINT inputs_thermoplastics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 5150 (class 2606 OID 67058)
-- Name: inspection_bags inspection_bags_bill_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_bags
    ADD CONSTRAINT inspection_bags_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);


--
-- TOC entry 5151 (class 2606 OID 67063)
-- Name: inspection_bags inspection_bags_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_bags
    ADD CONSTRAINT inspection_bags_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- TOC entry 5158 (class 2606 OID 67164)
-- Name: inspection_cameras inspection_cameras_bill_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cameras
    ADD CONSTRAINT inspection_cameras_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);


--
-- TOC entry 5159 (class 2606 OID 67169)
-- Name: inspection_cameras inspection_cameras_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cameras
    ADD CONSTRAINT inspection_cameras_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- TOC entry 5152 (class 2606 OID 67084)
-- Name: inspection_cardboard inspection_cardboard_bill_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cardboard
    ADD CONSTRAINT inspection_cardboard_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);


--
-- TOC entry 5153 (class 2606 OID 67089)
-- Name: inspection_cardboard inspection_cardboard_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cardboard
    ADD CONSTRAINT inspection_cardboard_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- TOC entry 5154 (class 2606 OID 67109)
-- Name: inspection_cases inspection_cases_bill_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cases
    ADD CONSTRAINT inspection_cases_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);


--
-- TOC entry 5155 (class 2606 OID 67114)
-- Name: inspection_cases inspection_cases_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_cases
    ADD CONSTRAINT inspection_cases_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- TOC entry 5148 (class 2606 OID 67031)
-- Name: inspection_chemicals inspection_chemicals_bill_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_chemicals
    ADD CONSTRAINT inspection_chemicals_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);


--
-- TOC entry 5149 (class 2606 OID 67036)
-- Name: inspection_chemicals inspection_chemicals_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_chemicals
    ADD CONSTRAINT inspection_chemicals_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- TOC entry 5160 (class 2606 OID 67190)
-- Name: inspection_collars inspection_collars_bill_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_collars
    ADD CONSTRAINT inspection_collars_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);


--
-- TOC entry 5161 (class 2606 OID 67195)
-- Name: inspection_collars inspection_collars_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_collars
    ADD CONSTRAINT inspection_collars_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- TOC entry 5146 (class 2606 OID 67005)
-- Name: inspection_oring inspection_oring_bill_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_oring
    ADD CONSTRAINT inspection_oring_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);


--
-- TOC entry 5147 (class 2606 OID 67010)
-- Name: inspection_oring inspection_oring_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_oring
    ADD CONSTRAINT inspection_oring_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- TOC entry 5144 (class 2606 OID 66980)
-- Name: inspection_stamps inspection_stamps_bill_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_stamps
    ADD CONSTRAINT inspection_stamps_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);


--
-- TOC entry 5145 (class 2606 OID 66985)
-- Name: inspection_stamps inspection_stamps_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_stamps
    ADD CONSTRAINT inspection_stamps_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- TOC entry 5142 (class 2606 OID 66953)
-- Name: inspection_stuffing_stamps_downspouts inspection_stuffing_stamps_downspouts_bill_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_stuffing_stamps_downspouts
    ADD CONSTRAINT inspection_stuffing_stamps_downspouts_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);


--
-- TOC entry 5143 (class 2606 OID 66958)
-- Name: inspection_stuffing_stamps_downspouts inspection_stuffing_stamps_downspouts_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_stuffing_stamps_downspouts
    ADD CONSTRAINT inspection_stuffing_stamps_downspouts_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- TOC entry 5156 (class 2606 OID 67133)
-- Name: inspection_thermoplastics inspection_thermoplastics_bill_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_thermoplastics
    ADD CONSTRAINT inspection_thermoplastics_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);


--
-- TOC entry 5157 (class 2606 OID 67138)
-- Name: inspection_thermoplastics inspection_thermoplastics_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_thermoplastics
    ADD CONSTRAINT inspection_thermoplastics_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- TOC entry 5138 (class 2606 OID 66893)
-- Name: master_inputs master_inputs_type_inputs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_inputs
    ADD CONSTRAINT master_inputs_type_inputs_id_fkey FOREIGN KEY (type_inputs_id) REFERENCES public.type_inputs(id);


--
-- TOC entry 5162 (class 2606 OID 74073)
-- Name: reports_approved reports_approved_bill_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_approved
    ADD CONSTRAINT reports_approved_bill_data_id_fkey FOREIGN KEY (bill_data_id) REFERENCES public.bill_data(id);


--
-- TOC entry 5163 (class 2606 OID 74094)
-- Name: reports_refused reports_refused_bill_data_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_refused
    ADD CONSTRAINT reports_refused_bill_data_id_fkey FOREIGN KEY (bill_data_id) REFERENCES public.bill_data(id);


--
-- TOC entry 5137 (class 2606 OID 66873)
-- Name: suppliers suppliers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 5126 (class 2606 OID 66617)
-- Name: users users_roles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_roles_id_fkey FOREIGN KEY (roles_id) REFERENCES public.roles(id);


-- Completed on 2026-05-04 23:05:21

--
-- PostgreSQL database dump complete
--

\unrestrict u2vBUVZ1USqrWXgaVL4qvI4K7d1dxsBcHqi8hmtUdQMVu8YcTAavHLw6vNm0bXe


# Documentación del Esquema de Base de Datos (PostgreSQL)

Este documento sirve como referencia para el asistente de IA sobre la estructura actual de la base de datos del proyecto.

## 1. Tipos Personalizados (Enums)
Estos tipos definen los estados permitidos en diversas tablas del sistema.

```sql
-- Estados para las inspecciones de insumos
CREATE TYPE public.status_inspection AS ENUM ('Aprobado', 'Rechazado', 'Observacion', 'Incompleta');

-- Estados para el control maestro de insumos
CREATE TYPE public.status_master AS ENUM ('Vigente', 'Desuso');

-- Estados para los usuarios del sistema
CREATE TYPE public.status_users AS ENUM ('Activo', 'Inactivo');

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

CREATE TABLE public.bill_inputs (
    id integer NOT NULL,
    bill_data_id integer NOT NULL,
    master_inputs_id integer NOT NULL,
    oem_number character varying(100) NOT NULL,
    quantity numeric(15,4) NOT NULL
);

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

CREATE TABLE public.inputs_cases (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    caliber numeric(7,4) NOT NULL,
    armed numeric(7,4) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);

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

CREATE TABLE public.inputs_oring (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    internal_diameter numeric(7,4) NOT NULL,
    height numeric(7,4) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);

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

CREATE TABLE public.inputs_thermoplastics (
    id integer NOT NULL,
    reference text NOT NULL,
    user_id integer NOT NULL,
    visual boolean NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);

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

CREATE TABLE public.master_inputs (
    id integer NOT NULL,
    inputs_id integer NOT NULL,
    type_inputs_id integer NOT NULL,
    status public.status_master NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    update_at date DEFAULT CURRENT_DATE NOT NULL
);

CREATE TABLE public.reports_approved (
    id integer NOT NULL,
    bill_data_id integer NOT NULL,
    approved_quantity numeric(15,4) NOT NULL,
    generated_at date DEFAULT CURRENT_DATE NOT NULL
);

CREATE TABLE public.reports_refused (
    id integer NOT NULL,
    bill_data_id integer NOT NULL,
    claim_date date NOT NULL,
    claim_quantity numeric(15,4) NOT NULL,
    rejection_reason text NOT NULL,
    generated_at date DEFAULT CURRENT_DATE NOT NULL
);

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);

CREATE TABLE public.suppliers (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(100)
);

CREATE TABLE public.type_inputs (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);

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

ALTER TABLE ONLY public.bill_data
    ADD CONSTRAINT bill_data_suppliers_id_fkey FOREIGN KEY (suppliers_id) REFERENCES public.suppliers(id);

ALTER TABLE ONLY public.bill_inputs
    ADD CONSTRAINT bill_inputs_bill_data_id_fkey FOREIGN KEY (bill_data_id) REFERENCES public.bill_data(id);

ALTER TABLE ONLY public.bill_inputs
    ADD CONSTRAINT bill_inputs_master_inputs_id_fkey FOREIGN KEY (master_inputs_id) REFERENCES public.master_inputs(id);

ALTER TABLE ONLY public.inputs_bags
    ADD CONSTRAINT inputs_bags_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inputs_cameras
    ADD CONSTRAINT inputs_cameras_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inputs_cardboard
    ADD CONSTRAINT inputs_cardboard_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inputs_cases
    ADD CONSTRAINT inputs_cases_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inputs_chemicals
    ADD CONSTRAINT inputs_chemicals_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inputs_collars
    ADD CONSTRAINT inputs_collars_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inputs_oring
    ADD CONSTRAINT inputs_oring_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inputs_stamps
    ADD CONSTRAINT inputs_stamps_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inputs_stuffing_stamps_downspouts
    ADD CONSTRAINT inputs_stuffing_stamps_downspouts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inputs_thermoplastics
    ADD CONSTRAINT inputs_thermoplastics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inspection_bags
    ADD CONSTRAINT inspection_bags_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);

ALTER TABLE ONLY public.inspection_bags
    ADD CONSTRAINT inspection_bags_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inspection_cameras
    ADD CONSTRAINT inspection_cameras_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);

ALTER TABLE ONLY public.inspection_cameras
    ADD CONSTRAINT inspection_cameras_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inspection_cardboard
    ADD CONSTRAINT inspection_cardboard_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);

ALTER TABLE ONLY public.inspection_cardboard
    ADD CONSTRAINT inspection_cardboard_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inspection_cases
    ADD CONSTRAINT inspection_cases_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);

ALTER TABLE ONLY public.inspection_cases
    ADD CONSTRAINT inspection_cases_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inspection_chemicals
    ADD CONSTRAINT inspection_chemicals_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);

ALTER TABLE ONLY public.inspection_chemicals
    ADD CONSTRAINT inspection_chemicals_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inspection_collars
    ADD CONSTRAINT inspection_collars_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);

ALTER TABLE ONLY public.inspection_collars
    ADD CONSTRAINT inspection_collars_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inspection_oring
    ADD CONSTRAINT inspection_oring_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);

ALTER TABLE ONLY public.inspection_oring
    ADD CONSTRAINT inspection_oring_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inspection_stamps
    ADD CONSTRAINT inspection_stamps_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);

ALTER TABLE ONLY public.inspection_stamps
    ADD CONSTRAINT inspection_stamps_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inspection_stuffing_stamps_downspouts
    ADD CONSTRAINT inspection_stuffing_stamps_downspouts_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);

ALTER TABLE ONLY public.inspection_stuffing_stamps_downspouts
    ADD CONSTRAINT inspection_stuffing_stamps_downspouts_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.inspection_thermoplastics
    ADD CONSTRAINT inspection_thermoplastics_bill_inputs_id_fkey FOREIGN KEY (bill_inputs_id) REFERENCES public.bill_inputs(id);

ALTER TABLE ONLY public.inspection_thermoplastics
    ADD CONSTRAINT inspection_thermoplastics_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.master_inputs
    ADD CONSTRAINT master_inputs_type_inputs_id_fkey FOREIGN KEY (type_inputs_id) REFERENCES public.type_inputs(id);

ALTER TABLE ONLY public.reports_approved
    ADD CONSTRAINT reports_approved_bill_data_id_fkey FOREIGN KEY (bill_data_id) REFERENCES public.bill_data(id);

ALTER TABLE ONLY public.reports_refused
    ADD CONSTRAINT reports_refused_bill_data_id_fkey FOREIGN KEY (bill_data_id) REFERENCES public.bill_data(id);

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_roles_id_fkey FOREIGN KEY (roles_id) REFERENCES public.roles(id);
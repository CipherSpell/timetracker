--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: timetracker; Type: DATABASE; 
--

/* CREATE DATABASE timetracker WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8'; */

\connect timetracker

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: users; Type: TABLE; Schema: public; 
--

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; 
--

COPY public.users (email, password, first_name, last_name, date_of_birth) FROM stdin;
john.doe@example.com	$2a$10$abcdefghijklmnopqrstuv	John	Doe	1985-03-15
jane.smith@example.com	$2a$10$vwxyzabcdefghijklmnopq	Jane	Smith	1990-07-22
mike.johnson@example.com	$2a$10$pqrstuvwxyzabcdefghij	Mike	Johnson	1988-11-30
sarah.williams@example.com	$2a$10$jklmnopqrstuvwxyzabcd	Sarah	Williams	1992-05-10
david.brown@example.com	$2a$10$efghijklmnopqrstuvwxy	David	Brown	1983-09-18
emily.taylor@example.com	$2a$10$zabcdefghijklmnopqrst	Emily	Taylor	1995-01-25
robert.anderson@example.com	$2a$10$uvwxyzabcdefghijklmno	Robert	Anderson	1987-06-08
lisa.martinez@example.com	$2a$10$nopqrstuvwxyzabcdefgh	Lisa	Martinez	1991-12-03
william.jackson@example.com	$2a$10$hijklmnopqrstuvwxyzab	William	Jackson	1986-04-20
olivia.white@example.com	$2a$10$cdefghijklmnopqrstuvw	Olivia	White	1993-08-12
\.

--
-- PostgreSQL database dump complete
--


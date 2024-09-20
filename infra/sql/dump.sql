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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; 
--

COPY public.users (email, password, first_name, last_name) FROM stdin;
john.doe@example.com	$2a$10$abcdefghijklmnopqrstuv	John	Doe
jane.smith@example.com	$2a$10$vwxyzabcdefghijklmnopq	Jane	Smith
mike.johnson@example.com	$2a$10$pqrstuvwxyzabcdefghij	Mike	Johnson
sarah.williams@example.com	$2a$10$jklmnopqrstuvwxyzabcd	Sarah	Williams
david.brown@example.com	$2a$10$efghijklmnopqrstuvwxy	David	Brown
emily.taylor@example.com	$2a$10$zabcdefghijklmnopqrst	Emily	Taylor
robert.anderson@example.com	$2a$10$uvwxyzabcdefghijklmno	Robert	Anderson
lisa.martinez@example.com	$2a$10$nopqrstuvwxyzabcdefgh	Lisa	Martinez
william.jackson@example.com	$2a$10$hijklmnopqrstuvwxyzab	William	Jackson
olivia.white@example.com	$2a$10$cdefghijklmnopqrstuvw	Olivia	White
\.

--
-- PostgreSQL database dump complete
--


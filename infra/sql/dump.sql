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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; 
--

COPY public.users (email, password) FROM stdin;
john.doe@example.com	$2a$10$abcdefghijklmnopqrstuv
jane.smith@example.com	$2a$10$vwxyzabcdefghijklmnopq
mike.johnson@example.com	$2a$10$pqrstuvwxyzabcdefghij
sarah.williams@example.com	$2a$10$jklmnopqrstuvwxyzabcd
david.brown@example.com	$2a$10$efghijklmnopqrstuvwxy
emily.taylor@example.com	$2a$10$zabcdefghijklmnopqrst
robert.anderson@example.com	$2a$10$uvwxyzabcdefghijklmno
lisa.martinez@example.com	$2a$10$nopqrstuvwxyzabcdefgh
william.jackson@example.com	$2a$10$hijklmnopqrstuvwxyzab
olivia.white@example.com	$2a$10$cdefghijklmnopqrstuvw
\.

--
-- Name: timers; Type: TABLE; Schema: public;
--

CREATE TABLE public.timers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES public.users(id),
    duration BIGINT NOT NULL, -- Duration in milliseconds
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--
-- Data for Name: timers; Type: TABLE DATA; Schema: public;
--

COPY public.timers (user_id, duration, description) FROM stdin;
1	3600000	"Worked on project Alpha"
2	1800000	"Meeting with client"
3	7200000	"Development tasks"
1	2700000	"Code review"
4	10800000	"Design session"
5	5400000	"Bug fixing"
2	9000000	"Feature implementation"
3	3600000	"Testing"
4	1800000	"Documentation"
5	7200000	"Deployment tasks"
\.

--
-- Name: tags; Type: TABLE; Schema: public;
--

CREATE TABLE public.tags (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, name)
);

--
-- Name: tags; Type: TABLE DATA; Schema: public;
--

COPY public.tags (user_id, name) FROM stdin;
1	"Work"
1	"Personal"
1	"Urgent"
2	"Meeting"
2	"Development"
3	"Testing"
3	"Review"
4	"Documentation"
4	"Deployment"
5	"Client"
5	"Low Priority"
6	"Research"
6	"Design"
7	"Code Review"
7	"Bug Fixes"
8	"Marketing"
8	"Sales"
9	"HR"
9	"Recruitment"
10	"Finance"
10	"Budgeting"
\.

--
-- PostgreSQL database dump complete
--


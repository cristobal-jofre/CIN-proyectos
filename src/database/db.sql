CREATE TABLE public.user (
  user_id uuid default gen_random_uuid(),
  rut VARCHAR(15),
  password_hash text,
  salt text,
  is_active boolean,
  name TEXT,
  email TEXT,
  
  PRIMARY KEY(user_id)
);

CREATE TABLE public.company(
  id_company INTEGER GENERATED BY DEFAULT AS IDENTITY,
  contact TEXT NOT NULL ,
  name TEXT NOT NULL,
  
  PRIMARY KEY(id_company)
);


CREATE TABLE public.interest(
  id_interest INTEGER GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL,
  area TEXT NOT NULL, -- Área del interés
  percentage TEXT NOT NULL, --Porcentaje del interés

  PRIMARY KEY(id_interest)
);

CREATE TABLE public.workers(
  id_worker INTEGER GENERATED BY DEFAULT AS IDENTITY,
  rut VARCHAR(15) ,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  amount integer, --sueldo 
  
  PRIMARY KEY(id_worker)
);

CREATE TABLE public.payment(
  id_worker INTEGER,
  id_project INTEGER,
  datepay timestamp default now(),
  amount INTEGER,

  PRIMARY KEY(id_worker, id_project),
  FOREIGN KEY (id_worker) REFERENCES public.workers(id_worker),
  FOREIGN KEY (id_project) REFERENCES public.projects(id_project)
);

--Creación de tabla proyectos en la BD
CREATE TABLE public.projects (
  id_project integer GENERATED BY DEFAULT AS IDENTITY,
  name_project TEXT NOT NULL,
  externoS_N boolean NOT NULL,
  balance  integer NOT NULL, --Saldo del proyecto
  deliveryDate timestamp default now(), --Fecha de entrega
  estimate TEXT NOT NULL, --presupuesto
  id_company integer,

  PRIMARY KEY(id_project),
  FOREIGN KEY (id_company) REFERENCES public.company(id_company) 
);

ALTER TABLE projects 
ADD COLUMN idFolder text

--Creación de tabla documentos en la BD
CREATE TABLE public.documents(
  id_doc integer GENERATED BY DEFAULT AS IDENTITY,
  dirDoc TEXT NOT NULL,
  dateDoc timestamp default now(),
  id_project integer,

  PRIMARY KEY(id_doc),
  FOREIGN KEY (id_project) REFERENCES public.projects(id_project) 
);

CREATE TABLE public.payment(
  id_worker integer NOT NULL,
  id_project integer NOT NULL,
  date_pay timestamp NOT NULL default now(),
  amount integer, 
  
  PRIMARY KEY(id_worker, id_project, date_pay),
  FOREIGN KEY (id_worker) REFERENCES public.workers(id_worker),
  FOREIGN KEY (id_project) REFERENCES public.projects(id_project) 
);

CREATE TABLE public.workerProject(
  id_worker integer NOT NULL,
  id_project integer NOT NULL,
  start_date timestamp NOT NULL,
  end_date timestamp NOT NULL,

  PRIMARY KEY(id_worker,id_project),
  FOREIGN KEY (id_worker) REFERENCES public.workers(id_worker),
  FOREIGN KEY (id_project) REFERENCES public.projects(id_project) 
);


CREATE TABLE public.ProjectInterest(
  id_project integer NOT NULL,
  id_interest integer NOT NULL,

  PRIMARY KEY(id_project,id_interest),
  FOREIGN KEY (id_project) REFERENCES public.projects(id_project),
  FOREIGN KEY (id_interest) REFERENCES public.interest(id_interest)
);

CREATE TABLE public.status(
  id_status INTEGER GENERATED BY DEFAULT AS IDENTITY,
  name_status text not null,
  
  PRIMARY KEY(id_status)
);

CREATE TABLE public.statusProject(
  id_status INTEGER ,
  id_project INTEGER,
  date_project timestamp default now(),
  
  PRIMARY KEY(id_status, id_project, date_project),
  FOREIGN KEY (id_status) REFERENCES public.status(id_status),
   FOREIGN KEY (id_project) REFERENCES public.projects(id_project)
);

CREATE TABLE public.billing(
  id_billing uuid default uuid_generate_v4(),
  id_project INTEGER,
  gross_pay float,
  interest_pay float,
  salary_pay float,

  PRIMARY KEY(id_billing),
  FOREIGN KEY (id_project) REFERENCES public.projects(id_project)
);    

ALTER TABLE billing
ADD COLUMN expenses float

ALTER TABLE billing
ADD COLUMN fecha_inicio timestamp

ALTER TABLE billing
ADD COLUMN fecha_termino timestamp


----------------------------------------

--ingresando datos

INSERT INTO public.projects(name_project, externos_n, balance, deliveryDate,estimate,id_company) 
VALUES('A', 'true','1000','2020-05-12','150000','1')

INSERT INTO public.projects(name_project, externos_n, balance, deliveryDate,estimate,id_company) 
VALUES('B', 'false','22000','2022-07-17','450000','2')

INSERT INTO public.projects(name_project, externos_n, balance, deliveryDate,estimate,id_company) 
VALUES('C', 'true','45000','2021-05-01','33350000','3')

INSERT INTO public.interest(name,area,percentage) 
VALUES('AAA', 'Medicina', '15')

INSERT INTO public.interest(name,area,percentage) 
VALUES('BAC', 'Ing', '5')

INSERT INTO public.interest(name,area,percentage) 
VALUES('KKK', 'Escuela', '10')

INSERT INTO public.workers(rut,name,email,amount) 
VALUES('19.042.445-6', 'Cristóbal Jofré', 'cja001@alumnos.ucn.cl', '2520000')

INSERT INTO public.workers(rut,name,email,amount) 
VALUES('18.923.827-4', 'Víctor Huerta', 'vhm005@alumnos.ucn.cl', '5850000')

INSERT INTO public.workers(rut,name,email,amount) 
VALUES('10.581.189-6', 'test1', 'test1@gmail.com', '1110000')

INSERT INTO public.documents (dirdoc,datedoc,id_project) 
VALUES('111','2021-01-01','1')

INSERT INTO public.documents (dirdoc,datedoc,id_project) 
VALUES('121','2021-06-11','2')

INSERT INTO public.documents (dirdoc,datedoc,id_project) 
VALUES('987','2021-05-05','3')

INSERT INTO public.workerproject (id_worker ,id_project ,start_date,date_end) 
VALUES('1', '1','2020-01-12', '2020-05-12')

INSERT INTO public.workerproject (id_worker ,id_project ,start_date,date_end) 
VALUES('2', '2','2021-05-12','2022-07-17')

INSERT INTO public.workerproject (id_worker ,id_project ,start_date,date_end) 
VALUES('1', '3','2021-03-12', '2021-05-01')

INSERT INTO public.workerproject (id_worker ,id_project ,start_date,date_end) 
VALUES('3', '1','2020-01-12', '2020-05-12')

INSERT INTO public.status(name_status) 
VALUES('En proceso')

INSERT INTO public.status(name_status) 
VALUES('Completado')

INSERT INTO public.status(name_status) 
VALUES('Finalizado')

INSERT INTO public.status(name_status) 
VALUES('Cancelado')

INSERT INTO public.statusproject (id_status, id_project, date_project) 
VALUES('1','1','2020-05-12')

INSERT INTO public.statusproject (id_status, id_project, date_project) 
VALUES('2','3','2021-04-12')

INSERT INTO public.statusproject (id_status, id_project, date_project) 
VALUES('3','2','2020-07-15')

INSERT INTO public.projectinterest (id_project, id_interest) 
VALUES('1', '3')

INSERT INTO public.projectinterest (id_project, id_interest) 
VALUES('2', '47')

INSERT INTO public.projectinterest (id_project, id_interest) 
VALUES('3', '49')

create schema accounts;
create type accounts.user_role as enum ('NORMAL', 'SELLER','BUYER');
create type accounts.user_state as enum ('NON_ACTIVATED', 'ACTIVATED', 'BANNED');


create table accounts.user(
  id serial primary key,
  email varchar unique,
  phone_number varchar unique,
  password_crypt text,
  confirmed_at timestamp without time zone,
  role accounts.user_role default 'NORMAL',
  user_state accounts.user_state default 'NON_ACTIVATED',
  profile jsonb,
  created_at timestamp without time zone default CURRENT_TIMESTAMP,
  updated_at timestamp without time zone default CURRENT_TIMESTAMP
);

create schema shops;
create type shops.company_info_state as enum ('NON_VERIFIED', 'VERIFIED');
create table shops.company_info(
  id int primary key,
  name character varying,
  state shops.company_info_state default 'NON_VERIFIED',
  business_code text,
  image_business jsonb,
  main_items jsonb,
  founded_year date,
  company_size varchar,
  name_representative varchar,
  constraint fk_company_info_user_id FOREIGN key (id) REFERENCES accounts.user(id),
  created_at timestamp without time zone default CURRENT_TIMESTAMP,
  updated_at timestamp without time zone default CURRENT_TIMESTAMP
);
create table shops.company_info_advan(
	id int primary key,
	production_capacity jsonb,
	quality_control jsonb,
	certification jsonb,
	constraint fk_company_info_user_id FOREIGN key (id) REFERENCES accounts.user(id),
  	created_at timestamp without time zone default CURRENT_TIMESTAMP,
  	updated_at timestamp without time zone default CURRENT_TIMESTAMP
)

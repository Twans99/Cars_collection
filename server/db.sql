-- Use PostgreSQL
CREATE DATABASE Car_storage;

--togo car_collection_db
CREATE TABLE car_info (
  carid    INT serial PRIMARY KEY,
  car_regis VARCHAR(50),
  car_brand VARCHAR(50),
  car_model VARCHAR(50),
  note      VARCHAR(50),
  color     VARCHAR(50)
);
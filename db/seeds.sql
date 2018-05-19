/* Seed data for providers */
drop database hairsalon_db;
create database if not exists hairsalon_db ;
use hairsalon_db;

INSERT INTO schedules (startTime, endTime,ProviderId) VALUES (20180502080055, 20180502160000,2);
INSERT INTO schedules (startTime, endTime,ProviderId) VALUES (20180503080055, 20180503160000,3);
INSERT INTO schedules (startTime, endTime,ProviderId) VALUES (20180501080055, 20180501150000,4);
INSERT INTO schedules (startTime, endTime,ProviderId) VALUES (20180501080055, 20180501170000,1);
INSERT INTO schedules (startTime, endTime,ProviderId) VALUES (20180501080055, 20180501200000,2);
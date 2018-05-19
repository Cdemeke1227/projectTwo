/* Seed data for providers */
drop database hairsalon_db;
create database if not exists hairsalon_db ;
use hairsalon_db;

INSERT INTO providers (firstName, lastName, password, email, title, experience, phone, notes, photoLink) VALUES ("Kelly", "Smith", "password", "kelly@houseofstyle.com", "Master Stylist", 48, "7136242353", "Kelly began as a stylist in 2005. She specializes in color but loves to tame curly hair and scare away frizz from damaged hair. In her spare time, Kelly volunteers at animal clinics and promotes healthy living.", "/assets/images/about/kelly-bw.jpg");
INSERT INTO providers (firstName, lastName, password, email, title, experience, phone, notes, photoLink) VALUES ("Becca", "Disney","password", "bdisney@houseofstyle.com", "Stylist", 6, "8322153435", "Becca has been an apprentice under Kelly since 2016. She loves cutting children's hair and is a master at head massages when shampooing.", "/assets/images/about/becca-bw.jpg");

INSERT INTO providers (firstName, lastName, password, email, title, experience, phone, notes, photoLink) VALUES ("Jennifer", "Black", "password", "jblack@houseofstyle.com", "Stylist", 5, "8322166666", "Jennifer has recenly Joined the team, she is a stylist in training but can do basic services", "/assets/images/about/jen-bw.jpg");

INSERT INTO providers (firstName, lastName, password, email, title, experience, phone, notes, photoLink) VALUES ("Alex", "Jones", "password", "ajones@houseofstyle.com", "Stylist", 32, "7132166666", "Alex is an experience stylist, she is very good in coloring and men's hair cut", "/assets/images/about/alex-bw.jpg");



INSERT INTO customers (firstName, lastName, password, email, phone, notes, photoLink) VALUES ("Sam", "Newman", "password", "snewman@gmail.com","8333353435", "Likes his hair cut short", "./img/newman.jpg");

INSERT INTO customers (firstName, lastName, password, email, phone, notes, photoLink) VALUES ("Michelle", "Lyon", "password", "mlyon@gmail.com","8332223435", "Difficult Customer", "./img/lyon.jpg");

INSERT INTO customers (firstName, lastName, password, email, phone, notes, photoLink) VALUES ("Kris", "Foreman", "password", "kris@gmail.com","7133353435", "Likes his hair cut short", "./img/Kris.jpg");



INSERT INTO services (category, service_name, description, duration, price, photoLinks) 
VALUES 
("Cuts", "Kids Cut and Style", "Kids Hair", "0:30", 20, "assets/images/services/cut_child.jpg")
, ("Cuts", "Women's Cut and Style", "Women's Hair Cut - Long or Short", ":30", 65, "assets/images/services/cut_women.jpg")
, ("Cuts", "Men's Cut and Style", "Men's Hair Cut", "0:30", 35, "assets/images/services/cut_men.jpg");
INSERT INTO services (category, service_name, description, duration, price, photoLinks) 
VALUES 
("Coloring", "Boooop", "Kids Hair", "0:30", 20, "assets/images/services/cut_child.jpg")
, ("Coloring", "Boooop", "Women's Hair Cut - Long or Short", ":30", 65, "assets/images/services/cut_women.jpg")
, ("Coloring", "Boooop", "Men's Hair Cut", "0:30", 35, "assets/images/services/cut_men.jpg");
INSERT INTO schedules (startTime, endTime, ProviderId) VALUES (20180501080055, 20180501160000,1);
INSERT INTO schedules (startTime, endTime, ProviderId) VALUES (20180502080055, 20180502160000,2);
INSERT INTO schedules (startTime, endTime, ProviderId) VALUES (20180503080055, 20180503160000,3);
INSERT INTO schedules (startTime, endTime, ProviderId) VALUES (20180501080055, 20180501150000,4);
INSERT INTO schedules (startTime, endTime, ProviderId) VALUES (20180501080055, 20180501170000,1);
INSERT INTO schedules (startTime, endTime, ProviderId) VALUES (20180501080055, 20180501200000,2);

INSERT INTO appointments (appointStart, appointEnd, duration, ProviderId, ScheduleId) VALUES (20180501080055, 20180501100000, 0200, 1, 2);
INSERT INTO appointments (appointStart, appointEnd, duration, ProviderId, ScheduleId) VALUES (20180502140055, 20180502160000, 0200, 2, 4);
INSERT INTO appointments (appointStart, appointEnd, duration, ProviderId, ScheduleId) VALUES (20180501080055, 20180501160000, 0200, 4, 3);
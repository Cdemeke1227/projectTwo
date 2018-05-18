/* Seed data for providers */
drop database hairsalon_db;
create database if not exists hairsalon_db ;
use hairsalon_db;
INSERT INTO providers (firstName, lastName, username, password, email, title, experience, phone, notes, photoLink) VALUES ("Kelly", "Smith", "kelly", "password", "kelly@houseofstyle.com", "Master Stylist", 4, "7136242353", "Kelly began as a stylist in 2005. She specializes in color but loves to tame curly hair and scare away frizz from damaged hair. In her spare time, Kelly volunteers at animal clinics and promotes healthy living.", "/assets/images/about/kelly-bw.jpg");
 INSERT INTO providers (firstName, lastName, username, password, email, title, experience, phone, notes, photoLink) VALUES ("Mike", "Disney", "becca", "becca", "mikes@houseofstyle.com", "Stylist", 1, "8322153435", "Becca has been an apprentice under Kelly since 2016. She loves cutting children's hair and is a master at head massages when shampooing.", "/assets/images/about/becca-bw.jpg");

 -- INSERT INTO customers (firstName, lastName, password, email, phone, notes, photoLink) VALUES ("Jimmy", "Jones", "dfdf", "jones@gmail.com","8322153435", "Hates Chris", "./img/Jimmy.jpg");

INSERT INTO services (category, service_name, description, duration, price, photoLinks) 
VALUES 
("Cuts", "Kids Cut and Style", "Kids Hair", "0:30", 20, "assets/images/services/cut_child.jpg")
, ("Cuts", "Women's Cut and Style", "Women's Hair Cut - Long or Short", ":30", 65, "assets/images/services/cut_women.jpg")
, ("Cuts", "Men's Cut and Style", "Men's Hair Cut", "0:30", 35, "assets/images/services/cut_men.jpg");

INSERT INTO schedules (startTime, endTime) VALUES (20180501080055, 20180501160000);
INSERT INTO appointments (appointStart, appointEnd, duration) VALUES (20180501080055, 20180501160000, 0200);



select * from services;
/* Seed data for providers */
INSERT INTO providers (firstName, lastName, username, password, email, title, experience, phone, notes, photoLink) VALUES ("Chris", "Jones", "Chris2014", "chris123", "chris@gmail.com", "Hair Stylist", 12, "7136242353", "Hates Cutting Hair", "./img/hair1.jpg");
 INSERT INTO providers (firstName, lastName, username, password, email, title, experience, phone, notes, photoLink) VALUES ("Mike", "Disney", "Mike2016", "acbd", "mikes@gmail.com", "Killer", 45, "8322153435", "Loves Cutting Hair", "./img/hair2.jpg");

 INSERT INTO customers (firstName, lastName, password, email, phone, notes, photoLink) VALUES ("Jimmy", "Jones", "dfdf", "jones@gmail.com","8322153435", "Hates Chris", "./img/Jimmy.jpg");

INSERT INTO services (service_name, description, duration, price, photoLinks) VALUES ("Kids", "Kids Hair", "1:30", 15, "../img/services/kid1.jpg");

INSERT INTO schedules (startTime, endTime) VALUES (20180501080055, 20180501160000);
INSERT INTO appointments (appointStart, appointEnd, duration) VALUES (20180501080055, 20180501160000, 0200);




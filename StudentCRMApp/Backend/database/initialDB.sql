USE `studentInfo_manageDB`;

TRUNCATE TABLE campus;
TRUNCATE TABLE role;
TRUNCATE TABLE type;


INSERT INTO campus (campus_location, name, is_del, create_time)
VALUES ('55 33 St E, Saskatoon', 'Saskatoon', '0', NOW());

INSERT INTO campus (campus_location, name, is_del, create_time)
VALUES ('4500 Wascana Pkwy, Regina', 'Regina', '0', NOW());

INSERT INTO campus (campus_location, name, is_del, create_time)
VALUES ('600 6th Avenue NW, Moose Jaw', 'Moose Jaw', '0', NOW());

INSERT INTO campus (campus_location, name, is_del, create_time)
VALUES ('1500 10th Ave E, Prince Albert', 'Prince Albert', '0', NOW());



INSERT INTO type (type_title, is_del, create_time, create_by)
VALUES ('EMAIL','0', NOW(), 1);
INSERT INTO type (type_title, is_del, create_time, create_by)
VALUES ('APPOINTMENT','0', NOW(), 1);
INSERT INTO type (type_title, is_del, create_time, create_by)
VALUES ('OTHERS','0', NOW(), 1);


INSERT INTO role (title, is_del, create_time, create_by)
VALUES ('admin','0', NOW(), 1);
INSERT INTO role (title, is_del, create_time, create_by)
VALUES ('RISIA','0', NOW(), 1);
INSERT INTO role (title, is_del, create_time, create_by)
VALUES ('RCIC','0', NOW(), 1);
INSERT INTO role (title, is_del, create_time, create_by)
VALUES ('Other','0', NOW(), 1);

select * from campus;
select * from role;
select * from type;
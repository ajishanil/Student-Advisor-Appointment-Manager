
-- -----------------------------------------------------
-- Schema studentInfo_manageDB
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `studentInfo_manageDB`;
USE `studentInfo_manageDB`;

-- -----------------------------------------------------
-- Table `studentInfo_manageDB`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentInfo_manageDB`.`student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NULL UNIQUE,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `date_birth` DATETIME NULL,
  `gender` VARCHAR(45) NULL,
  `home_country` VARCHAR(45) NULL,
  `email_address` VARCHAR(45) NULL,
  `is_del` INT NOT NULL DEFAULT 0 COMMENT 'is del, 0: normal, 1: delete',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NULL,
  `create_by` INT NULL COMMENT 'id_in_advisor_table',
  `update_by` INT NULL COMMENT 'id_in_advisor_table',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


--- -----------------------------------------------------
--- Table `studentInfo_manageDB`.`role`
--- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentInfo_manageDB`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL COMMENT '0: admin, 1: RISIA, 2: RCIC',
  `is_del` INT NOT NULL DEFAULT 0 COMMENT 'is del, 0: normal, 1: delete',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NULL,
  `create_by` INT NULL COMMENT 'id_in_advisor_table',
  `update_by` INT NULL COMMENT 'id_in_advisor_table',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `studentInfo_manageDB`.`campus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentInfo_manageDB`.`campus` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `campus_location` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `is_del` INT NOT NULL DEFAULT 0 COMMENT 'is del, 0: normal, 1: delete',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NULL,
  `create_by` INT NULL COMMENT 'id_in_advisor_table',
  `update_by` INT NULL COMMENT 'id_in_advisor_table',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `studentInfo_manageDB`.`advisor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentInfo_manageDB`.`advisor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone_num` VARCHAR(45) NULL,
  `date_birth` DATETIME NULL,
  `license_type` VARCHAR(45) NULL COMMENT '1: RISIA, 2: RCIC',
  `license_number` VARCHAR(45) NULL,
  `password` VARCHAR(60) NULL,
  `is_del` INT NULL DEFAULT 0 COMMENT 'is del, 0: normal, 1: delete',
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  `create_by` INT NULL COMMENT 'id_in_advisor_table',
  `update_by` INT NULL COMMENT 'id_in_advisor_table',
  `role_id` INT NULL,
  `campus_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_advisor_role1_idx` (`role_id` ASC) VISIBLE,
  INDEX `fk_advisor_campus1_idx` (`campus_id` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `studentInfo_manageDB`.`type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentInfo_manageDB`.`type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type_title` VARCHAR(45) NULL COMMENT 'application, email',
  `is_del` INT NOT NULL DEFAULT 0 COMMENT 'is del, 0: normal, 1: delete',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NULL,
  `create_by` INT NULL COMMENT 'id_in_advisor_table',
  `update_by` INT NULL COMMENT 'id_in_advisor_table',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `studentInfo_manageDB`.`note`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentInfo_manageDB`.`note` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(5000) NULL,
  `subject` VARCHAR(100) NULL,
  `date_occur` DATETIME NULL,
  `file` MEDIUMBLOB NULL,
  `fileName` VARCHAR(100) NULL,
  `filePath` VARCHAR(1000) NULL,
  `isConfedential` INTEGER NOT NULL DEFAULT 0 COMMENT 'isConfedential, 0: not confidential, 1: confidential file',
  `is_del` INT NOT NULL DEFAULT 0 COMMENT 'is del, 0: normal, 1: delete',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NULL,
  `create_by` INT NULL COMMENT 'id_in_advisor_table',
  `update_by` INT NULL COMMENT 'id_in_advisor_table',
  `student_id` INT NULL,
  `advisor_id` INT NULL  COMMENT 'id_in_advisor_table',
  `type_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_note_type1_idx` (`type_id` ASC) VISIBLE,
  INDEX `fk_note_advisor1_idx` (`advisor_id` ASC) VISIBLE,
  INDEX `fk_note_student1_idx` (`student_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `studentInfo_manageDB`.`student_program`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentInfo_manageDB`.`student_program` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NULL,
  `program` VARCHAR(45) NULL,
  `degree` VARCHAR(45) NULL,
  `year` VARCHAR(45) NULL,
  `is_del` INT NOT NULL DEFAULT 0 COMMENT 'is del, 0: normal, 1: delete',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NULL,
  `create_by` INT NULL COMMENT 'id_in_advisor_table',
  `update_by` INT NULL COMMENT 'id_in_advisor_table',
  -- student_id not real id, and it's auto increment id in student id, in case of student id in system is null
  `student_id` INT NULL,
  `campus_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_student_program_student1_idx` (`student_id` ASC) VISIBLE,
  INDEX `fk_student_program_campus1_idx` (`campus_id` ASC) VISIBLE)
ENGINE = InnoDB;

-- replacing full group by
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
set global net_buffer_length=1000000; 
set global max_allowed_packet=1000000000;
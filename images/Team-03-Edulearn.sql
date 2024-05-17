-- to drop database if exists
Drop database if exists edulearn;
 
-- Create database 
CREATE DATABASE edulearn; 
-- Use the created database 
USE edulearn; 
  
-- Create users table 
CREATE TABLE users ( 
    user_id INT PRIMARY KEY, 
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    user_type VARCHAR(50) NOT NULL, 
    name VARCHAR(255) NOT NULL 
); 
  
-- Create courses table 
CREATE TABLE courses ( 
    course_id INT PRIMARY KEY, 
    user_id INT, 
    course_name VARCHAR(255) NOT NULL, 
    course_description TEXT, 
    enrollment_status VARCHAR(50), 
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
); 
  
-- Create course_content table 
CREATE TABLE course_content ( 
    id INT PRIMARY KEY, 
    course_id INT, 
    content_type VARCHAR(255), 
    content_title VARCHAR(255), 
    content_file_path VARCHAR(255), 
    FOREIGN KEY (course_id) REFERENCES courses(course_id) 
); 
  
-- Create quizzes table 
CREATE TABLE quizzes ( 
    id INT PRIMARY KEY, 
    course_id INT, 
    quiz_title VARCHAR(255), 
    description TEXT, 
    due_date DATE, 
    maximum_score INT, 
    grade VARCHAR(2), 
    FOREIGN KEY (course_id) REFERENCES courses(course_id) 
); 
  
-- Create assignments table 
CREATE TABLE assignments ( 
    id INT PRIMARY KEY, 
    course_id INT, 
    assignment_title VARCHAR(255), 
    description TEXT, 
    due_date DATE, 
    maximum_score INT, 
    grade VARCHAR(2), 
    FOREIGN KEY (course_id) REFERENCES courses(course_id) 
); 
  
-- Create user_progress table 
CREATE TABLE user_progress ( 
    user_id INT, 
    course_id INT, 
    completed_tasks INT, 
    pending_tasks INT, 
    progress_percentage DECIMAL(5,2), 
    FOREIGN KEY (user_id) REFERENCES users(user_id), 
    FOREIGN KEY (course_id) REFERENCES courses(course_id), 
    PRIMARY KEY (user_id, course_id) 
); 
  
-- Insert seed data into users table 
INSERT INTO users (user_id, email, password, user_type, name) VALUES 
('101', 'lakshmimanasag616@gmail.com', 'mansaManny@3_7_3', 'student', 'Lakshmi Manasa Gundala'), 
('202', 'srilatha789@gmail.com', 'sri@919563', 'student', 'SriLatha Yadala'), 
('303', 'parthasarathy123@gmail.com', 'sarathy89@92', 'student', 'Partha Sarathy Boda'), 
('404', 'divya@nwmissouri.edu', 'divyaNWM@5692', 'instructor', 'Divya Bathala'), 
('505', 'vani@nwmissouri.edu', 'VaniNWM@9_1_9', 'instructor', 'Vani Battu'); 
  
-- Insert seed data into courses table 
INSERT INTO courses (course_id, user_id, course_name, course_description, enrollment_status) VALUES 
('111', '101', 'Web Applications', 'Introduction to Web Applications', 'enrolled'), 
('222', '202', 'Java', 'Introduction to Java', 'enrolled'), 
('333', '101', 'Advanced Data Base', 'Introduction to Advanced Data Base', 'enrolled'), 
('444', '303', 'Project Management', 'Introduction to Project Management', 'enrolled'); 
  
-- Insert seed data into course_content table 
INSERT INTO course_content (id, course_id, content_type, content_title, content_file_path) VALUES 
('11', '111', 'video lectures', 'Introduction to Web Applications', '/content/file/web_applications_lecture.mp4'), 
('22', '111', 'reading materials', 'Web Applications Basics', '/content/file/web_applications_basics.pdf'), 
('33', '222', 'video lectures', 'Introduction to Java', '/content/file/java_lecture.mp4'), 
('44', '222', 'reading materials', 'Java Fundamentals', '/content/file/java_fundamentals.pdf'); 
  
-- Insert seed data into quizzes table 
INSERT INTO quizzes (id, course_id, quiz_title, description, due_date, maximum_score, grade) VALUES 
('1', '111', 'Web Applications Quiz 1', 'Test your knowledge on web applications', '2024-05-20', '100', 'A'), 
('2', '222', 'Java Quiz 1', 'Test your knowledge on Java programming', '2024-05-22', '100', 'A'); 
  
-- Insert seed data into assignments table 
INSERT INTO assignments (id, course_id, assignment_title, description, due_date, maximum_score, grade) VALUES 
('1011', '111', 'Web Applications Assignment 1', 'Complete the web applications exercises', '2024-05-25', '100', 'A'), 
('1012', '222', 'Java Assignment 1', 'Complete the Java programming tasks', '2024-05-27', '100', 'A'); 
  
-- Insert seed data into user_progress table 
INSERT INTO user_progress (user_id, course_id, completed_tasks, pending_tasks, progress_percentage) VALUES 
('101', '111', '2', '1', '66.67'), 
('202', '222', '1', '2', '33.33'); 
 


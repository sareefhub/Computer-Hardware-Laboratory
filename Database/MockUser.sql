INSERT INTO users (user_id, username, password, name, email, department, role, student_code, created_at)
VALUES 
('1', 'student123', 'password', 'นายสมชาย ใจดี', 'student@university.ac.th', 'วิศวกรรมคอมพิวเตอร์', 'student', '6510110001', CURRENT_TIMESTAMP),
('2', 'teacher123', 'password', 'ผศ.ดร.สมหญิง ใจดี', 'teacher@university.ac.th', 'วิศวกรรมคอมพิวเตอร์', 'teacher', NULL, CURRENT_TIMESTAMP),
('3', 'admin123', 'password', 'ผู้ดูแลระบบ', 'admin@university.ac.th', 'วิศวกรรมคอมพิวเตอร์', 'admin', NULL, CURRENT_TIMESTAMP);

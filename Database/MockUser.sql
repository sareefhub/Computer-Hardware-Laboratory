INSERT INTO users (user_id, username, password, name, email, department, role, student_code, created_at)
VALUES 
('1', 'student', 'password', 'นักศึกษา', 'student@university.ac.th', 'วิศวกรรมคอมพิวเตอร์', 'student', '6510110115', CURRENT_TIMESTAMP),
('2', 'teacher', 'password', 'อาจารย์', 'teacher@university.ac.th', 'วิศวกรรมคอมพิวเตอร์', 'teacher', NULL, CURRENT_TIMESTAMP),
('3', 'admin', 'password', 'ผู้ดูแลระบบ', 'admin@university.ac.th', 'วิศวกรรมคอมพิวเตอร์', 'admin', NULL, CURRENT_TIMESTAMP);

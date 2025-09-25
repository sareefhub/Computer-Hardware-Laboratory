-- ตาราง borrowing_requests
INSERT INTO borrowing_requests 
(request_id, student_id, teacher_id, course, reason, notes, status_code, priority, request_date) VALUES
('1/2568-6510110115-001', '6510110115', 'T001', 'CPE101 - Computer Programming', 'Assignment - งานที่ได้รับมอบหมาย', 'ต้องการใช้ Arduino Uno R3 และ Breadboard', 5, 'normal', '2024-01-15'),
('1/2568-6510110115-002', '6510110115', 'T002', 'CPE102 - Digital Logic Design', 'Lab - การทดลอง', 'ต้องการใช้ Digital Multimeter', 4, 'normal', '2024-01-10'),
('1/2568-6510110115-003', '6510110115', 'T003', 'CPE201 - Data Structures', 'Project - โครงงาน', 'ต้องการใช้ Raspberry Pi 4', 3, 'normal', '2024-01-08');

-- ตาราง borrowing_items
INSERT INTO borrowing_items (request_id, equipment_id, quantity) VALUES
('1/2568-6510110115-001', 1, 2), -- Arduino Uno R3
('1/2568-6510110115-001', 4, 1), -- Breadboard
('1/2568-6510110115-002', 3, 1), -- Digital Multimeter
('1/2568-6510110115-003', 2, 1); -- Raspberry Pi 4

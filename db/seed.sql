INSERT INTO prescription_db.users 
(username,
address,
email,
age)
VALUES
('Sam',
'11 Church Lane Dobson, Florida',
'a@b.com',
55);

INSERT INTO prescription_db.prescriptions
(name,
details,
image)
VALUES
('Acebutolol',
'Blood Pressure - Beta Blocker',
'URL');

INSERT INTO prescription_db.schedules
(UserId,
PrescriptionId,
frequencyUnit,
frequency,
comments)
VALUES(
1,
1,
'DAY',
1,
'Beta Blocker , Hypertension');

commit;
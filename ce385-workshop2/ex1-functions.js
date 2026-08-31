// 1. ตรวจสอบว่าคะแนนถูกต้องไหม (เป็นตัวเลข และอยู่ระหว่าง 0 - 100)
const isValidScore = (score) => typeof score === 'number' && score >= 0 && score <= 100;

// 2. แปลงคะแนนเป็นเกรด โดยใช้ Array ของกฎ + find (สั้นกว่า if-else 8 ชั้น)
const toGrade = (score) => {
  if (!isValidScore(score)) return 'Invalid';

  const gradeRules = [
    { min: 80, grade: 'A' },
    { min: 75, grade: 'B+' },
    { min: 70, grade: 'B' },
    { min: 65, grade: 'C+' },
    { min: 60, grade: 'C' },
    { min: 55, grade: 'D+' },
    { min: 50, grade: 'D' },
    { min: 0,  grade: 'F' }
  ];

  // หาเกณฑ์แรกที่คะแนนของเรามากกว่าหรือเท่ากับค่า min
  const match = gradeRules.find((rule) => score >= rule.min);
  return match.grade;
};

// 3. คำนวณคะแนน Workshop (พร้อม Default Parameters: full = 60, weight = 20)
const calculateWorkshopScore = (raw, full = 60, weight = 20) => {
  return (raw / full) * weight;
};

// 4. คำนวณคะแนนรวมจาก 5 ส่วน
const calculateTotal = (workshop, attendance, project, midterm, final) => {
  return workshop + attendance + project + midterm + final;
};

// ==========================================
// ส่วนที่ 2 & 3: ทดสอบและแสดงผล ( console.log ได้เฉพาะส่วนนี้ )
// ==========================================

// ทดสอบสร้างข้อมูล 3 คนแล้วแสดงผลแบบตาราง
const studentsTest = [
  { name: 'Somchai', raw: 48, attendance: 10, project: 20, midterm: 20, final: 30 },
  { name: 'Somsri',   raw: 54, attendance: 8,  project: 18, midterm: 15, final: 25 },
  { name: 'Somsak',  raw: 30, attendance: 5,  project: 12, midterm: 10, final: 15 }
];

const summaryTable = studentsTest.map((s) => {
  const wsScore = calculateWorkshopScore(s.raw);
  const total = calculateTotal(wsScore, s.attendance, s.project, s.midterm, s.final);
  return {
    Name: s.name,
    Workshop: wsScore,
    Total: total,
    Grade: toGrade(total)
  };
});

console.table(summaryTable);

// พิสูจน์เรื่อง Default Parameters (ส่วนที่ 3 ของโจทย์)
console.log('--- Default Parameter Test ---');
console.log('calculateWorkshopScore(48):', calculateWorkshopScore(48)); 
console.log('calculateWorkshopScore(48, 60, 20):', calculateWorkshopScore(48, 60, 20));
// ผลลัพธ์ได้เท่ากัน (16) เพราะถ้าไม่ใส่พารามิเตอร์ที่ 2 และ 3 JS จะใช้ค่าเริ่มต้น 60 และ 20 ให้เอง

console.log('calculateWorkshopScore(48, undefined, 25):', calculateWorkshopScore(48, undefined, 25));
// อธิบาย: เมื่อส่ง undefined ในตำแหน่ง full ตัว JS จะข้ามไปใช้ค่า Default (60) ส่วน weight ถูกแทนที่ด้วย 25 คำนวณเป็น (48/60)*25 = 20
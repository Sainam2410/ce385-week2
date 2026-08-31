// ใช้ข้อมูลชุดเดียวกับข้อ 2
const students = [
  { id: "6601", name: "Alice", major: "CE", score: 85 },
  { id: "6602", name: "Bob", major: "IT", score: 45 },
  { id: "6603", name: "Charlie", major: "CE", score: 72 },
  { id: "6604", name: "David", major: "IT", score: 38 },
  { id: "6605", name: "Eve", major: "CE", score: 90 },
  { id: "6606", name: "Frank", major: "IT", score: 60 }
];

// ฟังก์ชันแปลงคะแนนเป็นเกรดอย่างง่ายสำหรับใช้ใน countByGrade
const getSimpleGrade = (score) => (score >= 80 ? "A" : score >= 70 ? "B" : score >= 50 ? "D" : "F");

// ส่วนที่ 1 — ห้ามใช้ลูป for/while
const getNames = (arr) => arr.map((s) => s.name);

const getPassedStudents = (arr) => arr.filter((s) => s.score >= 50);

const getTotalScore = (arr) => arr.reduce((sum, s) => sum + s.score, 0);

const getAverageScore = (arr) => {
  if (arr.length === 0) return 0; // ป้องกันกรณี Array ว่าง คืนค่า 0 ไม่ให้เป็น NaN
  const total = getTotalScore(arr);
  return Number((total / arr.length).toFixed(2));
};

const countByGrade = (arr) =>
  arr.reduce((acc, s) => {
    const grade = getSimpleGrade(s.score);
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {});

const getTopStudent = (arr) => {
  if (arr.length === 0) return null;
  return arr.reduce((top, current) => (current.score > top.score ? current : top));
};

// ส่วนที่ 2 — ท่อข้อมูลบรรทัดเดียว (filter -> map -> reduce)
// หาคะแนนเฉลี่ยของนักศึกษาสาขา CE ที่สอบผ่าน
const averageCEPassed = (arr) =>
  arr
    .filter((s) => s.major === "CE" && s.score >= 50)
    .map((s) => s.score)
    .reduce((acc, score, idx, array) => acc + score / array.length, 0);

// ==========================================
// ส่วนที่ 3 — ทดสอบกรณีขอบ (Array ว่าง [])
// ==========================================
console.log(" getNames:", getNames(students));
console.log(" getTotalScore:", getTotalScore(students));
console.log(" getAverageScore (ปกติ):", getAverageScore(students));
console.log(" getAverageScore ([]):", getAverageScore([])); // ได้ 0
console.log(" countByGrade:", countByGrade(students));
console.log(" getTopStudent:", getTopStudent(students));
console.log(" คะแนนเฉลี่ย CE ที่ผ่าน (Chaining):", averageCEPassed(students));
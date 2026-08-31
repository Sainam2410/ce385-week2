// ส่วนที่ 1 — ข้อมูลตั้งต้น Array of Object นักศึกษา 6 คน
const students = [
  { id: "6601", name: "Alice", major: "CE", score: 85, contact: { email: "alice@example.com", phone: "081-111-1111" } },
  { id: "6602", name: "Bob", major: "IT", score: 45, contact: { email: "bob@example.com", phone: "081-222-2222" } },
  { id: "6603", name: "Charlie", major: "CE", score: 72, contact: { email: "charlie@example.com", phone: "081-333-3333" } },
  { id: "6604", name: "David", major: "IT", score: 38, contact: null }, // ไม่มี contact เพื่อทดสอบกรณีไม่มีข้อมูล
  { id: "6605", name: "Eve", major: "CE", score: 90, contact: { email: "eve@example.com", phone: "081-555-5555" } },
  { id: "6606", name: "Frank", major: "IT", score: 60 } // ไม่กำหนด contact
];

// ส่วนที่ 2 — ฟังก์ชันค้นหา (ห้ามแก้ array ต้นฉบับ)
const findById = (studentsArray, id) => studentsArray.find((s) => s.id === id);

const findByMajor = (studentsArray, major) => studentsArray.filter((s) => s.major === major);

const hasFailingStudent = (studentsArray) => studentsArray.some((s) => s.score < 50);

// ใช้ Optional Chaining (?.) ร่วมกับ Nullish Coalescing (??)
const getEmail = (studentsArray, id) => {
  const student = findById(studentsArray, id);
  return student?.contact?.email ?? "ไม่พบข้อมูลติดต่อ";
};

// เพิ่มนักศึกษาใหม่โดยห้ามใช้ .push() ให้ใช้ Spread Operator ([...])
const addStudent = (studentsArray, newStudent) => [...studentsArray, newStudent];

// ==========================================
// ส่วนที่ 3 — ทดสอบและแสดงผล
// ==========================================
console.log("ค้นหา ID 9999:", findById(students, "9999")); // undefined
console.log("getEmail ID 9999:", getEmail(students, "9999")); // "ไม่พบข้อมูลติดต่อ"

const studentNoContact = findById(students, "6604");
console.log("getEmail คนไม่มี contact (ID 6604):", getEmail(students, "6604")); // "ไม่พบข้อมูลติดต่อ"

// ทดสอบเพิ่มนักศึกษาใหม่โดยไม่กระทบของเดิม
const newStudentList = addStudent(students, { id: "6607", name: "Grace", major: "CE", score: 78 });
console.log("จำนวนนักศึกษาเดิม:", students.length); // 6
console.log("จำนวนนักศึกษาใหม่:", newStudentList.length); // 7
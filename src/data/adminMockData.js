/* =========================================================
   ADMIN DASHBOARD
========================================================= */

export const adminStats = {
  totalStudents: 1250,
  activeStudents: 1084,
  inactiveStudents: 166,
  totalTests: 48,
  testAttempts: 3820,
  averageScore: 76,
  aiChatSessions: 5430,
  pdfSummaries: 2180,
};

/* =========================================================
   USERS
========================================================= */

export const users = [
  {
    id: "USR001",
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    role: "Student",
    provider: "Google",
    status: "Active",
    joined: "12 Jan 2026",
    lastLogin: "Today, 09:12 AM",
    tests: 14,
    averageScore: 82,
    aiSessions: 38,
    notes: 24,
    pdfs: 8,
  },
  {
    id: "USR002",
    name: "Priya Singh",
    email: "priya.singh@gmail.com",
    role: "Student",
    provider: "Google",
    status: "Active",
    joined: "18 Jan 2026",
    lastLogin: "Today, 08:45 AM",
    tests: 18,
    averageScore: 89,
    aiSessions: 52,
    notes: 31,
    pdfs: 12,
  },
  {
    id: "USR003",
    name: "Aman Kumar",
    email: "aman.kumar@gmail.com",
    role: "Student",
    provider: "Email",
    status: "Active",
    joined: "24 Feb 2026",
    lastLogin: "Yesterday",
    tests: 9,
    averageScore: 71,
    aiSessions: 27,
    notes: 18,
    pdfs: 5,
  },
  {
    id: "USR004",
    name: "Sneha Verma",
    email: "sneha.verma@gmail.com",
    role: "Student",
    provider: "Google",
    status: "Inactive",
    joined: "03 Mar 2026",
    lastLogin: "12 Aug 2026",
    tests: 6,
    averageScore: 68,
    aiSessions: 15,
    notes: 9,
    pdfs: 3,
  },
  {
    id: "USR005",
    name: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    role: "Student",
    provider: "Google",
    status: "Active",
    joined: "17 Mar 2026",
    lastLogin: "Today, 07:30 AM",
    tests: 21,
    averageScore: 91,
    aiSessions: 61,
    notes: 42,
    pdfs: 15,
  },
];

/* =========================================================
   AI CHAT
========================================================= */

export const chatSessions = [
  {
    id: "CHAT001",
    student: "Rahul Sharma",
    topic: "React Hooks",
    messages: 24,
    duration: "18 min",
    date: "Today, 09:12 AM",
  },
  {
    id: "CHAT002",
    student: "Priya Singh",
    topic: "DBMS Normalization",
    messages: 31,
    duration: "26 min",
    date: "Today, 08:45 AM",
  },
  {
    id: "CHAT003",
    student: "Aman Kumar",
    topic: "JavaScript Closures",
    messages: 17,
    duration: "12 min",
    date: "Yesterday",
  },
];

/* =========================================================
   PDF SUMMARIES
========================================================= */

export const pdfRecords = [
  {
    id: "PDF001",
    student: "Rahul Sharma",
    fileName: "Operating_System_Notes.pdf",
    pages: 48,
    size: "4.8 MB",
    status: "Completed",
    created: "Today, 08:30 AM",
  },
  {
    id: "PDF002",
    student: "Priya Singh",
    fileName: "DBMS_Complete_Notes.pdf",
    pages: 72,
    size: "7.2 MB",
    status: "Completed",
    created: "Yesterday",
  },
  {
    id: "PDF003",
    student: "Aman Kumar",
    fileName: "React_Interview.pdf",
    pages: 26,
    size: "2.1 MB",
    status: "Processing",
    created: "Yesterday",
  },
];

/* =========================================================
   NOTES
========================================================= */

export const notes = [
  {
    id: "NOTE001",
    student: "Rahul Sharma",
    title: "React Important Concepts",
    category: "React",
    updated: "Today",
    words: 840,
  },
  {
    id: "NOTE002",
    student: "Priya Singh",
    title: "DBMS Normalization",
    category: "DBMS",
    updated: "Yesterday",
    words: 620,
  },
  {
    id: "NOTE003",
    student: "Aman Kumar",
    title: "JavaScript Interview Questions",
    category: "JavaScript",
    updated: "18 Aug 2026",
    words: 1200,
  },
];

/* =========================================================
   VOICE NOTES
========================================================= */

export const voiceNotes = [
  {
    id: "VOICE001",
    student: "Rahul Sharma",
    title: "React Revision",
    duration: "08:42",
    date: "Today",
    status: "Available",
  },
  {
    id: "VOICE002",
    student: "Priya Singh",
    title: "DBMS Revision",
    duration: "12:18",
    date: "Yesterday",
    status: "Available",
  },
];

/* =========================================================
   STUDY PLANS
========================================================= */

export const studyPlans = [
  {
    id: "PLAN001",
    student: "Rahul Sharma",
    title: "MERN Stack Preparation",
    subjects: 6,
    completed: 72,
    deadline: "30 Sep 2026",
    status: "On Track",
  },
  {
    id: "PLAN002",
    student: "Priya Singh",
    title: "Placement Preparation",
    subjects: 8,
    completed: 86,
    deadline: "15 Sep 2026",
    status: "Excellent",
  },
  {
    id: "PLAN003",
    student: "Aman Kumar",
    title: "JavaScript Fundamentals",
    subjects: 5,
    completed: 48,
    deadline: "10 Oct 2026",
    status: "Needs Attention",
  },
];

/* =========================================================
   PLACEMENT TESTS
========================================================= */

export const tests = [
  {
    id: "TEST001",
    title: "Aptitude Fundamentals",
    category: "Aptitude",
    difficulty: "Easy",
    duration: 30,
    totalMarks: 50,
    passingMarks: 25,
    questions: 25,
    attempts: 684,
    status: "Published",
  },
  {
    id: "TEST002",
    title: "JavaScript Technical Test",
    category: "Technical",
    difficulty: "Medium",
    duration: 45,
    totalMarks: 60,
    passingMarks: 30,
    questions: 30,
    attempts: 512,
    status: "Published",
  },
  {
    id: "TEST003",
    title: "React Interview MCQs",
    category: "Interview",
    difficulty: "Medium",
    duration: 25,
    totalMarks: 40,
    passingMarks: 20,
    questions: 20,
    attempts: 392,
    status: "Published",
  },
  {
    id: "TEST004",
    title: "MERN Stack Assessment",
    category: "Technical",
    difficulty: "Hard",
    duration: 60,
    totalMarks: 100,
    passingMarks: 50,
    questions: 50,
    attempts: 228,
    status: "Draft",
  },
];

/* =========================================================
   QUESTIONS
========================================================= */

export const questions = [
  {
    id: "QUE001",
    question:
      "Which hook is used to manage state in a functional React component?",
    category: "Technical",
    topic: "React",
    difficulty: "Easy",
    marks: 2,
    answer: "useState",
    usedIn: "JavaScript Technical Test",
  },
  {
    id: "QUE002",
    question:
      "Which method is used to convert JSON string into JavaScript object?",
    category: "Technical",
    topic: "JavaScript",
    difficulty: "Easy",
    marks: 2,
    answer: "JSON.parse()",
    usedIn: "JavaScript Technical Test",
  },
  {
    id: "QUE003",
    question:
      "What is the time complexity of binary search?",
    category: "Aptitude",
    topic: "Algorithms",
    difficulty: "Medium",
    marks: 2,
    answer: "O(log n)",
    usedIn: "Aptitude Fundamentals",
  },
];

/* =========================================================
   RESULTS
========================================================= */

export const results = [
  {
    id: "RES001",
    student: "Rahul Sharma",
    test: "JavaScript Technical Test",
    category: "Technical",
    score: 52,
    percentage: 86.67,
    correct: 26,
    incorrect: 4,
    timeTaken: "37 min",
    date: "Today",
    status: "Passed",
  },
  {
    id: "RES002",
    student: "Priya Singh",
    test: "React Interview MCQs",
    category: "Interview",
    score: 38,
    percentage: 95,
    correct: 19,
    incorrect: 1,
    timeTaken: "19 min",
    date: "Yesterday",
    status: "Passed",
  },
  {
    id: "RES003",
    student: "Aman Kumar",
    test: "Aptitude Fundamentals",
    category: "Aptitude",
    score: 21,
    percentage: 42,
    correct: 11,
    incorrect: 14,
    timeTaken: "28 min",
    date: "Yesterday",
    status: "Failed",
  },
];

/* =========================================================
   PLACEMENT STUDENTS
========================================================= */

export const placementStudents = [
  {
    id: "PS001",
    name: "Rahul Sharma",
    testsAttempted: 14,
    passed: 12,
    failed: 2,
    average: 82,
    highest: 96,
    lastAttempt: "Today",
    performance: "Excellent",
  },
  {
    id: "PS002",
    name: "Priya Singh",
    testsAttempted: 18,
    passed: 17,
    failed: 1,
    average: 89,
    highest: 98,
    lastAttempt: "Today",
    performance: "Excellent",
  },
  {
    id: "PS003",
    name: "Aman Kumar",
    testsAttempted: 9,
    passed: 5,
    failed: 4,
    average: 71,
    highest: 84,
    lastAttempt: "Yesterday",
    performance: "Average",
  },
];

/* =========================================================
   NOTIFICATIONS
========================================================= */

export const notifications = [
  {
    id: "NOT001",
    title: "New Placement Test Available",
    message:
      "A new JavaScript technical assessment is now available.",
    audience: "All Students",
    priority: "High",
    status: "Sent",
    date: "Today",
  },
  {
    id: "NOT002",
    title: "Study Plan Reminder",
    message:
      "Students are reminded to complete their weekly study plans.",
    audience: "Active Students",
    priority: "Medium",
    status: "Scheduled",
    date: "Tomorrow",
  },
  {
    id: "NOT003",
    title: "System Maintenance",
    message:
      "Scheduled maintenance will take place this weekend.",
    audience: "All Users",
    priority: "Low",
    status: "Draft",
    date: "28 Sep 2026",
  },
];

/* =========================================================
   DASHBOARD ACTIVITY
========================================================= */

export const activities = [
  {
    id: 1,
    student: "Rahul Sharma",
    action: "completed a technical test",
    target: "JavaScript Technical Test",
    time: "8 min ago",
  },
  {
    id: 2,
    student: "Priya Singh",
    action: "created a study plan",
    target: "Placement Preparation",
    time: "24 min ago",
  },
  {
    id: 3,
    student: "Aman Kumar",
    action: "generated a PDF summary",
    target: "DBMS Notes",
    time: "42 min ago",
  },
  {
    id: 4,
    student: "Sneha Verma",
    action: "started an AI chat",
    target: "JavaScript Closures",
    time: "1 hour ago",
  },
];

/* =========================================================
   ANALYTICS
========================================================= */

export const categoryPerformance = [
  {
    category: "Aptitude",
    score: 72,
    attempts: 1240,
  },
  {
    category: "Technical",
    score: 81,
    attempts: 1560,
  },
  {
    category: "Interview",
    score: 76,
    attempts: 820,
  },
  {
    category: "Resume",
    score: 79,
    attempts: 200,
  },
];

export const registrationData = [
  { month: "Apr", students: 120 },
  { month: "May", students: 180 },
  { month: "Jun", students: 240 },
  { month: "Jul", students: 290 },
  { month: "Aug", students: 420 },
];

export const topStudents = [
  {
    name: "Priya Singh",
    score: 94,
    tests: 18,
  },
  {
    name: "Arjun Mehta",
    score: 91,
    tests: 21,
  },
  {
    name: "Rahul Sharma",
    score: 82,
    tests: 14,
  },
];
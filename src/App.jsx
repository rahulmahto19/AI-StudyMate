import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// ==========================================
// Public Pages
// ==========================================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// ==========================================
// Student Pages
// ==========================================

import StudentLayout from "./pages/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import AIChat from "./pages/student/AIChat";
import PDFSummary from "./pages/student/PDFSummary";
import Notes from "./pages/student/Notes";
import VoiceNotes from "./pages/student/VoiceNotes";
import StudyPlanner from "./pages/student/StudyPlanner";
import Placement from "./pages/student/Placement";
import Progress from "./pages/student/Progress";
import StudentProfile from "./pages/student/StudentProfile";

// ==========================================
// Admin
// ==========================================

import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ======================================
            PUBLIC ROUTES
        ======================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ======================================
            STUDENT ROUTES
        ======================================= */}

        <Route
          path="/student"
          element={<StudentLayout />}
        >

          {/* Dashboard */}

          <Route
            path="dashboard"
            element={
              <StudentDashboard />
            }
          />

          {/* ==================================
              AI CHAT
          =================================== */}

          <Route
            path="ai-chat"
            element={
              <AIChat />
            }
          />

          {/* Alias:
              /student/chat
          */}

          <Route
            path="chat"
            element={
              <AIChat />
            }
          />

          {/* ==================================
              PDF SUMMARY
          =================================== */}

          <Route
            path="pdf-summary"
            element={
              <PDFSummary />
            }
          />

          {/* ==================================
              NOTES
          =================================== */}

          <Route
            path="notes"
            element={
              <Notes />
            }
          />

          {/* ==================================
              VOICE NOTES
          =================================== */}

          <Route
            path="voice-notes"
            element={
              <VoiceNotes />
            }
          />

          {/* ==================================
              STUDY PLANNER
          =================================== */}

          <Route
            path="study-planner"
            element={
              <StudyPlanner />
            }
          />

          {/* Alias:
              /student/planner
          */}

          <Route
            path="planner"
            element={
              <StudyPlanner />
            }
          />

          {/* ==================================
              PLACEMENT
          =================================== */}

          <Route
            path="placement"
            element={
              <Placement />
            }
          />

          {/* ==================================
              PROGRESS
          =================================== */}

          <Route
            path="progress"
            element={
              <Progress />
            }
          />

          {/* ==================================
              PROFILE
          =================================== */}

          <Route
            path="profile"
            element={
              <StudentProfile />
            }
          />

        </Route>

        {/* ======================================
            ADMIN ROUTES
        ======================================= */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminDashboard />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
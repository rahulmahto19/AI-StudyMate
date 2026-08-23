import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

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

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

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


        {/* Student Routes */}

        <Route
          path="/student"
          element={<StudentLayout />}
        >

          <Route
            path="dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="chat"
            element={<AIChat />}
          />

          <Route
            path="pdf-summary"
            element={<PDFSummary />}
          />

          <Route
            path="notes"
            element={<Notes />}
          />

          <Route
            path="voice-notes"
            element={<VoiceNotes />}
          />

          <Route
            path="planner"
            element={<StudyPlanner />}
          />

          <Route
            path="placement"
            element={<Placement />}
          />

          <Route
            path="progress"
            element={<Progress />}
          />

          <Route
            path="profile"
            element={<StudentProfile />}
          />

        </Route>


        {/* Admin */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
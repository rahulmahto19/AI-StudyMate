import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// =====================================================
// STUDENT PAGES
// =====================================================

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

// =====================================================
// ADMIN LAYOUT
// =====================================================

import AdminLayout from "./components/admin/AdminLayout";

// =====================================================
// ADMIN DASHBOARD
// =====================================================

import AdminDashboard from "./pages/admin/AdminDashboard";

// =====================================================
// ADMIN USER PAGES
// =====================================================

// Using namespace imports prevents default/named export mismatch
import * as UsersModule from "./pages/admin/users/Users";
import * as UserDetailsModule from "./pages/admin/users/UserDetails";

// =====================================================
// ADMIN LEARNING PAGES
// =====================================================

import * as AIChatModule from "./pages/admin/learning/AIChat";
import * as PDFSummaryModule from "./pages/admin/learning/PDFSummary";
import * as NotesModule from "./pages/admin/learning/Notes";
import * as VoiceNotesModule from "./pages/admin/learning/VoiceNotes";
import * as StudyPlannerModule from "./pages/admin/learning/StudyPlanner";
import * as ProgressModule from "./pages/admin/learning/Progress";

// =====================================================
// ADMIN PLACEMENT PAGES
// =====================================================

import * as PlacementOverviewModule from "./pages/admin/placement/PlacementOverview";
import * as PlacementTestsModule from "./pages/admin/placement/PlacementTests";
import * as CreateTestModule from "./pages/admin/placement/CreateTest";
import * as TestDetailsModule from "./pages/admin/placement/TestDetails";
import * as QuestionBankModule from "./pages/admin/placement/QuestionBank";
import * as CreateQuestionModule from "./pages/admin/placement/CreateQuestion";
import * as PlacementResultsModule from "./pages/admin/placement/PlacementResults";
import * as PlacementStudentsModule from "./pages/admin/placement/PlacementStudents";
import * as PlacementAnalyticsModule from "./pages/admin/placement/PlacementAnalytics";
import ResumeInterview from "./pages/admin/placement/ResumeInterview";

// =====================================================
// ADMIN SYSTEM PAGES
// =====================================================

import * as NotificationsModule from "./pages/admin/system/Notifications";
import * as ProfileModule from "./pages/admin/system/Profile";
import * as SettingsModule from "./pages/admin/system/Settings";


// =====================================================
// HANDLE DEFAULT OR NAMED EXPORTS
// =====================================================

const Users =
  UsersModule.Users ||
  UsersModule.default;

const UserDetails =
  UserDetailsModule.UserDetails ||
  UserDetailsModule.default;


const AIChatAdmin =
  AIChatModule.AIChat ||
  AIChatModule.default;

const PDFSummaryAdmin =
  PDFSummaryModule.PDFSummary ||
  PDFSummaryModule.default;

const NotesAdmin =
  NotesModule.Notes ||
  NotesModule.default;

const VoiceNotesAdmin =
  VoiceNotesModule.VoiceNotes ||
  VoiceNotesModule.default;

const StudyPlannerAdmin =
  StudyPlannerModule.StudyPlanner ||
  StudyPlannerModule.default;

const ProgressAdmin =
  ProgressModule.Progress ||
  ProgressModule.default;


// =====================================================
// PLACEMENT COMPONENTS
// =====================================================

const PlacementOverview =
  PlacementOverviewModule.PlacementOverview ||
  PlacementOverviewModule.default;

const PlacementTests =
  PlacementTestsModule.PlacementTests ||
  PlacementTestsModule.default;

const CreateTest =
  CreateTestModule.CreateTest ||
  CreateTestModule.default;

const TestDetails =
  TestDetailsModule.TestDetails ||
  TestDetailsModule.default;

const QuestionBank =
  QuestionBankModule.QuestionBank ||
  QuestionBankModule.default;

const CreateQuestion =
  CreateQuestionModule.CreateQuestion ||
  CreateQuestionModule.default;

const PlacementResults =
  PlacementResultsModule.PlacementResults ||
  PlacementResultsModule.default;

const PlacementStudents =
  PlacementStudentsModule.PlacementStudents ||
  PlacementStudentsModule.default;

const PlacementAnalytics =
  PlacementAnalyticsModule.PlacementAnalytics ||
  PlacementAnalyticsModule.default;


// =====================================================
// SYSTEM COMPONENTS
// =====================================================

const Notifications =
  NotificationsModule.Notifications ||
  NotificationsModule.default;

const Profile =
  ProfileModule.Profile ||
  ProfileModule.default;

const Settings =
  SettingsModule.Settings ||
  SettingsModule.default;


// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

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


        {/* =================================================
            STUDENT ROUTES
        ================================================= */}

        <Route
          path="/student"
          element={<StudentLayout />}
        >

          {/* Student root */}
          <Route
            index
            element={
              <Navigate
                to="/student/dashboard"
                replace
              />
            }
          />

          {/* Dashboard */}

          <Route
            path="dashboard"
            element={<StudentDashboard />}
          />

          {/* AI Chat */}

          <Route
            path="ai-chat"
            element={<AIChat />}
          />

          {/* Chat Alias */}

          <Route
            path="chat"
            element={<AIChat />}
          />

          {/* PDF Summary */}

          <Route
            path="pdf-summary"
            element={<PDFSummary />}
          />

          {/* Notes */}

          <Route
            path="notes"
            element={<Notes />}
          />

          {/* Voice Notes */}

          <Route
            path="voice-notes"
            element={<VoiceNotes />}
          />

          {/* Study Planner */}

          <Route
            path="study-planner"
            element={<StudyPlanner />}
          />

          {/* Planner Alias */}

          <Route
            path="planner"
            element={<StudyPlanner />}
          />

          {/* Placement */}

          <Route
            path="placement"
            element={<Placement />}
          />

          {/* Progress */}

          <Route
            path="progress"
            element={<Progress />}
          />

          {/* Profile */}

          <Route
            path="profile"
            element={<StudentProfile />}
          />

        </Route>


        {/* =================================================
            ADMIN ROUTES
        ================================================= */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* =================================================
              ADMIN ROOT
          ================================================= */}

          <Route
            index
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />


          {/* =================================================
              DASHBOARD
          ================================================= */}

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />


          {/* =================================================
              USER MANAGEMENT
          ================================================= */}

          <Route
            path="users"
            element={<Users />}
          />

          <Route
            path="users/:id"
            element={<UserDetails />}
          />


          {/* =================================================
              LEARNING MANAGEMENT
          ================================================= */}

          <Route
            path="ai-chat"
            element={<AIChatAdmin />}
          />

          <Route
            path="pdf-summary"
            element={<PDFSummaryAdmin />}
          />

          <Route
            path="notes"
            element={<NotesAdmin />}
          />

          <Route
            path="voice-notes"
            element={<VoiceNotesAdmin />}
          />

          <Route
            path="study-planner"
            element={<StudyPlannerAdmin />}
          />

          <Route
            path="progress"
            element={<ProgressAdmin />}
          />


          {/* =================================================
              PLACEMENT PREPARATION
          ================================================= */}

          {/* Placement Overview */}

          <Route
            path="placement"
            element={<PlacementOverview />}
          />

          {/* Placement Tests */}

          <Route
            path="placement/tests"
            element={<PlacementTests />}
          />

          {/* Create Test */}

          <Route
            path="placement/tests/create"
            element={<CreateTest />}
          />

          {/* Test Details */}

          <Route
            path="placement/tests/:id"
            element={<TestDetails />}
          />

          {/* Question Bank */}

          <Route
            path="placement/questions"
            element={<QuestionBank />}
          />

          {/* Create Question */}

          <Route
            path="placement/questions/create"
            element={<CreateQuestion />}
          />

          {/* Results */}

          <Route
            path="placement/results"
            element={<PlacementResults />}
          />

          {/* Students */}

          <Route
            path="placement/students"
            element={<PlacementStudents />}
          />

          {/* Analytics */}

          <Route
            path="placement/analytics"
            element={<PlacementAnalytics />}
          />    

          <Route 
            path="placement/resume-interview" 
            element={<ResumeInterview />} />

          {/* =================================================
              SYSTEM
          ================================================= */}

          {/* Notifications */}

          <Route
            path="notifications"
            element={<Notifications />}
          />

          {/* Admin Profile */}

          <Route
            path="profile"
            element={<Profile />}
          />

          {/* Settings */}

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>


        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
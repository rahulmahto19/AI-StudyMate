import { Outlet } from "react-router-dom";

import StudentHeader from "../../components/student/StudentHeader";
import StudentBottomNav from "../../components/student/StudentBottomNav";

function StudentLayout() {
  return (
    <div className="min-h-screen bg-slate-50">

      <StudentHeader />

      <main className="pb-28">
        <Outlet />
      </main>

      <StudentBottomNav />

    </div>
  );
}

export default StudentLayout;
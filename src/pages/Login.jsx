import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-black text-slate-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-slate-500">
          Login to continue learning.
        </p>

        <div className="mt-8 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50 p-6 text-center">

          <p className="font-semibold text-indigo-700">
            Login UI coming next
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Firebase Google Sign-In will be connected here later.
          </p>

        </div>

        <Link
          to="/"
          className="mt-6 block text-center text-sm font-semibold text-indigo-600"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Login;
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { employees, admin, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    if (email === admin.email && password === admin.password) {
      setUser(admin);
      toast.success("Welcome Admin!");
      navigate("/admin");
      return;
    }

    const employee = employees.find(
      (emp) =>
        emp.email === email &&
        emp.password === password
    );

    if (employee) {
      setUser(employee);
      toast.success(`Welcome ${employee.name}!`);
      navigate("/employee");
      return;
    }

    toast.error("Invalid credentials");
  };

  const fillAdmin = () => {
    setEmail(admin.email);
    setPassword(admin.password);
    navigator.clipboard.writeText(
      `${admin.email}\n${admin.password}`
    );
    toast.success("Admin credentials copied");
  };

  const fillEmployee = () => {
    setEmail(employees[0].email);
    setPassword(employees[0].password);
    navigator.clipboard.writeText(
      `${employees[0].email}\n${employees[0].password}`
    );
    toast.success("Employee credentials copied");
  };

  return (
    <div className="min-h-screen bg-slate-100 grid lg:grid-cols-2">

      {/* Left */}

      <div className="hidden lg:flex bg-slate-900 text-white flex-col justify-center px-20">

        <div className="max-w-md">

          <img
            src="/logo.png"
            alt="WorkTrack EMS"
            className="w-20 h-20 mb-8 rounded-full"
          />

          <h1 className="text-5xl font-bold leading-tight">
            WorkTrack EMS
          </h1>

          <p className="text-slate-300 mt-5 text-lg">
            A modern Employee & Task Management System
            built with React and Tailwind CSS.
          </p>

          <div className="mt-10 space-y-4">

            <Feature text="Task Assignment" />

            <Feature text="Employee Dashboard" />

            <Feature text="Admin Management" />

            <Feature text="Responsive UI" />

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center justify-center p-6">

        <div className="bg-white border border-slate-200 rounded-3xl shadow-lg w-full max-w-md p-8">

          <div className="lg:hidden text-center mb-8">

            <img
              src="/logo.png"
              alt="WorkTrack EMS Logo"
              className="w-16 h-16 mx-auto mb-4 object-contain rounded-full"
            />

            <h1 className="text-3xl font-bold">
              WorkTrack EMS
            </h1>

          </div>

          <h2 className="text-2xl font-bold">
            Welcome Back
          </h2>

          <p className="text-slate-500 mb-6">
            Sign in to continue.
          </p>

          <form
            onSubmit={login}
            className="space-y-4"
          >

            <input
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white py-3 rounded-xl font-semibold">
              Login
            </button>

          </form>

          <div className="mt-8 border-t pt-6">

            <h3 className="font-bold text-lg mb-4">
              Demo Accounts
            </h3>

            <CredentialCard
              title="Admin"
              email={admin.email}
              password={admin.password}
              onClick={fillAdmin}
            />

            <CredentialCard
              title="Employee"
              email={employees[0].email}
              password={employees[0].password}
              onClick={fillEmployee}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
      <span className="text-slate-200">{text}</span>
    </div>
  );
}

function CredentialCard({
  title,
  email,
  password,
  onClick,
}) {
  return (
    <div className="border border-slate-200 rounded-2xl p-4 mb-4">

      <div className="flex justify-between items-center mb-3">

        <h4 className="font-bold">{title}</h4>

        <button
          type="button"
          onClick={onClick}
          className="text-sm bg-slate-900 text-white px-3 py-1 rounded-lg hover:bg-slate-700 transition"
        >
          Copy & Fill
        </button>

      </div>

      <p className="text-sm text-slate-600">
        {email}
      </p>

      <p className="text-sm text-slate-600">
        {password}
      </p>

    </div>
  );
}
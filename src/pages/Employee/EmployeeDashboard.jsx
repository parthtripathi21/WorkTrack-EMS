import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  const { user, setUser, employees, setEmployees } =
    useContext(AuthContext);

  if (!user) return <Navigate to="/" replace />;

  const employee = employees.find((e) => e.id === user.id);

  if (!employee) return <Navigate to="/" replace />;

  const stats = {
    new: employee.tasks.filter((t) => t.status === "new").length,
    accepted: employee.tasks.filter((t) => t.status === "accepted").length,
    completed: employee.tasks.filter((t) => t.status === "completed").length,
    failed: employee.tasks.filter((t) => t.status === "failed").length,
  };

  const updateTask = (index, status) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.id !== employee.id) return emp;

      const updatedTasks = [...emp.tasks];

      updatedTasks[index] = {
        ...updatedTasks[index],
        status,
      };

      return {
        ...emp,
        tasks: updatedTasks,
      };
    });

    setEmployees(updatedEmployees);

    const updatedUser = updatedEmployees.find(
      (e) => e.id === employee.id
    );

    setUser(updatedUser);

    if (status === "accepted")
      toast.success("Task accepted");

    if (status === "completed")
      toast.success("Task completed");

    if (status === "failed")
      toast.success("Task marked as failed");
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <header className="bg-slate-900 text-white px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div>
          <h1 className="text-4xl font-bold">
            Welcome back, {employee.name} 👋
          </h1>

          <p className="text-slate-300 mt-1">
            Here's an overview of your assigned tasks.
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl"
        >
          Logout
        </button>

      </header>

      <div className="p-6 md:p-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <Card title="New" value={stats.new} />

          <Card title="Accepted" value={stats.accepted} />

          <Card title="Completed" value={stats.completed} />

          <Card title="Failed" value={stats.failed} />

        </div>

        <div className="space-y-6">

          {employee.tasks.map((task, index) => (

            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition"
            >

              <div className="flex flex-col md:flex-row justify-between gap-5">

                <div>

                  <h2 className="text-2xl font-bold">
                    {task.title}
                  </h2>

                  <p className="text-slate-500 mt-3">
                    {task.description}
                  </p>

                </div>

                <div className="text-left md:text-right space-y-2">

                  <span className="inline-block bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {task.category}
                  </span>

                  <p className="text-sm text-slate-500">
                    {task.date}
                  </p>

                </div>

              </div>

              <div className="mt-6">

                {task.status === "new" && (
                  <button
                    onClick={() =>
                      updateTask(index, "accepted")
                    }
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-xl"
                  >
                    Accept Task
                  </button>
                )}

                {task.status === "accepted" && (
                  <div className="flex flex-wrap gap-3">

                    <button
                      onClick={() =>
                        updateTask(index, "completed")
                      }
                      className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-xl"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        updateTask(index, "failed")
                      }
                      className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-xl"
                    >
                      Fail
                    </button>

                  </div>
                )}

                {task.status === "completed" && (
                  <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                    Completed
                  </span>
                )}

                {task.status === "failed" && (
                  <span className="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-sm">
                    Failed
                  </span>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition">
      <p className="text-slate-500">{title}</p>
      <h2 className="text-4xl font-bold mt-2">{value}</h2>
    </div>
  );
}
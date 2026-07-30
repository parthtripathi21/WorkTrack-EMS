import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const { employees, setEmployees, setUser } =
    useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    assignTo: "",
    category: "",
    date: "",
    description: "",
  });

  const stats = useMemo(() => {
    let total = 0;
    let fresh = 0;
    let accepted = 0;
    let completed = 0;
    let failed = 0;

    employees.forEach((emp) => {
      emp.tasks.forEach((task) => {
        total++;

        if (task.status === "new") fresh++;
        if (task.status === "accepted") accepted++;
        if (task.status === "completed") completed++;
        if (task.status === "failed") failed++;
      });
    });

    return {
      employees: employees.length,
      total,
      fresh,
      accepted,
      completed,
      failed,
    };
  }, [employees]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.assignTo ||
      !form.category ||
      !form.date
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const updated = employees.map((emp) => {
      if (emp.name !== form.assignTo) return emp;

      return {
        ...emp,
        tasks: [
          ...emp.tasks,
          {
            title: form.title,
            description: form.description,
            category: form.category,
            date: form.date,
            status: "new",
          },
        ],
      };
    });

    setEmployees(updated);

    toast.success("Task created successfully");

    setForm({
      title: "",
      assignTo: "",
      category: "",
      date: "",
      description: "",
    });
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
            Welcome back, Admin 👋
          </h1>

          <p className="text-slate-300 mt-1">
            Manage employees and assign new tasks.
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

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">

          <Card title="Employees" value={stats.employees} />
          <Card title="Tasks" value={stats.total} />
          <Card title="New" value={stats.fresh} />
          <Card title="Accepted" value={stats.accepted} />
          <Card title="Completed" value={stats.completed} />
          <Card title="Failed" value={stats.failed} />

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">
              Create Task
            </h2>

            <form
              onSubmit={createTask}
              className="space-y-4"
            >

              <input
                name="title"
                placeholder="Task Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <select
                name="assignTo"
                value={form.assignTo}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Assign Employee</option>

                {employees.map((emp) => (
                  <option
                    key={emp.id}
                    value={emp.name}
                  >
                    {emp.name}
                  </option>
                ))}

              </select>

              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <textarea
                rows="4"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white py-3 rounded-xl font-semibold">
                Create Task
              </button>

            </form>

          </div>

          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">
              Employees
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b text-slate-600">

                    <th className="text-left py-3">
                      Employee
                    </th>

                    <th className="text-center">
                      Tasks
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {employees.map((emp) => (

                    <tr
                      key={emp.id}
                      className="border-b hover:bg-slate-50 transition"
                    >

                      <td className="py-4 font-medium">
                        {emp.name}
                      </td>

                      <td className="text-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                          {emp.tasks.length}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

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
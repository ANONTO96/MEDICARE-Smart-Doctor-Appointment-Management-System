import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Users,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";

import doctors from "../data/allDoctors.json";
import {
  getAllAppointments,
  updateAppointmentStatus,
} from "../services/appointmentService";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
const [loading, setLoading] = useState(true);

const [doctorFilter, setDoctorFilter] = useState("all");
const [statusFilter, setStatusFilter] = useState("all");
const [dateFilter, setDateFilter] = useState("all");
const [selectedAppointment, setSelectedAppointment] =
  useState(null);

  const loadAppointments = async () => {
  try {
    setLoading(true);

    const data = await getAllAppointments();

    setAppointments(data);
  } catch (error) {
    console.error(error);

    toast.error(
      error.message || "Failed to load appointments."
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  const loadData = async () => {
    try {
      const data = await getAllAppointments();

      setAppointments(data);
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Failed to load appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);

  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const confirmedAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.status === "confirmed"
    );
  }, [appointments]);

  const todayAppointments = useMemo(() => {
    return confirmedAppointments.filter(
      (appointment) =>
        appointment.date === todayString
    );
  }, [confirmedAppointments, todayString]);

  const upcomingAppointments = useMemo(() => {
    return confirmedAppointments.filter(
      (appointment) =>
        appointment.date >= todayString
    );
  }, [confirmedAppointments, todayString]);

  const cancelledAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.status === "cancelled"
    );
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
  return appointments.filter((appointment) => {
    const matchesDoctor =
      doctorFilter === "all" ||
      appointment.doctorId === doctorFilter;

    const matchesStatus =
      statusFilter === "all" ||
      appointment.status === statusFilter;

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" &&
        appointment.date === todayString) ||
      (dateFilter === "upcoming" &&
        appointment.date >= todayString);

    return (
      matchesDoctor &&
      matchesStatus &&
      matchesDate
    );
  });
}, [
  appointments,
  doctorFilter,
  statusFilter,
  dateFilter,
  todayString,
]);

const handleStatusChange = async (
  appointmentId,
  status
) => {
  try {
    await updateAppointmentStatus(
      appointmentId,
      status
    );

    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? {
              ...appointment,
              status,
            }
          : appointment
      )
    );

    toast.success(
      `Appointment marked as ${status}.`
    );
  } catch (error) {
    console.error(error);

    toast.error(
      error.message ||
        "Failed to update appointment status."
    );
  }
};

  const stats = [
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: CalendarDays,
      description: "All appointments",
    },
    {
      title: "Confirmed",
      value: confirmedAppointments.length,
      icon: CheckCircle2,
      description: "Active appointments",
    },
    {
      title: "Today",
      value: todayAppointments.length,
      icon: Clock3,
      description: "Today's appointments",
    },
    {
      title: "Cancelled",
      value: cancelledAppointments.length,
      icon: AlertCircle,
      description: "Cancelled appointments",
    },
  ];

  const getDoctor = (doctorId) => {
    return doctors.find(
      (doctor) => doctor.id === doctorId
    );
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "N/A";

    const [hours, minutes] = time
      .split(":")
      .map(Number);

    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;

    return `${formattedHour}:${String(
      minutes
    ).padStart(2, "0")} ${suffix}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-sky-500">
              Medicare Management
            </p>

            <h1 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage appointments and monitor patient bookings.
            </p>
          </div>

          <button
            type="button"
            onClick={loadAppointments}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <Icon size={21} />
                  </div>

                  <Users
                    size={18}
                    className="text-slate-300"
                  />
                </div>

                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* filter */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <div className="mb-5">
    <h2 className="text-lg font-bold text-slate-900">
      Appointment Filters
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Filter appointments by doctor, status or date.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

    {/* Doctor */}
    <div>
      <label
        htmlFor="doctor-filter"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Doctor
      </label>

      <select
        id="doctor-filter"
        value={doctorFilter}
        onChange={(event) =>
          setDoctorFilter(event.target.value)
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
      >
        <option value="all">
          All Doctors
        </option>

        {doctors.map((doctor) => (
          <option
            key={doctor.id}
            value={doctor.id}
          >
            {doctor.name}
          </option>
        ))}
      </select>
    </div>

    {/* Status */}
    <div>
      <label
        htmlFor="status-filter"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Status
      </label>

      <select
        id="status-filter"
        value={statusFilter}
        onChange={(event) =>
          setStatusFilter(event.target.value)
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
      >
        <option value="all">
          All Statuses
        </option>

        <option value="confirmed">
          Confirmed
        </option>

        <option value="completed">
          Completed
        </option>

        <option value="cancelled">
          Cancelled
        </option>
      </select>
    </div>

    {/* Date */}
    <div>
      <label
        htmlFor="date-filter"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Date
      </label>

      <select
        id="date-filter"
        value={dateFilter}
        onChange={(event) =>
          setDateFilter(event.target.value)
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
      >
        <option value="all">
          All Dates
        </option>

        <option value="today">
          Today
        </option>

        <option value="upcoming">
          Upcoming
        </option>
      </select>
    </div>
  </div>

  <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-sm text-slate-500">
      Showing{" "}
      <span className="font-semibold text-slate-700">
        {filteredAppointments.length}
      </span>{" "}
      appointments
    </p>

    <button
      type="button"
      onClick={() => {
        setDoctorFilter("all");
        setStatusFilter("all");
        setDateFilter("all");
      }}
      className="w-fit rounded-lg px-3 py-2 text-sm font-medium text-sky-600 transition hover:bg-sky-50"
    >
      Clear Filters
    </button>
  </div>
</section>

        {/* Today's Appointments */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Today's Appointments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Appointments scheduled for today.
              </p>
            </div>

            <span className="w-fit rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-600">
              {todayAppointments.length} appointments
            </span>
          </div>

          {loading ? (
            <div className="flex min-h-48 items-center justify-center">
              <span className="loading loading-spinner loading-lg text-sky-500"></span>
            </div>
          ) : todayAppointments.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
              <CalendarDays
                size={40}
                className="mb-3 text-slate-300"
              />

              <h3 className="font-semibold text-slate-700">
                No appointments today
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                There are no confirmed appointments scheduled
                for today.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {todayAppointments.map((appointment) => {
                const doctor = getDoctor(
                  appointment.doctorId
                );

                return (
                  <div
                    key={appointment.id}
                    className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                        <Clock3 size={20} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {appointment.patientName}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {doctor?.name ||
                            appointment.doctorName}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {appointment.specialty}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">
                          Time
                        </p>

                        <p className="font-semibold text-slate-700">
                          {formatTime(
                            appointment.time
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Phone
                        </p>

                        <p className="font-semibold text-slate-700">
                          {appointment.patientPhone}
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        Confirmed
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Upcoming Appointments */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Upcoming Appointments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Future confirmed appointments.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-48 items-center justify-center">
              <span className="loading loading-spinner loading-lg text-sky-500"></span>
            </div>
          ) : upcomingAppointments.length === 0 ? (
            <div className="flex min-h-48 items-center justify-center px-6 text-center">
              <p className="text-sm text-slate-400">
                No upcoming appointments.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {upcomingAppointments
                .sort((a, b) => {
                  const first = `${a.date} ${a.time}`;
                  const second = `${b.date} ${b.time}`;

                  return first.localeCompare(second);
                })
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {appointment.patientName}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {appointment.doctorName}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {appointment.specialty}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <p className="text-xs text-slate-400">
                          Date
                        </p>

                        <p className="text-sm font-semibold text-slate-700">
                          {formatDate(
                            appointment.date
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Time
                        </p>

                        <p className="text-sm font-semibold text-slate-700">
                          {formatTime(
                            appointment.time
                          )}
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        Confirmed
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* all appointments */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div className="border-b border-slate-200 p-5">
    <h2 className="text-lg font-bold text-slate-900">
      All Appointments
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Manage appointments using the filters above.
    </p>
  </div>

  {loading ? (
    <div className="flex min-h-48 items-center justify-center">
      <span className="loading loading-spinner loading-lg text-sky-500"></span>
    </div>
  ) : filteredAppointments.length === 0 ? (
    <div className="flex min-h-48 items-center justify-center px-6 text-center">
      <p className="text-sm text-slate-400">
        No appointments match the selected filters.
      </p>
    </div>
  ) : (
    <div className="divide-y divide-slate-100">
      {filteredAppointments
        .sort((a, b) => {
          const first = `${a.date} ${a.time}`;
          const second = `${b.date} ${b.time}`;

          return first.localeCompare(second);
        })
        .map((appointment) => (
          <div
            key={appointment.id}
            className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h3 className="font-semibold text-slate-900">
                {appointment.patientName}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {appointment.doctorName}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {appointment.specialty}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <div>
                <p className="text-xs text-slate-400">
                  Date
                </p>

                <p className="text-sm font-semibold text-slate-700">
                  {formatDate(appointment.date)}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Time
                </p>

                <p className="text-sm font-semibold text-slate-700">
                  {formatTime(appointment.time)}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  appointment.status === "confirmed"
                    ? "bg-emerald-50 text-emerald-600"
                    : appointment.status === "completed"
                    ? "bg-sky-50 text-sky-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {appointment.status}
              </span>
              <button
  type="button"
  onClick={() =>
    setSelectedAppointment(appointment)
  }
  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-sky-300 hover:text-sky-600"
>
  View Details
</button>
              {appointment.status === "confirmed" && (
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={() =>
        handleStatusChange(
          appointment.id,
          "completed"
        )
      }
      className="rounded-lg bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-600 transition hover:bg-sky-100"
    >
      Complete
    </button>

    <button
      type="button"
      onClick={() =>
        handleStatusChange(
          appointment.id,
          "cancelled"
        )
      }
      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-100"
    >
      Cancel
    </button>
  </div>
)}
            </div>
          </div>
        ))}
    </div>
  )}
</section>
      </div>
      {selectedAppointment && (
  <div
    className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
    onClick={() => setSelectedAppointment(null)}
  >
    <div
      className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-sky-500">
            Appointment Details
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Patient Information
          </h2>
        </div>

        <button
          type="button"
          onClick={() =>
            setSelectedAppointment(null)
          }
          className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-400">
            Patient
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {selectedAppointment.patientName}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              Phone
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {selectedAppointment.patientPhone ||
                "Not provided"}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              Email
            </p>

            <p className="mt-1 break-all text-sm font-semibold text-slate-700">
              {selectedAppointment.patientEmail ||
                "Not provided"}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-400">
            Reason for Visit
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-700">
            {selectedAppointment.reason ||
              "No reason provided."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              Doctor
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {selectedAppointment.doctorName}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              Specialty
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {selectedAppointment.specialty}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              Date
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {formatDate(
                selectedAppointment.date
              )}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              Time
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {formatTime(
                selectedAppointment.time
              )}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 p-4">
          <p className="text-xs font-medium text-slate-400">
            Appointment ID
          </p>

          <p className="mt-1 break-all font-mono text-xs text-slate-600">
            {selectedAppointment.id}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          setSelectedAppointment(null)
        }
        className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default AdminDashboard;
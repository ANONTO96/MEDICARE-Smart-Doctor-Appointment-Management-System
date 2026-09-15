import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  Stethoscope,
  Wallet,
} from "lucide-react";

import { useAuth } from "../context/useAuth";
import { getUserAppointments } from "../services/appointmentService";
import { formatTime } from "../utils/appointmentUtils";

const MyAppointments = () => {
  const { user, loading: authLoading } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const isUpcoming = (appointment) => {
    if (!appointment.date) return false;

    const appointmentDate = new Date(
      `${appointment.date}T${
        appointment.time || "00:00"
      }:00`
    );

    return appointmentDate >= new Date();
  };

  useEffect(() => {
    const loadAppointments = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data = await getUserAppointments(
          user.uid
        );

        setAppointments(data);
      } catch (error) {
        console.error(error);

        toast.error(
          error.message ||
            "Failed to load your appointments."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [user]);

  const upcomingAppointments = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          appointment.status === "confirmed" &&
          isUpcoming(appointment)
      )
      .sort(
        (a, b) =>
          new Date(
            `${a.date}T${a.time}`
          ) -
          new Date(
            `${b.date}T${b.time}`
          )
      );
  }, [appointments]);

  const pastAppointments = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          appointment.status !== "confirmed" ||
          !isUpcoming(appointment)
      )
      .sort(
        (a, b) =>
          new Date(
            `${b.date}T${b.time}`
          ) -
          new Date(
            `${a.date}T${a.time}`
          )
      );
  }, [appointments]);

  if (authLoading || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FCFF] px-4">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-sky-500" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your appointments...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FCFF] px-4">
        <div className="w-full max-w-md rounded-2xl border border-sky-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
            <Stethoscope size={30} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Login Required
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Please login to view your appointments.
          </p>

          <Link
            to="/login"
            state={{ from: "/my-appointments" }}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 px-6 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600"
          >
            Login to Continue
          </Link>

          <p className="mt-5 text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              state={{ from: "/my-appointments" }}
              className="font-semibold text-sky-500 hover:text-sky-600"
            >
              Create Account
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FCFF]">
      {/* Header */}
      <section className="border-b border-sky-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-600">
            <CalendarDays size={17} />
            Patient Dashboard
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            My{" "}
            <span className="text-sky-500">
              Appointments
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            View and manage your upcoming and previous
            medical appointments.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Appointments
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {appointments.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                <CalendarDays size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Upcoming
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {upcomingAppointments.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                <Clock3 size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Previous
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {pastAppointments.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <FileText size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming */}
        <div className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Upcoming Appointments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your scheduled consultations.
            </p>
          </div>

          {upcomingAppointments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
                <CalendarDays size={25} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No upcoming appointments
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                You don't have any upcoming consultations.
                Book an appointment with one of our doctors.
              </p>

              <Link
                to="/doctors"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-600"
              >
                Find a Doctor
                <ChevronRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map(
                (appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    formatDate={formatDate}
                  />
                )
              )}
            </div>
          )}
        </div>

        {/* Past */}
        <div className="mt-12">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Previous Appointments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your completed and previous appointments.
            </p>
          </div>

          {pastAppointments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
              <p className="text-sm text-slate-500">
                No previous appointments yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pastAppointments.map(
                (appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    formatDate={formatDate}
                    past
                  />
                )
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

const AppointmentCard = ({
  appointment,
  formatDate,
  past = false,
}) => {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Doctor */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
            <Stethoscope size={27} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {appointment.doctorName}
            </h3>

            <p className="mt-1 text-sm font-semibold text-sky-500">
              {appointment.specialty}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              ID: {appointment.id}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-130">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sky-500">
              <CalendarDays size={16} />

              <span className="text-xs font-semibold">
                Date
              </span>
            </div>

            <p className="mt-2 text-sm font-bold text-slate-700">
              {formatDate(appointment.date)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sky-500">
              <Clock3 size={16} />

              <span className="text-xs font-semibold">
                Time
              </span>
            </div>

            <p className="mt-2 text-sm font-bold text-slate-700">
              {formatTime(appointment.time)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sky-500">
              <Wallet size={16} />

              <span className="text-xs font-semibold">
                Fee
              </span>
            </div>

            <p className="mt-2 text-sm font-bold text-slate-700">
              ৳{appointment.consultationFee || 0}
            </p>
          </div>
        </div>

        {/* Status / Details */}
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <span
            className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-bold ${
              appointment.status === "confirmed"
                ? "bg-emerald-50 text-emerald-600"
                : appointment.status === "cancelled"
                  ? "bg-red-50 text-red-600"
                  : "bg-slate-100 text-slate-600"
            }`}
          >
            {appointment.status === "confirmed"
              ? past
                ? "Completed"
                : "Confirmed"
              : appointment.status}
          </span>

          <Link
            to={`/appointments/${appointment.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-200 px-4 py-2.5 text-sm font-semibold text-sky-600 transition hover:bg-sky-50"
          >
            View Details
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
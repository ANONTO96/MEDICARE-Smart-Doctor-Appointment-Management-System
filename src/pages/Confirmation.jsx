import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  Home,
  Stethoscope,
  Wallet,
} from "lucide-react";

import { useAuth } from "../context/auth/useAuth";
import { getAppointmentById } from "../services/appointmentService";
import { formatTime } from "../utils/appointmentUtils";

const Confirmation = () => {
  const { appointmentId } = useParams();

  const { user, loading: authLoading } = useAuth();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointment = async () => {
      if (!user || !appointmentId) {
        return;
      }

      try {
        setLoading(true);

        const data = await getAppointmentById(
          appointmentId
        );

        setAppointment(data);
      } catch (error) {
        console.error(error);

        toast.error(
          error.message ||
            "Failed to load appointment details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAppointment();
  }, [user, appointmentId]);

  const copyAppointmentId = async () => {
    try {
      await navigator.clipboard.writeText(
        appointmentId
      );

      toast.success("Appointment ID copied!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy appointment ID.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (authLoading || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FCFF] px-4">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-sky-500" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading appointment details...
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
            Please login to view your appointment
            details.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 px-6 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600"
          >
            Login to Continue
          </Link>
        </div>
      </main>
    );
  }

  if (!appointment) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FCFF] px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Appointment Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            We couldn't find the appointment you're
            looking for.
          </p>

          <Link
            to="/doctors"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-600"
          >
            Find a Doctor
            <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FCFF] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Success Header */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
            <CheckCircle2 size={46} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl">
            Appointment Confirmed!
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Your appointment has been successfully
            booked. Please keep your appointment ID for
            future reference.
          </p>
        </div>

        {/* Appointment Card */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm">
          {/* Card Header */}
          <div className="border-b border-slate-100 bg-sky-50/60 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-500">
                  Appointment ID
                </p>

                <p className="mt-1 break-all font-mono text-sm font-semibold text-slate-700">
                  {appointmentId}
                </p>
              </div>

              <button
                type="button"
                onClick={copyAppointmentId}
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-sky-200 bg-white px-4 py-2.5 text-sm font-semibold text-sky-600 transition hover:bg-sky-50"
              >
                <Copy size={16} />
                Copy ID
              </button>
            </div>
          </div>

          {/* Doctor */}
          <div className="px-6 py-7 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
                <Stethoscope size={28} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Doctor
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {appointment.doctorName}
                </h2>

                <p className="mt-1 text-sm font-medium text-sky-500">
                  {appointment.specialty}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm">
                  <CalendarDays size={20} />
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Date
                </p>

                <p className="mt-1 text-sm font-bold leading-5 text-slate-800">
                  {formatDate(appointment.date)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm">
                  <Clock3 size={20} />
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Time
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {formatTime(appointment.time)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm">
                  <Wallet size={20} />
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Consultation Fee
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  ৳{appointment.consultationFee || 0}
                </p>
              </div>
            </div>

            {/* Patient Information */}
            <div className="mt-8 border-t border-slate-100 pt-7">
              <h3 className="text-lg font-bold text-slate-900">
                Patient Information
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {appointment.patientName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {appointment.patientPhone}
                  </p>
                </div>

                {appointment.patientEmail && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                      {appointment.patientEmail}
                    </p>
                  </div>
                )}

                {appointment.reason && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Reason
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {appointment.reason}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className="shrink-0 text-emerald-500"
                />

                <div>
                  <p className="text-sm font-bold text-emerald-700">
                    Appointment Confirmed
                  </p>

                  <p className="mt-0.5 text-xs text-emerald-600">
                    Your appointment has been successfully
                    reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition hover:border-sky-200 hover:text-sky-500"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            to="/doctors"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600"
          >
            Book Another Appointment
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Confirmation;
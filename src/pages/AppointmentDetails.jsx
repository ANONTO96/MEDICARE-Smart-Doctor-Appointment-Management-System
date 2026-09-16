import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  Phone,
  Stethoscope,
  UserRound,
  Wallet,
  XCircle,
} from "lucide-react";

import { useAuth } from "../context/auth/useAuth";

import {
  cancelAppointment,
  getAppointmentById,
} from "../services/appointmentService";

import { formatTime } from "../utils/appointmentUtils";

const AppointmentDetails = () => {
  const { appointmentId } = useParams();

  const { user, loading: authLoading } =
    useAuth();

  const navigate = useNavigate();

  const [appointment, setAppointment] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] =
    useState(false);

  const [showCancelModal, setShowCancelModal] =
    useState(false);

  useEffect(() => {
    const loadAppointment = async () => {
      if (!user || !appointmentId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data =
          await getAppointmentById(
            appointmentId
          );

        if (data.userId !== user.uid) {
          toast.error(
            "You are not authorized to view this appointment."
          );

          navigate("/my-appointments", {
            replace: true,
          });

          return;
        }

        setAppointment(data);
      } catch (error) {
        console.error(error);

        toast.error(
          error.message ||
            "Failed to load appointment."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAppointment();
  }, [appointmentId, user, navigate]);

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

  const handleCancel = async () => {
    if (!appointment || !user) return;

    try {
      setCancelling(true);

      await cancelAppointment(
        appointment.id,
        user.uid
      );

      setAppointment((previous) => ({
        ...previous,
        status: "cancelled",
      }));

      setShowCancelModal(false);

      toast.success(
        "Appointment cancelled successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
          "Failed to cancel appointment."
      );
    } finally {
      setCancelling(false);
    }
  };

  if (authLoading || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FCFF] px-4">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-sky-500" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading appointment...
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
            Please login to view this appointment.
          </p>

          <Link
            to="/login"
            state={{
              from: `/appointments/${appointmentId}`,
            }}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 px-6 text-sm font-bold text-white transition hover:bg-sky-600"
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <XCircle size={30} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Appointment Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            We couldn't find the requested appointment.
          </p>

          <Link
            to="/my-appointments"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-600"
          >
            <ArrowLeft size={17} />
            My Appointments
          </Link>
        </div>
      </main>
    );
  }

  const isConfirmed =
    appointment.status === "confirmed";

  return (
    <main className="min-h-screen bg-[#F8FCFF]">
      {/* Header */}
      <section className="border-b border-sky-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-sky-500">
                Appointment Details
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                {appointment.doctorName}
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {appointment.specialty}
              </p>
            </div>

            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                isConfirmed
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {isConfirmed ? (
                <CheckCircle2 size={17} />
              ) : (
                <XCircle size={17} />
              )}

              {isConfirmed
                ? "Confirmed"
                : "Cancelled"}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Appointment overview */}
        <div className="grid gap-5 sm:grid-cols-3">
          <InfoCard
            icon={<CalendarDays size={22} />}
            label="Appointment Date"
            value={formatDate(
              appointment.date
            )}
          />

          <InfoCard
            icon={<Clock3 size={22} />}
            label="Appointment Time"
            value={formatTime(
              appointment.time
            )}
          />

          <InfoCard
            icon={<Wallet size={22} />}
            label="Consultation Fee"
            value={`৳${
              appointment.consultationFee || 0
            }`}
          />
        </div>

        {/* Doctor */}
        <section className="mt-6 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            icon={<Stethoscope size={20} />}
            title="Doctor Information"
          />

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <DetailItem
              label="Doctor"
              value={appointment.doctorName}
            />

            <DetailItem
              label="Specialty"
              value={appointment.specialty}
            />
          </div>
        </section>

        {/* Patient */}
        <section className="mt-6 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            icon={<UserRound size={20} />}
            title="Patient Information"
          />

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <DetailItem
              label="Patient Name"
              value={appointment.patientName}
              icon={<UserRound size={17} />}
            />

            <DetailItem
              label="Phone"
              value={appointment.patientPhone}
              icon={<Phone size={17} />}
            />

            {appointment.patientEmail && (
              <DetailItem
                label="Email"
                value={appointment.patientEmail}
                icon={<Mail size={17} />}
              />
            )}
          </div>
        </section>

        {/* Reason */}
        {appointment.reason && (
          <section className="mt-6 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
            <SectionTitle
              icon={<FileText size={20} />}
              title="Reason for Visit"
            />

            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {appointment.reason}
            </p>
          </section>
        )}

        {/* Appointment ID */}
        <section className="mt-6 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Appointment ID
          </p>

          <p className="mt-2 break-all font-mono text-sm font-semibold text-slate-700">
            {appointment.id}
          </p>
        </section>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Link
            to="/my-appointments"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            My Appointments
          </Link>

          {isConfirmed && (
            <button
              type="button"
              onClick={() =>
                setShowCancelModal(true)
              }
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-red-500 px-6 text-sm font-bold text-white transition hover:bg-red-600"
            >
              <XCircle size={18} />
              Cancel Appointment
            </button>
          )}
        </div>
      </section>

      {/* Cancellation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <XCircle size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Cancel Appointment?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Are you sure you want to cancel your
              appointment with{" "}
              <span className="font-semibold text-slate-700">
                {appointment.doctorName}
              </span>{" "}
              on{" "}
              <span className="font-semibold text-slate-700">
                {formatDate(appointment.date)}
              </span>{" "}
              at{" "}
              <span className="font-semibold text-slate-700">
                {formatTime(appointment.time)}
              </span>
              ?
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row-reverse">
              <button
                type="button"
                disabled={cancelling}
                onClick={handleCancel}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-red-500 px-5 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cancelling ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2" />
                    Cancelling...
                  </>
                ) : (
                  "Yes, Cancel"
                )}
              </button>

              <button
                type="button"
                disabled={cancelling}
                onClick={() =>
                  setShowCancelModal(false)
                }
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Keep Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
        {icon}
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
        {value}
      </p>
    </div>
  );
};

const SectionTitle = ({
  icon,
  title,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
        {icon}
      </div>

      <h2 className="text-lg font-bold text-slate-900">
        {title}
      </h2>
    </div>
  );
};

const DetailItem = ({
  label,
  value,
  icon,
}) => {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <p className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-700">
        {value || "Not provided"}
      </p>
    </div>
  );
};

export default AppointmentDetails;
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  GraduationCap,
  HeartPulse,
  Languages,
  Stethoscope,
  UserRound,
  Wallet,
} from "lucide-react";

import doctors from "../data/allDoctors.json";
import { formatTime } from "../utils/appointmentUtils";

const DoctorDetails = () => {
  const { doctorId } = useParams();

  const doctor = doctors.find(
    (item) => String(item.id) === String(doctorId)
  );

  if (!doctor) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F8FCFF] px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 text-sky-500">
            <UserRound size={34} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Doctor Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            The doctor you're looking for doesn't exist or may have been
            removed from our directory.
          </p>

          <Link
            to="/doctors"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
          >
            <ArrowLeft size={17} />
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FCFF]">
      {/* Profile Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

          <div className="grid items-center gap-10 lg:grid-cols-[360px_1fr]">
            {/* Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-sky-100 bg-sky-50 shadow-xl shadow-sky-100/60">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-105 w-full object-cover object-top"
                />
              </div>

              <div className="absolute -bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-sky-100 bg-white p-4 shadow-lg">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                  <HeartPulse size={22} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Consultation Fee
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    ৳{doctor.consultationFee}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Info */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-600">
                <Stethoscope size={17} />
                {doctor.specialty}
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {doctor.name}
              </h1>

              <p className="mt-3 text-lg font-semibold text-sky-500">
                {doctor.designation}
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                {doctor.about ||
                  `Dr. ${doctor.name.replace(
                    /^Dr\.\s*/,
                    ""
                  )} is an experienced ${doctor.specialty.toLowerCase()} specialist dedicated to providing professional and patient-focused healthcare.`}
              </p>

              {/* Quick Stats */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                  <Clock3 size={20} className="text-sky-500" />

                  <p className="mt-3 text-xs text-slate-500">
                    Experience
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {doctor.experience} years
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                  <GraduationCap
                    size={20}
                    className="text-sky-500"
                  />

                  <p className="mt-3 text-xs text-slate-500">
                    Qualification
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {doctor.qualification}
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                  <Wallet size={20} className="text-sky-500" />

                  <p className="mt-3 text-xs text-slate-500">
                    Consultation
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    ৳{doctor.consultationFee}
                  </p>
                </div>
              </div>

              <Link
                to={`/appointment/${doctor.id}`}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-xl"
              >
                <CalendarCheck size={19} />
                Book an Appointment
                <ArrowLeft
                  size={17}
                  className="rotate-180"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Qualifications */}
          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
              <GraduationCap size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Qualifications
            </h2>

            <div className="mt-5 flex items-start gap-3">
              <CheckCircle2
                size={19}
                className="mt-0.5 shrink-0 text-sky-500"
              />

              <p className="text-sm leading-6 text-slate-600">
                {doctor.qualification}
              </p>
            </div>
          </div>

          {/* Specialty */}
          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
              <Stethoscope size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Medical Specialty
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              {doctor.specialty}
            </p>

            {doctor.category && (
              <p className="mt-3 text-sm font-medium text-sky-600">
                {doctor.category}
              </p>
            )}
          </div>

          {/* Languages */}
          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
              <Languages size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Languages
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              {doctor.languages?.length
                ? doctor.languages.join(", ")
                : "Bangla, English"}
            </p>
          </div>
        </div>

        {/* Schedule */}
        <div className="mt-6 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                <CalendarCheck size={24} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                Consultation Schedule
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Available consultation days and visiting hours.
              </p>
            </div>

            <div className="rounded-xl bg-sky-50 px-4 py-3 text-center">
              <p className="text-xs text-slate-500">
                Slot Duration
              </p>

              <p className="mt-1 font-bold text-sky-600">
                {doctor.slotDuration || 30} minutes
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {doctor.schedule?.map((schedule, index) => (
  <div
    key={`${schedule.day}-${index}`}
    className="group rounded-xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/50"
  >
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-slate-900">
        {schedule.day}
      </h3>

      <Clock3
        size={18}
        className="text-sky-500"
      />
    </div>

    <p className="mt-3 text-sm font-medium text-sky-600">
      {formatTime(schedule.start)} -{" "}
      {formatTime(schedule.end)}
    </p>
  </div>
))}
          </div>

          {!doctor.schedule?.length && (
            <div className="mt-6 rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
              Schedule information is currently unavailable.
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-linear-to-r from-sky-500 to-cyan-500 p-8 text-white shadow-xl shadow-sky-100 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-sky-100">
                Ready to see the doctor?
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Book your consultation today.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-sky-50">
                Select your preferred date and available time slot
                to complete your appointment.
              </p>
            </div>

            <Link
              to={`/appointment/${doctor.id}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-sky-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-50"
            >
              <CalendarCheck size={19} />
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorDetails;
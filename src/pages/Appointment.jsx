import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth/useAuth";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  HeartPulse,
  Mail,
  Phone,
  UserRound,
  Wallet,
} from "lucide-react";

import doctors from "../data/allDoctors.json";

import { generateTimeSlots, formatTime } from "../utils/appointmentUtils";

import {
  createAppointment,
  getBookedAppointments,
} from "../services/appointmentService";

import {
  isValidPhone,
  isValidEmail,
  isPastDate,
} from "../utils/validation";

const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const today = getToday();

const Appointment = () => {
  const { doctorId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const doctor = doctors.find(
    (item) => item.id === doctorId
  );

  const [selectedDate, setSelectedDate] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  const [patient, setPatient] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
  });

  const selectedDaySchedule = useMemo(() => {
    if (!selectedDate || !doctor) return null;

    const date = new Date(`${selectedDate}T00:00:00`);

    const dayName = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    return doctor.schedule.find(
      (schedule) => schedule.day === dayName
    );
  }, [selectedDate, doctor]);

  const availableSlots = useMemo(() => {
    if (!selectedDaySchedule || !doctor) return [];

    return generateTimeSlots(
      selectedDaySchedule.start,
      selectedDaySchedule.end,
      doctor.slotDuration
    );
  }, [selectedDaySchedule, doctor]);

  useEffect(() => {
    const loadBookedAppointments = async () => {
      if (!selectedDate || !doctor || !user) {
        return;
      }

      try {
        const appointments = await getBookedAppointments(
          doctor.id,
          selectedDate
        );

        setBookedTimes(
          appointments.map(
            (appointment) => appointment.time
          )
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to load available times.");
      }
    };

    loadBookedAppointments();
  }, [selectedDate, doctor, user]);

  if (!doctor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FCFF] px-4">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 text-sky-500">
            <UserRound size={34} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Doctor Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The doctor you're looking for could not be found.
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

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FCFF]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-sky-500" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Checking your account...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FCFF] px-4">
        <div className="w-full max-w-md rounded-2xl border border-sky-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
            <UserRound size={30} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Login Required
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Please login to your Medicare account before
            booking an appointment with {doctor.name}.
          </p>

          <Link
            to="/login"
            state={{
              from: `/appointment/${doctor.id}`,
            }}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 px-6 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600"
          >
            Login to Continue
          </Link>

          <p className="mt-5 text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              state={{
                from: `/appointment/${doctor.id}`,
              }}
              className="font-semibold text-sky-500 hover:text-sky-600"
            >
              Create Account
            </Link>
          </p>

          <Link
            to={`/doctors/${doctor.id}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-sky-500"
          >
            <ArrowLeft size={16} />
            Back to Doctor Profile
          </Link>
        </div>
      </main>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPatient((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("Please login before booking an appointment.");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a date.");
      return;
    }

    if (!selectedDaySchedule) {
      toast.error(
        "This doctor is not available on the selected day."
      );
      return;
    }

    if (!selectedTime) {
      toast.error("Please select an appointment time.");
      return;
    }

    if (!patient.name || !patient.phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    if (!isValidPhone(patient.phone)) {
  toast.error(
    "Please enter a valid Bangladesh mobile number."
  );
  return;
}

if (!isValidEmail(patient.email)) {
  toast.error("Please enter a valid email address.");
  return;
}

if (isPastDate(selectedDate)) {
  toast.error("You cannot book an appointment for a past date.");
  return;
}

    if (bookedTimes.includes(selectedTime)) {
      toast.error(
        "This slot has already been booked. Please choose another time."
      );
      return;
    }

    try {
      setLoading(true);

      const appointmentId = await createAppointment({
        userId: user.uid,

        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        consultationFee: doctor.consultationFee,

        patientName: patient.name,
        patientPhone: patient.phone,
        patientEmail: patient.email,
        reason: patient.reason,

        date: selectedDate,
        time: selectedTime,
      });

      navigate(`/appointment-confirmed/${appointmentId}`, {
        state: {
          doctorName: doctor.name,
          specialty: doctor.specialty,
          date: selectedDate,
          time: selectedTime,
          consultationFee: doctor.consultationFee,
        },
      });

      toast.success("Appointment booked successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
        "Failed to book appointment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FCFF]">

      {/* Page Intro */}
      <section className="relative overflow-hidden border-b border-sky-100 bg-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Home Navigation */}
          <Link
            to={`/doctors/${doctor.id}`}
            className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2.5 text-sm font-semibold text-sky-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50 hover:shadow-md"
          >
            <ArrowLeft size={17} />
            Back to Doctor Profile
          </Link>
          <div className="max-w-3xl mt-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-600">
              <CalendarDays size={17} />
              Appointment Booking
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Book Your{" "}
              <span className="text-sky-500">
                Consultation
              </span>
            </h1>

            <p className="mt-3 text-base leading-7 text-slate-600">
              Choose a convenient date and available time slot
              with {doctor.name}.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid items-start gap-8 lg:grid-cols-[320px_1fr]">
          {/* Doctor Card */}
          <aside className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm lg:sticky lg:top-6">
            <div className="relative h-64 overflow-hidden bg-sky-50">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
              />

              <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-sky-600 shadow-sm">
                {doctor.specialty}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900">
                {doctor.name}
              </h2>

              <p className="mt-1 text-sm font-semibold text-sky-500">
                {doctor.designation}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {doctor.qualification}
              </p>

              <div className="my-5 h-px bg-slate-100" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                    <Clock3 size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Experience
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      {doctor.experience} years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
                    <Wallet size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Consultation Fee
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      ৳{doctor.consultationFee}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                    <HeartPulse size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Appointment Duration
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      {doctor.slotDuration} minutes
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-sky-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
                  Available Days
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {doctor.schedule
                    .map((schedule) => schedule.day)
                    .join(" • ")}
                </p>
              </div>
            </div>
          </aside>

          {/* Booking Form */}
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm"
          >
            {/* Date & Time */}
            <div className="border-b border-slate-100 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                  <CalendarDays size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Select Date & Time
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose an available consultation date and
                    time.
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="mt-7">
                <label
                  htmlFor="appointment-date"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Appointment Date
                </label>

                <input
  id="appointment-date"
  type="date"
  min={today}
  value={selectedDate}
  onClick={(event) => {
    event.currentTarget.showPicker?.();
  }}
  onChange={(event) => {
    const date = event.target.value;

    setSelectedDate(date);
    setSelectedTime("");
    setBookedTimes([]);
  }}
  className="h-12 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
/>
              </div>

              {/* Unavailable */}
              {selectedDate &&
                !selectedDaySchedule && (
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <Clock3
                      size={19}
                      className="mt-0.5 shrink-0 text-amber-500"
                    />

                    <div>
                      <p className="text-sm font-semibold text-amber-800">
                        Doctor unavailable
                      </p>

                      <p className="mt-1 text-xs leading-5 text-amber-700">
                        {doctor.name} does not have
                        consultation hours on the selected
                        day. Please choose another date.
                      </p>
                    </div>
                  </div>
                )}

              {/* Available Times */}
              {selectedDaySchedule && (
                <div className="mt-7">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        Available Times
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Consultation hours:{" "}
                        {formatTime(
                          selectedDaySchedule.start
                        )}{" "}
                        -{" "}
                        {formatTime(
                          selectedDaySchedule.end
                        )}
                      </p>
                    </div>

                    <div className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-600">
                      {availableSlots.length} slots
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {availableSlots.map((slot) => {
                      const isBooked =
                        bookedTimes.includes(
                          slot.startTime
                        );

                      const isSelected =
                        selectedTime ===
                        slot.startTime;

                      return (
                        <button
                          key={slot.startTime}
                          type="button"
                          disabled={isBooked}
                          onClick={() =>
                            setSelectedTime(
                              slot.startTime
                            )
                          }
                          className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all duration-200 ${isBooked
                            ? "cursor-not-allowed border-slate-100 bg-slate-100 text-slate-400 line-through"
                            : isSelected
                              ? "border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-200"
                              : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600"
                            }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full border border-slate-200 bg-white" />
                      Available
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-sky-500" />
                      Selected
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-slate-200" />
                      Booked
                    </div>
                  </div>
                </div>
              )}

              {/* Selected Appointment */}
              {selectedDate &&
                selectedDaySchedule &&
                selectedTime && (
                  <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-sky-500"
                      />

                      <div>
                        <p className="text-sm font-bold text-sky-800">
                          Appointment Selected
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                          {new Date(
                            `${selectedDate}T00:00:00`
                          ).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}{" "}
                          at{" "}
                          <span className="font-semibold text-sky-600">
                            {formatTime(selectedTime)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            {/* Patient Information */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
                  <UserRound size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Patient Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Provide your details to complete the
                    appointment.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="patient-name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="patient-name"
                      type="text"
                      name="name"
                      value={patient.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="patient-phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Phone Number
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="patient-phone"
                      type="tel"
                      name="phone"
                      value={patient.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="patient-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="patient-email"
                      type="email"
                      name="email"
                      value={patient.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                </div>

                {/* Reason */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="patient-reason"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Reason for Visit
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    <FileText
                      size={18}
                      className="absolute left-4 top-4 text-slate-400"
                    />

                    <textarea
                      id="patient-reason"
                      name="reason"
                      value={patient.reason}
                      onChange={handleChange}
                      placeholder="Briefly describe your reason for visiting..."
                      rows={4}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2 text-xs leading-5 text-slate-500">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-sky-500"
                  />

                  <span>
                    Your appointment information will be securely
                    stored for confirmation.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-500 px-7 text-sm font-bold text-white shadow-lg shadow-sky-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CalendarDays size={19} />
                      Confirm Appointment
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Appointment;

import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import doctors from "../data/allDoctors.json";

const specialties = [
  {
    title: "Cardiology",
    description:
      "Expert care for heart and cardiovascular conditions.",
    icon: HeartPulse,
  },
  {
    title: "Neurology",
    description:
      "Specialized diagnosis and treatment for neurological conditions.",
    icon: Stethoscope,
  },
  {
    title: "Dermatology",
    description:
      "Professional care for skin, hair and cosmetic concerns.",
    icon: ShieldCheck,
  },
  {
    title: "Orthopedics",
    description:
      "Comprehensive care for bones, joints and muscles.",
    icon: Users,
  },
  {
    title: "Pediatrics",
    description:
      "Dedicated healthcare for infants, children and adolescents.",
    icon: HeartPulse,
  },
  {
    title: "General Medicine",
    description:
      "Everyday medical care, prevention and health guidance.",
    icon: Stethoscope,
  },
];

const Home = () => {
  const featuredDoctors = doctors.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F8FCFF] text-slate-800">

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden border-b border-sky-100 bg-linear-to-br from-sky-50 via-white to-cyan-50">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">

          {/* Hero Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-500 shadow-sm shadow-sky-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/30">
              <HeartPulse size={16} />
              Healthcare made simple
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find the right doctor.
              <span className="block text-sky-500">
                Book with confidence.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Discover experienced doctors, check real-time availability,
              and book your medical appointment in just a few simple steps.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/doctors"
                className="group btn rounded-xl border-0 bg-sky-500 px-7 text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/30"
              >
                Find a Doctor
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/about"
                className="btn rounded-xl border border-sky-200 bg-white px-7 text-sky-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700 hover:shadow-md"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="text-sky-500"
                  size={18}
                />
                Experienced doctors
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="text-sky-500"
                  size={18}
                />
                Easy online booking
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="text-sky-500"
                  size={18}
                />
                Secure appointments
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-sky-300/30 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-cyan-300/30 blur-3xl" />

            <div className="relative rounded-4xl border border-sky-100 bg-white p-3 shadow-2xl shadow-sky-100/70">
              <div className="overflow-hidden rounded-3xl bg-linear-to-br from-sky-500 via-sky-500 to-cyan-500">

                <div className="p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
                      <Stethoscope size={30} />
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-white" />
                      Easy Booking
                    </div>
                  </div>

                  <h2 className="mt-10 text-3xl font-bold text-white sm:text-4xl">
                    Your healthcare,
                    <span className="block text-white/75">
                      on your schedule.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-sm leading-7 text-white/75">
                    Choose a doctor, select an available time and
                    manage your appointment from one place.
                  </p>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                        <CalendarCheck size={21} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          Simple appointment booking
                        </p>

                        <p className="mt-1 text-xs text-white/60">
                          Select your preferred date and time
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                        <Clock3 size={21} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          Real-time availability
                        </p>

                        <p className="mt-1 text-xs text-white/60">
                          Choose from available appointment slots
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/doctors"
                    className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-sky-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-50"
                  >
                    Start Booking
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TRUST STRIP ==================== */}
      <section className="border-b border-sky-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">

          {[
            {
              icon: Users,
              value: `${doctors.length}`,
              label: "Available Doctors",
            },
            {
              icon: Stethoscope,
              value: "6",
              label: "Medical Specialties",
            },
            {
              icon: CalendarCheck,
              value: "30 min",
              label: "Appointment Slots",
            },
            {
              icon: ShieldCheck,
              value: "Secure",
              label: "Appointment Data",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group flex items-center gap-4 border-b border-r border-sky-100 px-5 py-7 transition-all duration-300 hover:bg-sky-50 md:border-b-0"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-500/20">
                  <Icon size={23} />
                </div>

                <div>
                  <p className="text-xl font-bold text-slate-800">
                    {item.value}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== SPECIALTIES ==================== */}
      <section
        id="specialties"
        className="scroll-mt-24 bg-[#F8FCFF] py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="font-semibold tracking-wide text-sky-500">
              OUR SPECIALTIES
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Care for every stage of life
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              Explore our medical specialties and find a doctor
              who matches your healthcare needs.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specialties.map((specialty) => {
              const Icon = specialty.icon;

              return (
                <div
                  key={specialty.title}
                  className="group rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/80"
                >
                  <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-sky-50 text-sky-500 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-500/20">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-800 transition-colors duration-300 group-hover:text-sky-600">
                    {specialty.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {specialty.description}
                  </p>

                  <Link
                    to="/doctors"
                    className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-500 transition-colors hover:text-sky-700"
                  >
                    Find a doctor
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/doctors"
              className="group inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-6 py-3 text-sm font-semibold text-sky-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-50 hover:shadow-md"
            >
              Explore all doctors
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED DOCTORS ==================== */}
      <section
        id="doctors"
        className="scroll-mt-24 border-y border-sky-100 bg-white py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-semibold tracking-wide text-sky-500">
                OUR DOCTORS
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Meet our specialists
              </h2>

              <p className="mt-3 max-w-xl text-slate-500">
                Experienced professionals ready to provide
                personalized medical care.
              </p>
            </div>

            <Link
              to="/doctors"
              className="group flex items-center gap-2 font-semibold text-sky-500 transition-colors hover:text-sky-700"
            >
              View all doctors
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="group overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/80"
              >
                <div className="relative h-64 overflow-hidden bg-sky-50">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-sky-600 shadow-sm backdrop-blur-sm">
                    {doctor.specialty}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-sky-600">
                    {doctor.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {doctor.designation}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                    <Clock3
                      size={16}
                      className="text-sky-500"
                    />

                    {doctor.experience} years experience
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-sky-100 pt-5">
                    <div>
                      <p className="text-xs text-slate-400">
                        Consultation
                      </p>

                      <p className="mt-1 font-bold text-slate-800">
                        ৳{doctor.consultationFee}
                      </p>
                    </div>

                    <Link
                      to={`/doctors/${doctor.id}`}
                      className="btn btn-sm rounded-lg border-0 bg-sky-500 px-4 text-white transition-all duration-300 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/20"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section
        id="how-it-works"
        className="scroll-mt-24 bg-[#F8FCFF] py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-semibold tracking-wide text-sky-500">
              HOW IT WORKS
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Your appointment, simplified
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              Getting the healthcare you need shouldn't be complicated.
            </p>
          </div>

          <div className="relative grid gap-6 md:grid-cols-3">

            <div className="absolute left-[16%] right-[16%] top-8 hidden h-px bg-sky-100 md:block" />

            {[
              {
                number: "01",
                title: "Choose a doctor",
                description:
                  "Browse specialists and choose the doctor that best fits your healthcare needs.",
                icon: Users,
              },
              {
                number: "02",
                title: "Select a time",
                description:
                  "Pick an available date and time slot based on your doctor's schedule.",
                icon: CalendarCheck,
              },
              {
                number: "03",
                title: "Confirm booking",
                description:
                  "Enter your details and confirm your appointment securely.",
                icon: CheckCircle2,
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-sky-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/70"
                >
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-500 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-500/20">
                    <Icon size={28} />
                  </div>

                  <p className="mt-6 text-xs font-bold tracking-[0.2em] text-sky-500">
                    STEP {step.number}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-800">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== TRUST / SECURITY ==================== */}
      <section className="border-y border-sky-100 bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
              <ShieldCheck size={30} />
            </div>

            <p className="mt-7 font-semibold tracking-wide text-sky-500">
              BUILT AROUND YOU
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A simpler and more reliable way to manage appointments.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-500">
              Medicare keeps the appointment experience straightforward,
              from finding a suitable doctor to managing your confirmed
              bookings.
            </p>

            <Link
              to="/about"
              className="group mt-7 inline-flex items-center gap-2 font-semibold text-sky-500 transition-colors hover:text-sky-700"
            >
              Learn about Medicare
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: CalendarCheck,
                title: "Clear scheduling",
                description:
                  "See available appointment slots before you book.",
              },
              {
                icon: ShieldCheck,
                title: "Secure access",
                description:
                  "Your account and appointments are protected.",
              },
              {
                icon: Clock3,
                title: "Flexible slots",
                description:
                  "Choose an appointment time that works for you.",
              },
              {
                icon: HeartPulse,
                title: "Patient focused",
                description:
                  "A clean experience designed around your needs.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-sky-100 bg-[#F8FCFF] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-lg hover:shadow-sky-100/70"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="bg-[#F8FCFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-linear-to-br from-sky-500 to-cyan-500 px-6 py-14 text-center shadow-xl shadow-sky-200/60 sm:px-12">

          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
              <CalendarCheck size={28} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to book your appointment?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">
              Find a doctor, choose a convenient time and take
              the next step toward better healthcare.
            </p>

            <Link
              to="/doctors"
              className="group btn mt-7 rounded-xl border-0 bg-white px-8 text-sky-500 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-sky-50 hover:shadow-xl"
            >
              Find a Doctor
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

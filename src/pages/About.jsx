import {
  CalendarCheck,
  Clock3,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  UsersRound,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Stethoscope,
      title: "Qualified Doctors",
      description:
        "Find doctors across different medical specialties and choose the right professional for your healthcare needs.",
    },
    {
      icon: CalendarCheck,
      title: "Easy Appointment Booking",
      description:
        "Choose your preferred date and available time slot and book your appointment in just a few simple steps.",
    },
    {
      icon: Clock3,
      title: "Real-Time Availability",
      description:
        "Available appointment slots are updated dynamically so you can choose from the times that are actually available.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description:
        "Your account and appointment information are protected using Firebase Authentication and secure Firestore access rules.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Find a Doctor",
      description:
        "Browse doctors by specialty and explore their qualifications, experience, consultation fee and schedule.",
    },
    {
      number: "02",
      title: "Choose a Time",
      description:
        "Select a convenient date and one of the available appointment slots from the doctor's schedule.",
    },
    {
      number: "03",
      title: "Book Your Appointment",
      description:
        "Provide your basic information and confirm your appointment securely.",
    },
    {
      number: "04",
      title: "Manage Your Visit",
      description:
        "View your appointment details, keep track of your bookings and cancel an appointment when necessary.",
    },
  ];

  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-sky-50 via-white to-blue-50">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-sm font-semibold text-sky-600 shadow-sm">
              <HeartPulse className="h-4 w-4" />
              Healthcare made simpler
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Better healthcare starts with
              <span className="block text-sky-500">
                easier access.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Medicare is a modern appointment management platform
              designed to make finding doctors and booking healthcare
              appointments simple, convenient and reliable.
            </p>
          </div>
        </div>
      </section>

      {/* About Medicare */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-sky-500">
              About Medicare
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Connecting patients with the care they need.
            </h2>

            <p className="mt-6 leading-7 text-slate-600">
              Medicare is built around one simple idea: accessing
              healthcare should not feel complicated. Instead of
              dealing with unnecessary steps to find a doctor and
              schedule a consultation, patients can discover doctors,
              check their availability and manage appointments from
              one convenient platform.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Whether you are looking for a specialist or need a
              general medical consultation, Medicare provides the
              tools you need to make the appointment process easier
              from start to finish.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-sky-50 p-5">
                <UsersRound className="h-7 w-7 text-sky-500" />

                <p className="mt-3 text-2xl font-bold text-slate-900">
                  24+
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Medical Specialists
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-5">
                <CalendarCheck className="h-7 w-7 text-blue-500" />

                <p className="mt-3 text-2xl font-bold text-slate-900">
                  24/7
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Online Booking Access
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-linear-to-br from-sky-500 to-blue-600 p-1 shadow-xl">
              <div className="rounded-[22px] bg-white p-8 sm:p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50">
                  <HeartPulse className="h-7 w-7 text-sky-500" />
                </div>

                <h3 className="mt-7 text-2xl font-bold text-slate-900">
                  Healthcare with less hassle.
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  From discovering a doctor to managing a confirmed
                  appointment, Medicare brings the essential parts
                  of the booking experience together in one place.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Simple doctor discovery",
                    "Clear schedules and available slots",
                    "Secure appointment management",
                    "Easy access to your booking history",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100">
                        <ShieldCheck className="h-4 w-4 text-sky-500" />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-sky-500">
              Why Medicare
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need for a simpler appointment experience.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Designed to keep the appointment process clear,
              convenient and easy to manage.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl transition duration-300 bg-sky-50 group-hover:bg-sky-500">
                    <Icon className="h-6 w-6 text-sky-500 group-hover:text-white transition duration-300"/>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-sky-500">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Book your appointment in four simple steps.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative group rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-4xl font-black text-sky-200 group-hover:text-sky-500 transition duration-300">
                  {step.number}
                </span>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-sky-600 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <HeartPulse className="h-7 w-7 text-white" />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our goal is simple.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-sky-50 sm:text-lg">
            Make healthcare appointments easier to discover,
            schedule and manage so patients can spend less time
            navigating the process and more time focusing on their
            health.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  Clock3,
  Search,
  Stethoscope,
  UserRound,
} from "lucide-react";

import doctors from "../data/allDoctors.json";

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const specialties = [
    "All",
    ...new Set(doctors.map((doctor) => doctor.specialty)),
  ];

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        doctor.name.toLowerCase().includes(search) ||
        doctor.specialty.toLowerCase().includes(search) ||
        doctor.qualification.toLowerCase().includes(search);

      const matchesSpecialty =
        selectedSpecialty === "All" ||
        doctor.specialty === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [searchTerm, selectedSpecialty]);

  return (
    <div className="min-h-screen bg-[#F8FCFF]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-sky-100 bg-white">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

          <div className="mx-auto mt-10 max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
              <Stethoscope size={17} />
              Find Your Doctor
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Meet Our{" "}
              <span className="text-sky-500">Specialist Doctors</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Find experienced healthcare professionals and book your
              consultation at a time that works for you.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-sky-300/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-xl">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by doctor name, specialty or qualification..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              />
            </div>

            {/* Specialty */}
            <div className="w-full lg:w-64">
              <select
                value={selectedSpecialty}
                onChange={(event) =>
                  setSelectedSpecialty(event.target.value)
                }
                className="select h-12 w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === "All"
                      ? "All Specialties"
                      : specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredDoctors.length}
            </span>{" "}
            doctor{filteredDoctors.length !== 1 ? "s" : ""}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {filteredDoctors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="group overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-100/60"
              >
                {/* Doctor Image */}
                <div className="relative h-72 overflow-hidden bg-sky-50">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-sky-600 shadow-sm backdrop-blur">
                    {doctor.specialty}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-sky-600">
                    {doctor.name}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-sky-600">
                    {doctor.designation}
                  </p>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                    {doctor.qualification}
                  </p>

                  {/* Info */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-sky-50 p-3">
                      <p className="text-xs text-slate-500">
                        Experience
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {doctor.experience} years
                      </p>
                    </div>

                    <div className="rounded-xl bg-cyan-50 p-3">
                      <p className="text-xs text-slate-500">
                        Consultation
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        ৳{doctor.consultationFee}
                      </p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mt-4 flex items-start gap-2 text-sm text-slate-600">
                    <Clock3
                      size={17}
                      className="mt-0.5 shrink-0 text-sky-500"
                    />

                    <span>
                      {doctor.schedule?.length
                        ? doctor.schedule
                            .map((item) => item.day)
                            .join(" • ")
                        : "Schedule available"}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex gap-3">
                    <Link
                      to={`/doctors/${doctor.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-sky-200 px-4 py-3 text-sm font-semibold text-sky-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-50"
                    >
                      <UserRound size={17} />
                      View Profile
                      <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                    </Link>

                    <Link
                      to={`/appointment/${doctor.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-200"
                    >
                      <CalendarCheck size={17} />
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-sky-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-50 text-sky-500">
              <Search size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No doctors found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try changing your search term or selecting a different
              specialty.
            </p>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("All");
              }}
              className="mt-6 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Doctors;

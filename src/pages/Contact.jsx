import {
  CalendarX2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    toast.success(
      "Your message has been sent. Our support team will contact you soon."
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#F8FCFF]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-sky-100 bg-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-600">
              <MessageCircle size={17} />
              Contact Medicare
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              We're here to{" "}
              <span className="text-sky-500">help you</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Have a question about an appointment, need to cancel or
              reschedule, or need more information? Get in touch with
              the Medicare support team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact Information */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Contact Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose the most convenient way to reach our support
                team.
              </p>
            </div>

            <div className="space-y-4">
              {/* Phone */}
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                    <Phone size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Call Us
                    </p>

                    <a
                      href="tel:+8801700000000"
                      className="mt-1 block text-base font-bold text-slate-900 transition hover:text-sky-500"
                    >
                      +880 1700-000000
                    </a>

                    <p className="mt-1 text-xs text-slate-400">
                      For appointment and general inquiries
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
                    <Mail size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Email Us
                    </p>

                    <a
                      href="mailto:support@medicare.com"
                      className="mt-1 block text-base font-bold text-slate-900 transition hover:text-sky-500"
                    >
                      support@medicare.com
                    </a>

                    <p className="mt-1 text-xs text-slate-400">
                      For support and detailed inquiries
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Medical Center
                    </p>

                    <p className="mt-1 text-base font-bold text-slate-900">
                      Medicare Medical Center
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
                    <Clock3 size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Support Hours
                    </p>

                    <p className="mt-1 text-base font-bold text-slate-900">
                      Saturday – Thursday
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      9:00 AM – 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-sky-500"
                />

                <div>
                  <p className="text-sm font-bold text-sky-800">
                    Your information matters
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Please avoid sharing sensitive medical information
                    or passwords through the contact form.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Tell us how we can help and our support team will get
                back to you.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              {/* Name + Phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  How Can We Help?
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                >
                  <option value="">Select an option</option>
                  <option value="Appointment Cancellation">
                    Appointment Cancellation
                  </option>
                  <option value="Reschedule Appointment">
                    Reschedule Appointment
                  </option>
                  <option value="Booking Problem">
                    Booking Problem
                  </option>
                  <option value="Doctor Information">
                    Doctor Information
                  </option>
                  <option value="General Information">
                    General Information
                  </option>
                  <option value="Account Support">
                    Account Support
                  </option>
                  <option value="Technical Problem">
                    Technical Problem
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Message
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 text-sm font-bold text-white shadow-lg shadow-sky-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-xl"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Common Help Section */}
      <section className="border-t border-sky-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
              <CalendarX2 size={22} />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Need to change an appointment?
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              If you need to cancel or reschedule an appointment, please
              include your appointment ID when contacting our support
              team. This helps us find your booking quickly.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="tel:+8801700000000"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 text-sm font-bold text-white transition hover:bg-sky-600"
              >
                <Phone size={17} />
                Call Support
              </a>

              <a
                href="mailto:support@medicare.com"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-5 text-sm font-bold text-sky-600 transition hover:border-sky-400 hover:bg-sky-50"
              >
                <Mail size={17} />
                Email Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
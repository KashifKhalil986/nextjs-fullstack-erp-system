"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendMessage } from "../contact/action";
import ReCAPTCHA from "react-google-recaptcha";

const initialState = { success: false, message: "" };

export default function Contact() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(
    sendMessage,
    initialState,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const showCaptcha =
    name.trim() !== "" && email.trim() !== "" && message.trim() !== "";
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!state.message) return;

    setShowMessage(true);
    if (state.success) {
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
      setName("");
      setEmail("");
      setMessage("");
    }
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [state]);
  return (
    <section
      id="contact"
      className="w-full overflow-hidden border-t border-[#e8ecf4]"
    >
      <div className="max-w-7xl mx-auto px-5 xl:px-0 py-20 lg:py-28">
        <div className="relative bg-white border border-slate-100 rounded-md shadow overflow-hidden">
          <div className="relative grid lg:grid-cols-2 lg:gap-12">
            {/* ── Left: Info Panel (Dark Sidebar Card) ── */}
            <div className="bg-gradient-to-br from-[var(--navy)] via-[#0b244d] to-[var(--blue-dark)] rounded-md p-10 text-white flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[400px] lg:min-h-full">
              <div className="space-y-6 relative z-10">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                    Contact Us
                  </p>
                  <h2 className="text-3xl font-extrabold text-white leading-tight tracking-tight">
                    Let&apos;s Optimize Your{" "}
                    <span className="text-blue-200 block mt-1">
                      Inventory Together
                    </span>
                  </h2>
                </div>
                <p className="text-sm text-blue-100/80 leading-relaxed max-w-sm font-medium">
                  Have questions or need a custom solution? Our team of
                  inventory experts is here to help you optimize your
                  operations.
                </p>
              </div>

              {/* Contact details */}
              <ul className="space-y-6 mt-12 lg:mt-0 relative z-10">
                {/* Phone */}
                <li className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white group-hover:text-[var(--blue-dark)] group-hover:border-white text-white">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200/80 font-bold uppercase tracking-wider mb-0.5">
                      Phone
                    </p>
                    <a
                      href="tel:8137087885"
                      className="text-sm font-semibold text-white hover:text-blue-200 transition-colors"
                    >
                      (813) 708-7885
                    </a>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white group-hover:text-[var(--blue-dark)] group-hover:border-white text-white">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200/80 font-bold uppercase tracking-wider mb-0.5">
                      Email
                    </p>
                    <a
                      href="mailto:info@alphabuiltconsultants.com"
                      className="text-sm font-semibold text-white hover:text-blue-200 transition-colors break-all"
                    >
                      info@alphabuiltconsultants.com
                    </a>
                  </div>
                </li>

                {/* Address */}
                <li className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white group-hover:text-[var(--blue-dark)] group-hover:border-white text-white mt-0.5">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200/80 font-bold uppercase tracking-wider mb-0.5">
                      Address
                    </p>
                    <p className="text-xs font-semibold text-white leading-relaxed">
                      Industrial Road, Street No. 1,
                      <br />
                      Plot No. 103-104 A, Hayatabad, Peshawar
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* ── Right: Contact Form ── */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-center ">
              {showMessage && state.message && (
                <div
                  className={`rounded-xl px-5 py-4 text-sm font-medium border flex items-center gap-2.5 animate-fade-in ${
                    state.success
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200/60"
                      : "bg-rose-50 text-rose-800 border-rose-200/60"
                  }`}
                >
                  {state.success ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-emerald-600 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-rose-600 flex-shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  )}
                  {state.message}
                </div>
              )}
              <div className="w-full mt-2">
                <h3 className="text-2xl font-bold text-[#020F2E] mb-2">
                  Send us a Message
                </h3>
                <p className="text-sm text-slate-500 mb-8">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>

                <form action={formAction} className="space-y-6">
                  {/* Row: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-1.5 text-sm text-[#020F2E] placeholder:text-slate-400 outline-none focus:bg-white focus:border-[var(--blue-dark)] focus:ring-4 focus:ring-[var(--blue-dark)]/5 transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-1.5 text-sm text-[#020F2E] placeholder:text-slate-400 outline-none focus:bg-white focus:border-[var(--blue-dark)] focus:ring-4 focus:ring-[var(--blue-dark)]/5 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your message"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-[#020F2E] placeholder:text-slate-400 outline-none focus:bg-white focus:border-[var(--blue-dark)] focus:ring-4 focus:ring-[var(--blue-dark)]/5 transition-all duration-200 resize-none"
                    />
                  </div>
                  {showCaptcha && (
                    <div className="space-y-2">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={(token: string | null) =>
                          setCaptchaToken(token)
                        }
                        onExpired={() => setCaptchaToken(null)}
                      />
                      {/* This is what actually gets read by the server action via formData */}
                      <input
                        type="hidden"
                        name="recaptchaToken"
                        value={captchaToken ?? ""}
                      />
                    </div>
                  )}
                  {/* Submit */}
                  <div>
                    <button
                      disabled={pending || !captchaToken || !showCaptcha}
                      className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[var(--navy)] text-white text-sm font-bold hover:bg-[#041f52] active:scale-[0.98] disabled:opacity-60 transition-all duration-200 shadow-lg shadow-blue-950/10 mt-1 cursor-pointer"
                    >
                      {pending ? (
                        <>
                          <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              strokeOpacity="0.3"
                              className="stroke-white"
                            />
                            <path
                              d="M12 2a10 10 0 0 1 10 10"
                              className="stroke-white"
                            />
                          </svg>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

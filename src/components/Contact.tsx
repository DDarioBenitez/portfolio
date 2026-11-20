import { ArrowUpRight, Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}

const EMAIL = "benitez_trabaja@hotmail.com";

export default function Contact() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>();

  const onSubmit = async (data: ContactFormInputs) => {
    const subjectLabels: Record<string, string> = {
      freelance: t("contact.subjectFreelance"),
      team: t("contact.subjectTeam"),
      consulting: t("contact.subjectConsulting"),
      other: t("contact.subjectOther"),
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, subject: subjectLabels[data.subject] ?? data.subject }),
      });
      const result = await response.json();
      if (result.ok) {
        toast.success(t("contact.sent"));
        reset();
      } else {
        toast.error(t("contact.error"));
      }
    } catch {
      toast.error(t("contact.error2"));
    }
  };

  const channels = [
    { icon: <Mail size={18} aria-hidden="true" />, label: EMAIL, href: `mailto:${EMAIL}` },
    {
      icon: <Linkedin size={18} aria-hidden="true" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/dar%C3%ADo-dami%C3%A1n-ben%C3%ADtez/",
    },
    { icon: <Github size={18} aria-hidden="true" />, label: "GitHub", href: "https://github.com/DDarioBenitez" },
    { icon: <MessageCircle size={18} aria-hidden="true" />, label: "+54 370 4009882", href: "https://wa.me/5493704009882" },
  ];

  return (
    <section id="contact" className="scroll-mt-20 py-16 md:py-24">
      <div className="shell">
        <SectionHeading index="03" label={t("contact.label")} title={t("contact.title")} description={t("contact.lead")} />

        <div className="mt-2 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <div className="card flex flex-col gap-5 p-6">
              <span className="meta-index text-muted">{t("contact.direct")}</span>
              <a
                href={`mailto:${EMAIL}`}
                className="headline-sm inline-flex items-center gap-1 break-all font-bold text-accent-dark transition-colors hover:text-accent"
              >
                {EMAIL}
                <ArrowUpRight size={20} className="shrink-0" aria-hidden="true" />
              </a>

              <ul className="flex flex-col divide-y divide-line border-t border-line pt-2">
                {channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="label-md flex items-center gap-2.5 py-3 text-ink-secondary transition-colors hover:text-accent-dark"
                    >
                      <span className="text-accent" aria-hidden="true">{channel.icon}</span>
                      <span className="truncate">{channel.label}</span>
                      <ArrowUpRight size={16} className="ml-auto shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>

              <p className="label-sm flex items-center gap-2 text-muted">
                <MapPin size={16} className="text-accent" aria-hidden="true" />
                {t("contact.location")} · {t("contact.remote")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="card p-6 sm:p-8">
              <h3 className="headline-sm">{t("contact.formTitle")}</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="meta-index text-[11px] text-muted">{t("contact.name")}</label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t("contact.placeName")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="field"
                      {...register("name", { required: t("contact.requiredName") })}
                    />
                    {errors.name && (
                      <span id="name-error" role="alert" className="error-text text-xs">{errors.name.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="meta-index text-[11px] text-muted">{t("contact.email")}</label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t("contact.placeEmail")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="field"
                      {...register("email", {
                        required: t("contact.requiredEmail"),
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("contact.invalidEmail") },
                      })}
                    />
                    {errors.email && (
                      <span id="email-error" role="alert" className="error-text text-xs">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="meta-index text-[11px] text-muted">{t("contact.subject")}</label>
                  <select id="subject" className="field" {...register("subject", { required: t("contact.requiredSubject") })}>
                    <option value="freelance">{t("contact.subjectFreelance")}</option>
                    <option value="team">{t("contact.subjectTeam")}</option>
                    <option value="consulting">{t("contact.subjectConsulting")}</option>
                    <option value="other">{t("contact.subjectOther")}</option>
                  </select>
                  {errors.subject && (
                    <span role="alert" className="error-text text-xs">{errors.subject.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="meta-index text-[11px] text-muted">{t("contact.message")}</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder={t("contact.placeMessage")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="field resize-none"
                    {...register("message", { required: t("contact.requiredMessage") })}
                  />
                  {errors.message && (
                    <span id="message-error" role="alert" className="error-text text-xs">{errors.message.message}</span>
                  )}
                </div>

                <div aria-hidden="true" className="hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-2 w-full">
                  {isSubmitting ? t("contact.sending") : t("contact.send")}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
                <p className="text-center text-[12px] leading-relaxed text-muted">{t("contact.privacy")}</p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

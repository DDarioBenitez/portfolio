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
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    { icon: <Mail size={17} aria-hidden="true" />, label: EMAIL, href: `mailto:${EMAIL}` },
    {
      icon: <Linkedin size={17} aria-hidden="true" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/dar%C3%ADo-dami%C3%A1n-ben%C3%ADtez/",
    },
    { icon: <Github size={17} aria-hidden="true" />, label: "GitHub", href: "https://github.com/DDarioBenitez" },
    { icon: <MessageCircle size={17} aria-hidden="true" />, label: "+54 370 4009882", href: "https://wa.me/5493704009882" },
  ];

  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <SectionHeading index="03" label={t("contact.label")} title={t("contact.title")} description={t("contact.lead")} />

        <div className="grid gap-14 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">{t("contact.direct")}</p>
            <a href={`mailto:${EMAIL}`} className="link-accent inline-flex items-center gap-2 break-all font-display text-xl font-semibold tracking-tight md:text-2xl">
              {EMAIL}
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>

            <ul className="mt-10 space-y-0 border-t border-line">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 border-b border-line py-4 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <span className="text-ink">{channel.icon}</span>
                    <span className="truncate">{channel.label}</span>
                    <ArrowUpRight size={14} className="ml-auto shrink-0 opacity-50" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} aria-hidden="true" />
              {t("contact.location")} · {t("contact.remote")}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card p-6 md:p-8">
              <h3 className="font-display text-xl font-semibold tracking-tight">{t("contact.formTitle")}</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="eyebrow">
                      {t("contact.name")}
                    </label>
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
                      <span id="name-error" role="alert" className="error-text text-xs">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="eyebrow">
                      {t("contact.email")}
                    </label>
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
                      <span id="email-error" role="alert" className="error-text text-xs">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="eyebrow">
                    {t("contact.subject")}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder={t("contact.placeSubject")}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    className="field"
                    {...register("subject", { required: t("contact.requiredSubject") })}
                  />
                  {errors.subject && (
                    <span id="subject-error" role="alert" className="error-text text-xs">
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="eyebrow">
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder={t("contact.placeMessage")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="field resize-none"
                    {...register("message", { required: t("contact.requiredMessage") })}
                  />
                  {errors.message && (
                    <span id="message-error" role="alert" className="error-text text-xs">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <div aria-hidden="true" className="hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
                  {isSubmitting ? t("contact.sending") : t("contact.send")}
                </button>
                <p className="text-center text-xs leading-relaxed text-muted">{t("contact.privacy")}</p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

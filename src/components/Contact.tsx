import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { toast } from "sonner";

interface ContactProps {
    isDarkMode: boolean;
}
interface ContactFormInputs {
    name: string;
    email: string;
    subject: string;
    message: string;
    website?: string; // honeypot opcional
}

export default function Contact({ isDarkMode }: ContactProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormInputs>();

    const onSubmit = async (data: ContactFormInputs) => {
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (result.ok) {
                toast.success("✅ Mensaje enviado con éxito");
                reset();
            } else {
                toast.error("❌ No se pudo enviar el mensaje");
            }
        } catch (err) {
            console.error(err);
            toast.error("⚠️ Error de conexión");
        }
    };
    return (
        <section id="contact" className="px-[6%]  pb-10 md:py-20 relative scroll-mt-[15px]">
            <div className="max-w-4xl mx-auto relative z-10">
                <h2
                    className={`text-4xl md:text-5xl font-bold mb-8 pb-2 text-center ${
                        isDarkMode
                            ? "bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                            : "bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent"
                    }`}
                >
                    Trabajemos juntos
                </h2>

                <p className="text-2xl text-text-secondary mb-12 max-w-2xl mx-auto text-center">
                    Siempre estoy abierto a nuevas oportunidades y colaboraciones. Si tienes un proyecto en mente o simplemente quieres saludarme, ¡no
                    dudes en contactarme!
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-bg-tech-card border-border-proyect-card p-6 rounded-2xl border backdrop-blur-sm">
                        <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Enviame un mensaje
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-bg-form">
                            {/* Nombre */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[16px] text-text-label font-medium" htmlFor="name">
                                    Nombre
                                </label>
                                <input
                                    {...register("name", { required: "El nombre es requerido" })}
                                    className="bg-bg-input rounded-md text-[16px] text-text-input py-[8px] px-[12px] border border-border-input focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                                    type="text"
                                    id="name"
                                    placeholder="Tu nombre"
                                />
                                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[16px] text-text-label font-medium" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    {...register("email", {
                                        required: "El email es requerido",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Email inválido",
                                        },
                                    })}
                                    className="bg-bg-input rounded-md text-[16px] text-text-input py-[8px] px-[12px] border border-border-input focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                                    type="email"
                                    id="email"
                                    placeholder="Tu email"
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                            </div>

                            {/* Asunto */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[16px] text-text-label font-medium" htmlFor="subject">
                                    Asunto
                                </label>
                                <input
                                    {...register("subject", {
                                        required: "El asunto es requerido",
                                    })}
                                    className="bg-bg-input rounded-md text-[16px] text-text-input py-[8px] px-[12px] border border-border-input focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                                    type="text"
                                    id="subject"
                                    placeholder="Asunto del mensaje"
                                />
                                {errors.subject && <span className="text-red-500 text-sm">{errors.subject.message}</span>}
                            </div>

                            {/* Mensaje */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[16px] text-text-label font-medium" htmlFor="message">
                                    Mensaje
                                </label>
                                <textarea
                                    {...register("message", {
                                        required: "El mensaje es requerido",
                                    })}
                                    className="bg-bg-input rounded-md text-[16px] text-text-input py-[8px] px-[12px] border border-border-input focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm w-full min-h-[120px] resize-none placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                                    id="message"
                                    placeholder="Tu mensaje"
                                ></textarea>
                                {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
                            </div>

                            {/* Honeypot invisible */}
                            <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

                            {/* Botón */}
                            <div className="flex flex-col gap-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 rounded-xl transition-all duration-300 hover:scale-105 border-0 cursor-pointer text-white text-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-60"
                                >
                                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col justify-center space-y-4 ">
                        <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                            Informacion de contacto
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 group">
                                <div className="p-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                    <Mail className="text-white" size={20} />
                                </div>
                                <a
                                    href="mailto:benitez_trabaja@hotmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-primary hover:text-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:bg-clip-text transition-all duration-300 "
                                >
                                    benitez_trabaja@hotmail.com
                                </a>
                            </div>

                            <div className="flex items-center gap-3 group">
                                <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                    <SiLinkedin className="text-white" size={20} />
                                </div>
                                <a
                                    href="https://linkedin.com/in/dariobenitez"
                                    className="text-text-primary hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:bg-clip-text transition-all duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    linkedin.com/in/dariobenitez
                                </a>
                            </div>

                            <div className="flex items-center gap-3 group">
                                <div className="p-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                    <SiGithub className="text-white" size={20} />
                                </div>
                                <a
                                    href="https://github.com/dariobenitez"
                                    className="text-text-primary hover:text-transparent hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 hover:bg-clip-text transition-all duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    github.com/dariobenitez
                                </a>
                            </div>

                            {/* 📞 Teléfono */}
                            <div className="flex items-center gap-3 group">
                                <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                    <Phone className="text-white" size={20} />
                                </div>
                                <a
                                    href="tel:+543704009882"
                                    className="text-text-primary hover:text-transparent hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:bg-clip-text transition-all duration-300"
                                >
                                    +54 370 4009882
                                </a>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Ubicacion
                        </h3>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                <MapPin className="text-white" size={19} />
                            </div>

                            <a
                                href="https://www.google.com/maps/place/Argentina"
                                className="text-text-primary hover:text-transparent hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:bg-clip-text transition-transform duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Argentina
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

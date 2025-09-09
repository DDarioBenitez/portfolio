import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

type ContactBody = {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    website?: string; // honeypot
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const origin = req.headers.origin || "";

    // Preflight CORS
    if (req.method === "OPTIONS") {
        if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ ok: false, error: "Method Not Allowed" });
    }

    const { name, email, subject, message, website } = (req.body || {}) as ContactBody;

    // Honeypot: responder OK y cortar (silencioso)
    if (website && website.trim() !== "") {
        if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }
        return res.status(200).json({ ok: true });
    }

    // Validaciones
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ ok: false, error: "Faltan campos obligatorios" });
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
        return res.status(400).json({ ok: false, error: "Email inválido" });
    }
    if (name.length > 120 || subject.length > 200 || email.length > 200 || message.length > 5000) {
        return res.status(413).json({ ok: false, error: "Contenido demasiado largo" });
    }

    try {
        const to = process.env.CONTACT_EMAIL_TO!;
        const from = process.env.RESEND_FROM!; // ej: "Portfolio <onboarding@resend.dev>" o tu dominio verificado

        const html = `
      <h2>Nuevo contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Mensaje:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
    `;

        const { data, error } = await resend.emails.send({
            from,
            to,
            subject: `📨 ${subject} — ${name}`,
            html,
            text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\n\n${message}`,
            replyTo: email,
        });

        if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }

        if (error) {
            console.error("Resend error:", error);
            // Resend suele devolver .name y .message; si es validation error => 400
            const status = error?.name === "validation_error" ? 400 : 502;
            return res.status(status).json({ ok: false, error: error.message || "Email provider error" });
        }

        return res.status(200).json({ ok: true, id: data?.id || null });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ ok: false, error: "No se pudo enviar el correo" });
    }
}

function escapeHtml(str: string) {
    return str.replace(
        /[&<>"']/g,
        (s) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;",
            }[s]!)
    );
}

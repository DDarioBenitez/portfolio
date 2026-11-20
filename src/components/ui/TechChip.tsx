import type { ReactNode } from "react";
import { FaAngular, FaDocker, FaGitAlt, FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiCloudflare,
  SiFirebase,
  SiGithub,
  SiJavascript,
  SiMysql,
  SiNestjs,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiResend,
  SiSequelize,
  SiSocketdotio,
  SiSpringboot,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbBrandNextjs, TbHierarchy } from "react-icons/tb";

const icons: Record<string, ReactNode> = {
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  Java: <SiOpenjdk />,
  React: <FaReact />,
  Angular: <FaAngular />,
  "Next.js": <TbBrandNextjs />,
  NestJS: <SiNestjs />,
  "Spring Boot": <SiSpringboot />,
  "Node.js": <FaNodeJs />,
  PostgreSQL: <SiPostgresql />,
  MySQL: <SiMysql />,
  MongoDB: <span className="font-mono text-[10px]">MDB</span>,
  Firebase: <SiFirebase />,
  "Tailwind CSS": <SiTailwindcss />,
  Git: <FaGitAlt />,
  GitHub: <SiGithub />,
  Postman: <SiPostman />,
  Prisma: <SiPrisma />,
  Supabase: <SiSupabase />,
  Cloudflare: <SiCloudflare />,
  "Cloudflare R2": <SiCloudflare />,
  Ably: <img src="/icons/ably.svg" alt="" className="h-3.5 w-3.5" />,
  Resend: <SiResend />,
  Vercel: <SiVercel />,
  Sequelize: <SiSequelize />,
  "Socket.IO": <SiSocketdotio />,
  Stripe: <SiStripe />,
  Zadarma: <img src="/icons/zadarma.svg" alt="" className="h-3.5 w-3.5" />,
  "React Flow": <TbHierarchy />,
  Vite: <img src="/icons/vite.svg" alt="" className="h-3.5 w-3.5" />,
  "Retell AI": <span className="font-mono text-[10px]">RAI</span>,
  n8n: <span className="font-mono text-[10px]">N8N</span>,
  Docker: <FaDocker />,
};

export default function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent-line hover:text-accent">
      <span className="text-sm leading-none" aria-hidden="true">
        {icons[name] ?? <span className="font-mono text-[10px]">•</span>}
      </span>
      {name}
    </span>
  );
}

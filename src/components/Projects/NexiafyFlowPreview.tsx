import { BrainCircuit, PhoneIncoming, Webhook } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NexiafyFlowPreview() {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface text-left shadow-sm">
      <div className="flex items-center justify-between border-b border-line bg-surface-paper px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-surface-hover" />
            <span className="h-2.5 w-2.5 rounded-full bg-surface-hover" />
            <span className="h-2.5 w-2.5 rounded-full bg-surface-hover" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-muted">nexiafy.ai/flow-editor</span>
        </div>
        <span className="rounded bg-accent-light px-2 py-0.5 font-mono text-[11px] font-semibold text-accent-dark">
          {t("projects.voiceAgent")}
        </span>
      </div>

      <div className="relative flex min-h-[230px] flex-col justify-between overflow-hidden bg-surface-canvas p-5">
        <div
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: "radial-gradient(var(--border-strong) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-44 rounded border border-line bg-surface p-2.5 shadow-sm">
          <div className="flex items-center justify-between pb-1">
            <span className="font-mono text-[10px] font-semibold uppercase text-accent-dark">SIP Trigger</span>
            <PhoneIncoming size={14} className="text-accent" aria-hidden="true" />
          </div>
          <span className="block font-mono text-xs font-medium text-ink">{t("projects.flowCall")}</span>
        </div>

        <div className="relative z-10 my-1 ml-20 h-6 w-0.5 bg-accent" aria-hidden="true">
          <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-accent-dark" />
        </div>

        <div className="relative z-10 ml-10 w-52 rounded border border-line bg-surface p-2.5 shadow-sm">
          <div className="flex items-center justify-between pb-1">
            <span className="font-mono text-[10px] font-semibold uppercase text-accent-dark">Retell AI Engine</span>
            <BrainCircuit size={14} className="text-accent" aria-hidden="true" />
          </div>
          <span className="block font-mono text-xs font-medium text-ink">{t("projects.flowIntent")}</span>
          <span className="mt-1 block font-mono text-[10px] text-muted">Latency: 280ms · GPT-4o Mini</span>
        </div>

        <div className="relative z-10 my-1 ml-32 h-6 w-0.5 bg-accent" aria-hidden="true" />

        <div className="relative z-10 ml-24 w-48 rounded border border-line bg-surface p-2.5 shadow-sm">
          <div className="flex items-center justify-between pb-1">
            <span className="font-mono text-[10px] font-semibold uppercase text-accent-dark">n8n Webhook</span>
            <Webhook size={14} className="text-accent" aria-hidden="true" />
          </div>
          <span className="block font-mono text-xs font-medium text-ink">{t("projects.flowCrm")}</span>
        </div>
      </div>
    </div>
  );
}

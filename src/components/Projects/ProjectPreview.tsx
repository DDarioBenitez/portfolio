import type { JSX } from "react";

type Variant = "dashboard" | "chat" | "canvas" | "landing";

const Line = ({ width }: { width: string }) => <span className={`block h-1.5 rounded-full bg-line-strong ${width}`} />;

function Dashboard() {
  return (
    <div className="flex h-full gap-3 p-4">
      <div className="hidden w-1/5 shrink-0 space-y-3 border-r border-line pr-3 sm:block">
        <span className="block h-6 w-6 rounded bg-accent/20" />
        <Line width="w-full" />
        <Line width="w-3/4" />
        <Line width="w-5/6" />
        <Line width="w-2/3" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <Line width="w-1/3" />
          <span className="h-5 w-12 rounded border border-line" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((item) => (
            <div key={item} className="space-y-2 rounded border border-line bg-surface p-2">
              <span className="block h-1.5 w-1/2 rounded-full bg-line-strong" />
              <span className="block h-4 w-2/3 rounded bg-accent/15" />
            </div>
          ))}
        </div>
        <div className="flex h-20 items-end gap-2 rounded border border-line p-3">
          {[40, 65, 35, 80, 55, 90, 70].map((height, index) => (
            <span key={index} className="flex-1 rounded-t bg-accent/20" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Chat() {
  return (
    <div className="flex h-full gap-3 p-4">
      <div className="hidden w-1/4 shrink-0 space-y-3 border-r border-line pr-3 sm:block">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="h-5 w-5 shrink-0 rounded-full bg-line-strong" />
            <Line width="w-full" />
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2">
        <div className="max-w-[70%] space-y-1.5 self-start rounded-lg rounded-bl-sm border border-line bg-surface px-3 py-2">
          <Line width="w-24" />
          <Line width="w-32" />
        </div>
        <div className="max-w-[70%] space-y-1.5 self-end rounded-lg rounded-br-sm border border-accent-line bg-accent-soft px-3 py-2">
          <span className="block h-1.5 w-28 rounded-full bg-accent/60" />
          <span className="block h-1.5 w-20 rounded-full bg-accent/40" />
        </div>
        <div className="max-w-[70%] self-start rounded-lg rounded-bl-sm border border-line bg-surface px-3 py-2">
          <Line width="w-20" />
        </div>
        <div className="mt-1 h-6 rounded-md border border-line" />
      </div>
    </div>
  );
}

function Canvas() {
  const nodes = [
    "left-[6%] top-[12%]",
    "left-[38%] top-[8%]",
    "left-[68%] top-[26%]",
    "left-[20%] top-[58%]",
    "left-[54%] top-[64%]",
  ];
  return (
    <div className="relative h-full" style={{ backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)", backgroundSize: "14px 14px" }}>
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M 18 22 L 42 18 M 42 18 L 72 34 M 18 22 L 27 66 M 27 66 L 58 72 M 72 34 L 58 72" stroke="var(--border-strong)" strokeWidth="1" fill="none" />
      </svg>
      {nodes.map((position, index) => (
        <div key={position} className={`absolute w-16 rounded border border-line bg-surface p-2 ${position}`}>
          <span className={`mb-1.5 block h-1 w-6 rounded-full ${index === 2 ? "bg-accent/70" : "bg-line-strong"}`} />
          <Line width="w-full" />
        </div>
      ))}
    </div>
  );
}

function Landing() {
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <span className="h-2 w-12 rounded bg-line-strong" />
        <span className="h-4 w-16 rounded border border-line" />
      </div>
      <div className="my-auto space-y-3 text-center">
        <span className="mx-auto block h-3 w-2/3 rounded bg-line-strong" />
        <span className="mx-auto block h-3 w-1/2 rounded bg-line-strong" />
        <span className="mx-auto h-6 w-24 rounded bg-accent/25" />
      </div>
    </div>
  );
}

const variants: Record<Variant, () => JSX.Element> = {
  dashboard: Dashboard,
  chat: Chat,
  canvas: Canvas,
  landing: Landing,
};

export default function ProjectPreview({ variant, title }: { variant: string; title: string }) {
  const Preview = variants[variant as Variant] ?? Dashboard;
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-bg-deep" aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
        <span className="ml-2 font-mono text-[9px] uppercase tracking-widest text-muted">{title}</span>
      </div>
      <div className="aspect-[16/10] w-full">
        <Preview />
      </div>
    </div>
  );
}

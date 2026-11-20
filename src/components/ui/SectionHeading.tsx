import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ index, label, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <p className="eyebrow mb-4">
        <span className="text-accent">{index}</span>
        <span className="px-2 opacity-40">/</span>
        {label}
      </p>
      <h2 className="section-title max-w-3xl">{title}</h2>
      {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </Reveal>
  );
}

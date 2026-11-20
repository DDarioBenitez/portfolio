import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ index, label, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-8 md:mb-10">
      <p className="meta-index mb-1 text-accent-dark">
        {index}<span className="px-2 opacity-40">/</span>{label.toUpperCase()}
      </p>
      <h2 className="headline-lg max-w-3xl">{title}</h2>
      {description && <p className="body-md mt-1 max-w-2xl">{description}</p>}
    </Reveal>
  );
}

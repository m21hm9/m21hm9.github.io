type SectionHeadingProps = {
  number: string;
  title: string;
  label: string;
  description?: string;
  children?: React.ReactNode;
};

export function SectionHeading({
  number,
  title,
  label,
  description,
  children,
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14"
    >
      <div>
        <p className="eyebrow mb-4">
          {number} <span className="mx-2 opacity-40">/</span> {label}
        </p>
        <h2 className="section-heading">{title}.</h2>
        {description && (
          <p className="mt-5 max-w-xl text-sm leading-[1.8] text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

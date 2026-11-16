import type { ComponentType, SVGProps } from "react";

export function FeatureCard({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group h-full rounded-xl border border-black/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-black hover:shadow-lg">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-black text-brand-yellow transition-colors group-hover:bg-brand-yellow group-hover:text-brand-black">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-brand-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-800">{children}</p>
    </div>
  );
}

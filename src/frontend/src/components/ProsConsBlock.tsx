import { CheckCircle2, XCircle } from "lucide-react";

interface ProsConsBlockProps {
  pros: string[];
  cons: string[];
}

export function ProsConsBlock({ pros, cons }: ProsConsBlockProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      data-ocid="review.pros_cons.panel"
    >
      {/* Pros */}
      <div className="rounded-xl border border-navy-border bg-navy-card p-5">
        <h4 className="uppercase text-sm font-bold tracking-widest text-green-400 mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-green-400" />
          Pros
        </h4>
        <ul className="space-y-3">
          {pros.map((pro) => (
            <li
              key={pro}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <CheckCircle2
                size={15}
                className="text-green-400 mt-0.5 shrink-0"
              />
              <span>{pro}</span>
            </li>
          ))}
          {pros.length === 0 && (
            <li className="text-muted-foreground text-sm">No pros listed.</li>
          )}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-xl border border-navy-border bg-navy-card p-5">
        <h4 className="uppercase text-sm font-bold tracking-widest text-red-400 mb-4 flex items-center gap-2">
          <XCircle size={16} className="text-red-400" />
          Cons
        </h4>
        <ul className="space-y-3">
          {cons.map((con) => (
            <li
              key={con}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <XCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
              <span>{con}</span>
            </li>
          ))}
          {cons.length === 0 && (
            <li className="text-muted-foreground text-sm">No cons listed.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

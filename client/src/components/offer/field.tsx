import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const CONTROL =
  "w-full rounded-lg border border-white/10 bg-white/4 px-4 py-3 text-[15px] text-white placeholder:text-white/25 transition-colors focus:border-magenta-lift focus:bg-white/6 focus:outline-none";

export function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {/* The id lets a radio group name itself from this label via
          aria-labelledby, since a <label for> can't point at a group. */}
      <label
        id={`${htmlFor}-label`}
        htmlFor={htmlFor}
        className="text-[13px] font-medium text-white/80"
      >
        {label}
        {required && <span className="ml-1 text-magenta-lift">*</span>}
      </label>
      {hint && <p className="text-[12.5px] leading-relaxed text-white/40">{hint}</p>}
      {children}
      {error && (
        <p role="alert" className="text-[12.5px] text-[#ff9bd0]">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  invalid,
  className,
  ...props
}: React.ComponentProps<"input"> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid}
      className={cn(CONTROL, invalid && "border-[#ff9bd0]/50", className)}
    />
  );
}

export function TextArea({
  invalid,
  className,
  ...props
}: React.ComponentProps<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid}
      className={cn(CONTROL, "min-h-[104px] resize-y", invalid && "border-[#ff9bd0]/50", className)}
    />
  );
}

/** Radio group rendered as pills — faster than a select on mobile. */
export function Choices({
  name,
  options,
  value,
  onChange,
  invalid,
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}) {
  return (
    <div
      id={name}
      role="radiogroup"
      aria-labelledby={`${name}-label`}
      aria-invalid={invalid}
      className="flex flex-wrap gap-2.5"
    >
      {options.map((option) => {
        const selected = value === option;
        return (
          <label
            key={option}
            className={cn(
              // The radio itself is sr-only, so the pill has to carry the
              // focus ring or keyboard users see nothing move.
              "cursor-pointer rounded-full border px-4 py-2.5 text-[13.5px] transition-colors",
              "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-white",
              selected
                ? "border-magenta-lift bg-magenta/30 text-white"
                : "border-white/10 bg-white/3 text-white/60 hover:border-white/25 hover:text-white/85",
              invalid && !value && "border-[#ff9bd0]/40",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={selected}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        );
      })}
    </div>
  );
}

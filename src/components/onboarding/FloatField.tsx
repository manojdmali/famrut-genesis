import { useId, useState, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { as?: "input" };
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

export function FloatField(props: InputProps | TextareaProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const { label, error, icon, className = "", ...rest } = props as InputProps & { as?: "input" | "textarea" };
  const as = (props as TextareaProps).as === "textarea" ? "textarea" : "input";
  const value = (rest.value ?? "") as string;
  const floating = focused || value.length > 0;

  const fieldCls = `peer w-full bg-transparent text-foreground outline-none text-[15px] ${icon ? "pl-10" : "pl-4"} pr-4 pt-6 pb-2 ${as === "textarea" ? "min-h-[110px] resize-none" : ""} ${className}`;

  return (
    <div className="relative">
      <div className={`relative rounded-xl border bg-card transition-all ${
        focused ? "border-primary shadow-elegant" : error ? "border-destructive/60" : "border-border hover:border-foreground/20"
      }`}>
        {icon && <div className="absolute left-3 top-5 text-muted-foreground pointer-events-none">{icon}</div>}
        {as === "textarea" ? (
          <textarea
            id={id}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            onFocus={(e) => { setFocused(true); (rest as TextareaProps).onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); (rest as TextareaProps).onBlur?.(e); }}
            className={fieldCls}
          />
        ) : (
          <input
            id={id}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            onFocus={(e) => { setFocused(true); (rest as InputProps).onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); (rest as InputProps).onBlur?.(e); }}
            className={fieldCls}
          />
        )}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute transition-all ${icon ? "left-10" : "left-4"} ${
            floating
              ? "top-1.5 text-[11px] uppercase tracking-wider text-primary font-medium"
              : "top-1/2 -translate-y-1/2 text-[15px] text-muted-foreground"
          }`}
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive pl-1">{error}</p>}
    </div>
  );
}

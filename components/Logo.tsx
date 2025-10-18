import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-10 w-auto" }: LogoProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${className} flex items-center gap-2`}>
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-2xl font-bold text-primary-foreground">T</span>
      </div>
      <span className="text-xl font-bold">Tamarsan</span>
    </div>
  );
}

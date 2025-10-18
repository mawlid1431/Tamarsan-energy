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

  // Red logo for light mode (from second image)
  const redLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 300'%3E%3Ctext x='30' y='220' font-family='Arial Black, sans-serif' font-size='180' font-weight='900' fill='%23C9284C'%3ETAMARSAN%3C/text%3E%3Ccircle cx='740' cy='120' r='30' fill='%23C9284C'/%3E%3Cline x1='740' y1='90' x2='740' y2='70' stroke='%23C9284C' stroke-width='6'/%3E%3Cline x1='760' y1='100' x2='775' y2='85' stroke='%23C9284C' stroke-width='6'/%3E%3Cline x1='770' y1='120' x2='790' y2='120' stroke='%23C9284C' stroke-width='6'/%3E%3Cline x1='760' y1='140' x2='775' y2='155' stroke='%23C9284C' stroke-width='6'/%3E%3Cline x1='720' y1='140' x2='705' y2='155' stroke='%23C9284C' stroke-width='6'/%3E%3Cline x1='710' y1='120' x2='690' y2='120' stroke='%23C9284C' stroke-width='6'/%3E%3Cline x1='720' y1='100' x2='705' y2='85' stroke='%23C9284C' stroke-width='6'/%3E%3Cpath d='M 720 180 Q 740 220 760 180' stroke='%23C9284C' stroke-width='8' fill='none'/%3E%3Cline x1='725' y1='190' x2='735' y2='200' stroke='%23C9284C' stroke-width='6'/%3E%3Cline x1='730' y1='195' x2='740' y2='205' stroke='%23C9284C' stroke-width='6'/%3E%3Cline x1='735' y1='200' x2='745' y2='210' stroke='%23C9284C' stroke-width='6'/%3E%3C/svg%3E";

  // White logo for dark mode (from first image)
  const whiteLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 300'%3E%3Ctext x='30' y='220' font-family='Arial Black, sans-serif' font-size='180' font-weight='900' fill='%23FFFFFF'%3ETAMARSAN%3C/text%3E%3Ccircle cx='740' cy='120' r='30' fill='%23FFFFFF'/%3E%3Cline x1='740' y1='90' x2='740' y2='70' stroke='%23FFFFFF' stroke-width='6'/%3E%3Cline x1='760' y1='100' x2='775' y2='85' stroke='%23FFFFFF' stroke-width='6'/%3E%3Cline x1='770' y1='120' x2='790' y2='120' stroke='%23FFFFFF' stroke-width='6'/%3E%3Cline x1='760' y1='140' x2='775' y2='155' stroke='%23FFFFFF' stroke-width='6'/%3E%3Cline x1='720' y1='140' x2='705' y2='155' stroke='%23FFFFFF' stroke-width='6'/%3E%3Cline x1='710' y1='120' x2='690' y2='120' stroke='%23FFFFFF' stroke-width='6'/%3E%3Cline x1='720' y1='100' x2='705' y2='85' stroke='%23FFFFFF' stroke-width='6'/%3E%3Cpath d='M 720 180 Q 740 220 760 180' stroke='%23FFFFFF' stroke-width='8' fill='none'/%3E%3Cline x1='725' y1='190' x2='735' y2='200' stroke='%23FFFFFF' stroke-width='6'/%3E%3Cline x1='730' y1='195' x2='740' y2='205' stroke='%23FFFFFF' stroke-width='6'/%3E%3Cline x1='735' y1='200' x2='745' y2='210' stroke='%23FFFFFF' stroke-width='6'/%3E%3C/svg%3E";

  return (
    <img
      src={isDark ? whiteLogo : redLogo}
      alt="Tamarsan"
      className={className}
    />
  );
}

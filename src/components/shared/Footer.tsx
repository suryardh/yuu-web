import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
];

const socialLinks = [
  { href: "https://github.com/suryardh", label: "GitHub" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto">
      <div className="w-full mx-auto px-6 py-8 border-t border-neutral-900">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-500 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors text-sm"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>

          <p className="text-sm text-neutral-600">
            {currentYear} Yuuishikii
          </p>
        </div>
      </div>
    </footer>
  );
}

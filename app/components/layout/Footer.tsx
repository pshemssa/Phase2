import Link from "next/link";

export default function Footer() {
  const links = [
    { label: "Help", href: "/help" },
    { label: "Status", href: "/status" },
    { label: "Writers", href: "/writers" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "About", href: "/about" },
  ];

  return (
    <footer className="border-t border-gray-200 mt-16 py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 justify-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-yellow-700 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="text-center mt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} Lumen Yard. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
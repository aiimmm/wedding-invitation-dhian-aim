import Link from "next/link";

export default function FooterSections() {
  return (
    <section
      id="footer"
      className="relative pt-6 pb-26 flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center text-center text-sm sm:text-base text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} - Digital Invitation by</p>
        <Link
          href="https://www.aiimmm.net"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          www.aiimmm.net
        </Link>
      </div>
    </section>
  );
}

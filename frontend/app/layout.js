import "./globals.css";

export const metadata = {
  title: "Cogent Event AI Personalizer",
  description:
    "AI-powered event session personalizer for Cogent Solutions Full-Stack Intern Assessment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
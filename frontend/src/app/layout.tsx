import "./globals.css";
import Providers from "./provider";

export const metadata = {
  title: "Food Ordering App",
  description: "Role Based Food Ordering System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
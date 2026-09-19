import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}

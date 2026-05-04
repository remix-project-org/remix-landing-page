import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
}

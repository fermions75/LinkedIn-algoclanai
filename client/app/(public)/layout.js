import Footer from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";



export default async function MainLayout({ children }) {


  return (
    <>
      <Header/>
      {children}
      <Footer />
    </>
  );
}
import Nav from "@/components/nav";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <div className="p-8 pb-10 lg:mt-0" >
        {children}
      </div >
      <Toaster />
    </>
  );
}
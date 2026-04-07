import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-90" />
      <div className="pointer-events-none absolute inset-x-0 top-[-8rem] h-72 bg-[radial-gradient(circle_at_center,rgba(94,234,212,0.14),transparent_60%)] blur-3xl" />
      <Outlet />
      <Footer />
    </div>
  );
}

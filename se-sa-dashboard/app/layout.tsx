import './globals.css';
export const metadata = { title: 'SE/SA Personal Dashboard', description: 'Commercial + Engineering split view' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="min-h-screen bg-slate-950 text-slate-100">{children}</body></html>);
}

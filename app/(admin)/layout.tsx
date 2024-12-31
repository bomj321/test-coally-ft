import { ProtectedRoute } from "@components/ProtectedRoute/ProtectedRoute";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

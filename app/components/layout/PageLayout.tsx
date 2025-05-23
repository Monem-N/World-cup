import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "../navigation/Breadcrumbs";
import * as React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
}

export const PageLayout = React.memo(function PageLayout({ children, showBreadcrumbs = true }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto py-6">
          {showBreadcrumbs && <Breadcrumbs />}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
});
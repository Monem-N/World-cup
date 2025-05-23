import * as React from "react";
import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

export const NavLink = React.memo(function NavLink({
  to,
  children,
  className,
  activeClassName = "text-primary font-medium",
  exact = false,
  ...props
}: NavLinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to) && (to !== '/' || location.pathname === '/');

  return (
    <Link
      to={to}
      className={cn(
        className,
        isActive && activeClassName
      )}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
});
import { Link, useMatches } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import * as React from "react";

interface BreadcrumbMatch {
  pathname: string;
  handle?: {
    breadcrumb?: string | ((data: any) => string);
  };
  data?: any;
}

export const Breadcrumbs = React.memo(function Breadcrumbs() {
  const matches = useMatches() as BreadcrumbMatch[];
  const { t } = useTranslation();

  // Filter out routes that don't have breadcrumb data or are hidden
  const crumbs = React.useMemo(() => {
    return matches
      .filter((match) => match.handle?.breadcrumb)
      .map((match) => ({
        title: typeof match.handle?.breadcrumb === 'function'
          ? match.handle.breadcrumb(match.data)
          : t(match.handle?.breadcrumb as string),
        path: match.pathname
      }));
  }, [matches, t]);

  if (crumbs.length <= 1) {
    return null; // Don't render breadcrumbs on top-level pages
  }

  return (
    <nav aria-label="Breadcrumbs" className="mb-4 flex text-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            {t('nav.home', 'Home')}
          </Link>
        </li>
        {crumbs.map((crumb, idx) => (
          <li key={idx} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {idx === crumbs.length - 1 ? (
              <span className="ml-2 font-medium">{crumb.title}</span>
            ) : (
              <Link
                to={crumb.path}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                {crumb.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
});
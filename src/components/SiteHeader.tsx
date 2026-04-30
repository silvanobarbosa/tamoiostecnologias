import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logoTamoios from "@/assets/tamoios-logo.png";
import { LogOut, ShieldCheck } from "lucide-react";

export function SiteHeader() {
  const { user, isAdmin, signOut } = useAuth();
  const { t } = useTranslation();

  const navItems = [
    { to: "/produtos/bandejas-flv", label: t("nav.bandejas") },
    { to: "/produtos/calcos-tecnicos", label: t("nav.calcos") },
    { to: "/produtos/agro-florestal", label: t("nav.agro") },
    { to: "/quem-somos", label: t("nav.about") },
    { to: "/blog", label: t("nav.blog") },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/90 border-b border-border/60">
      <nav className="container flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0 group" aria-label="Tamoios Tecnologia — início">
          <img
            src={logoTamoios}
            alt="Tamoios Tecnologia"
            width={180}
            height={60}
            className="h-14 w-auto transition-transform group-hover:scale-[1.03]"
          />
        </Link>
        <div className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors hover:text-forest ${isActive ? "text-forest font-medium" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {isAdmin && (
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex text-leaf">
              <Link to="/admin"><ShieldCheck className="h-4 w-4" /> {t("nav.admin")}</Link>
            </Button>
          )}
          {user ? (
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" /> {t("nav.logout")}
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth">{t("nav.login")}</Link>
            </Button>
          )}
          <Button asChild variant="forest" size="sm">
            <Link to="/quem-somos#contato">{t("nav.contact")}</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

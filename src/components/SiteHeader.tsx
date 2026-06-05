import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logoTamoios from "@/assets/tamoios-logo.png";
import { LogOut, ShieldCheck, Menu, X } from "lucide-react";

export function SiteHeader() {
  const { user, isAdmin, signOut } = useAuth();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/produtos/bandejas-flv", label: t("nav.bandejas") },
    { to: "/produtos/calcos-tecnicos", label: t("nav.calcos") },
    { to: "/produtos/agro-florestal", label: t("nav.agro") },
    { to: "/quem-somos", label: t("nav.about") },
    { to: "/politicas-nacionais", label: "Políticas ESG" },
    { to: "/materiais", label: "Materiais" },
    { to: "/cases", label: "Cases" },
    { to: "/imprensa", label: "Imprensa" },
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
            className="h-12 w-auto lg:h-14 transition-transform group-hover:scale-[1.03]"
          />
        </Link>

        {/* Desktop nav */}
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

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            {isAdmin && (
              <Button asChild variant="ghost" size="sm" className="text-leaf">
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
              <Link to="/#contato">{t("nav.contact")}</Link>
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" aria-label="Abrir menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] flex flex-col">
              <SheetHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-left font-display text-xl text-forest-deep">Menu</SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Fechar menu">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-6">
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                          isActive
                            ? "bg-forest/10 text-forest"
                            : "text-foreground hover:bg-muted hover:text-forest"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t flex flex-col gap-3">
                  <div className="px-3">
                    <LanguageSwitcher />
                  </div>
                  {isAdmin && (
                    <Button asChild variant="ghost" className="justify-start text-leaf">
                      <Link to="/admin" onClick={() => setOpen(false)}>
                        <ShieldCheck className="h-4 w-4 mr-2" /> {t("nav.admin")}
                      </Link>
                    </Button>
                  )}
                  {user ? (
                    <Button variant="outline" onClick={() => { setOpen(false); signOut(); }} className="justify-start">
                      <LogOut className="h-4 w-4 mr-2" /> {t("nav.logout")}
                    </Button>
                  ) : (
                    <Button asChild variant="ghost" className="justify-start">
                      <Link to="/auth" onClick={() => setOpen(false)}>{t("nav.login")}</Link>
                    </Button>
                  )}
                  <Button asChild variant="forest" className="w-full mt-2">
                    <Link to="/#contato" onClick={() => setOpen(false)}>{t("nav.contact")}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

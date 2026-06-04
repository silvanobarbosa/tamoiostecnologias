import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";
import logoTamoios from "@/assets/tamoios-logo.png";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { useTranslation } from "react-i18next";

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="bg-forest-deep text-primary-foreground/80">
      <div className="bg-forest-deep/40 border-y border-primary-foreground/10 py-12">
        <div className="container grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-leaf font-semibold mb-2">{t("newsletter.title")}</div>
            <h3 className="font-display text-2xl md:text-3xl text-primary-foreground leading-snug">
              {t("newsletter.subtitle")}
            </h3>
          </div>
          <div className="flex justify-start lg:justify-end">
            <NewsletterSignup source="footer" />
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container grid md:grid-cols-3 gap-10">
          <div>
            <div className="inline-flex items-center justify-center bg-primary-foreground rounded-2xl p-4 shadow-deep mb-5">
              <img
                src={logoTamoios}
                alt="Tamoios Tecnologia"
                width={160}
                height={56}
                className="h-14 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Tamoios Tecnologia — Inovação em Biomassa.
              <br />Substituindo o isopor por polpa, do varejo à logística.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-leaf font-semibold mb-4">Contato</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-leaf" />
                <a href="mailto:fernanda@tamoiostecnologia.com.br" className="hover:text-primary-foreground transition-colors">
                  fernanda@tamoiostecnologia.com.br
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-leaf" />
                <a href="tel:+5511940066986" className="hover:text-primary-foreground transition-colors">
                  +55 11 94006 6986
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-4 w-4 text-leaf" />
                <a href="https://instagram.com/tamoios_tecnologia" target="_blank" rel="noopener" className="hover:text-primary-foreground transition-colors">
                  @tamoios_tecnologia
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-leaf" />
                <span>Ana Dias · Itariri/SP · Brasil</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-leaf font-semibold mb-4">Navegação</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/produtos/bandejas-flv" className="hover:text-primary-foreground transition-colors">Bandejas FLV</Link></li>
              <li><Link to="/produtos/calcos-tecnicos" className="hover:text-primary-foreground transition-colors">Calços Técnicos</Link></li>
              <li><Link to="/produtos/agro-florestal" className="hover:text-primary-foreground transition-colors">Agro & Florestal</Link></li>
              <li><Link to="/quem-somos" className="hover:text-primary-foreground transition-colors">Quem Somos</Link></li>
              <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><a href="/docs/Tamoios-Apresentacao-Institucional.pptx" download className="hover:text-primary-foreground transition-colors">Apresentação (.pptx)</a></li>
              <li><a href="/sitemap.xml" className="hover:text-primary-foreground transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-primary-foreground/10 text-xs flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Tamoios Tecnologia. Todos os direitos reservados.</span>
          <span>Embalagem com propósito · Itariri-SP</span>
        </div>
      </div>
    </footer>
  );
}

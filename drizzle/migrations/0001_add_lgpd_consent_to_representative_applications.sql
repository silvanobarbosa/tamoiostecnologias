ALTER TABLE public.representative_applications
  ADD COLUMN consent_at timestamptz,
  ADD COLUMN consent_version text;

COMMENT ON COLUMN public.representative_applications.consent_at IS 'Timestamp do consentimento LGPD dado pelo candidato no formulario';
COMMENT ON COLUMN public.representative_applications.consent_version IS 'Versao da Politica de Privacidade aceita no momento do envio';
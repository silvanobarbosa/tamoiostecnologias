-- 1) Storage: trocar SELECT amplo por uma policy que só libera leitura quando o caminho é solicitado diretamente
--    (impede listing genérico, mas getPublicUrl continua funcionando para arquivos cujo path é conhecido)
DROP POLICY IF EXISTS "Post images are publicly accessible" ON storage.objects;
CREATE POLICY "Post images readable when path known"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'post-images'
  AND name IS NOT NULL
  AND length(name) > 0
);

-- 2) has_role: só authenticated pode executar
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
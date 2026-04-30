-- =========================================================
-- 1) BLOG: categoria
-- =========================================================
DO $$ BEGIN
  CREATE TYPE public.post_category AS ENUM (
    'bandejas-flv',
    'calcos-tecnicos',
    'agro-florestal',
    'sustentabilidade',
    'cases',
    'noticias'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS category public.post_category NOT NULL DEFAULT 'noticias';

CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_status_published_at ON public.posts(status, published_at DESC);

-- =========================================================
-- 2) STORAGE bucket para imagens de posts
-- =========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- Visitantes podem visualizar
DROP POLICY IF EXISTS "Post images are publicly accessible" ON storage.objects;
CREATE POLICY "Post images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

-- Apenas admins podem fazer upload
DROP POLICY IF EXISTS "Admins can upload post images" ON storage.objects;
CREATE POLICY "Admins can upload post images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'post-images'
  AND public.has_role(auth.uid(), 'admin')
);

-- Apenas admins podem atualizar
DROP POLICY IF EXISTS "Admins can update post images" ON storage.objects;
CREATE POLICY "Admins can update post images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'post-images'
  AND public.has_role(auth.uid(), 'admin')
);

-- Apenas admins podem deletar
DROP POLICY IF EXISTS "Admins can delete post images" ON storage.objects;
CREATE POLICY "Admins can delete post images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'post-images'
  AND public.has_role(auth.uid(), 'admin')
);

-- =========================================================
-- 3) NEWSLETTER subscribers
-- =========================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe"
ON public.newsletter_subscribers FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Only admins read subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Only admins read subscribers"
ON public.newsletter_subscribers FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins delete subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Only admins delete subscribers"
ON public.newsletter_subscribers FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- 4) CONTACT messages
-- =========================================================
DO $$ BEGIN
  CREATE TYPE public.contact_status AS ENUM ('novo','em_andamento','respondido','arquivado');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  segment TEXT,
  message TEXT NOT NULL,
  status public.contact_status NOT NULL DEFAULT 'novo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit contact" ON public.contact_messages;
CREATE POLICY "Anyone can submit contact"
ON public.contact_messages FOR INSERT
WITH CHECK (
  char_length(name) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(message) BETWEEN 1 AND 4000
);

DROP POLICY IF EXISTS "Only admins read contact" ON public.contact_messages;
CREATE POLICY "Only admins read contact"
ON public.contact_messages FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins update contact" ON public.contact_messages;
CREATE POLICY "Only admins update contact"
ON public.contact_messages FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins delete contact" ON public.contact_messages;
CREATE POLICY "Only admins delete contact"
ON public.contact_messages FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS trg_contact_messages_updated_at ON public.contact_messages;
CREATE TRIGGER trg_contact_messages_updated_at
BEFORE UPDATE ON public.contact_messages
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_posts_updated_at ON public.posts;
CREATE TRIGGER trg_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
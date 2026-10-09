CREATE TABLE public.representative_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_type text NOT NULL CHECK (person_type IN ('fisica','juridica')),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 160),
  document text NOT NULL CHECK (char_length(document) BETWEEN 5 AND 30),
  company_name text CHECK (company_name IS NULL OR char_length(company_name) <= 200),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 40),
  address text CHECK (address IS NULL OR char_length(address) <= 300),
  city text NOT NULL CHECK (char_length(city) BETWEEN 2 AND 120),
  state text NOT NULL CHECK (char_length(state) BETWEEN 2 AND 40),
  cep text CHECK (cep IS NULL OR char_length(cep) <= 15),
  region text CHECK (region IS NULL OR char_length(region) <= 300),
  model text CHECK (model IS NULL OR char_length(model) <= 60),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 4000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.representative_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.representative_applications TO authenticated;
GRANT ALL ON public.representative_applications TO service_role;
ALTER TABLE public.representative_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can apply" ON public.representative_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read applications" ON public.representative_applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete applications" ON public.representative_applications FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
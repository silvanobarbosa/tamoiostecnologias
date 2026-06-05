
-- Create system editorial user used as author for site-managed blog posts
DO $$
DECLARE
  sys_id uuid := '11111111-1111-1111-1111-111111111111';
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = sys_id) THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, is_sso_user, is_anonymous
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      sys_id,
      'authenticated',
      'authenticated',
      'editorial@tamoiostecnologia.com.br',
      crypt(gen_random_uuid()::text, gen_salt('bf')),
      now(),
      jsonb_build_object('provider','email','providers', ARRAY['email']),
      jsonb_build_object('display_name','Equipe Tamoios'),
      now(), now(), false, false
    );
  END IF;

  INSERT INTO public.profiles (id, display_name)
  VALUES (sys_id, 'Equipe Tamoios')
  ON CONFLICT (id) DO NOTHING;
END $$;

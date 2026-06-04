-- Add explicit admin-only UPDATE policy on newsletter_subscribers
CREATE POLICY "Only admins update subscribers"
ON public.newsletter_subscribers
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Replace the always-true INSERT policy on newsletter_subscribers with input validation
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;

CREATE POLICY "Anyone can subscribe"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (
  char_length(email) >= 3
  AND char_length(email) <= 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (name IS NULL OR char_length(name) <= 120)
  AND (source IS NULL OR char_length(source) <= 80)
);
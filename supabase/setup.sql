-- Bagatur content editor schema. Run once in the Supabase SQL Editor.
-- Create the trainer user in Authentication, then set app_metadata.role to content_admin.

create extension if not exists pgcrypto;

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('news', 'gallery')),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title_bg text not null,
  title_ru text not null default '',
  title_en text not null default '',
  body_bg text not null default '',
  body_ru text not null default '',
  body_en text not null default '',
  image_url text not null,
  storage_path text,
  event_date date,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.content_items
  add column if not exists storage_path text;

alter table public.content_items
  add column if not exists category_slug text
  check (category_slug is null or category_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');

create index if not exists content_items_public_idx
  on public.content_items (kind, published, sort_order, event_date desc);

create index if not exists content_items_gallery_category_idx
  on public.content_items (category_slug, published, sort_order)
  where kind = 'gallery';

alter table public.content_items enable row level security;
revoke all on table public.content_items from anon, authenticated;
grant select on table public.content_items to anon, authenticated;
grant insert, update, delete on table public.content_items to authenticated;

drop policy if exists "public reads published content" on public.content_items;
create policy "public reads published content"
on public.content_items for select
to anon, authenticated
using (
  published = true
  or (select auth.jwt()->'app_metadata'->>'role') = 'content_admin'
);

drop policy if exists "admins insert content" on public.content_items;
create policy "admins insert content"
on public.content_items for insert
to authenticated
with check ((select auth.jwt()->'app_metadata'->>'role') = 'content_admin');

drop policy if exists "admins update content" on public.content_items;
create policy "admins update content"
on public.content_items for update
to authenticated
using ((select auth.jwt()->'app_metadata'->>'role') = 'content_admin')
with check ((select auth.jwt()->'app_metadata'->>'role') = 'content_admin');

drop policy if exists "admins delete content" on public.content_items;
create policy "admins delete content"
on public.content_items for delete
to authenticated
using ((select auth.jwt()->'app_metadata'->>'role') = 'content_admin');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'bagatur-media',
  'bagatur-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admins list bagatur media" on storage.objects;
create policy "admins list bagatur media"
on storage.objects for select
to authenticated
using (
  bucket_id = 'bagatur-media'
  and (select auth.jwt()->'app_metadata'->>'role') = 'content_admin'
);

drop policy if exists "admins upload bagatur media" on storage.objects;
create policy "admins upload bagatur media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'bagatur-media'
  and (select auth.jwt()->'app_metadata'->>'role') = 'content_admin'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

drop policy if exists "admins update bagatur media" on storage.objects;
create policy "admins update bagatur media"
on storage.objects for update
to authenticated
using (
  bucket_id = 'bagatur-media'
  and owner_id = (select auth.uid()::text)
  and (select auth.jwt()->'app_metadata'->>'role') = 'content_admin'
)
with check (
  bucket_id = 'bagatur-media'
  and owner_id = (select auth.uid()::text)
  and (select auth.jwt()->'app_metadata'->>'role') = 'content_admin'
);

drop policy if exists "admins delete bagatur media" on storage.objects;
create policy "admins delete bagatur media"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'bagatur-media'
  and owner_id = (select auth.uid()::text)
  and (select auth.jwt()->'app_metadata'->>'role') = 'content_admin'
);

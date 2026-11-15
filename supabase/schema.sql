-- Run once in the Supabase SQL Editor.
create table if not exists public.rug_requests (
  id uuid primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null,
  phone text,
  size text not null,
  description text not null,
  reference_path text,
  status text not null default 'new' check (status in ('new','contacted','quoted','approved','in_production','completed','cancelled'))
);
alter table public.rug_requests enable row level security;
-- No public/client policies: only the backend's secret service role can insert/read.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('rug-references','rug-references',false,4194304,array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
-- No public policies on storage.objects: images remain private.

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  address text not null,
  latitude double precision,
  longitude double precision,
  photo_url text,
  proposal text,
  estimated_cost numeric,
  status text not null default 'En revisión',
  created_at timestamptz not null default now()
);

alter table public.reports enable row level security;

create policy "public can read reports"
  on public.reports for select
  using (true);

create policy "public can submit reports"
  on public.reports for insert
  with check (true);

insert into storage.buckets (id, name, public)
values ('report-photos', 'report-photos', true)
on conflict (id) do nothing;

create policy "public can upload report photos"
  on storage.objects for insert
  with check (bucket_id = 'report-photos');

create policy "public can read report photos"
  on storage.objects for select
  using (bucket_id = 'report-photos');

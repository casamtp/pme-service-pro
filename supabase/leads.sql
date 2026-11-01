create table if not exists public.leads (
  id bigint generated always as identity primary key,
  company text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  service text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Inserts are made by the server API using the service-role key.
-- Keep SUPABASE_SERVICE_ROLE_KEY out of all NEXT_PUBLIC_* variables.

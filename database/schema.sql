-- Beehave Database Schema for Supabase
-- This file creates all the necessary tables, triggers, and RLS policies

-- Create custom types/enums
CREATE TYPE user_role AS ENUM ('manager', 'child');
CREATE TYPE ui_mode AS ENUM ('adult', 'kid');
CREATE TYPE chore_frequency AS ENUM ('daily', 'weekly', 'once');
CREATE TYPE chore_status AS ENUM ('open', 'done');
CREATE TYPE spend_request_status AS ENUM ('pending', 'approved', 'denied');
CREATE TYPE transaction_type AS ENUM ('deposit', 'deduct', 'spend');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE public.users (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'child',
    ui_mode ui_mode NOT NULL DEFAULT 'kid',
    honey_balance INTEGER NOT NULL DEFAULT 0,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Chores table
CREATE TABLE public.chores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    frequency chore_frequency NOT NULL,
    honey_value INTEGER NOT NULL CHECK (honey_value > 0),
    assignee_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    proof_photo_url TEXT,
    status chore_status NOT NULL DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Spend requests table
CREATE TABLE public.spend_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    kid_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    description TEXT NOT NULL,
    cost_honey INTEGER NOT NULL CHECK (cost_honey > 0),
    status spend_request_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES public.users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Transactions table
CREATE TABLE public.transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    type transaction_type NOT NULL,
    amount INTEGER NOT NULL,
    reason TEXT NOT NULL,
    chore_id UUID REFERENCES public.chores(id) ON DELETE SET NULL,
    spend_request_id UUID REFERENCES public.spend_requests(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Families table
CREATE TABLE public.families (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for better performance
CREATE INDEX idx_chores_assignee_id ON public.chores(assignee_id);
CREATE INDEX idx_chores_status ON public.chores(status);
CREATE INDEX idx_spend_requests_kid_id ON public.spend_requests(kid_id);
CREATE INDEX idx_spend_requests_status ON public.spend_requests(status);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_type ON public.transactions(type);
CREATE INDEX idx_users_family_id ON public.users(family_id);
CREATE INDEX idx_chores_family_id ON public.chores(family_id);
CREATE INDEX idx_transactions_family_id ON public.transactions(family_id);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at triggers
CREATE TRIGGER set_timestamp_users
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER set_timestamp_chores
    BEFORE UPDATE ON public.chores
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER set_timestamp_spend_requests
    BEFORE UPDATE ON public.spend_requests
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- Add family_id to users
ALTER TABLE public.users ADD COLUMN family_id UUID REFERENCES public.families(id) ON DELETE CASCADE;

-- Add family_id to chores
ALTER TABLE public.chores ADD COLUMN family_id UUID REFERENCES public.families(id) ON DELETE CASCADE NOT NULL;

-- Add family_id to transactions
ALTER TABLE public.transactions ADD COLUMN family_id UUID REFERENCES public.families(id) ON DELETE CASCADE NOT NULL;

-- Trigger for updated_at on families
CREATE TRIGGER set_timestamp_families
    BEFORE UPDATE ON public.families
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spend_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Chores policies
CREATE POLICY "Users can view chores assigned to them" ON public.chores
    FOR SELECT USING (assignee_id = auth.uid());

CREATE POLICY "Users can update chores assigned to them" ON public.chores
    FOR UPDATE USING (assignee_id = auth.uid());

-- Manager policies (parents can see/manage everything in their family)
-- Drop old policies
DROP POLICY "Managers can view all family data" ON public.users;
DROP POLICY "Managers can manage all chores" ON public.chores;
DROP POLICY "Managers can manage all spend requests" ON public.spend_requests;
DROP POLICY "Managers can view all transactions" ON public.transactions;

-- New family-scoped policies for managers
CREATE POLICY "Managers can view their family users" ON public.users
    FOR SELECT USING (
        family_id = (SELECT family_id FROM public.users WHERE id = auth.uid()) AND
        (SELECT role FROM public.users WHERE id = auth.uid()) = 'manager'
    );

CREATE POLICY "Managers can update their family users" ON public.users
    FOR UPDATE USING (
        family_id = (SELECT family_id FROM public.users WHERE id = auth.uid()) AND
        (SELECT role FROM public.users WHERE id = auth.uid()) = 'manager'
    );

CREATE POLICY "Managers can manage their family chores" ON public.chores
    FOR ALL USING (
        family_id = (SELECT family_id FROM public.users WHERE id = auth.uid()) AND
        (SELECT role FROM public.users WHERE id = auth.uid()) = 'manager'
    );

CREATE POLICY "Managers can manage their family spend requests" ON public.spend_requests
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = spend_requests.kid_id AND
                  u.family_id = (SELECT family_id FROM public.users WHERE id = auth.uid()) AND
                  (SELECT role FROM public.users WHERE id = auth.uid()) = 'manager'
        )
    );

CREATE POLICY "Managers can view their family transactions" ON public.transactions
    FOR SELECT USING (
        family_id = (SELECT family_id FROM public.users WHERE id = auth.uid()) AND
        (SELECT role FROM public.users WHERE id = auth.uid()) = 'manager'
    );

-- Spend requests policies for kids
CREATE POLICY "Kids can view their own spend requests" ON public.spend_requests
    FOR SELECT USING (kid_id = auth.uid());

CREATE POLICY "Kids can create spend requests" ON public.spend_requests
    FOR INSERT WITH CHECK (kid_id = auth.uid());

-- Transactions policies
CREATE POLICY "Users can view their own transactions" ON public.transactions
    FOR SELECT USING (user_id = auth.uid());

-- Storage bucket for proof photos
INSERT INTO storage.buckets (id, name, public) VALUES ('chore-photos', 'chore-photos', false);

-- Storage policies
CREATE POLICY "Users can upload chore photos" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'chore-photos' AND
        auth.role() = 'authenticated'
    );

CREATE POLICY "Users can view chore photos" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'chore-photos' AND
        auth.role() = 'authenticated'
    ); 

-- Add policy for users to view own family (limited)
CREATE POLICY "Users can view own family" ON public.families
    FOR SELECT USING (id = (SELECT family_id FROM public.users WHERE id = auth.uid()));

-- Managers can update family name
CREATE POLICY "Managers can update family" ON public.families
    FOR UPDATE USING (
        id = (SELECT family_id FROM public.users WHERE id = auth.uid()) AND
        (SELECT role FROM public.users WHERE id = auth.uid()) = 'manager'
    ); 
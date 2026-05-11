import { createClient } from '@supabase/supabase-js';
import localResume from '../assets/Sanjeet_kumar_resume (2) (1).pdf';
import { fallbackProjects } from '../data/portfolio';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseCredentials = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasSupabaseCredentials && import.meta.env.PROD) {
  console.warn('Supabase credentials are missing in the production environment. Falling back to local data.');
}

export const supabase = hasSupabaseCredentials
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export async function submitContact(payload) {
  if (!supabase) {
    throw new Error('Supabase environment variables are missing.');
  }

  const { error } = await supabase.from('contacts').insert(payload);

  if (error) {
    throw error;
  }
}

export async function fetchProjects() {
  if (!supabase) {
    return fallbackProjects;
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('featured_order', { ascending: true, nullsFirst: false });

  if (error || !data?.length) {
    return fallbackProjects;
  }

  return data;
}

export function getResumeUrl() {
  return localResume;
}

export function getSupabaseResumeUrl() {
  if (!supabase) {
    return '';
  }

  const bucket = import.meta.env.VITE_SUPABASE_RESUME_BUCKET;
  const path = import.meta.env.VITE_SUPABASE_RESUME_PATH;

  if (!bucket || !path) {
    return '';
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

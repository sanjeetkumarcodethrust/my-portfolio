import { createClient } from '@supabase/supabase-js';
import localResume from '../assets/Sanjeet_Kumar_Resume.pdf';
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

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured_order', { ascending: true, nullsFirst: false });

    if (error || !data?.length) {
      return fallbackProjects;
    }

    // Override placeholder URLs from DB if present
    const patchedData = data.map((project) => {
      if (project.title === 'Myzon - E-commerce App' && project.live_url?.includes('example.com')) {
        return { ...project, live_url: 'https://myzon-delta.vercel.app/' };
      }
      if (project.title?.toLowerCase().includes('haircut') || project.title?.toLowerCase().includes('salon')) {
        return {
          ...project,
          live_url: project.live_url?.includes('example.com') || !project.live_url ? 'https://hairbar.vercel.app/' : project.live_url,
          github_url: project.github_url?.includes('yourusername') || project.github_url?.includes('url-shortener') || !project.github_url
            ? 'https://github.com/sanjeetkumarcodethrust/Hair_cut_salon'
            : project.github_url,
          category: project.category === 'Backend' ? 'Full Stack' : project.category,
        };
      }
      return project;
    });

    return patchedData;
  } catch (err) {
    console.warn('Could not load projects from Supabase. Using fallback projects:', err.message);
    return fallbackProjects;
  }
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

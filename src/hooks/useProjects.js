import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/supabase';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchProjects()
      .then((data) => {
        if (isMounted) {
          setProjects(data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, loading };
}

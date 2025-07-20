import { getAllProjects } from '@/data/projects';

export function generateStaticParams() {
  const projects = getAllProjects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

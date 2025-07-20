import ProjectPageClient from './ProjectPageClient_new';
import { getAllProjects as get_all_projects } from '@/data/projects';

export async function generateStaticParams() 
{
  const projects = get_all_projects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generate_metadata({ params }) 
{
  const resolved_params = await params;
  const project = get_all_projects().find(p => p.slug === resolved_params.slug);
  
  if(!project) return { title: 'Project Not Found', };
  
  return {
    title: `${project.title} | My Projects`,
    description: project.description,
  };
}

const project_page = ({ params }) => { return <ProjectPageClient params = {params} />; };

export default project_page;
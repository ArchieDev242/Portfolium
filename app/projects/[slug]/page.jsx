import ProjectPageClient from './ProjectPageClient_new';
import { getAllProjects } from '@/data/projects';

export async function generateStaticParams() 
{
  const projects = getAllProjects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) 
{
  const resolved_params = await params;
  const project = getAllProjects().find(p => p.slug === resolved_params.slug);
  
  if(!project) 
    {
    return { title: 'Project Not Found', };
  }
  
  return {
    title: `${project.title} | My Projects`,
    description: project.description,
  };
}

const ProjectPage = ({ params }) => { return <ProjectPageClient params = {params} />; };

export default ProjectPage;
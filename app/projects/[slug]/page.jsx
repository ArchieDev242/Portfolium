import ProjectPageClient from './ProjectPageClient_new';
import { getAllProjects } from '@/data/projects';

export async function generateStaticParams() {
  const projects = getAllProjects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) 
{
  const resolvedParams = await params;
  const project = getAllProjects().find(p => p.slug === resolvedParams.slug);
  
  if(!project) 
    {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: `${project.title} | My Projects`,
    description: project.description,
  };
}

const ProjectPage = ({ params }) => {
  return <ProjectPageClient params={params} />;
};

export default ProjectPage;
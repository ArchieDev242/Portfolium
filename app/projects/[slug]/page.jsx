import ProjectPageClient from './ProjectPageClient';

// Server component that exports generateStaticParams
export async function generateStaticParams() {
  // Return at least one static param to satisfy Next.js build requirements
  return [
    { slug: 'example-project' }
  ];
}

const ProjectPage = ({ params }) => {
  return <ProjectPageClient params={params} />;
};

export default ProjectPage;
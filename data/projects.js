const projectsData = {
  categories: [
    {
      name: "Game Development",
      icon: "FaGamepad",
      description: "My game development projects and experiences",
      projects: [
        {
          title: "Project 1",
          description: "A 3D action game developed with Unity",
          image: "/projects/game1.jpg",
          technologies: ["Unity", "C#", "Blender"],
          slug: "unity-action-game",
        },
      ],
    },
    {
      name: "Software Development",
      icon: "FaCode",
      description: "Software and application development projects",
      projects: [
        {
          title: "Project 2",
          description: "Desktop application for data analysis",
          image: "/projects/software1.jpg",
          technologies: ["Python", "C++", "Qt"],
          slug: "data-analysis-app",
        },
      ],
    },
    {
      name: "Game Modding",
      icon: "FaPuzzlePiece",
      description: "Game modification and enhancement projects",
      projects: [
        {
          title: "Project 3",
          description: "Mod for popular game adding new features",
          image: "/projects/mod1.jpg",
          technologies: ["Lua", "C++", "Unreal Engine"],
          slug: "game-mod-project",
        },
      ],
    },
    {
      name: "Web Development",
      icon: "FaGlobe",
      description: "Web applications and websites",
      projects: [
        {
          title: "Project 4",
          description: "E-commerce platform with modern design",
          image: "/projects/web1.jpg",
          technologies: ["React", "Next.js", "Tailwind CSS"],
          slug: "ecommerce-platform",
        },
      ],
    },
  ],
};

function getAllProjects() 
{
  return projectsData.categories.flatMap(category => category.projects);
}


function getProjectBySlug(slug) 
{
  return getAllProjects().find(project => project.slug === slug);
}

export { projectsData, getAllProjects, getProjectBySlug };

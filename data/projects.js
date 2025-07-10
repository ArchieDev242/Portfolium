const projects_data = {
  categories: 
  [
    {
      name: "Game Development",
      icon: "FaGamepad",
      description: "My game development projects and experiences",
      projects: 
      [
        {
          title: "Project 1",
          description: "A 3D action game developed with Unity",
          image: "https://via.placeholder.com/400x300/0080FF/FFFFFF?text=Unity+Game",
          technologies: ["Unity", "C#", "Blender"],
          slug: "unity-action-game",
        },
      ],
    },
    {
      name: "Software Development",
      icon: "FaCode",
      description: "Software and application development projects",
      projects: 
      [
        {
          title: "Project 2",
          description: "Desktop application for data analysis",
          image: "https://via.placeholder.com/400x300/FF8000/FFFFFF?text=Data+Analysis+App",
          technologies: ["Python", "C++", "Qt"],
          slug: "data-analysis-app",
        },
        {
          title: "ShortToLongFilename",
          description: "A powerful Windows-only C++ utility that bridges the gap between FAT32's legacy 8.3 filenames and modern long filenames. This Windows-specific tool searches for files with short names and displays their full long names along with complete file paths.",
          fullDescription: "This Windows-exclusive C++ program was developed as a coursework project to demonstrate file system operations and Windows API usage. It specifically works with FAT32 file systems on Windows operating systems, which still use the legacy 8.3 naming convention alongside long filenames. The program provides an efficient way to locate files using their short names and retrieve their corresponding long filenames. Important: This code works only on Windows systems.",
          image: "./projects/short-to-long-filename/output.jpg",
          additionalImages: 
          [
            "./projects/short-to-long-filename/check_ifexist.jpg"
          ],
          technologies: ["C++", "Windows API", "FAT32", "Visual Studio", "Shlwapi"],
          slug: "short-to-long-filename",
          year: "2024",
          status: "Completed",
          category: "System Utility",
          platform: "Windows",
          license: "Open Source",
          links: 
          {
            github: "https://github.com/ArchieDev242/ShortToLongFilename",
            download: "https://github.com/ArchieDev242/ShortToLongFilename/archive/refs/heads/main.zip"
          },
          features: 
          [
            "Automatically detects all FAT32 drives on the system",
            "Recursively searches through directories",
            "Case-insensitive filename matching",
            "Displays both short and long filenames",
            "Shows complete file paths",
            "UTF-8 console output support",
            "Windows API integration for file system operations",
            "Efficient FAT32 file system analysis"
          ],
          instructions: 
          {
            compilation: 
            [
              "Open Visual Studio",
              "Create a new C++ Console Application project",
              "Replace the default code with the contents of main.cpp",
              "Build the project (Ctrl + Shift + B)",
              "Run the executable"
            ],
            usage: 
            [
              "Run the executable",
              "Enter the short filename you want to search for",
              "The program will scan all FAT32 drives and display results",
              "View the complete file paths where matches were found"
            ],
            requirements: 
            [
              "Windows operating system (Windows 7/8/10/11)",
              "Visual Studio or any C++ compiler with Windows API support",
              "FAT32 drives to scan",
              "Appropriate file system access rights"
            ]
          },
          stats: 
          {
            downloads: "1",
            views: "1",
            stars: 0,
            forks: 0,
            commits: 4,
            fileSize: "Small (~5KB)",
            lastUpdate: "Recently"
          },
          tags: ["cpp", "windows", "fat32", "coursework", "cpp-programming", "shlwapi", "file-system", "utility"],
          difficulty: "Intermediate",
          timeToImplement: "1-2 weeks",
          supportedSystems: ["Windows"],
          technicalDetails: 
          {
            classes: ["FAT32FileSearcher"],
            methods: ["GetFAT32Drives()", "FindFiles()", "FindFilesInDirectory()", "ToLowerWString()", "IsFAT32Drive()"],
            apis: ["windows.h", "Shlwapi.lib"]
          },
          limitations: 
          [
            "Windows Only: Uses Windows-specific APIs",
            "FAT32 Only: Only works with FAT32 file systems", 
            "Performance: Large drives may take time to scan completely",
            "Permissions: Requires appropriate file system access rights"
          ],
          courseInfo: "Developed as a coursework project focusing on file system operations, Windows API programming, 8.3 filename conventions, and FAT32 file system characteristics."
        },
      ],
    },
    {
      name: "Game Modding",
      icon: "FaPuzzlePiece",
      description: "Game modification and enhancement projects",
      projects: 
      [
        {
          title: "FNF Cutscene Lua Script",
          description: "A simple and beginner-friendly Lua script tool for Friday Night Funkin' modders to easily add video cutscenes to their mods. This tool simplifies the process of integrating custom video content into Psych Engine-based FNF modifications.",
          fullDescription: "This is my first Lua script uploaded to GitHub and GameBanana. I believe that cutscenes are one of the main parts of FNF mods, and while experienced modders know how to write custom code, many people can't write code themselves. This tool provides a ready-to-use solution that you can download and implement in your mod without programming knowledge.",
          image: "https://images.gamebanana.com/img/ss/tools/6286a4b1d429e.jpg",
          additionalImages: 
          [
            "https://images.gamebanana.com/img/ss/tools/6286a4b363346.jpg"
          ],
          technologies: ["Lua", "Psych Engine", "Friday Night Funkin'", "Video Integration"],
          slug: "fnf-cutscene-lua-script",
          year: "2022",
          status: "Released",
          category: "Modding Tool",
          platform: "PC",
          license: "Open Source",
          links: 
          {
            github: "https://github.com/ArchieDev242/FNF-Cutscene-Lua-script",
            gamebanana: "https://gamebanana.com/tools/9355",
            download: "https://gamebanana.com/tools/download/9355",
            alternativeSource: "https://github.com/Argonizer3500/FNF-Cutscene-Lua-script/blob/main/cutscene%20script"
          },
          features: 
          [
            "Easy video cutscene integration for FNF mods",
            "Compatible with Psych Engine",
            "Supports 1280x720 video resolution standard",
            "Simple drag-and-drop installation process",
            "Beginner-friendly for non-programmers",
            "No complex setup required",
            "Works with existing FNF mod structure",
            "Lightweight and efficient implementation"
          ],
          instructions: 
          {
            installation: 
            [
              "Download the cutscene script file",
              "Place the script in your mod's scripts folder",
              "Upload your video file to the 'videos' folder in Psych Engine",
              "Ensure your video is exactly 1280x720 resolution",
              "Configure the script with your video filename",
              "Test the cutscene in your mod"
            ],
            requirements: 
            [
              "Psych Engine-based FNF mod",
              "Video file in 1280x720 resolution",
              "Basic understanding of FNF mod structure"
            ],
            notes: 
            [
              "May show 'return value not supported' message - this is harmless and doesn't affect gameplay",
              "Designed for modders who want to focus on content rather than coding",
              "First script in my portfolio of FNF modding tools"
            ]
          },
          stats: 
          {
            downloads: "3.4k",
            views: "20k+",
            likes: 23,
            forks: 0,
            stars: 0,
            commits: 4,
            fileSize: "Small (~1KB)",
            lastUpdate: "3 years ago"
          },
          tags: ["lua", "lua-script", "modding-games", "lua-modding", "fnf", "cutscenes", "psych-engine"],
          difficulty: "Beginner",
          timeToImplement: "5-10 minutes",
          supportedEngines: ["Psych Engine"],
          communityFeedback: 
          {
            rating: "Positive",
            comments: "No comments yet, but good download statistics indicate community acceptance"
          }
        },
      ],
    },
    {
      name: "Web Development",
      icon: "FaGlobe",
      description: "Web applications and websites",
      projects: 
      [
        {
          title: "Project 4",
          description: "E-commerce platform with modern design",
          image: "https://via.placeholder.com/400x300/00C851/FFFFFF?text=E-commerce+Platform",
          technologies: ["React", "Next.js", "Tailwind CSS"],
          slug: "ecommerce-platform",
        },
      ],
    },
  ],
};

function get_all_projects() 
{
  return projects_data.categories.flatMap(category => category.projects);
}


function get_project_by_slug(slug) 
{
  return get_all_projects().find(project => project.slug === slug);
}

export { projects_data as projectsData, get_all_projects as getAllProjects, get_project_by_slug as getProjectBySlug };

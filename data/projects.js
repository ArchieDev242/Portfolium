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
          title: "Arkanoid JS",
          description: "A modern reimagining of the classic arcade game, built from scratch using pure JavaScript, HTML5 Canvas, and CSS. This project was developed in 2020-2021 during my studies at IT-Start programming courses, marking my first major foray into game development and web technologies.",
          fullDescription: "Arkanoid JS is a modern reimagining of the classic arcade game, built from scratch using pure JavaScript, HTML5 Canvas, and CSS. This project was developed in 2020-2021 during my studies at IT-Start programming courses, marking my first major foray into game development and web technologies. Experience the nostalgic gameplay with smooth controls, vibrant visuals, and challenging levels that will test your reflexes and strategy. Built entirely with vanilla JavaScript, HTML5 Canvas API, and CSS3, it demonstrates fundamental game development concepts including collision detection, game loops, object-oriented programming, and responsive design.",
          image: "https://i.imghippo.com/files/DQU8777vmk.png",
          additionalImages: 
          [
            "https://i.imghippo.com/files/RER3195WwA.png"
          ],
          technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "Game Development"],
          slug: "arkanoid-js",
          year: "2020-2021",
          status: "Completed",
          category: "Arcade Game",
          platform: "Web Browser",
          license: "Open Source",
          links: 
          {
            github: "https://github.com/ArchieDev242/arcanoid_js",
            playGame: "https://archiedev242.github.io/arcanoid_js/",
            download: "https://github.com/ArchieDev242/arcanoid_js/archive/refs/heads/main.zip"
          },
          features: 
          [
            "Classic Arkanoid gameplay mechanics",
            "Smooth ball physics and collision detection",
            "Responsive platform controls (keyboard and touch)",
            "Progressive brick destruction system",
            "Game over and win conditions",
            "Clean, modern visual design",
            "Cross-browser compatibility",
            "Mobile-friendly touch controls",
            "Fullscreen canvas rendering",
            "Object-oriented code architecture"
          ],
          instructions: 
          {
            gameplay: 
            [
              "Use arrow keys (← →) to move the platform",
              "Press SPACE to launch the ball",
              "Destroy all bricks to win the level",
              "Don't let the ball fall below the platform",
              "Aim strategically to clear bricks efficiently"
            ],
            installation: 
            [
              "Clone or download the repository",
              "Open index.html in any modern web browser",
              "No additional setup or dependencies required",
              "Play directly online at the demo link"
            ],
            requirements: 
            [
              "Modern web browser (Chrome, Firefox, Safari, Edge)",
              "JavaScript enabled",
              "Screen resolution: 1920x1080 recommended",
              "Keyboard for desktop play or touchscreen for mobile"
            ]
          },
          stats: 
          {
            complexity: "Beginner-Intermediate",
            fileSize: "Small (~50KB)",
            playTime: "5-15 minutes per game",
            lastUpdate: "2021"
          },
          tags: ["javascript", "html5-canvas", "game-development", "arcade", "arkanoid", "breakout", "web-game", "vanilla-js"],
          difficulty: "Beginner-Intermediate",
          timeToImplement: "2-3 weeks",
          supportedSystems: ["Web Browser", "Cross-platform"],
          technicalDetails: 
          {
            gameLoop: "requestAnimationFrame",
            collisionDetection: "AABB (Axis-Aligned Bounding Box)",
            rendering: "HTML5 Canvas 2D Context",
            controls: "Keyboard events + Touch events",
            architecture: "Object-oriented JavaScript"
          },
          coursework: "Developed during IT-Start programming courses as a practical project to learn web technologies and game development fundamentals.",
          achievements: 
          [
            "First major game development project",
            "Demonstrates mastery of vanilla JavaScript",
            "Successfully implements game physics",
            "Cross-platform compatibility achieved",
            "Clean, maintainable code structure"
          ]
        },
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
          image: "https://i.imghippo.com/files/coKS2929nUk.jpg",
          additionalImages: 
          [
            "https://i.imghippo.com/files/xwd7946kss.jpg"
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
          title: "Ucode Calculator",
          description: "A modern, responsive web-based calculator built with vanilla JavaScript, HTML5, and CSS3. Features an intuitive interface with support for basic arithmetic operations, memory functions, unit conversions, and number system conversions. Developed as part of Ucode Marathon Race00 project.",
          fullDescription: "Ucode Calculator is a comprehensive web-based calculator application developed as part of the Race00 project for Ucode Marathon 2025. Built entirely with vanilla technologies (HTML5, CSS3, and JavaScript ES2015+), this project demonstrates modern web development practices, clean code architecture, and user-friendly interface design. The calculator supports all basic arithmetic operations, advanced mathematical functions, memory operations, unit conversions (length, area, weight), and number system conversions (decimal, binary, hexadecimal). Features include clipboard operations, keyboard shortcuts, calculation history, and a sleek macOS-inspired design with smooth animations.",
          image: "https://i.imghippo.com/files/CUk6627Pno.jpg",
          additionalImages: [],
          technologies: ["JavaScript", "HTML5", "CSS3", "ES2015+", "DOM Manipulation", "Responsive Design"],
          slug: "ucode-calculator",
          year: "2025",
          status: "Completed",
          category: "Web Application",
          platform: "Web Browser",
          license: "Open Source",
          links: 
          {
            github: "https://github.com/ArchieDev242/Ucode_Calculator",
            playGame: "https://archiedev242.github.io/Ucode_Calculator/",
            download: "https://github.com/ArchieDev242/Ucode_Calculator/archive/refs/heads/main.zip"
          },
          features: 
          [
            "Basic arithmetic operations (+, -, ×, ÷, %, !)",
            "Advanced mathematical functions (√, xⁿ, ln)",
            "Memory operations (MC, MR, M+, M-, MS)",
            "Unit conversions (length: m/km/cm, area: m²/km²/cm²/h, weight: kg/t/gr)",
            "Number system conversions (decimal, binary, hexadecimal)",
            "Clipboard operations (copy/paste results and history)",
            "Calculation history with full expression tracking",
            "Keyboard shortcuts for enhanced usability",
            "Responsive design for all devices",
            "Smooth animations and visual effects",
            "Error handling and input validation",
            "macOS-inspired interface design"
          ],
          instructions: 
          {
            usage: 
            [
              "Click number buttons or use keyboard to input values",
              "Use operation buttons for calculations",
              "Press = or Enter to execute calculations",
              "Use memory buttons (MC, MR, M+, M-, MS) for memory operations",
              "Click unit buttons to convert between different units",
              "Use ⧉ to copy results to clipboard",
              "Use i to paste from clipboard",
              "Press H to toggle calculation history",
              "Use ± to change sign of current number"
            ],
            installation: 
            [
              "Clone or download the repository",
              "Open index.html in any modern web browser",
              "No additional setup or dependencies required",
              "Use online version via GitHub Pages link"
            ],
            requirements: 
            [
              "Modern web browser (Chrome, Firefox, Safari, Edge)",
              "JavaScript ES2015+ support",
              "No internet connection required (works offline)",
              "Any device with a web browser (desktop, tablet, mobile)"
            ]
          },
          stats: 
          {
            complexity: "Intermediate",
            fileSize: "Medium (~100KB)",
            teamSize: "2 developers",
            developmentTime: "Race00 project duration",
            lastUpdate: "2025"
          },
          tags: ["javascript", "html5", "css3", "calculator", "web-app", "vanilla-js", "ucode", "race00", "mathematics"],
          difficulty: "Intermediate",
          timeToImplement: "2-3 weeks",
          supportedSystems: ["Web Browser", "Cross-platform"],
          technicalDetails: 
          {
            architecture: "Modular JavaScript with event-driven programming",
            calculations: "Native JavaScript mathematical operations",
            ui: "CSS Grid and Flexbox layout",
            animations: "CSS transitions and transforms",
            storage: "Browser clipboard API integration"
          },
          projectInfo: "Developed as part of Ucode Marathon Race00 project by a team of 2 developers. This project combined knowledge from five course sprints, demonstrating mastery of HTML5, CSS3, JavaScript ES2015+, DOM manipulation, and Git version control.",
          teamInfo: 
          {
            teamSize: "2 developers",
            myRole: "Team Lead & Co-Developer",
            responsibilities: 
            [
              "Project leadership and coordination",
              "Core programming logic implementation",
              "Mathematical operations and advanced features",
              "Code architecture and modular structure design",
              "Git version control and repository management",
              "Testing and debugging across different browsers",
              "Feature planning and development strategy",
              "Collaboration with team partner on UI/UX aspects"
            ],
            teamMembers: 
            [
              {
                name: "Maksym Kopychko",
                role: "Team Lead & Co-Developer",
                github: "https://github.com/ArchieDev242",
                githubUsername: "Archie242",
                contributions: 
                [
                  "Project leadership and coordination",
                  "Core calculator logic and mathematical operations",
                  "Advanced features implementation (memory, conversions)",
                  "Code architecture and optimization",
                  "Git repository management and version control"
                ]
              },
              {
                name: "Volodymyr Vovk",
                role: "Main Developer & Designer",
                github: "https://github.com/1terraflops",
                githubUsername: "1terraflops",
                contributions: 
                [
                  "Primary development and implementation",
                  "Interface design and styling",
                  "CSS animations and visual effects",
                  "Responsive design implementation",
                  "User experience optimization"
                ]
              }
            ],
            collaboration: "Collaborative development with clearly defined roles - Maksym as Team Lead handling project coordination and core logic, Volodymyr as Main Developer focusing on implementation and design"
          },
          achievements: 
          [
            "Successfully completed Race00 challenge",
            "Full-featured calculator meeting all requirements",
            "Modern responsive design implementation",
            "Advanced features beyond basic requirements",
            "Clean, maintainable code structure",
            "Team collaboration and Git workflow"
          ]
        },
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

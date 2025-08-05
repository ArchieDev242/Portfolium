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
          title: "The Loop Place",
          description: "A 2D game developed using SDL2 library in pure C. This project demonstrates fundamental game development concepts including real-time rendering, input handling, and game state management using low-level C programming.",
          fullDescription: "SDL Game Project represents my exploration into native game development using pure C and the SDL2 library. This project showcases fundamental game development concepts including real-time 2D rendering, efficient input handling, and game state management. Built with clean C code, it demonstrates proficiency in low-level programming, memory management, and understanding of graphics programming without high-level abstractions.",
          image: "https://i.imghippo.com/files/ewsJ6619IoA.png",
          additionalImages: 
          [
            "https://i.imghippo.com/files/hNZx6219IY.png",
            "https://i.imghippo.com/files/YI8642nFE.png"
          ],
          videoDemo: "https://youtu.be/Ynthj9Q90OY?si=OSy8Tkw1dvTM4gYn",
          technologies: ["C", "SDL2", "Game Development", "Cross-platform", "Make", "Git", "Visual Studio Code"],
          slug: "sdl-game-project",
          year: "2024",
          status: "Completed",
          category: "2D Action Game",
          platform: "Windows, Linux, macOS",
          license: "Open Source",
          links: 
          {
            github: "https://github.com/ArchieDev242/gameSDL",
            demo: "https://youtu.be/Ynthj9Q90OY?si=OSy8Tkw1dvTM4gYn",
            download: "https://github.com/ArchieDev242/gameSDL/releases"
          },
          team: 
          {
            name: "Floppa Team",
            members: 
            [
              {
                name: "Volodymyr Nevmyrych",
                username: "TheSaulGoodman",
                role: "Team Lead & Coder",
                github: "https://github.com/THESAULGOODMAN",
                contribution: "Project management, code architecture"
              },
              {
                name: "Danylo Lavunov", 
                username: "lavanios",
                role: "Main Coder",
                github: "https://github.com/lavanios",
                contribution: "Core development, game logic"
              },
              {
                name: "Maksym Kopychko",
                username: "Archie242", 
                role: "Main Designer",
                github: "https://github.com/Archie242",
                contribution: "Design, graphics, coding assistance"
              },
              {
                name: "Yaroslav Fedun",
                username: "Blum",
                role: "Designer", 
                github: "https://github.com/Blumex7",
                contribution: "UI/UX design, visual effects"
              },
              {
                name: "Vladyslav Oryshchuk",
                username: "buymeprada",
                role: "Sound Designer", 
                github: "",
                contribution: "Audio design, soundtrack"
              }
            ],
            description: "Floppa Team is a passionate collective of Ukrainian game developers who came together during their computer science studies to create engaging 2D games using C and SDL2. The team emphasizes clean code architecture, cross-platform compatibility, and efficient performance optimization."
          },
          features: 
          [
            "2D action game built with pure C and SDL2",
            "Dynamic enemy spawning with progressive difficulty",
            "Real-time rendering with optimized SDL2 graphics",
            "Smooth player movement and responsive controls",
            "Particle effects and visual feedback systems",
            "Sprite and texture management system",
            "Advanced collision detection algorithms",
            "Keyboard and mouse input handling",
            "Game state management with scene transitions",
            "Audio integration with SDL2_mixer",
            "Score tracking and health system",
            "Memory-safe C programming practices",
            "Cross-platform compatibility (Linux, Windows, macOS)",
            "Efficient game loop with 60 FPS target",
            "Modular codebase with clean architecture"
          ],
          gameplay: 
          {
            description: "Players control a character in a dynamic 2D environment, fighting against waves of enemies that become progressively more challenging. The game features fast-paced combat with visual feedback through particle effects and smooth animations.",
            mechanics: 
            [
              "Character movement in 2D space with WASD/Arrow keys",
              "Combat system with attack mechanics using Spacebar",
              "Enemy AI with different behavior patterns and difficulty scaling",
              "Progressive difficulty system that adapts to player progress",
              "Health and scoring systems with real-time feedback",
              "Visual feedback through particle effects and animations",
              "Collision detection between player, enemies, and environment",
              "Game state persistence and scene management"
            ],
            objectives: 
            [
              "Survive waves of increasingly difficult enemies",
              "Achieve high scores through strategic combat",
              "Master movement and combat mechanics",
              "Explore the game environment and discover secrets"
            ]
          },
          instructions: 
          {
            gameplay: 
            [
              "Use WASD or arrow keys for character movement",
              "Press Spacebar to attack enemies",
              "Mouse for targeting and interaction",
              "ESC key to pause game or access menu",
              "P key to pause/unpause during gameplay",
              "Follow on-screen instructions for advanced controls",
              "Monitor health and score indicators on HUD"
            ],
            installation: 
            [
              "Install SDL2 development libraries for your platform:",
              "  - Ubuntu/Debian: sudo apt-get install libsdl2-dev libsdl2-mixer-dev",
              "  - Fedora: sudo dnf install SDL2-devel SDL2_mixer-devel", 
              "  - macOS: brew install sdl2 sdl2_mixer",
              "  - Windows: Download SDL2 development libraries from libsdl.org",
              "Clone the repository: git clone https://github.com/ArchieDev242/gameSDL.git",
              "Navigate to project directory: cd gameSDL",
              "Compile using provided Makefile: make",
              "Run the executable: ./endgame",
              "For clean build: make clean && make"
            ],
            requirements: 
            [
              "SDL2 library (2.0.0 or higher) - Core graphics and input",
              "SDL2_mixer for audio support (optional but recommended)",
              "C compiler (GCC 4.8+ or Clang 3.4+)",
              "Make build system",
              "Minimum 512 MB RAM",
              "Graphics card with basic 2D support",
              "50 MB free disk space"
            ],
            vsCodeSetup: 
            [
              "Open project in Visual Studio Code",
              "Install C/C++ extension for IntelliSense",
              "Use Ctrl+Shift+P > Tasks: Run Task > Build to compile",
              "Use Ctrl+Shift+P > Tasks: Run Task > Run Game to execute",
              "Use Ctrl+Shift+P > Tasks: Run Task > Clean for clean build",
              "Configure debugging with launch.json for development"
            ]
          },
          stats: 
          {
            complexity: "Intermediate to Advanced",
            codeLines: "~2500+ lines of C code",
            performanceTarget: "60 FPS stable gameplay",
            lastUpdate: "2024",
            teamSize: "4 developers (Floppa Team)",
            developmentTime: "3-4 months collaborative development",
            testingPhase: "6 weeks comprehensive QA and cross-platform testing",
            platformsTested: "Windows 10/11, Ubuntu 20.04+, macOS 11+"
          },
          tags: ["c", "sdl2", "game-development", "2d-graphics", "cross-platform", "native-development", "action-game", "floppa-team"],
          difficulty: "Intermediate to Advanced",
          timeToImplement: "3-4 months team development",
          supportedSystems: ["Windows 10+", "Linux (Ubuntu 18.04+)", "macOS 10.14+"],
          projectStructure: 
          {
            description: "Well-organized C project with modular design and clean architecture",
            directories: 
            [
              "src/ - Core source code files with game logic",
              "include/ - Header files with function declarations", 
              "assets/ - Game assets including sprites and sounds",
              "build/ - Compiled binaries and intermediate files",
              "docs/ - Project documentation and development notes",
              "tests/ - Unit tests and integration tests",
              "Makefile - Build configuration and compilation rules"
            ],
            codeOrganization: 
            [
              "main.c - Entry point and main game loop",
              "game.c - Core game logic and state management",
              "player.c - Player entity and movement system",
              "enemy.c - Enemy AI and behavior patterns",
              "renderer.c - Graphics rendering and SDL2 integration",
              "input.c - Input handling and event processing",
              "audio.c - Sound effects and music management",
              "collision.c - Collision detection algorithms",
              "particles.c - Particle system for visual effects"
            ]
          },
          technicalDetails: 
          {
            gameLoop: "Fixed timestep game loop with delta time",
            rendering: "Hardware-accelerated SDL2 2D renderer",
            memoryManagement: "Manual memory management with leak prevention",
            architecture: "Modular C with clean separation of concerns",
            buildSystem: "Cross-platform Makefile with dependency tracking",
            optimization: "Optimized for 60 FPS with efficient algorithms",
            debugging: "Memory debugging with Valgrind support",
            versionControl: "Git with feature branch workflow"
          },
          gitCommands: 
          {
            clone: "git clone https://github.com/ArchieDev242/gameSDL.git",
            navigate: "cd gameSDL",
            build: "make",
            run: "./endgame",
            clean: "make clean",
            rebuild: "make clean && make",
            debug: "make debug",
            test: "make test"
          },
          achievements: 
          [
            "Successfully developed complete 2D action game in pure C",
            "Implemented efficient real-time rendering with SDL2",
            "Achieved stable 60 FPS performance across platforms", 
            "Built comprehensive collision detection system",
            "Created dynamic enemy AI with progressive difficulty",
            "Implemented particle effects and visual feedback systems",
            "Achieved cross-platform compatibility (Linux, Windows, macOS)",
            "Demonstrates advanced low-level programming skills",
            "Built complete game engine architecture from scratch",
            "Successful team collaboration with Floppa Team",
            "Optimized memory usage with manual C management",
            "Created modular and maintainable C codebase",
            "Integrated audio system with SDL2_mixer",
            "Implemented game state management and scene transitions",
            "Delivered production-ready game with full feature set"
          ]
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
          title: "IT-Start Course Sites",
          description: "A comprehensive web development portfolio showcasing 10+ websites created during my IT-Start course. Features modern responsive designs, interactive elements, and diverse project types from corporate sites to e-commerce platforms.",
          fullDescription: "IT-Start Course Sites is a comprehensive portfolio website showcasing my web development journey and all projects created during the IT-Start Evolution course. This collection includes 10+ different websites demonstrating various web development skills and technologies. Each project represents a unique learning experience, from corporate IT sites and educational portals to e-commerce platforms and interactive games. The portfolio features modern design with gradients and animations, responsive layouts for all devices, and interactive project cards with hover effects. Built with vanilla web technologies and optimized for performance, this portfolio demonstrates my progression in HTML5, CSS3, JavaScript, responsive design, and modern web development practices.",
          image: "https://i.imghippo.com/files/iIy6155b.png",
          additionalImages: [],
          technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "CSS Grid", "Flexbox", "GitHub Pages"],
          slug: "it-start-course-sites",
          year: "2020-2021",
          status: "Completed",
          category: "Portfolio Website",
          platform: "Web Browser",
          license: "Open Source",
          links: 
          {
            github: "https://github.com/ArchieDev242/IT-Start_course_sites",
            playGame: "https://archiedev242.github.io/IT-Start_course_sites/",
            download: "https://github.com/ArchieDev242/IT-Start_course_sites/archive/refs/heads/main.zip"
          },
          features: 
          [
            "Portfolio of 10+ diverse web projects",
            "Modern design with gradients and animations",
            "Responsive layout for all devices (desktop, tablet, mobile)",
            "Interactive project cards with hover effects",
            "Fast loading and optimization",
            "GitHub Pages deployment",
            "Corporate IT site with portfolio and services",
            "Christmas Magic - festive website with animations",
            "IT Education Hub - educational portal",
            "Summer Vibes - e-commerce with bright design",
            "Travel Explorer - booking and destination search",
            "Fashion Store - course catalog and materials",
            "Sneaker Kingdom - specialized footwear store",
            "Cat Paradise - game recommendation system",
            "JS Playground - interactive JavaScript demos",
            "Creative Showcase - unique design and animations"
          ],
          instructions: 
          {
            navigation: 
            [
              "Visit the portfolio homepage to see all projects",
              "Click on individual project cards to explore each site",
              "Use responsive navigation menu on mobile devices",
              "Hover over project cards to see interactive effects"
            ],
            projects: 
            [
              "Corporate IT Site - Professional design with portfolio section",
              "Christmas Magic - Holiday animations and winter theme",
              "IT Education Hub - Educational content with modern interface",
              "Summer Vibes - Bright e-commerce design with mobile version",
              "Travel Explorer - Tour booking and destination search features",
              "Fashion Store - Course catalog with educational materials",
              "Sneaker Kingdom - Modern e-commerce for footwear",
              "Cat Paradise - Interactive game suggestion system",
              "JS Playground - JavaScript capabilities demonstration",
              "Creative Showcase - Unique design with creative solutions"
            ],
            setup: 
            [
              "Clone the repository from GitHub",
              "Open index.html in any modern web browser",
              "No installation required - runs directly in browser",
              "Access live demo via GitHub Pages link"
            ]
          },
          stats: 
          {
            complexity: "Intermediate",
            fileSize: "Large (~500KB+)",
            teamSize: "1 developer",
            developmentTime: "6 months (course duration)",
            lastUpdate: "2021"
          },
          tags: ["html5", "css3", "javascript", "portfolio", "responsive", "web-development", "it-start", "course-projects"],
          difficulty: "Beginner to Intermediate",
          timeToImplement: "6 months (course duration)",
          supportedSystems: ["Web Browser", "Cross-platform"],
          technicalDetails: 
          {
            architecture: "Multi-page portfolio with individual project sites",
            design: "CSS Grid and Flexbox for responsive layouts",
            animations: "CSS transitions and keyframe animations",
            fonts: "Google Fonts (Poppins) for modern typography",
            icons: "Font Awesome icon library",
            hosting: "GitHub Pages for free hosting"
          },
          projectInfo: "Developed during the IT-Start Evolution web development course, this portfolio represents my journey learning modern web technologies. Each project demonstrates different aspects of web development, from basic HTML/CSS to advanced JavaScript interactions and responsive design principles.",
          achievements: 
          [
            "Successfully completed IT-Start Evolution course",
            "Built 10+ diverse web projects showcasing different skills",
            "Mastered responsive design principles",
            "Implemented modern CSS techniques (Grid, Flexbox)",
            "Created interactive user interfaces with JavaScript",
            "Deployed portfolio using GitHub Pages",
            "Demonstrated progression from basic to advanced concepts",
            "Built projects covering various domains (corporate, e-commerce, education, entertainment)"
          ]
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

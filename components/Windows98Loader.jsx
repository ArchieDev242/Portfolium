"use client";

import { useEffect, useState } from 'react';

const Windows98Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Starting Windows...');
  const [dots, setDots] = useState('');
  const [systemMessage, setSystemMessage] = useState('');
  const [isBeeping, setIsBeeping] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 });
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [matrixRain, setMatrixRain] = useState([]);
  const [scanlines, setScanlines] = useState(true);
  const [crtEffect, setCrtEffect] = useState(true);
  const [particles, setParticles] = useState([]);
  const [hackingEffect, setHackingEffect] = useState(false);
  const [neonEffect, setNeonEffect] = useState(false);
  const [rippleEffect, setRippleEffect] = useState(false);
  const [hologramEffect, setHologramEffect] = useState(false);
  const [dataStream, setDataStream] = useState([]);
  const [circuitEffect, setCircuitEffect] = useState(false);
  const [waveform, setWaveform] = useState([]);
  const [laserEffect, setLaserEffect] = useState(false);
  const [cyberpunkMode, setCyberpunkMode] = useState(false);
  const [terminalHack, setTerminalHack] = useState([]);
  const [digitalRain, setDigitalRain] = useState([]);
  const [energyField, setEnergyField] = useState(false);
  const [quantumEffect, setQuantumEffect] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [fireworks, setFireworks] = useState([]);
  const [isClient, setIsClient] = useState(false);
  
  const [dnaHelix, setDnaHelix] = useState([]);
  const [vortex, setVortex] = useState(false);
  const [prismaticWave, setPrismaticWave] = useState(false);
  const [cosmicDust, setCosmicDust] = useState([]);
  const [timeWarp, setTimeWarp] = useState(false);
  const [dimensionalRift, setDimensionalRift] = useState(false);
  const [kaleidoscope, setKaleidoscope] = useState(false);
  const [magneticField, setMagneticField] = useState([]);
  const [plasmaStorm, setPlasmaStorm] = useState(false);
  const [blackHole, setBlackHole] = useState(false);
  const [crystalFormation, setCrystalFormation] = useState([]);
  const [neuralNetwork, setNeuralNetwork] = useState([]);
  const [particleAccelerator, setParticleAccelerator] = useState(false);
  const [fractalZoom, setFractalZoom] = useState(false);
  const [auroraBorealis, setAuroraBorealis] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const link98 = document.createElement('link');
    link98.rel = 'stylesheet';
    link98.href = 'https://unpkg.com/98.css';
    link98.id = 'win98-loader-css';
    document.head.appendChild(link98);

    const customLink = document.createElement('link');
    customLink.rel = 'stylesheet';
    customLink.href = '/win98/win98.css';
    customLink.id = 'win98-loader-custom-css';
    document.head.appendChild(customLink);

    // matrix rain
    const generateMatrixRain = () => {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const drops = [];

      for(let i = 0; i < 50; i++) 
        {
        drops.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          char: chars[Math.floor(Math.random() * chars.length)],
          speed: Math.random() * 2 + 1,
          opacity: Math.random()
        });
      }
      setMatrixRain(drops);
    };

    const generateParticles = () => {
      const newParticles = [];

      for(let i = 0; i < 30; i++) 
        {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: ['#00ff00', '#0080ff', '#ff8000', '#ff0080'][Math.floor(Math.random() * 4)]
        });
      }
      setParticles(newParticles);
    };

    const generateDigitalRain = () => {
      const chars = '01ABCDEF</>[]{}()±×÷√∞∆∑∏∫∂∇';
      const drops = [];
      for(let i = 0; i < 80; i++) 
        {
        drops.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          char: chars[Math.floor(Math.random() * chars.length)],
          speed: Math.random() * 3 + 1,
          opacity: Math.random(),
          color: ['#00ff00', '#ff0080', '#0080ff', '#ffff00'][Math.floor(Math.random() * 4)]
        });
      }
      setDigitalRain(drops);
    };

    const generateTerminalHack = () => {
      const commands = [
        'ACCESSING PORTFOLIO DATABASE...',
        'DECRYPTING USER DATA...',
        'BYPASSING SECURITY PROTOCOLS...',
        'LOADING NEURAL NETWORK...',
        'INITIALIZING AI MODULES...',
        'CONNECTING TO MATRIX...',
        'DOWNLOADING SKILLS.EXE...',
        'COMPILING EXPERIENCE.DLL...',
        'OPTIMIZING PERFORMANCE...',
        'SYSTEM INTEGRATION COMPLETE'
      ];
      setTerminalHack(commands);
    };

    const generateDataStream = () => {
      const data = [];

      for(let i = 0; i < 50; i++) 
        {
        data.push({
          id: i,
          value: Math.random().toString(16).substr(2, 8).toUpperCase(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          speed: Math.random() * 2 + 0.5
        });
      }
      setDataStream(data);
    };

    const generateWaveform = () => {
      const wave = [];

      for(let i = 0; i < 100; i++) 
        {
        wave.push({
          id: i,
          height: Math.sin(i * 0.1) * 50 + 50,
          x: i
        });
      }
      setWaveform(wave);
    };

    const generateSparkles = () => {
      const newSparkles = [];

      for(let i = 0; i < 20; i++) 
        {
        newSparkles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 2
        });
      }
      setSparkles(newSparkles);
    };

    const generateFireworks = () => {
      const newFireworks = [];

      for(let i = 0; i < 5; i++) 
        {
        newFireworks.push({
          id: i,
          left: 20 + i * 15,
          top: 20 + i * 10,
          delay: i * 0.3
        });
      }
      setFireworks(newFireworks);
    };

    const generateDnaHelix = () => {
      const helix = [];

      for(let i = 0; i < 50; i++) 
        {
        const angle = (i / 50) * Math.PI * 8;
        helix.push({
          id: i,
          x: 50 + Math.sin(angle) * 20,
          y: (i / 50) * 100,
          rotation: angle * 180 / Math.PI,
          color: i % 2 === 0 ? '#00ff88' : '#ff0088'
        });
      }
      setDnaHelix(helix);
    };

    // cosmic dust
    const generateCosmicDust = () => {
      const dust = [];

      for(let i = 0; i < 100; i++) {
        dust.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 3 + 1
        });
      }
      setCosmicDust(dust);
    };

    // magnetic field
    const generateMagneticField = () => {
      const field = [];

      for(let i = 0; i < 15; i++) 
        {
        field.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          intensity: Math.random() * 100 + 50,
          polarity: Math.random() > 0.5 ? 'positive' : 'negative'
        });
      }
      setMagneticField(field);
    };

    // crystals
    const generateCrystalFormation = () => {
      const crystals = [];

      for(let i = 0; i < 12; i++) 
        {
        crystals.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 20,
          facets: Math.floor(Math.random() * 4) + 3,
          color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)]
        });
      }
      setCrystalFormation(crystals);
    };

    
    const generateNeuralNetwork = () => {
      const neurons = [];

      for(let i = 0; i < 25; i++) 
        {
        neurons.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          connections: Math.floor(Math.random() * 5) + 2,
          activity: Math.random()
        });
      }
      setNeuralNetwork(neurons);
    };

    generateMatrixRain();
    generateParticles();
    generateDigitalRain();
    generateTerminalHack();
    generateDataStream();
    generateWaveform();
    generateSparkles();
    generateFireworks();
    generateDnaHelix();
    generateCosmicDust();
    generateMagneticField();
    generateCrystalFormation();
    generateNeuralNetwork();

    if(typeof window !== 'undefined') 
        {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        const existingLink = document.getElementById('win98-loader-css');
        
        if(existingLink) 
            {
          document.head.removeChild(existingLink);
        }
        const existingCustomLink = document.getElementById('win98-loader-custom-css');
        
        if(existingCustomLink) 
            {
          document.head.removeChild(existingCustomLink);
        }
      };
    }

    return () => {
      const existingLink = document.getElementById('win98-loader-css');
      
      if(existingLink) 
        {
        document.head.removeChild(existingLink);
      }
      const existingCustomLink = document.getElementById('win98-loader-custom-css');
      
      if(existingCustomLink) 
        {
        document.head.removeChild(existingCustomLink);
      }
    };
  }, []);

  useEffect(() => {
    const loadingSteps = [
      { progress: 3, text: 'Initializing quantum core...', message: 'POST: Power-On Self Test OK', effect: 'quantum' },
      { progress: 8, text: 'Generating DNA helix...', message: 'Loading genetic algorithms', effect: 'dna' },
      { progress: 15, text: 'Creating cosmic dust...', message: 'Rendering stellar particles', effect: 'cosmic' },
      { progress: 22, text: 'Loading neural networks...', message: 'Initializing AI modules', effect: 'neural' },
      { progress: 30, text: 'Scanning digital dimensions...', message: 'Connecting to cyberspace', effect: 'digital' },
      { progress: 38, text: 'Opening dimensional rift...', message: 'Tearing spacetime fabric', effect: 'rift' },
      { progress: 45, text: 'Activating magnetic fields...', message: 'Polarizing energy streams', effect: 'magnetic' },
      { progress: 52, text: 'Growing crystal formations...', message: 'Crystallizing data structures', effect: 'crystal' },
      { progress: 60, text: 'Generating holographic UI...', message: 'Loading hologram.dll', effect: 'hologram' },
      { progress: 68, text: 'Creating plasma storm...', message: 'Ionizing atmosphere', effect: 'plasma' },
      { progress: 75, text: 'Activating particle accelerator...', message: 'Accelerating quantum bits', effect: 'accelerator' },
      { progress: 82, text: 'Opening black hole portal...', message: 'Warping spacetime', effect: 'blackhole' },
      { progress: 88, text: 'Rendering aurora borealis...', message: 'Painting cosmic lights', effect: 'aurora' },
      { progress: 94, text: 'Creating fractal zoom...', message: 'Calculating infinite patterns', effect: 'fractal' },
      { progress: 98, text: 'Activating kaleidoscope...', message: 'Reflecting reality fragments', effect: 'kaleidoscope' },
      { progress: 100, text: 'Welcome to the multiverse!', message: 'Portfolio.exe transcended', effect: 'complete' }
    ];

    let current_step = 0;
    const timer = setInterval(() => {
      if(current_step < loadingSteps.length) 
        {
        const step = loadingSteps[current_step];
        setProgress(step.progress);
        setLoadingText(step.text);
        setSystemMessage(step.message);
        
        switch(step.effect) 
        {
          case 'quantum': setQuantumEffect(true); setTimeout(() => setQuantumEffect(false), 1500); break;
          case 'dna': setVortex(true); setTimeout(() => setVortex(false), 2000); break;
          case 'cosmic': setPrismaticWave(true); setTimeout(() => setPrismaticWave(false), 1800); break;
          case 'neural': break;
          case 'digital': setDigitalRain(prev => [...prev]); break;// re-trigger digital rain
          case 'rift': setDimensionalRift(true); setTimeout(() => setDimensionalRift(false), 2200); break;
          case 'magnetic': setTimeWarp(true); setTimeout(() => setTimeWarp(false), 2000); break;
          case 'crystal': break; // crystals
          case 'hologram': setHologramEffect(true); setTimeout(() => setHologramEffect(false), 2000); break;
          case 'plasma': setPlasmaStorm(true); setTimeout(() => setPlasmaStorm(false), 1800); break;
          case 'accelerator': setParticleAccelerator(true); setTimeout(() => setParticleAccelerator(false), 2000); break;
          case 'blackhole': setBlackHole(true); setTimeout(() => setBlackHole(false), 2500); break;
          case 'aurora': setAuroraBorealis(true); setTimeout(() => setAuroraBorealis(false), 2000); break;
          case 'fractal': setFractalZoom(true); setTimeout(() => setFractalZoom(false), 1800); break;
          case 'kaleidoscope': setKaleidoscope(true); setTimeout(() => setKaleidoscope(false), 2000); break;
          case 'complete': setGlitchEffect(true); setNeonEffect(true); setVortex(true); setPrismaticWave(true);
            setTimeout(() => { setGlitchEffect(false); setNeonEffect(false); setVortex(false); setPrismaticWave(false); }, 1000); break;
        }
        
        // beep
        if([0, 3, 6, 9, 11].includes(current_step)) 
            {
          setIsBeeping(true);
          setTimeout(() => setIsBeeping(false), 200);
        }
        
        current_step++;
      } else 
      {
        clearInterval(timer);
        setTimeout(() => { 
            onComplete(); 
        }, 1500);
      }
    }, 800);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots(prev => {
        if(prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(dotsTimer);
  }, []);

  return (
    <div className = {`win98-loader ${isBeeping ? 'beep' : ''} ${glitchEffect ? 'glitch' : ''} ${crtEffect ? 'crt' : ''} ${hackingEffect ? 'hacking' : ''} ${neonEffect ? 'neon' : ''} ${cyberpunkMode ? 'cyberpunk' : ''} ${quantumEffect ? 'quantum' : ''}`} 
    style = {{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      minHeight: '100vh',
      background: cyberpunkMode ? 'linear-gradient(45deg, #0a0a0a, #1a0033, #330066)' : '#008080',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Matrix Rain Background */}
      <div className = "matrix-rain">
        {matrixRain.map(drop => (
          <div
            key = {drop.id}
            className = "matrix-drop"
            style = {{
              left: `${drop.x}%`,
              top: `${drop.y}%`,
              opacity: drop.opacity,
              animationDelay: `${drop.id * 0.1}s`
            }}
          >
            {drop.char}
          </div>
        ))}
      </div>

      {/* Digital Rain */}
      {digitalRain.length > 0 && (
        <div className = "digital-rain">
          {digitalRain.map(drop => (
            <div
              key = {drop.id}
              className = "digital-drop"
              style = {{
                left: `${drop.x}%`,
                top: `${drop.y}%`,
                opacity: drop.opacity,
                color: drop.color,
                animationDelay: `${drop.id * 0.05}s`
              }}
            >
              {drop.char}
            </div>
          ))}
        </div>
      )}

      {/* Particles */}
      <div className = "particles">
        {particles.map(particle => (
          <div
            key = {particle.id}
            className = "particle"
            style = {{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animationDelay: `${particle.id * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Data Stream */}
      {dataStream.length > 0 && (
        <div className = "data-stream">
          {dataStream.map(data => (
            <div
              key = {data.id}
              className = "data-chunk"
              style = {{
                left: `${data.x}%`,
                top: `${data.y}%`,
                animationDelay: `${data.id * 0.1}s`
              }}
            >
              {data.value}
            </div>
          ))}
        </div>
      )}

      {/* Scanlines */}
      {scanlines && <div className = "scanlines" />}

      {/* CRT Effect */}
      {crtEffect && <div className = "crt-overlay" />}

      {/* Hologram Effect */}
      {hologramEffect && <div className = "hologram-overlay" />}

      {/* Energy Field */}
      {energyField && <div className = "energy-field" />}

      {/* Circuit Effect */}
      {circuitEffect && (
        <div className = "circuit-overlay">
          <svg width = "100%" height = "100%" style = {{ position: 'absolute', top: 0, left: 0 }}>
            {[...Array(20)].map((_, i) => (
              <g key = {i}>
                <line 
                  x1 = {`${Math.random() * 100}%`} 
                  y1 = {`${Math.random() * 100}%`} 
                  x2 = {`${Math.random() * 100}%`} 
                  y2 = {`${Math.random() * 100}%`} 
                  stroke = "#00ffff" 
                  strokeWidth = "1" 
                  opacity = "0.5"
                  className = "circuit-line"
                />
                <circle 
                  cx = {`${Math.random() * 100}%`} 
                  cy = {`${Math.random() * 100}%`} 
                  r = "2" 
                  fill = "#00ffff" 
                  className = "circuit-node"
                />
              </g>
            ))}
          </svg>
        </div>
      )}

      {/* Laser Effect */}
      {laserEffect && (
        <div className = "laser-overlay">
          {[...Array(10)].map((_, i) => (
            <div
              key = {i}
              className = "laser-beam"
              style = {{
                left: `${i * 10}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Ripple Effect */}
      {rippleEffect && (
        <div className = "ripple-overlay">
          {[...Array(5)].map((_, i) => (
            <div
              key = {i}
              className = "ripple"
              style = {{
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* DNA Helix */}
      {isClient && dnaHelix.length > 0 && (
        <div className = "dna-helix">
          {dnaHelix.map(helix => (
            <div
              key = {helix.id}
              className = "dna-strand"
              style = {{
                left: `${helix.x}%`,
                top: `${helix.y}%`,
                transform: `rotate(${helix.rotation}deg)`,
                backgroundColor: helix.color
              }}
            />
          ))}
        </div>
      )}

      {/* Cosmic Dust */}
      {isClient && cosmicDust.length > 0 && (
        <div className = "cosmic-dust">
          {cosmicDust.map(dust => (
            <div
              key = {dust.id}
              className = "dust-particle"
              style = {{
                left: `${dust.x}%`,
                top: `${dust.y}%`,
                width: `${dust.size}px`,
                height: `${dust.size}px`,
                opacity: dust.opacity,
                animationDelay: `${dust.speed}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Magnetic Field */}
      {isClient && magneticField.length > 0 && (
        <div className = "magnetic-field">
          {magneticField.map(field => (
            <div
              key = {field.id}
              className = {`magnetic-node ${field.polarity}`}
              style = {{
                left: `${field.x}%`,
                top: `${field.y}%`,
                transform: `scale(${field.intensity / 100})`
              }}
            />
          ))}
        </div>
      )}

      {/* Crystal Formation */}
      {isClient && crystalFormation.length > 0 && (
        <div className = "crystal-formation">
          {crystalFormation.map(crystal => (
            <div
              key = {crystal.id}
              className = "crystal"
              style = {{
                left: `${crystal.x}%`,
                top: `${crystal.y}%`,
                width: `${crystal.size}px`,
                height: `${crystal.size}px`,
                backgroundColor: crystal.color,
                clipPath: `polygon(${Array.from({length: crystal.facets}, (_, i) => {
                  const angle = (i / crystal.facets) * 2 * Math.PI;
                  const x = 50 + 50 * Math.cos(angle);
                  const y = 50 + 50 * Math.sin(angle);
                  return `${x}% ${y}%`;
                }).join(', ')})`
              }}
            />
          ))}
        </div>
      )}

      {/* Neural Network */}
      {isClient && neuralNetwork.length > 0 && (
        <div className = "neural-network">
          <svg width = "100%" height = "100%" style = {{ position: 'absolute', top: 0, left: 0 }}>
            {neuralNetwork.map(neuron => (
              <g key = {neuron.id}>
                <circle
                  cx = {`${neuron.x}%`}
                  cy = {`${neuron.y}%`}
                  r = "3"
                  fill = {`hsl(${neuron.activity * 360}, 100%, 50%)`}
                  className = "neuron"
                  opacity = {neuron.activity}
                />
                {[...Array(neuron.connections)].map((_, i) => {
                  const targetNeuron = neuralNetwork[Math.floor(Math.random() * neuralNetwork.length)];
                  return (
                    <line
                      key = {i}
                      x1 = {`${neuron.x}%`}
                      y1 = {`${neuron.y}%`}
                      x2 = {`${targetNeuron.x}%`}
                      y2 = {`${targetNeuron.y}%`}
                      stroke = {`hsl(${(neuron.activity + targetNeuron.activity) * 180}, 100%, 50%)`}
                      strokeWidth = "1"
                      opacity = "0.3"
                      className = "neural-connection"
                    />
                  );
                })}
              </g>
            ))}
          </svg>
        </div>
      )}

      {/* Vortex Effect */}
      {vortex && (
        <div className = "vortex-overlay">
          {[...Array(10)].map((_, i) => (
            <div
              key = {i}
              className = "vortex-ring"
              style = {{
                animationDelay: `${i * 0.1}s`,
                transform: `scale(${1 + i * 0.2})`
              }}
            />
          ))}
        </div>
      )}

      {/* Prismatic Wave */}
      {prismaticWave && (
        <div className = "prismatic-wave">
          {[...Array(7)].map((_, i) => (
            <div
              key = {i}
              className = "wave-band"
              style = {{
                backgroundColor: `hsl(${i * 60}, 100%, 50%)`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Time Warp */}
      {timeWarp && (
        <div className = "time-warp">
          <div className = "warp-field" />
          <div className = "time-particles">
            {[...Array(50)].map((_, i) => (
              <div
                key = {i}
                className = "time-particle"
                style = {{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Dimensional Rift */}
      {dimensionalRift && (
        <div className = "dimensional-rift">
          <div className = "rift-core" />
          <div className = "rift-energy">
            {[...Array(20)].map((_, i) => (
              <div
                key = {i}
                className = "energy-bolt"
                style = {{
                  transform: `rotate(${i * 18}deg)`,
                  animationDelay: `${i * 0.05}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Kaleidoscope */}
      {kaleidoscope && (
        <div className = "kaleidoscope">
          {[...Array(12)].map((_, i) => (
            <div
              key = {i}
              className = "kaleidoscope-segment"
              style = {{
                transform: `rotate(${i * 30}deg)`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Plasma Storm */}
      {plasmaStorm && (
        <div className = "plasma-storm">
          {[...Array(30)].map((_, i) => (
            <div
              key = {i}
              className = "plasma-bolt"
              style = {{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Black Hole */}
      {blackHole && (
        <div className = "black-hole">
          <div className = "event-horizon" />
          <div className = "accretion-disk">
            {[...Array(15)].map((_, i) => (
              <div
                key = {i}
                className = "matter-stream"
                style = {{
                  transform: `rotate(${i * 24}deg)`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Particle Accelerator */}
      {particleAccelerator && (
        <div className = "particle-accelerator">
          <div className = "accelerator-ring" />
          {[...Array(40)].map((_, i) => (
            <div
              key = {i}
              className = "accelerated-particle"
              style = {{
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Fractal Zoom */}
      {fractalZoom && (
        <div className = "fractal-zoom">
          {[...Array(8)].map((_, i) => (
            <div
              key = {i}
              className = "fractal-layer"
              style = {{
                transform: `scale(${1 + i * 0.3}) rotate(${i * 45}deg)`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Aurora Borealis */}
      {auroraBorealis && (
        <div className = "aurora-borealis">
          {[...Array(6)].map((_, i) => (
            <div
              key = {i}
              className = "aurora-band"
              style = {{
                backgroundColor: `hsl(${120 + i * 40}, 100%, 50%)`,
                animationDelay: `${i * 0.3}s`,
                height: `${20 + i * 10}%`,
                top: `${10 + i * 5}%`
              }}
            />
          ))}
        </div>
      )}

      {/* Windows 98 Boot Logo */}
      <div className = "win98-loader-boot-screen win98-loader-startup" 
      style = {{
        padding: '40px',
        marginBottom: '30px',
        textAlign: 'center',
        background: 'rgba(192, 192, 192, 0.95)',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 30px rgba(0, 0, 255, 0.3)'
      }}>
        <div className = "win98-loader-title neon-text" 
        style = {{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000080',
          marginBottom: '10px'
        }}>
          Microsoft Windows 98
        </div>
        <div style = {{
          fontSize: '12px',
          color: '#000000',
          marginBottom: '20px'
        }}>
          Portfolio Edition
        </div>
        
        {/* Windows Logo */}
        <div className = "win98-loader-logo rotating-logo win98-logo-glow win98-icon-loader" 
        style = {{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #ff6b35, #f7931e, #ffd100, #7bc043)',
          border: '2px inset #c0c0c0',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          borderRadius: '50%',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <img 
            src = "https://win98icons.alexmeub.com/icons/png/windows-4.png" 
            alt = "Windows 98"
            style = {{
              width: '48px',
              height: '48px',
              imageRendering: 'pixelated',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
              zIndex: 2
            }}
            onError = {(e) => {
              e.target.src = "https://98.js.org/images/start.png";
              e.target.onerror = () => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%230078d4' d='M0 0h47v47H0z'/%3E%3Cpath fill='%2300bcf2' d='M53 0h47v47H53z'/%3E%3Cpath fill='%2300d455' d='M0 53h47v47H0z'/%3E%3Cpath fill='%23ffb900' d='M53 53h47v47H53z'/%3E%3C/svg%3E";
                e.target.onerror = () => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                };
              };
            }}
          />
          <div style = {{ display: 'none', fontSize: '32px', zIndex: 2 }}>🪟</div>
          
          {/* Sound Waves Animation */}
          <div className = "sound-waves">
            <div className = "sound-wave"></div>
            <div className = "sound-wave"></div>
            <div className = "sound-wave"></div>
            <div className = "sound-wave"></div>
          </div>
        </div>

        <div style = {{
          fontSize: '11px',
          color: '#666666'
        }}>
          Copyright © 1998 Maksym Kopychko
        </div>
      </div>

      {/* Loading Progress */}
      <div className = "loading-panel" 
      style = {{
        width: '400px',
        background: 'rgba(192, 192, 192, 0.9)',
        border: '2px inset #c0c0c0',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '5px',
        backdropFilter: 'blur(5px)'
      }}>
        <div className = "win98-loader-dots typewriter" 
        style = {{
          marginBottom: '15px',
          fontSize: '12px',
          color: '#000000'
        }}>
          {loadingText}
        </div>

        {/* Progress Bar */}
        <div className = "win98-loader-progress-bar rainbow-border">
          <div className = {`win98-loader-progress-fill ${progress === 100 ? 'complete' : ''}`} 
          style = {{ width: `${progress}%` }}>
            <div className = "win98-loader-progress-pattern" />
          </div>
        </div>

        <div style = {{
          fontSize: '11px',
          color: '#000000',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <span className = "pulse">Progress: {progress}%</span>
          <span style = {{ fontSize: '10px', color: '#666666' }}>
            {progress === 100 ? '✓ Complete' : '⏳ Loading...'}
          </span>
        </div>

        {/* System Message */}
        <div className = "system-console" 
        style = {{
          fontSize: '10px',
          color: '#00ff00',
          fontFamily: 'Courier New, monospace',
          textAlign: 'left',
          background: '#000000',
          border: '1px inset #c0c0c0',
          padding: '5px',
          minHeight: '16px',
          width: '100%',
          borderRadius: '2px'
        }}>        {systemMessage && (
          <span className = "typing-effect">
            {'>'}  {systemMessage}
            <span className = "cursor">█</span>
          </span>
        )}
        </div>
      </div>

      {/* System Info */}
      <div className = "system-info" 
      style = {{
        position: 'absolute',
        bottom: '50px',
        left: '20px',
        fontSize: '10px',
        color: 'rgba(255,255,255,0.8)',
        fontFamily: 'Courier New, monospace',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '5px',
        backdropFilter: 'blur(5px)'
      }}>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img src="https://win98icons.alexmeub.com/icons/png/computer-3.png" 
               style={{ width: '12px', height: '12px', imageRendering: 'pixelated' }} 
               onError={(e) => e.target.style.display = 'none'} />
          System: Windows 98 Portfolio Edition
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img src="https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png" 
               style={{ width: '12px', height: '12px', imageRendering: 'pixelated' }} 
               onError={(e) => e.target.style.display = 'none'} />
          Version: 4.10.1998 Build 1998
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img src="https://win98icons.alexmeub.com/icons/png/user-3.png" 
               style={{ width: '12px', height: '12px', imageRendering: 'pixelated' }} 
               onError={(e) => e.target.style.display = 'none'} />
          Owner: Maksym Kopychko
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img src="https://win98icons.alexmeub.com/icons/png/monitor-4.png" 
               style={{ width: '12px', height: '12px', imageRendering: 'pixelated' }} 
               onError={(e) => e.target.style.display = 'none'} />
          Resolution: {windowSize.width}x{windowSize.height}
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img src="https://win98icons.alexmeub.com/icons/png/memory-4.png" 
               style={{ width: '12px', height: '12px', imageRendering: 'pixelated' }} 
               onError={(e) => e.target.style.display = 'none'} />
          Memory: 128 MB RAM
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img src="https://win98icons.alexmeub.com/icons/png/network-4.png" 
               style={{ width: '12px', height: '12px', imageRendering: 'pixelated' }} 
               onError={(e) => e.target.style.display = 'none'} />
          Network: Connected
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img src="https://win98icons.alexmeub.com/icons/png/energy-4.png" 
               style={{ width: '12px', height: '12px', imageRendering: 'pixelated' }} 
               onError={(e) => e.target.style.display = 'none'} />
          Status: Optimized
        </div>
      </div>

      {/* Blinking Loading Indicator */}
      <div className = "win98-loader-blink floating" 
      style = {{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        fontSize: '10px',
        color: 'rgba(255,255,255,0.8)',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '5px 10px',
        borderRadius: '15px',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }}>
        <img 
          src="https://win98icons.alexmeub.com/icons/png/loader-2.png" 
          style={{ width: '12px', height: '12px', imageRendering: 'pixelated' }}
          onError={(e) => e.target.style.display = 'none'} 
        />
        Loading{dots}
      </div>

      {/* Loading Sparkles */}
      {isClient && (
        <div className = "sparkles">
          {sparkles.map((sparkle) => (
            <div
              key = {sparkle.id}
              className = "sparkle"
              style = {{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                animationDelay: `${sparkle.delay}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* Progress Fireworks */}
      {progress > 80 && isClient && (
        <div className = "fireworks">
          {fireworks.map((firework) => (
            <div
              key = {firework.id}
              className = "firework"
              style = {{
                left: `${firework.left}%`,
                top: `${firework.top}%`,
                animationDelay: `${firework.delay}s`
              }}
            >
              🎆
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Windows98Loader;

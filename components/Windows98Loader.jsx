"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

import windows_icon from '@/public/icons/win98/png/windows-0.png';
import computer_icon from '@/public/icons/win98/png/computer-0.png';
import cd_audio_icon from '@/public/icons/win98/png/cd_audio_cd_a-0.png';
import users_icon from '@/public/icons/win98/png/users-0.png';
import monitor_icon from '@/public/icons/win98/png/monitor_blue_grad-0.png';
import memory_icon from '@/public/icons/win98/png/memory-0.png';
import network_icon from '@/public/icons/win98/png/network-0.png';
import battery_icon from '@/public/icons/win98/png/battery.png';
import hourglass_icon from '@/public/icons/win98/png/application_hourglass-0.png';

const Windows98Loader = ({ onComplete }) => {
  const [progress, set_progress] = useState(0);
  const [loading_text, set_loading_text] = useState('Starting Windows...');
  const [dots, set_dots] = useState('');
  const [system_message, set_system_message] = useState('');
  const [is_beeping, set_is_beeping] = useState(false);
  const [window_size, set_window_size] = useState({ width: 1024, height: 768 });
  const [glitch_effect, set_glitch_effect] = useState(false);
  const [matrix_rain, set_matrix_rain] = useState([]);
  const [scanlines, set_scanlines] = useState(true);
  const [crt_effect, set_crt_effect] = useState(true);
  const [particles, set_particles] = useState([]);
  const [hacking_effect, set_hacking_effect] = useState(false);
  const [neon_effect, set_neon_effect] = useState(false);
  const [ripple_effect, set_ripple_effect] = useState(false);
  const [hologram_effect, setHologramEffect] = useState(false);
  const [data_stream, set_data_stream] = useState([]);
  const [circuit_effect, set_circuit_effect] = useState(false);
  const [waveform, set_waveform] = useState([]);
  const [laser_effect, set_laser_effect] = useState(false);
  const [cyberpunk_mode, set_cyberpunk_mode] = useState(false);
  const [terminal_hack, set_terminal_hack] = useState([]);
  const [digital_rain, set_digital_rain] = useState([]);
  const [energy_field, set_energy_field] = useState(false);
  const [quantum_effect, set_quantum_effect] = useState(false);
  const [sparkles, set_sparkles] = useState([]);
  const [fireworks, set_fireworks] = useState([]);
  const [is_client, set_is_client] = useState(false);
  
  const [dna_helix, set_dna_helix] = useState([]);
  const [vortex, set_vortex] = useState(false);
  const [prismatic_wave, set_prismatic_wave] = useState(false);
  const [cosmic_dust, set_cosmic_dust] = useState([]);
  const [time_warp, set_time_warp] = useState(false);
  const [dimensional_rift, set_dimensional_rift] = useState(false);
  const [kaleidoscope, set_kaleidoscope] = useState(false);
  const [magnetic_field, set_magnetic_field] = useState([]);
  const [plasma_storm, set_plasma_storm] = useState(false);
  const [black_hole, set_black_hole] = useState(false);
  const [crystal_formation, set_crystal_formation] = useState([]);
  const [neural_network, set_neural_network] = useState([]);
  const [particle_accelerator, set_particle_accelerator] = useState(false);
  const [fractal_zoom, set_fractal_zoom] = useState(false);
  const [aurora_borealis, set_aurora_borealis] = useState(false);

  useEffect(() => {
    set_is_client(true);
    
    const link98 = document.createElement('link');
    link98.rel = 'stylesheet';
    link98.href = 'https://unpkg.com/98.css';
    link98.id = 'win98-loader-css';
    document.head.appendChild(link98);

    const custom_link = document.createElement('link');
    custom_link.rel = 'stylesheet';
    custom_link.href = '/win98/win98.css';
    custom_link.id = 'win98-loader-custom-css';
    document.head.appendChild(custom_link);

    // matrix rain
    const generate_matrix_rain = () => {
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
      set_matrix_rain(drops);
    };

    const generate_particles = () => {
      const new_particles = [];

      for(let i = 0; i < 30; i++) 
        {
        new_particles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: ['#00ff00', '#0080ff', '#ff8000', '#ff0080'][Math.floor(Math.random() * 4)]
        });
      }
      set_particles(new_particles);
    };

    const generate_digital_rain = () => {
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
      set_digital_rain(drops);
    };

    const generate_terminal_hack = () => {
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
      set_terminal_hack(commands);
    };

    const generate_data_stream = () => {
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
      set_data_stream(data);
    };

    const generate_wave_form = () => {
      const wave = [];

      for(let i = 0; i < 100; i++) 
        {
        wave.push({
          id: i,
          height: Math.sin(i * 0.1) * 50 + 50,
          x: i
        });
      }
      set_waveform(wave);
    };

    const generate_sparkles = () => {
      const new_sparkles = [];

      for(let i = 0; i < 20; i++) 
        {
        new_sparkles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 2
        });
      }
      set_sparkles(new_sparkles);
    };

    const generate_fireworks = () => {
      const new_fireworks = [];

      for(let i = 0; i < 5; i++) 
        {
        new_fireworks.push({
          id: i,
          left: 20 + i * 15,
          top: 20 + i * 10,
          delay: i * 0.3
        });
      }
      set_fireworks(new_fireworks);
    };

    const generate_dna_helix = () => {
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
      set_dna_helix(helix);
    };

    // cosmic dust
    const generate_cosmic_dust = () => {
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
      set_cosmic_dust(dust);
    };

    // magnetic field
    const generate_magnetic_field = () => {
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
      set_magnetic_field(field);
    };

    // crystals
    const generate_crystal_formation = () => {
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
      set_crystal_formation(crystals);
    };

    
    const generate_neural_network = () => {
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
      set_neural_network(neurons);
    };

    generate_matrix_rain();
    generate_particles();
    generate_digital_rain();
    generate_terminal_hack();
    generate_data_stream();
    generate_wave_form();
    generate_sparkles();
    generate_fireworks();
    generate_dna_helix();
    generate_cosmic_dust();
    generate_magnetic_field();
    generate_crystal_formation();
    generate_neural_network();

    if(typeof window !== 'undefined') 
        {
      set_window_size({
        width: window.innerWidth,
        height: window.innerHeight
      });

      const handle_resize = () => {
        set_window_size({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handle_resize);
      
      return () => {
        window.removeEventListener('resize', handle_resize);
        const existing_link = document.getElementById('win98-loader-css');
        
        if(existing_link) 
            {
          document.head.removeChild(existing_link);
        }
        const existing_custom_link = document.getElementById('win98-loader-custom-css');
        
        if(existing_custom_link) 
            {
          document.head.removeChild(existing_custom_link);
        }
      };
    }

    return () => {
      const existing_link = document.getElementById('win98-loader-css');
      
      if(existing_link) 
        {
        document.head.removeChild(existing_link);
      }
      const existing_custom_link = document.getElementById('win98-loader-custom-css');
      
      if(existing_custom_link) 
        {
        document.head.removeChild(existing_custom_link);
      }
    };
  }, []);

  useEffect(() => {
    const loading_steps = [
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
      if(current_step < loading_steps.length) 
        {
        const step = loading_steps[current_step];
        set_progress(step.progress);
        set_loading_text(step.text);
        set_system_message(step.message);
        
        switch(step.effect) 
        {
          case 'quantum': set_quantum_effect(true); setTimeout(() => set_quantum_effect(false), 1500); break;
          case 'dna': set_vortex(true); setTimeout(() => set_vortex(false), 2000); break;
          case 'cosmic': set_prismatic_wave(true); setTimeout(() => set_prismatic_wave(false), 1800); break;
          case 'neural': break;
          case 'digital': set_digital_rain(prev => [...prev]); break;// re-trigger digital rain
          case 'rift': set_dimensional_rift(true); setTimeout(() => set_dimensional_rift(false), 2200); break;
          case 'magnetic': set_time_warp(true); setTimeout(() => set_time_warp(false), 2000); break;
          case 'crystal': break; // crystals
          case 'hologram': setHologramEffect(true); setTimeout(() => setHologramEffect(false), 2000); break;
          case 'plasma': set_plasma_storm(true); setTimeout(() => set_plasma_storm(false), 1800); break;
          case 'accelerator': set_particle_accelerator(true); setTimeout(() => set_particle_accelerator(false), 2000); break;
          case 'blackhole': set_black_hole(true); setTimeout(() => set_black_hole(false), 2500); break;
          case 'aurora': set_aurora_borealis(true); setTimeout(() => set_aurora_borealis(false), 2000); break;
          case 'fractal': set_fractal_zoom(true); setTimeout(() => set_fractal_zoom(false), 1800); break;
          case 'kaleidoscope': set_kaleidoscope(true); setTimeout(() => set_kaleidoscope(false), 2000); break;
          case 'complete': set_glitch_effect(true); set_neon_effect(true); set_vortex(true); set_prismatic_wave(true);
            setTimeout(() => { set_glitch_effect(false); set_neon_effect(false); set_vortex(false); set_prismatic_wave(false); }, 1000); break;
        }
        
        // beep
        if([0, 3, 6, 9, 11].includes(current_step)) 
            {
          set_is_beeping(true);
          setTimeout(() => set_is_beeping(false), 200);
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
    const dots_timer = setInterval(() => {
      set_dots(prev => {
        if(prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(dots_timer);
  }, []);

  return (
    <div className = {`win98-loader ${is_beeping ? 'beep' : ''} ${glitch_effect ? 'glitch' : ''} ${crt_effect ? 'crt' : ''} ${hacking_effect ? 'hacking' : ''} ${neon_effect ? 'neon' : ''} ${cyberpunk_mode ? 'cyberpunk' : ''} ${quantum_effect ? 'quantum' : ''}`} 
    style = {{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      minHeight: '100vh',
      background: cyberpunk_mode ? 'linear-gradient(45deg, #0a0a0a, #1a0033, #330066)' : '#008080',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Matrix Rain Background */}
      <div className = "matrix-rain">
        {matrix_rain.map(drop => (
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
      {digital_rain.length > 0 && (
        <div className = "digital-rain">
          {digital_rain.map(drop => (
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
      {data_stream.length > 0 && (
        <div className = "data-stream">
          {data_stream.map(data => (
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
      {crt_effect && <div className = "crt-overlay" />}

      {/* Hologram Effect */}
      {hologram_effect && <div className = "hologram-overlay" />}

      {/* Energy Field */}
      {energy_field && <div className = "energy-field" />}

      {/* Circuit Effect */}
      {circuit_effect && (
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
      {laser_effect && (
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
      {ripple_effect && (
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
      {is_client && dna_helix.length > 0 && (
        <div className = "dna-helix">
          {dna_helix.map(helix => (
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
      {is_client && cosmic_dust.length > 0 && (
        <div className = "cosmic-dust">
          {cosmic_dust.map(dust => (
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
      {is_client && magnetic_field.length > 0 && (
        <div className = "magnetic-field">
          {magnetic_field.map(field => (
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
      {is_client && crystal_formation.length > 0 && (
        <div className = "crystal-formation">
          {crystal_formation.map(crystal => (
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
      {is_client && neural_network.length > 0 && (
        <div className = "neural-network">
          <svg width = "100%" height = "100%" style = {{ position: 'absolute', top: 0, left: 0 }}>
            {neural_network.map(neuron => (
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
                  const target_neuron = neural_network[Math.floor(Math.random() * neural_network.length)];
                  return (
                    <line
                      key = {i}
                      x1 = {`${neuron.x}%`}
                      y1 = {`${neuron.y}%`}
                      x2 = {`${target_neuron.x}%`}
                      y2 = {`${target_neuron.y}%`}
                      stroke = {`hsl(${(neuron.activity + target_neuron.activity) * 180}, 100%, 50%)`}
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
      {prismatic_wave && (
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
      {time_warp && (
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
      {dimensional_rift && (
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
      {plasma_storm && (
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
      {black_hole && (
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
      {particle_accelerator && (
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
      {fractal_zoom && (
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
      {aurora_borealis && (
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
          <Image 
            src = {windows_icon}
            alt = "Windows 98"
            width = {48}
            height = {48}
            style = {{
              imageRendering: 'pixelated',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
              zIndex: 2
            }}
            onError = {(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
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
          Copyright © 1998 Archie242
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
          {loading_text}
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
        }}>        {system_message && (
          <span className = "typing-effect">
            {'>'}  {system_message}
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
          <Image src = {computer_icon}
               alt = "Computer"
               width = {12}
               height = {12}
               style = {{ imageRendering: 'pixelated' }} 
               onError = {(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '<span>💻</span>'); }} />
          System: Windows 98 Portfolio Edition
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Image src = {cd_audio_icon}
               alt = "CD Audio"
               width = {12}
               height = {12}
               style = {{ imageRendering: 'pixelated' }} 
               onError = {(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '<span>💿</span>'); }} />
          Version: 4.10.1998 Build 1998
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Image src = {users_icon}
               alt = "User"
               width = {12}
               height = {12}
               style = {{ imageRendering: 'pixelated' }} 
               onError = {(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '<span>👤</span>'); }} />
          Owner: Maksym Kopychko
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Image src = {monitor_icon}
               alt = "Monitor"
               width = {12}
               height = {12}
               style = {{ imageRendering: 'pixelated' }} 
               onError = {(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '<span>🖥️</span>'); }} />
          Resolution: {window_size.width}x{window_size.height}
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Image src = {memory_icon}
               alt = "Memory"
               width = {12}
               height = {12}
               style = {{ imageRendering: 'pixelated' }} 
               onError = {(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '<span>💾</span>'); }} />
          Memory: 128 MB RAM
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Image src = {network_icon}
               alt = "Network"
               width = {12}
               height = {12}
               style = {{ imageRendering: 'pixelated' }} 
               onError = {(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '<span>🌐</span>'); }} />
          Network: Connected
        </div>
        <div className = "fade-in" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Image src = {battery_icon}
               alt = "Battery"
               width = {12}
               height = {12}
               style = {{ imageRendering: 'pixelated' }} 
               onError = {(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '<span>⚡</span>'); }} />
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
        <Image 
          src = {hourglass_icon}
          alt = "Loading"
          width = {12}
          height = {12}
          style = {{ imageRendering: 'pixelated' }}
          onError = {(e) => { e.target.style.display = 'none'; e.target.insertAdjacentHTML('afterend', '<span>⏳</span>'); }} 
        />
        Loading{dots}
      </div>

      {/* Loading Sparkles */}
      {is_client && (
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
      {progress > 80 && is_client && (
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

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MinecraftBlock, 
  Inventory, 
  MinecraftButton, 
  MinecraftInput, 
  MinecraftItem, 
  PlayerInterface,
  BreakingBlock,
  StarField
} from "@/components/PixelArt";

const Contact = () => {
  const [gameState, setGameState] = useState("idle"); // idle, active, success, error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [miningStage, setMiningStage] = useState(0);
  const [playerStats, setPlayerStats] = useState({
    health: 10,
    hunger: 10,
    xp: 0
  });
  
  // Ефект для збільшення XP при введенні даних
  useEffect(() => {
    if (gameState === "active") {
      const nameProgress = formData.name ? 20 : 0;
      const emailProgress = formData.email ? 30 : 0;
      const messageProgress = formData.message ? formData.message.length > 50 ? 50 : 30 : 0;
      
      const totalProgress = Math.min(nameProgress + emailProgress + messageProgress, 100);
      
      setPlayerStats(prev => ({
        ...prev,
        xp: totalProgress
      }));
    }
  }, [formData, gameState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Імітуємо копання блоку
    setMiningStage(1);
    setIsSubmitting(true);
    
    try {
      // Використовуємо наданий ID Formspree
      const response = await fetch("https://formspree.io/f/xovepgar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      
      if (response.ok) {
        // Успішно відправлено
        setGameState("success");
        
        // Повернення до початкового стану через 5 секунд
        setTimeout(() => {
          setGameState("idle");
          setFormData({ name: "", email: "", message: "" });
          setMiningStage(0);
          setPlayerStats({
            health: 10,
            hunger: 10,
            xp: 0
          });
        }, 5000);
      } else {
        // Помилка відправки
        const error = await response.json();
        throw new Error(error.message || "Помилка відправки форми");
      }
    } catch (error) {
      setErrorMessage(error.message || "Щось пішло не так. Спробуйте ще раз.");
      setGameState("error");
      
      // Зменшуємо здоров'я гравця при помилці
      setPlayerStats(prev => ({
        ...prev,
        health: Math.max(prev.health - 3, 0)
      }));
      
      // Повернення до форми через 3 секунди
      setTimeout(() => {
        setGameState("active");
        setErrorMessage("");
      }, 3000);
    } finally {
      setIsSubmitting(false);
      setMiningStage(0);
    }
  };

  const handleStartGame = () => {
    // Імітуємо початок гри
    setGameState("active");
  };

  return (
    <section className = "min-h-screen py-12 relative overflow-hidden cave-bg">
      {/* Зоряний фон для всієї сторінки */}
      <div className = "absolute inset-0">
        <StarField count = {50} />
      </div>
      
      <div className = "container mx-auto relative z-10">
        <motion.h1 
          className = "text-4xl text-center mb-12 minecraft-font text-yellow-300"
          animate = {{ y: [0, -5, 0] }}
          transition = {{ duration: 2, repeat: Infinity }}
        >
          Зв'яжіться <span className = "text-green-400">зі мною</span>
        </motion.h1>
        
        {/* Інтерфейс гравця */}
        <div className = "max-w-4xl mx-auto mb-8">
          <PlayerInterface 
            health = {playerStats.health} 
            hunger = {playerStats.hunger} 
            xp = {playerStats.xp} 
          />
        </div>
        
        {/* Основний контейнер */}
        <div className = "max-w-4xl mx-auto">
          <div className = "relative">
            {/* Стан "Почати гру" */}
            {gameState === "idle" && (
              <div className = "bg-gray-900/80 p-8 border-4 border-gray-800 pixelated">
                <div className = "flex flex-col items-center justify-center space-y-8">
                  <motion.div
                    className = "mb-8"
                    animate = {{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition = {{ repeat: Infinity, duration: 3 }}
                  >
                    <MinecraftBlock type = "diamond" className = "w-32 h-32 flex items-center justify-center">
                      <div className = "w-24 h-24 bg-gray-700 flex items-center justify-center text-white minecraft-font">
                        AVATAR
                      </div>
                    </MinecraftBlock>
                  </motion.div>
                  
                  <motion.p 
                    className = "text-yellow-300 text-2xl mb-10 minecraft-font"
                    animate = {{ y: [0, -5, 0] }}
                    transition = {{ duration: 1.5, repeat: Infinity }}
                  >
                    НАТИСНІТЬ ЩОБ ПОЧАТИ
                  </motion.p>
                  
                  <MinecraftButton 
                    text = "ПОЧАТИ ГРУ" 
                    onClick = {handleStartGame} 
                  />
                </div>
              </div>
            )}
            
            {/* Форма контактів */}
            {gameState === "active" && (
              <motion.div 
                initial = {{ opacity: 0, scale: 0 }}
                animate = {{ opacity: 1, scale: 1 }}
                transition = {{ duration: 0.5 }}
                className = "block-appear"
              >
                <Inventory>
                  <div className = "flex flex-col md:flex-row gap-8">
                    {/* Ліва частина - крафтінг-стіл */}
                    <div className = "w-full md:w-1/3">
                      <div className = "text-center mb-4">
                        <h3 className = "text-xl text-yellow-300 minecraft-font">ІНВЕНТАР</h3>
                      </div>
                      
                      <div className = "grid grid-cols-3 gap-2 mb-6">
                        <MinecraftBlock type = "dirt" className = "h-16 w-full" />
                        <MinecraftBlock type = "stone" className = "h-16 w-full" />
                        <MinecraftBlock type = "wood" className = "h-16 w-full" />
                        <MinecraftBlock type = "diamond" className = "h-16 w-full" />
                        <MinecraftBlock type = "gold" className = "h-16 w-full" />
                        <MinecraftBlock type = "redstone" className = "h-16 w-full" />
                        <MinecraftBlock type = "obsidian" className = "h-16 w-full" />
                        <MinecraftBlock type = "leaves" className = "h-16 w-full" />
                        <MinecraftBlock type = "bookshelf" className = "h-16 w-full" />
                      </div>
                      
                      <div className = "text-center mb-4">
                        <h3 className = "text-xl text-yellow-300 minecraft-font">ІНСТРУМЕНТИ</h3>
                      </div>
                      
                      <div className = "flex justify-center space-x-4 mb-6">
                        <MinecraftItem type = "pickaxe" animate = {isSubmitting} />
                        <MinecraftItem type = "sword" />
                        <MinecraftItem type = "axe" />
                      </div>
                      
                      {miningStage > 0 && (
                        <div className = "mt-8 flex justify-center">
                          <BreakingBlock 
                            type = "diamond" 
                            stage = {miningStage} 
                            onComplete = {() => setMiningStage(0)} 
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Права частина - форма */}
                    <div className = "w-full md:w-2/3">
                      <div className = "text-center mb-4">
                        <h3 className = "text-xl text-yellow-300 minecraft-font">КРАФТІНГ ПОВІДОМЛЕННЯ</h3>
                      </div>
                      
                      <form onSubmit = {handleSubmit} className = "space-y-5">
                        <div>
                          <label className = "block text-yellow-300 mb-2 minecraft-font">
                            ІМ'Я ГРАВЦЯ:
                          </label>
                          <MinecraftInput 
                            type = "text" 
                            name = "name" 
                            value = {formData.name} 
                            onChange = {handleChange}
                            required
                            placeholder = "Введіть ваше ім'я"
                          />
                        </div>
                        
                        <div>
                          <label className = "block text-yellow-300 mb-2 minecraft-font">
                            КОД ЗВ'ЯЗКУ:
                          </label>
                          <MinecraftInput 
                            type = "email" 
                            name = "email" 
                            value = {formData.email} 
                            onChange = {handleChange}
                            required
                            placeholder = "Введіть вашу електронну пошту"
                          />
                        </div>
                        
                        <div>
                          <label className = "block text-yellow-300 mb-2 minecraft-font">
                            ВАШЕ ЗАВДАННЯ:
                          </label>
                          <MinecraftInput 
                            type = "textarea" 
                            name = "message" 
                            value = {formData.message} 
                            onChange = {handleChange}
                            required
                            rows = "4"
                            placeholder = "Опишіть ваше повідомлення"
                          />
                        </div>
                        
                        <div className = "text-center pt-5">
                          <MinecraftButton 
                            text = {isSubmitting ? "ВІДПРАВКА..." : "ВІДПРАВИТИ ПОВІДОМЛЕННЯ"} 
                            type = "submit"
                            disabled = {isSubmitting}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </Inventory>
              </motion.div>
            )}
            
            {/* Успішне відправлення */}
            {gameState === "success" && (
              <motion.div 
                initial = {{ opacity: 0 }}
                animate = {{ opacity: 1 }}
                className = "bg-gray-900/80 p-8 border-4 border-gray-800 pixelated"
              >
                <div className = "flex flex-col items-center justify-center">
                  <motion.h3 
                    className = "text-2xl text-green-400 mb-6 minecraft-font"
                    animate = {{ 
                      scale: [1, 1.1, 1], 
                      y: [0, -5, 0]
                    }}
                    transition = {{ duration: 2, repeat: Infinity }}
                  >
                    ЗАВДАННЯ ВИКОНАНО!
                  </motion.h3>
                  <p className = "text-white text-center mb-8 minecraft-font">Ваше повідомлення було успішно відправлено.</p>
                  
                  <div className = "grid grid-cols-3 gap-4 mb-8">
                    <MinecraftBlock type = "diamond" className = "h-16 w-16 block-appear" />
                    <MinecraftBlock type = "gold" className = "h-16 w-16 block-appear" />
                    <MinecraftBlock type = "diamond" className = "h-16 w-16 block-appear" />
                  </div>
                  
                  <div className = "flex space-x-6">
                    <motion.div 
                      className = "text-center"
                      animate = {{ 
                        y: [0, -5, 0]
                      }}
                      transition = {{ repeat: Infinity, duration: 2 }}
                    >
                      <div className = "text-yellow-300 text-4xl minecraft-font mb-2">+100 XP</div>
                      <div className = "text-white minecraft-font">ДЯКУЮ!</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Помилка відправлення */}
            {gameState === "error" && (
              <motion.div 
                initial = {{ opacity: 0 }}
                animate = {{ opacity: 1 }}
                className = "bg-gray-900/80 p-8 border-4 border-gray-800 pixelated"
              >
                <div className = "flex flex-col items-center justify-center">
                  <motion.h3 
                    className = "text-2xl text-red-500 mb-6 minecraft-font"
                    animate = {{ 
                      scale: [1, 1.1, 1], 
                      y: [0, -5, 0]
                    }}
                    transition = {{ duration: 2, repeat: Infinity }}
                  >
                    GAME OVER!
                  </motion.h3>
                  <p className = "text-white text-center mb-8 minecraft-font">{errorMessage}</p>
                  
                  <div className = "grid grid-cols-3 gap-4 mb-8">
                    <MinecraftBlock type = "lava" className = "h-16 w-16" />
                    <MinecraftBlock type = "bedrock" className = "h-16 w-16" />
                    <MinecraftBlock type = "lava" className = "h-16 w-16" />
                  </div>
                  
                  <div className = "flex space-x-6">
                    <motion.div 
                      className = "text-center"
                      animate = {{ 
                        y: [0, -5, 0]
                      }}
                      transition = {{ repeat: Infinity, duration: 2 }}
                    >
                      <div className = "text-red-500 text-4xl minecraft-font mb-2">ПОМИЛКА</div>
                      <div className = "text-white minecraft-font">СПРОБУЙТЕ ЩЕ РАЗ</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
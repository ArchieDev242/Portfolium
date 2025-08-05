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
  const [game_state, set_game_state] = useState("idle"); // idle, active, success, error
  const [form_data, set_form_data] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [is_submitting, set_is_submitting] = useState(false);
  const [error_message, set_error_message] = useState("");
  const [mining_stage, set_mining_stage] = useState(0);
  const [player_stats, set_player_stats] = useState({
    health: 10,
    hunger: 10,
    xp: 0
  });
  
  useEffect(() => {
    if(game_state === "active") 
      {
      const name_progress = form_data.name ? 20 : 0;
      const email_progress = form_data.email ? 30 : 0;
      const message_progress = form_data.message ? form_data.message.length > 50 ? 50 : 30 : 0;
      
      const total_progress = Math.min(name_progress + email_progress + message_progress, 100);
      
      set_player_stats(prev => ({
        ...prev,
        xp: total_progress
      }));
    }
  }, [form_data, game_state]);

  const handle_change = (e) => {
    const { name, value } = e.target;
    set_form_data(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    
    set_mining_stage(1);
    set_is_submitting(true);
    
    try 
    {
      const response = await fetch("https://formspree.io/f/xovepgar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form_data.name,
          email: form_data.email,
          message: form_data.message,
        }),
      });
      
      if(response.ok) 
        {
        set_game_state("success");
        
        setTimeout(() => {
          set_game_state("idle");
          set_form_data({ name: "", email: "", message: "" });
          set_mining_stage(0);
          set_player_stats({
            health: 10,
            hunger: 10,
            xp: 0
          });
        }, 5000);
      } else 
      {
        const error = await response.json();
        throw new Error(error.message || "Помилка відправки форми");
      }
    } catch(error) 
    {
      set_error_message(error.message || "Щось пішло не так. Спробуйте ще раз.");
      set_game_state("error");
      
      set_player_stats(prev => ({
        ...prev,
        health: Math.max(prev.health - 3, 0)
      }));
      
      setTimeout(() => {
        set_game_state("active");
        set_error_message("");
      }, 3000);
    } finally 
    {
      set_is_submitting(false);
      set_mining_stage(0);
    }
  };

  const handle_start_game = () => {
    set_game_state("active");
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
            health = {player_stats.health} 
            hunger = {player_stats.hunger} 
            xp = {player_stats.xp} 
          />
        </div>
        
        {/* Основний контейнер */}
        <div className = "max-w-4xl mx-auto">
          <div className = "relative">
            {/* Стан "Почати гру" */}
            {game_state === "idle" && (
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
                    onClick = {handle_start_game} 
                  />
                </div>
              </div>
            )}
            
            {/* Форма контактів */}
            {game_state === "active" && (
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
                        <MinecraftItem type = "pickaxe" animate = {is_submitting} />
                        <MinecraftItem type = "sword" />
                        <MinecraftItem type = "axe" />
                      </div>
                      
                      {mining_stage > 0 && (
                        <div className = "mt-8 flex justify-center">
                          <BreakingBlock 
                            type = "diamond" 
                            stage = {mining_stage} 
                            onComplete = {() => set_mining_stage(0)} 
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Права частина - форма */}
                    <div className = "w-full md:w-2/3">
                      <div className = "text-center mb-4">
                        <h3 className = "text-xl text-yellow-300 minecraft-font">КРАФТІНГ ПОВІДОМЛЕННЯ</h3>
                      </div>
                      
                      <form onSubmit = {handle_submit} className = "space-y-5">
                        <div>
                          <label className = "block text-yellow-300 mb-2 minecraft-font">
                            ІМ'Я ГРАВЦЯ:
                          </label>
                          <MinecraftInput 
                            type = "text" 
                            name = "name" 
                            value = {form_data.name} 
                            onChange = {handle_change}
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
                            value = {form_data.email} 
                            onChange = {handle_change}
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
                            value = {form_data.message} 
                            onChange = {handle_change}
                            required
                            rows = "4"
                            placeholder = "Опишіть ваше повідомлення"
                          />
                        </div>
                        
                        <div className = "text-center pt-5">
                          <MinecraftButton 
                            text = {is_submitting ? "ВІДПРАВКА..." : "ВІДПРАВИТИ ПОВІДОМЛЕННЯ"} 
                            type = "submit"
                            disabled = {is_submitting}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </Inventory>
              </motion.div>
            )}
            
            {/* Успішне відправлення */}
            {game_state === "success" && (
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
            {game_state === "error" && (
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
                  <p className = "text-white text-center mb-8 minecraft-font">{error_message}</p>
                  
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
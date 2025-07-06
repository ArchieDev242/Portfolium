"use client";

import React, { useState } from 'react';
import Windows98Window from './Windows98Window';

const Windows98Contact = ({ onClose, onFocus, isActive, zIndex }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handle_change = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("Sending message...");
    
    try 
    {
      const response = await fetch("https://formspree.io/f/xovepgar", {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      
      if(response.ok) 
        {
        setSubmitStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus(""), 3000);
      } else 
      {
        throw new Error("Failed to send message");
      }
    } catch(error) 
    {
      setSubmitStatus("Error sending message. Please try again.");
      setTimeout(() => setSubmitStatus(""), 3000);
    } finally 
    {
      setIsSubmitting(false);
    }
  };

  return (
    <Windows98Window
      title = "Contact Form"
      icon = "https://win98icons.alexmeub.com/icons/png/mail-4.png"
      onClose = {onClose}
      onFocus = {onFocus}
      isActive = {isActive}
      zIndex = {zIndex}
      width = {600}
      height = {500}
      resizable = {true}
      maximizable = {false}
    >
      <div style = {{ fontFamily: 'MS Sans Serif, sans-serif', fontSize: '11px' }}>
        <fieldset style = {{ marginBottom: '15px' }}>
          <legend style = {{ fontWeight: 'bold' }}>📧 Send me a message</legend>
          <div style = {{ padding: '15px' }}>
            <form onSubmit = {handle_submit}>
              {/* Name Field */}
              <div className = "field-row-stacked" style = {{ marginBottom: '15px' }}>
                <label htmlFor = "name" style = {{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                  Name:
                </label>
                <input
                  type = "text"
                  id = "name"
                  name = "name"
                  value = {formData.name}
                  onChange = {handle_change}
                  required
                  style = {{ width: '100%', padding: '4px', fontSize: '11px' }}
                  placeholder = "Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div className = "field-row-stacked" style={{ marginBottom: '15px' }}>
                <label htmlFor = "email" style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                  Email:
                </label>
                <input
                  type = "email"
                  id = "email"
                  name = "email"
                  value = {formData.email}
                  onChange = {handle_change}
                  required
                  style = {{ width: '100%', padding: '4px', fontSize: '11px' }}
                  placeholder = "your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div className = "field-row-stacked" style = {{ marginBottom: '20px' }}>
                <label htmlFor = "message" style = {{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                  Message:
                </label>
                <textarea
                  id = "message"
                  name = "message"
                  value = {formData.message}
                  onChange = {handle_change}
                  required
                  rows = {8}
                  style = {{ 
                    width: '100%', 
                    padding: '4px', 
                    fontSize: '11px',
                    resize: 'vertical',
                    fontFamily: 'MS Sans Serif, sans-serif'
                  }}
                  placeholder = "Type your message here..."
                />
              </div>

              {/* Submit Button */}
              <div style = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  type = "submit"
                  disabled = {isSubmitting}
                  className = {isSubmitting ? "" : "default"}
                  style = {{ 
                    minWidth: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    justifyContent: 'center'
                  }}
                >
                  <img 
                    src = "https://win98icons.alexmeub.com/icons/png/send-4.png"
                    alt = "Send"
                    style = {{ width: '16px', height: '16px', imageRendering: 'pixelated' }}
                  />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                <button 
                  type = "button"
                  onClick = {() => setFormData({ name: "", email: "", message: "" })}
                  style = {{ 
                    minWidth: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    justifyContent: 'center'
                  }}
                >
                  <img 
                    src = "https://win98icons.alexmeub.com/icons/png/refresh-4.png"
                    alt = "Clear"
                    style = {{ width: '16px', height: '16px', imageRendering: 'pixelated' }}
                  />
                  Clear
                </button>
              </div>
            </form>
          </div>
        </fieldset>

        {/* Contact Information */}
        <fieldset style = {{ marginBottom: '15px' }}>
          <legend style = {{ fontWeight: 'bold' }}>📞 Contact Information</legend>
          <div style = {{ padding: '10px' }}>
            <div style = {{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <img 
                src = "https://win98icons.alexmeub.com/icons/png/mail-4.png"
                alt = "Email"
                style = {{ width: '16px', height: '16px', imageRendering: 'pixelated', marginRight: '8px' }}
              />
              <strong>Email:</strong>&nbsp;maksym.kopychko@gmail.com
            </div>
            <div style = {{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <img 
                src = "https://win98icons.alexmeub.com/icons/png/phone-4.png"
                alt = "Phone"
                style = {{ width: '16px', height: '16px', imageRendering: 'pixelated', marginRight: '8px' }}
              />
              <strong>Phone:</strong>&nbsp;+380669702817
            </div>
            <div style = {{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <img 
                src = "https://win98icons.alexmeub.com/icons/png/globe-4.png"
                alt = "Location"
                style = {{ width: '16px', height: '16px', imageRendering: 'pixelated', marginRight: '8px' }}
              />
              <strong>Location:</strong>&nbsp;Okhtyrka, Sumy Region, Ukraine
            </div>
          </div>
        </fieldset>

        {/* Status Bar */}
        <div className = "status-bar">
          <div className = "status-bar-field">
            {submitStatus || "Ready to send your message"}
          </div>
          <div className = "status-bar-field">
            {submitStatus ? (submitStatus.includes("success") ? "✓" : submitStatus.includes("Error") ? "✗" : "⏳") : "📧"}
          </div>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Windows98Contact;

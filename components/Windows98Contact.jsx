"use client";

import React, { useState } from 'react';
import Windows98Window from './Windows98Window';

const Win98_contact = ({ onClose, onFocus, isActive, zIndex }) => {
  const [form_data, set_form_data] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [is_submitting, set_is_submitting] = useState(false);
  const [submit_status, set_submit_status] = useState("");

  const handle_change = (e) => {
    const { name, value } = e.target;
    set_form_data(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    set_is_submitting(true);
    set_submit_status("Sending message...");
    
    try 
    {
      const response = await fetch("https://formspree.io/f/xovepgar", {
        method: "POST",
        headers: 
        {
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
        set_submit_status("Message sent successfully!");
        set_form_data({ name: "", email: "", message: "" });
        setTimeout(() => set_submit_status(""), 3000);
      } else 
      {
        throw new Error("Failed to send message");
      }
    } catch(error) 
    {
      set_submit_status("Error sending message. Please try again.");
      setTimeout(() => set_submit_status(""), 3000);
    } finally 
    {
      set_is_submitting(false);
    }
  };

  return (
    <Windows98Window
      title = "Contact Form"
      icon = "./icons/win98/png/envelope_closed-0.png"
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
                  value = {form_data.name}
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
                  value = {form_data.email}
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
                  value = {form_data.message}
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
                  disabled = {is_submitting}
                  className = {is_submitting ? "" : "default"}
                  style = {{ 
                    minWidth: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    justifyContent: 'center'
                  }}
                >
                  <img 
                    src = "./icons/win98/png/envelope_open_sheet-0.png"
                    alt = "Send"
                    style = {{ width: '16px', height: '16px', imageRendering: 'pixelated' }}
                    onError = {(e) => {
                      e.target.style.display = 'none';
                      e.target.insertAdjacentHTML('afterend', '<span>📧</span>');
                    }}
                  />
                  {is_submitting ? 'Sending...' : 'Send Message'}
                </button>

                <button 
                  type = "button"
                  onClick = {() => set_form_data({ name: "", email: "", message: "" })}
                  style = {{ 
                    minWidth: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    justifyContent: 'center'
                  }}
                >
                  <img 
                    src = "./icons/win98/png/overlay_refresh-0.png"
                    alt = "Clear"
                    style = {{ width: '16px', height: '16px', imageRendering: 'pixelated' }}
                    onError = {(e) => {
                      e.target.style.display = 'none';
                      e.target.insertAdjacentHTML('afterend', '<span>🔄</span>');
                    }}
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
                src = "./icons/win98/png/envelope_closed-0.png"
                alt = "Email"
                style = {{ width: '16px', height: '16px', imageRendering: 'pixelated', marginRight: '8px' }}
                onError = {(e) => {
                  e.target.style.display = 'none';
                  e.target.insertAdjacentHTML('afterend', '<span>📧</span>');
                }}
              />
              <strong>Email:</strong>&nbsp;maksym.kopychko@gmail.com
            </div>
            <div style = {{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <img 
                src = "./icons/win98/png/world_phonereceiver.png"
                alt = "Phone"
                style = {{ width: '16px', height: '16px', imageRendering: 'pixelated', marginRight: '8px' }}
                onError = {(e) => {
                  e.target.style.display = 'none';
                  e.target.insertAdjacentHTML('afterend', '<span>📞</span>');
                }}
              />
              <strong>Phone:</strong>&nbsp;+380669702817
            </div>
            <div style = {{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <img 
                src = "./icons/win98/png/globe_map-0.png"
                alt = "Location"
                style = {{ width: '16px', height: '16px', imageRendering: 'pixelated', marginRight: '8px' }}
                onError = {(e) => {
                  e.target.style.display = 'none';
                  e.target.insertAdjacentHTML('afterend', '<span>🌍</span>');
                }}
              />
              <strong>Location:</strong>&nbsp;Okhtyrka, Sumy Region, Ukraine
            </div>
          </div>
        </fieldset>

        {/* Status Bar */}
        <div className = "status-bar">
          <div className = "status-bar-field">
            {submit_status || "Ready to send your message"}
          </div>
          <div className = "status-bar-field">
            {submit_status ? (submit_status.includes("success") ? "✓" : submit_status.includes("Error") ? "✗" : "⏳") : "📧"}
          </div>
        </div>
      </div>
    </Windows98Window>
  );
};

export default Win98_contact;

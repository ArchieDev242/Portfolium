"use client";

import { useState, useEffect } from 'react';

const Win98_theme_manager = ({ onClose }) => {
  const [selected_theme, setSelectedTheme] = useState('classic');
  const [is_dragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [drag_offset, setDragOffset] = useState({ x: 0, y: 0 });  const themes = {
    classic: 
    {
      name: 'Windows 98 Classic',
      colors: 
      {
        primary: '#008080',
        secondary: '#c0c0c0',
        accent: '#000080',
        window: '#c0c0c0',
        text: '#000000',
        highlight: '#0000ff'
      },
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPCEtLSBXaW5kb3dzIDk4IENsYXNzaWMgRGVza3RvcCBJY29uIC0tPgo8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IiNjMGMwYzAiLz4KPHJlY3QgeD0iMSIgeT0iMSIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiBmaWxsPSIjMDA4MDgwIi8+CjxyZWN0IHg9IjIiIHk9IjIiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgZmlsbD0iI2MwYzBjMCIvPgo8cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmZmZmYiLz4KPHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwODA4MCIvPgo8cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjYzBjMGMwIi8+CjxyZWN0IHg9IjYiIHk9IjYiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAwODAiLz4KPC9zdmc+',
      fallback: '🖥️'
    },
    
    forest: 
    {
      name: 'Forest Green',
      colors: 
      {
        primary: '#228B22',
        secondary: '#90EE90',
        accent: '#006400',
        window: '#F0FFF0',
        text: '#000000',
        highlight: '#32CD32'
      },
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPCEtLSBQaXhlbGF0ZWQgVHJlZSBJY29uIC0tPgo8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IiNmZmZmZmYiLz4KPHJlY3QgeD0iNiIgeT0iMTIiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiM4MDQ5MjAiLz4KPHJlY3QgeD0iNCIgeT0iNiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwODAwMCIvPgo8cmVjdCB4PSI1IiB5PSI3IiB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjMDA2NDAwIi8+CjxyZWN0IHg9IjciIHk9IjMiIHdpZHRoPSIyIiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDgwMDAiLz4KPHJlY3QgeD0iNSIgeT0iNCIgd2lkdGg9IjYiIGhlaWdodD0iNCIgZmlsbD0iIzAwODAwMCIvPgo8L3N2Zz4=',
      fallback: '🌲'
    },

    ocean: 
    {
      name: 'Ocean Blue',
      colors: 
      {
        primary: '#006994',
        secondary: '#87CEEB',
        accent: '#4682B4',
        window: '#F0F8FF',
        text: '#000000',
        highlight: '#1E90FF'
      },
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPCEtLSBQaXhlbGF0ZWQgV2F2ZSBJY29uIC0tPgo8cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IiNmZmZmZmYiLz4KPHJlY3QgeD0iMCIgeT0iMTAiIHdpZHRoPSIxNiIgaGVpZ2h0PSI2IiBmaWxsPSIjMDA2OTk0Ii8+CjxyZWN0IHg9IjAiIHk9IjEyIiB3aWR0aD0iMTYiIGhlaWdodD0iNCIgZmlsbD0iIzAwN0FDQyIvPgo8cmVjdCB4PSIwIiB5PSIxNCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjIiIGZpbGw9IiM0NjgyQjQiLz4KPCEtLSBXYXZlIHBhdHRlcm4gLS0+CjxyZWN0IHg9IjIiIHk9IjgiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiM4N0NFRUIiLz4KPHJlY3QgeD0iNiIgeT0iOSIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iIzg3Q0VFQiIvPgo8cmVjdCB4PSIxMCIgeT0iOCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iIzg3Q0VFQiIvPgo8cmVjdCB4PSIxNCIgeT0iOSIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iIzg3Q0VFQiIvPgo8L3N2Zz4=',
      fallback: '🌊'
    },

    sunset: 
    {
      name: 'Sunset Orange',
      colors: 
      {
        primary: '#FF6347',
        secondary: '#FFE4B5',
        accent: '#FF4500',
        window: '#FFF8DC',
        text: '#000000',
        highlight: '#FF8C00'
      },
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPCEtLSBQaXhlbGF0ZWQgU3VuIEljb24gLS0+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iI2ZmZmZmZiIvPgo8IS0tIFN1biBjZW50ZXIgLS0+CjxyZWN0IHg9IjUiIHk9IjUiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiIGZpbGw9IiNGRkQ3MDAiLz4KPHJlY3QgeD0iNiIgeT0iNiIgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0iI0ZGRkZGRiIvPgo8IS0tIFN1biByYXlzIC0tPgo8cmVjdCB4PSI3IiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjRkY4QzAwIi8+CjxyZWN0IHg9IjciIHk9IjEzIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjRkY4QzAwIi8+CjxyZWN0IHg9IjEiIHk9IjciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNGRjhDMDAiLz4KPHJlY3QgeD0iMTMiIHk9IjciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNGRjhDMDAiLz4KPCEtLSBEaWFnb25hbCByYXlzIC0tPgo8cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjRkY4QzAwIi8+CjxyZWN0IHg9IjEyIiB5PSIzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjRkY4QzAwIi8+CjxyZWN0IHg9IjMiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjRkY4QzAwIi8+CjxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI0ZGOEMwMCIvPgo8L3N2Zz4=',
      fallback: '☀️'
    },

    purple: 
    {
      name: 'Royal Purple',
      colors: 
      {
        primary: '#663399',
        secondary: '#DDA0DD',
        accent: '#4B0082',
        window: '#F8F0FF',
        text: '#000000',
        highlight: '#9370DB'
      },
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPCEtLSBQaXhlbGF0ZWQgQ3Jvd24gSWNvbiAtLT4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjZmZmZmZmIi8+CjxyZWN0IHg9IjIiIHk9IjEwIiB3aWR0aD0iMTIiIGhlaWdodD0iNCIgZmlsbD0iIzY2MzM5OSIvPgo8cmVjdCB4PSIzIiB5PSIxMSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjIiIGZpbGw9IiM5OTY2Q0MiLz4KPCEtLSBDcm93biBwb2ludHMgLS0+CjxyZWN0IHg9IjMiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjUiIGZpbGw9IiM2NjMzOTkiLz4KPHJlY3QgeD0iNyIgeT0iMyIgd2lkdGg9IjIiIGhlaWdodD0iOCIgZmlsbD0iIzY2MzM5OSIvPgo8cmVjdCB4PSIxMSIgeT0iNiIgd2lkdGg9IjIiIGhlaWdodD0iNSIgZmlsbD0iIzY2MzM5OSIvPgo8IS0tIEplbXMgLS0+CjxyZWN0IHg9IjQiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGRkQ3MDAiLz4KPHJlY3QgeD0iOCIgeT0iNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI0ZGRDcwMCIvPgo8cmVjdCB4PSIxMiIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI0ZGRDcwMCIvPgo8L3N2Zz4=',
      fallback: '👑'
    },

    matrix: 
    {
      name: 'Matrix Green',
      colors: 
      {
        primary: '#000000',
        secondary: '#001100',
        accent: '#00ff00',
        window: '#001100',
        text: '#00ff00',
        highlight: '#00ff00'
      },
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPCEtLSBQaXhlbGF0ZWQgTWF0cml4IENvZGUgSWNvbiAtLT4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjEiIHk9IjEiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgZmlsbD0iIzAwMjIwMCIvPgo8IS0tIE1hdHJpeCBjb2RlIGxpbmVzIC0tPgo8cmVjdCB4PSIyIiB5PSIzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjQiIHk9IjMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMEZGMDAiLz4KPHJlY3QgeD0iNiIgeT0iMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwRkYwMCIvPgo8cmVjdCB4PSI4IiB5PSIzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjEwIiB5PSIzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjEyIiB5PSIzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjMiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMEZGMDAiLz4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwRkYwMCIvPgo8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjkiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMEZGMDAiLz4KPHJlY3QgeD0iMTEiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMEZGMDAiLz4KPHJlY3QgeD0iMiIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwRkYwMCIvPgo8cmVjdCB4PSI0IiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjYiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMEZGMDAiLz4KPHJlY3QgeD0iOCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwRkYwMCIvPgo8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwRkYwMCIvPgo8cmVjdCB4PSIxMiIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwRkYwMCIvPgo8cmVjdCB4PSIzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjUiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMEZGMDAiLz4KPHJlY3QgeD0iNyIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwRkYwMCIvPgo8cmVjdCB4PSI5IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjExIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjIiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjQiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjYiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjgiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRjAwIi8+CjxyZWN0IHg9IjEwIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwRkYwMCIvPgo8cmVjdCB4PSIxMiIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMEZGMDAiLz4KPC9zdmc+',
      fallback: '🟢'
    },

    cyber: 
    {
      name: 'Cyberpunk',
      colors: 
      {
        primary: '#0a0a0a',
        secondary: '#1a0033',
        accent: '#ff00ff',
        window: '#1a0033',
        text: '#00ffff',
        highlight: '#ff00ff'
      },
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPCEtLSBQaXhlbGF0ZWQgQ3liZXJwdW5rIFJvYm90IEljb24gLS0+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iIzBBMEEwQSIvPgo8cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMxQTAwMzMiLz4KPCEtLSBSb2JvdCBoZWFkIC0tPgo8cmVjdCB4PSI0IiB5PSI0IiB3aWR0aD0iOCIgaGVpZ2h0PSI2IiBmaWxsPSIjMkEwMDQ0Ii8+CjwhLS0gRXllcyAtLT4KPHJlY3QgeD0iNSIgeT0iNiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iI0ZGMDBGRiIvPgo8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjRkYwMEZGIi8+CjwhLS0gTW91dGggLS0+CjxyZWN0IHg9IjYiIHk9IjkiIHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiMwMEZGRkYiLz4KPCEtLSBBbnRlbm5hIC0tPgo8cmVjdCB4PSI3IiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjRkYwMEZGIi8+CjxyZWN0IHg9IjciIHk9IjEyIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjMDBGRkZGIi8+Cjwvc3ZnPg==',
      fallback: '🤖'
    },

    retro: 
    {
      name: 'Retro Pink',
      colors: 
      {
        primary: '#ff1493',
        secondary: '#ffb6c1',
        accent: '#dc143c',
        window: '#fff0f5',
        text: '#000000',
        highlight: '#ff69b4'
      },
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPCEtLSBQaXhlbGF0ZWQgSGVhcnQgSWNvbiAtLT4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjZmZmZmZmIi8+CjxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiNGRjE0OTMiLz4KPHJlY3QgeD0iOSIgeT0iNCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgZmlsbD0iI0ZGMTQ5MyIvPgo8cmVjdCB4PSIyIiB5PSI3IiB3aWR0aD0iNiIgaGVpZ2h0PSIzIiBmaWxsPSIjRkY2OUI0Ii8+CjxyZWN0IHg9IjgiIHk9IjciIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGZpbGw9IiNGRjY5QjQiLz4KPHJlY3QgeD0iMyIgeT0iMTAiIHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiNEQzE0M0MiLz4KPHJlY3QgeD0iOSIgeT0iMTAiIHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiNEQzE0M0MiLz4KPHJlY3QgeD0iNCIgeT0iMTIiIHdpZHRoPSI4IiBoZWlnaHQ9IjIiIGZpbGw9IiNEQzE0M0MiLz4KPHJlY3QgeD0iNiIgeT0iMTQiIHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiNEQzE0M0MiLz4KPHJlY3QgeD0iNyIgeT0iMTUiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGZpbGw9IiNEQzE0M0MiLz4KPC9zdmc+',
      fallback: '💖'
    }
  };

  useEffect(() => {
    const saved_theme = localStorage.getItem('win98-theme') || 'classic';
    setSelectedTheme(saved_theme);
    apply_theme(themes[saved_theme]);
  }, []);

  const apply_theme = (theme) => {
    const root = document.documentElement;
    root.style.setProperty('--win98-primary', theme.colors.primary);
    root.style.setProperty('--win98-secondary', theme.colors.secondary);
    root.style.setProperty('--win98-accent', theme.colors.accent);
    root.style.setProperty('--win98-window', theme.colors.window);
    root.style.setProperty('--win98-text', theme.colors.text);
    root.style.setProperty('--win98-highlight', theme.colors.highlight);
  };

  const handle_theme_select = (theme_key) => {
    setSelectedTheme(theme_key);
    localStorage.setItem('win98-theme', theme_key);
    apply_theme(themes[theme_key]);
  };

  const handle_mouse_down = (e) => {
    if(e.target.closest('button') || e.target.closest('.theme-item')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handle_mouse_move = (e) => {
    if(!is_dragging) return;
    
    setPosition({
      x: e.clientX - drag_offset.x,
      y: e.clientY - drag_offset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if(is_dragging) 
      {
      document.addEventListener('mousemove', handle_mouse_move);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handle_mouse_move);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [is_dragging, drag_offset]);

  return (
    <div 
      className = "window theme-manager-window"
      style = {{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '600px',
        zIndex: 10000,
        cursor: is_dragging ? 'grabbing' : 'default'
      }}
    >
      {/* Title Bar */}
      <div 
        className = "title-bar"
        onMouseDown = {handle_mouse_down}
        style = {{ cursor: is_dragging ? 'grabbing' : 'grab' }}
      >
        <div className = "title-bar-text">
          <img 
            src = "./icons/win98/png/themes-0.png" 
            alt = "Themes"
            style = {{
              width: '16px',
              height: '16px',
              imageRendering: 'pixelated',
              marginRight: '4px',
              verticalAlign: 'middle'
            }}
            onError = {(e) => {
              e.target.style.display = 'none';
              e.target.insertAdjacentHTML('afterend', '<span>🎨</span>');
            }}
          />
          Theme Manager
        </div>
        <div className = "title-bar-controls">
          <button aria-label = "Close" onClick = {onClose}></button>
        </div>
      </div>

      {/* Window Body */}
      <div className = "window-body" style = {{ padding: '15px' }}>
        <fieldset style = {{ marginBottom: '15px' }}>
          <legend>
            <img 
              src = "./icons/win98/png/color_profile-0.png"
              alt = "Colors"
              style = {{
                width: '16px',
                height: '16px',
                imageRendering: 'pixelated',
                marginRight: '4px',
                verticalAlign: 'middle'
              }}
              onError = {(e) => {
                e.target.style.display = 'none';
                e.target.insertAdjacentHTML('afterend', '<span>🎨</span>');
              }}
            />
            <span style = {{ display: 'none' }}>🎨</span>
            Choose Your Theme
          </legend>
          
          <div style = {{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '10px',
            padding: '10px 0'
          }}>
            {Object.entries(themes).map(([key, theme]) => (
              <div
                key = {key}
                className = {`theme-item ${selected_theme === key ? 'selected' : ''}`}
                onClick = {() => handle_theme_select(key)}
                style = {{
                  border: selected_theme === key ? '2px solid #000080' : '1px solid #808080',
                  borderRadius: '4px',
                  padding: '10px',
                  cursor: 'pointer',
                  background: selected_theme === key ? '#e0e0e0' : '#f0f0f0',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div style = {{ marginBottom: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '32px' }}>
                  <img 
                    src = {theme.icon}
                    alt = {theme.name}
                    style = {{
                      width: '32px',
                      height: '32px',
                      imageRendering: 'pixelated'
                    }}
                    onError = {(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div style = {{ display: 'none', fontSize: '24px' }}>
                    {typeof theme.fallback === 'string' && theme.fallback.startsWith('data:') ? (
                      <img 
                        src = {theme.fallback}
                        alt = {theme.name}
                        style = {{
                          width: '32px',
                          height: '32px',
                          imageRendering: 'pixelated'
                        }}
                      />
                    ) : (
                      theme.fallback
                    )}
                  </div>
                </div>
                <div style = {{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
                  {theme.name}
                </div>
                
                {/* Color Preview */}
                <div style = {{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '2px', 
                  marginTop: '8px' 
                }}>
                  <div style = {{ 
                    width: '16px', 
                    height: '16px', 
                    backgroundColor: theme.colors.primary,
                    border: '1px solid #666',
                    borderRadius: '2px'
                  }} />
                  <div style = {{ 
                    width: '16px', 
                    height: '16px', 
                    backgroundColor: theme.colors.accent,
                    border: '1px solid #666',
                    borderRadius: '2px'
                  }} />
                  <div style = {{ 
                    width: '16px', 
                    height: '16px', 
                    backgroundColor: theme.colors.highlight,
                    border: '1px solid #666',
                    borderRadius: '2px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset style = {{ marginBottom: '15px' }}>
          <legend>
            <img 
              src = "./icons/win98/png/notepad_file-0.png"
              alt = "Info"
              style = {{
                width: '16px',
                height: '16px',
                imageRendering: 'pixelated',
                marginRight: '4px',
                verticalAlign: 'middle'
              }}
              onError = {(e) => {
                e.target.style.display = 'none';
                e.target.insertAdjacentHTML('afterend', '<span>📋</span>');
              }}
            />
            <span style = {{ display: 'none' }}>📋</span>
            Theme Info
          </legend>
          <div style = {{ fontSize: '11px', padding: '8px' }}>
            <div><strong>Current Theme:</strong> {themes[selected_theme].name}</div>
            <div style = {{ marginTop: '5px' }}>
              <strong>Colors:</strong>
              <div style = {{ marginLeft: '10px', marginTop: '3px' }}>
                <div>Primary: {themes[selected_theme].colors.primary}</div>
                <div>Accent: {themes[selected_theme].colors.accent}</div>
                <div>Highlight: {themes[selected_theme].colors.highlight}</div>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Action Buttons */}
        <div style = {{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '15px'
        }}>
          <button 
            onClick = {() => handle_theme_select('classic')}
            style = {{ minWidth: '100px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}
          >
            <img 
              src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMiBMMTAgNCBMOCA2IEw2IDQgTDggMiBaIiBmaWxsPSIjMDAwMDAwIi8+CjxwYXRoIGQ9Ik04IDEwIEwxMCAxMiBMOCAxNCBMNiAxMiBMOCAxMCBaIiBmaWxsPSIjMDAwMDAwIi8+CjxwYXRoIGQ9Ik0yIDggTDQgMTAgTDYgOCBMNCA2IEwyIDggWiIgZmlsbD0iIzAwMDAwMCIvPgo8cGF0aCBkPSJNMTAgOCBMMTIgMTAgTDE0IDggTDEyIDYgTDEwIDggWiIgZmlsbD0iIzAwMDAwMCIvPgo8L3N2Zz4="
              alt = "Reset"
              style = {{
                width: '16px',
                height: '16px',
                imageRendering: 'pixelated'
              }}
              onError = {(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline';
              }}
            />
            <span style = {{ display: 'none' }}>🔄</span>
            Reset
          </button>
          
          <div style = {{ display: 'flex', gap: '8px' }}>
            <button 
              onClick = {() => {
                const random_themes = Object.keys(themes);
                const random_theme = random_themes[Math.floor(Math.random() * random_themes.length)];
                handle_theme_select(random_theme);
              }}
              style = {{ minWidth: '80px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}
            >
              <img 
                src = "./icons/win98/png/gears-0.png"
                alt = "Random"
                style = {{
                  width: '16px',
                  height: '16px',
                  imageRendering: 'pixelated'
                }}
                onError = {(e) => {
                  e.target.style.display = 'none';
                  e.target.insertAdjacentHTML('afterend', '<span>🎲</span>');
                }}
              />
              <span style = {{ display: 'none' }}>🎲</span>
              Random
            </button>
            
            <button 
              onClick = {onClose}
              style = {{ 
                minWidth: '80px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                justifyContent: 'center'
              }}
            >
              <img 
                src = "./icons/win98/png/check-0.png"
                alt = "Apply"
                style = {{
                  width: '16px',
                  height: '16px',
                  imageRendering: 'pixelated',
                  filter: 'brightness(0) invert(1)'
                }}
                onError = {(e) => {
                  e.target.style.display = 'none';
                  e.target.insertAdjacentHTML('afterend', '<span>✅</span>');
                }}
              />
              <span style = {{ display: 'none' }}>✓</span>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Win98_theme_manager;

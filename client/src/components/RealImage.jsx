import React from 'react';

// Image mapping for crops (replace emojis with real images)
export const CropImage = ({ crop, className = "w-16 h-16 object-cover rounded-lg" }) => {
  const images = {
    'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop',
    'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop',
    'Tomato': 'https://images.unsplash.com/photo-1546094096-0df4bcaaa2e8?w=100&h=100&fit=crop',
    'Onion': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=100&h=100&fit=crop',
    'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop',
    'Ginger': 'https://images.unsplash.com/photo-1615484477770-4c3e6f7b9a8a?w=100&h=100&fit=crop',
    'Sugarcane': 'https://images.unsplash.com/photo-1591453089816-3f7cfac7ebbd?w=100&h=100&fit=crop',
    'Maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=100&h=100&fit=crop',
    'Cotton': 'https://images.unsplash.com/photo-1598023696418-9b9edfa4e55c?w=100&h=100&fit=crop',
    'Chilli': 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=100&h=100&fit=crop',
    'default': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop'
  };
  
  const imageUrl = images[crop] || images.default;
  
  return <img src={imageUrl} alt={crop} className={className} />;
};

// Dashboard Icon with real images
export const DashboardIcon = ({ icon, className = "w-10 h-10" }) => {
  const icons = {
    'market': 'https://cdn-icons-png.flaticon.com/512/2997/2997912.png',
    'labour': 'https://cdn-icons-png.flaticon.com/512/2972/2972651.png',
    'chat': 'https://cdn-icons-png.flaticon.com/512/1998/1998592.png',
    'postjob': 'https://cdn-icons-png.flaticon.com/512/2972/2972661.png',
    'findwork': 'https://cdn-icons-png.flaticon.com/512/2972/2972677.png',
    'profile': 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    'weather': 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png',
  };
  
  return <img src={icons[icon]} alt={icon} className={className} />;
};
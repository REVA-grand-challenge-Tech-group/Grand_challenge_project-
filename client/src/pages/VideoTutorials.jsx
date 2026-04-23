import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const VideoTutorials = () => {
  const { t, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const categories = [
    { id: 'all', name: 'All', icon: '📺' },
    { id: 'farming', name: 'Farming Basics', icon: '🌱' },
    { id: 'pesticides', name: 'Pesticides', icon: '🧪' },
    { id: 'irrigation', name: 'Irrigation', icon: '💧' },
    { id: 'marketing', name: 'Marketing', icon: '📈' }
  ];

  const videos = [
    {
      id: 1,
      title: language === 'hi' ? 'उन्नत धान की खेती' : 'Advanced Paddy Cultivation',
      category: 'farming',
      duration: '15:30',
      thumbnail: '🌾',
      views: '15K',
      language: 'Hindi',
      description: language === 'hi' 
        ? 'धान की उन्नत खेती के तरीके और आधुनिक तकनीक' 
        : 'Modern techniques for paddy cultivation'
    },
    {
      id: 2,
      title: language === 'hi' ? 'जैविक कीटनाशक बनाएं' : 'Make Organic Pesticides',
      category: 'pesticides',
      duration: '12:45',
      thumbnail: '🧪',
      views: '8.5K',
      language: 'Hindi',
      description: language === 'hi'
        ? 'घर पर जैविक कीटनाशक बनाने की विधि'
        : 'How to make organic pesticides at home'
    },
    {
      id: 3,
      title: language === 'hi' ? 'ड्रिप सिंचाई प्रणाली' : 'Drip Irrigation System',
      category: 'irrigation',
      duration: '18:20',
      thumbnail: '💧',
      views: '12K',
      language: 'Hindi',
      description: language === 'hi'
        ? 'ड्रिप सिंचाई से 70% पानी बचाएं'
        : 'Save 70% water with drip irrigation'
    },
    {
      id: 4,
      title: language === 'hi' ? 'मंडी में सही कीमत कैसे पाएं' : 'Get Best Price in Mandi',
      category: 'marketing',
      duration: '10:15',
      thumbnail: '📈',
      views: '22K',
      language: 'Hindi',
      description: language === 'hi'
        ? 'अपनी फसल की सही कीमत पाने के टिप्स'
        : 'Tips to get best price for your crops'
    },
    {
      id: 5,
      title: language === 'hi' ? 'टमाटर की उन्नत खेती' : 'Advanced Tomato Farming',
      category: 'farming',
      duration: '20:00',
      thumbnail: '🍅',
      views: '10K',
      language: 'Kannada',
      description: 'Complete guide for tomato cultivation'
    }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Video Tutorials</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Language Info */}
        <div className="bg-blue-50 rounded-xl p-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-2">📹</span>
              <span className="text-sm text-blue-800">Videos in Hindi & Kannada for easy understanding</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="overflow-x-auto mb-6 pb-2">
          <div className="flex space-x-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="space-y-4 mb-6">
          {filteredVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all text-left"
            >
              <div className="flex p-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-3xl mr-4">
                  {video.thumbnail}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{video.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{video.description}</p>
                    </div>
                    <span className="text-xs text-gray-400">{video.duration}</span>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <span className="mr-3">👁️ {video.views}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full">{video.language}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Download Offline Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center">
            <span className="text-3xl mr-3">📱</span>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-800">Download for Offline Viewing</h3>
              <p className="text-sm text-purple-700">Save videos to watch without internet</p>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-semibold">{selectedVideo.title}</h3>
              <button onClick={() => setSelectedVideo(null)} className="text-white text-2xl">×</button>
            </div>
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedVideo.thumbnail}</div>
                <div className="text-gray-400">Video Player Preview</div>
                <p className="text-sm text-gray-500 mt-2">Duration: {selectedVideo.duration}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600">{selectedVideo.description}</p>
              <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-medium">
                Watch Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTutorials;
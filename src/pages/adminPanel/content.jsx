import React, { useState } from 'react';
import { Eye, Pencil,X, ChevronDown,Trash2,UploadCloud, Plus } from "lucide-react";

const contentData = [
  {
    id: 1,
    title: "Understanding Anxiety: A Comprehensive Guide",
    author: "Dr. Sarah Johnson",
    date: "2024-04-15",
    views: "1,250",
    status: "Published",
    tag: "Anxiety",
    type: "Article",
    image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2",
  },
  {
    id: 2,
    title: "Building Healthy Relationships",
    author: "Priya Sharma",
    date: "2024-04-18",
    views: "2,340",
    status: "Published",
    tag: "Relationships",
    type: "Video",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
  },
  {
    id: 3,
    title: "Career Growth Strategies",
    author: "Amit Patel",
    date: "2024-04-20",
    views: "0",
    status: "Pending",
    tag: "Career",
    type: "Article",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    id: 4,
    title: "Meditation for Beginners",
    author: "Neha Gupta",
    date: "2024-04-12",
    views: "3,120",
    status: "Published",
    tag: "Wellness",
    type: "Video",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
  },
  {
    id: 5,
    title: "Coping with Depression",
    author: "Dr. Rajesh Kumar",
    date: "2024-04-10",
    views: "1,890",
    status: "Published",
    tag: "Depression",
    type: "Article",
    image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6",
  },
  {
    id: 6,
    title: "Stress Management Techniques",
    author: "Dr. Sarah Johnson",
    date: "2024-04-19",
    views: "0",
    status: "Draft",
    tag: "Stress",
    type: "Podcast",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
  },
];


export default function ContentPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
  

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Content Management</h2>
          <p className="text-gray-500">
            Manage articles, videos, and resources
          </p>
        </div>

      {/*  <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-lg shadow">
          <Plus size={18} /> Add Content
        </button> */}
        <button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition text-white px-5 py-2.5 rounded-lg flex items-center text-sm font-bold transition-all shadow-lg shadow-indigo-100 animate-glow"
                    >
                      <Plus size={18} className="mr-2" />
                      Create Article
                    </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {[
          { label: "Total Content", value: "342" },
          { label: "Published", value: "289" },
          { label: "Pending Review", value: "28" },
          { label: "Reported", value: "5" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-lg">
            <p className="text-gray-500">{item.label}</p>
            <h3 className="text-2xl font-bold">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <input
            placeholder="Search content..."
            className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-purple-500"
          />

          <select className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-500 outline-none">
            <option>All Status</option>
            <option>Published</option>
            <option>Pending</option>
            <option>Draft</option>
          </select>

          <select className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-500 outline-none">
            <option>All Categories</option>
            <option>Anxiety</option>
            <option>Relationships</option>
            <option>Career</option>
            <option>Depression</option>
            <option>Stress</option>
            <option>Wellness</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6">
          {contentData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border-2 border-transparent hover:border-purple-400 transition-all"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt="img"
                  className="w-full h-40 object-cover"
                />

                <span
                  className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full
                  ${item.status === "Published" && "bg-green-100 text-green-600"}
                  ${item.status === "Pending" && "bg-yellow-100 text-yellow-600"}
                  ${item.status === "Draft" && "bg-gray-200 text-gray-600"}
                `}
                >
                  {item.status}
                </span>
              </div>

              <div className="p-4">
                <div className="flex gap-2 mb-2">
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                    {item.tag}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {item.type}
                  </span>
                </div>

                <h3 className="font-semibold text-lg leading-snug mb-1">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.author} • {item.date}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  👁 {item.views} views
                </p>

                <div className="flex gap-2 mt-4">
                  <button className="flex items-center gap-1 px-3 py-1 rounded bg-gray-100 text-sm">
                    <Eye size={14} /> View
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 rounded bg-blue-100 text-blue-600 text-sm">
                    <Pencil size={14} /> Edit
                  </button>
                  <button className="p-2 rounded bg-red-100 text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-500">Showing 6 items</p>

          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded-lg">
              Previous
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg">
              Next
            </button>
          </div>
        </div>
      </div>

 {/* CREATE ARTICLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create New Article</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Article Title</label>
                <input type="text" placeholder="Enter an engaging title..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm transition-all" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                  <div className="relative">
                    <select className="appearance-none w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm cursor-pointer">
                      <option>Mental Health & Therapy</option>
                      <option>Career & Growth Coaching</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Author</label>
                  <input type="text" defaultValue="Admin User" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Cover Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-indigo-50/50 hover:border-indigo-300 transition-all cursor-pointer group">
                  <UploadCloud size={32} className="mb-2 text-gray-400 group-hover:text-indigo-500" />
                  <span className="text-sm font-semibold text-gray-400">Click or drag image to upload</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Content</label>
                <textarea rows="4" placeholder="Write your content..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all">Cancel</button>
              <button className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm">Publish Article</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
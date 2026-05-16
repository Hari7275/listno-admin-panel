import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, X, UploadCloud, ChevronDown, Trash2 
} from 'lucide-react';

const articlesData = [
  {
    id: 1,
    title: "5 Ways to Navigate Career Transitions",
    category: "Career & Growth Coaching",
    author: "Admin",
    status: "Published",
    reads: "1,240",
    date: "22 Apr 2026"
  },
  {
    id: 2,
    title: "Understanding Imposter Syndrome",
    category: "Mental Health & Therapy",
    author: "Dr. Anil R.",
    status: "Draft",
    reads: "0",
    date: "24 Apr 2026"
  },
  {
    id: 3,
    title: "Astrology and Daily Mindfulness",
    category: "Astrology & Tarot",
    author: "Priya Sharma",
    status: "Published",
    reads: "3,420",
    date: "18 Apr 2026"
  }
];

export default function KnowledgeCenter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <div className=" text-gray-800 font-sans overflow-hidden">
      
      {/* Internal CSS for custom table scroller and button glow */}
     

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* SCROLLABLE CONTAINER FOR PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* HEADER SECTION */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Knowledge Center</h1>
              <p className="text-gray-500 text-sm">Manage and publish articles across offered categories.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition text-white px-5 py-2.5 rounded-lg flex items-center text-sm font-bold transition-all shadow-lg shadow-indigo-100 animate-glow"
            >
              <Plus size={18} className="mr-2" />
              Create Article
            </button>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Published Articles</h3>
              <div className="flex items-end space-x-3">
                <span className="text-3xl font-bold text-gray-900">124</span>
                <span className="text-green-600 text-sm font-medium mb-1 bg-green-50 px-2 py-0.5 rounded flex items-center">↑ +3</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Total Reads</h3>
              <div className="flex items-end space-x-3">
                <span className="text-3xl font-bold text-gray-900">45.2K</span>
                <span className="text-green-600 text-sm font-medium mb-1 bg-green-50 px-2 py-0.5 rounded flex items-center">↑ +15%</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Active Categories</h3>
              <div className="text-3xl font-bold text-gray-900">2</div>
            </div>
          </div>

          {/* TABLE SECTION CONTAINER */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            
            {/* Table Tools (Search & Filter) */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/30">
              <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 w-80 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                <Search size={18} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="bg-transparent border-none focus:outline-none w-full text-sm"
                />
              </div>

              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Mental Health & Therapy</option>
                  <option>Career & Growth Coaching</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* HORIZONTAL SCROLLER WRAPPER FOR TABLE ONLY */}
            <div className="overflow-x-auto table-scroller">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-[11px] uppercase text-gray-400 font-bold tracking-wider">
                    <th className="p-4 pl-6">Article Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Reads</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {articlesData.map((article) => (
                    <tr key={article.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="p-4 pl-6 font-semibold text-gray-900 text-sm">{article.title}</td>
                      <td className="p-4 text-sm text-gray-600">
                        <span className="bg-gray-100 px-2.5 py-1 rounded text-[12px] font-medium">{article.category}</span>
                      </td>
                      <td className="p-4 text-sm text-gray-600 font-medium">{article.author}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-tight
                          ${article.status === 'Published' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200'}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${article.status === 'Published' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                          {article.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600 font-mono font-medium">{article.reads}</td>
                      <td className="p-4 text-sm text-gray-500">{article.date}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white hover:shadow-md rounded-lg transition-all border border-transparent hover:border-gray-100">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-white hover:shadow-md rounded-lg transition-all border border-transparent hover:border-gray-100">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

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
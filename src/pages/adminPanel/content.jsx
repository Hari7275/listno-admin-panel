import { Eye, Pencil, Trash2, Plus } from "lucide-react";

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

        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-lg shadow">
          <Plus size={18} /> Add Content
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
    </div>
  );
}
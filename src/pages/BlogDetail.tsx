import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // npm i lucide-react

const dummyBlogs = [
  {
    id: "1",
    title: "The Rise of Indie Hackers",
    author: "Ashish Kunthe",
    content:
      "In recent years, indie hackers have taken the internet by storm, building profitable businesses alone or in small teams...",
  },
  {
    id: "2",
    title: "Why TypeScript is Taking Over",
    author: "Astra AI",
    content:
      "TypeScript brings strong typing to JavaScript, making code more predictable and scalable in larger applications...",
  },
  {
    id: "3",
    title: "Mental Health and Coding",
    author: "Dev Poet",
    content:
      "Coding is mentally demanding. Balancing productivity with breaks is crucial for long-term sustainability...",
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = dummyBlogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/blogs")}
        className="flex items-center text-gray-600 hover:text-black mb-6 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Blogs
      </button>

      <h1 className="text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-6">By {blog.author}</p>
      <div className="text-gray-700 leading-relaxed text-lg">
        {blog.content}
      </div>

      {/* Like + Comment Placeholder */}
      <div className="mt-10 border-t pt-6">
        <p className="text-gray-600 italic mb-2">
          ❤️ Like feature coming soon...
        </p>
        <p className="text-gray-600 italic">
          💬 Comments will show here later...
        </p>
      </div>
    </div>
  );
};

export default BlogDetail;

// src/pages/Home.tsx
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";

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

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Latest Blogs</h1>
      {dummyBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          author={blog.author}
          content={blog.content}
          onClick={() => navigate(`/blogs/${blog.id}`)}
        />
      ))}
    </div>
  );
};

export default Home;

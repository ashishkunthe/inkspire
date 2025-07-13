type BlogCardProps = {
  title: string;
  author: string;
  content: string;
  onClick?: () => void;
};

const BlogCard = ({ title, author, content, onClick }: BlogCardProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-md cursor-pointer transition"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-3">by {author}</p>
      <p className="text-gray-700 text-sm line-clamp-3">{content}</p>
    </div>
  );
};

export default BlogCard;

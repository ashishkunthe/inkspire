import { useState } from "react";

interface Comment {
  id: string;
  user: string;
  userId: string;
  text: string;
}

interface CommentBoxProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  onDeleteComment?: (id: string) => void;
  currentUser?: string;
}

const CommentBox = ({
  comments,
  onAddComment,
  onDeleteComment,
  currentUser,
}: CommentBoxProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAddComment(trimmed);
    setText("");
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
        >
          Post
        </button>
      </form>

      <ul className="space-y-4">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="border border-gray-200 p-4 rounded shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {comment.user}
                </p>
                <p className="text-gray-600">{comment.text}</p>
              </div>

              {onDeleteComment && (
                <button
                  onClick={() => onDeleteComment(comment.id)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentBox;

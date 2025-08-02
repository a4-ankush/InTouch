import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await api.post("/posts", { content });
      setContent("");
      fetchPosts(); // reload posts
    } catch (err) {
      setError(err.response?.data?.msg || "Post failed");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-6 px-4">
        <form onSubmit={handlePost} className="mb-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border p-3 rounded mb-2 resize-none"
            rows="3"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post
          </button>
        </form>

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <p className="text-sm text-gray-600">
                <strong>{post.author?.name || "Unknown"}</strong> •{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <p className="mt-2 text-gray-800">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;

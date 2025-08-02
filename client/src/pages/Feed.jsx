import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import UserDetails from "../components/UserDetails";
import NewsSection from "../components/NewsSection";
import { FaPhotoVideo } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({ name: "", bio: "", posts: 0 });

  const handleLike = async (postId) => {
    try {
      await api.post(`/posts/${postId}/like`);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async (postId) => {
    try {
      await api.post(`/posts/${postId}/dislike`);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };
  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
      setUser((prev) => ({ ...prev, posts: res.data.length }));
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch user details
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser((prev) => ({
        ...prev,
        name: res.data.name,
        bio: res.data.bio,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await api.post("/posts", { content });
      setContent("");
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.msg || "Post failed");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 via-white to-gray-100 min-h-screen pt-18">
        <div
          className="flex flex-col md:flex-row w-full max-w-7xl mx-auto mt-6 px-2 md:px-6 gap-6"
          style={{ minHeight: "80vh" }}
        >
          {/* Left Column: User Details */}
          <div className="w-full md:w-1/4 mb-4 md:mb-0 md:sticky md:top-24 h-fit">
            <div className="rounded-xl shadow-lg bg-white border border-gray-200 p-6 flex flex-col items-center">
              <UserDetails name={user.name} bio={user.bio} posts={user.posts} />
              <button
                disabled
                className="cursor-not-allowed mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition "
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Middle Column: Feed */}
          <div
            className="w-full md:w-2/4 overflow-visible md:overflow-y-auto "
            style={{ maxHeight: "80vh" }}
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <form onSubmit={handlePost} className="flex flex-col gap-3">
                {error && (
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                )}
                <div className="flex flex-row">
                  <div className="px-2">
                    <span className=" w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {user.name?.charAt(0) || "U"}
                    </span>
                  </div>

                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share something with your network..."
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
                    rows="2"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center mt-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-blue-600 font-semibold hover:bg-blue-50 transition cursor-not-allowed"
                      disabled
                      title="Upcoming feature"
                    >
                      <FaPhotoVideo className="text-xl" />
                      Video
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 text-blue-600 font-semibold hover:bg-blue-50 transition cursor-not-allowed"
                      disabled
                      title="Upcoming feature"
                    >
                      <FaRegImages className="text-xl" />
                      Photo
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition hover:cursor-pointer"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="space-y-6">
              {posts.length === 0 ? (
                <div className="text-center text-gray-400 py-10">
                  No posts yet. Be the first to post!
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post._id}
                    className="border border-gray-200 rounded-xl shadow-sm bg-white p-5 hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-2 justify-between">
                      <div className="flex items-center gap-2">
                        <Link to={`/profile/${post.author?._id}`}>
                          <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold hover:ring-2 hover:ring-blue-400 transition">
                            {post.author?.name?.charAt(0) || "U"}
                          </span>
                        </Link>
                        <div>
                          <Link to={`/profile/${post.author?._id}`}>
                            <p className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
                              {post.author?.name || "Unknown"}
                            </p>
                          </Link>
                          <p className="text-sm font-semibold text-gray-500 max-w-96">
                            {user.bio || "Unknown"}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 ml-auto">
                        {new Date(post.createdAt).toLocaleDateString()} <br />
                        {new Date(post.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p className="mt-2 text-gray-700 text-base">
                      {post.content}
                    </p>
                    <div className="flex gap-6 mt-4">
                      <button
                        className="flex items-center gap-2 text-gray-400 hover:text-blue-800 font-semibold hover:cursor-pointer"
                        onClick={() => handleLike(post._id)}
                      >
                        <FaThumbsUp /> {post.likes?.length || 0}
                      </button>
                      <button
                        className="flex items-center gap-2 text-gray-400 hover:text-red-700 font-semibold hover:cursor-pointer"
                        onClick={() => handleDislike(post._id)}
                      >
                        <FaThumbsDown /> {post.dislikes?.length || 0}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: News Section */}
          <div
            className="w-full md:w-1/4 overflow-visible md:overflow-y-auto"
            style={{ maxHeight: "80vh" }}
          >
            <div className="rounded-xl shadow-lg bg-white border border-gray-200 p-6">
              <NewsSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;

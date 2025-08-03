import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import api from "../api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in user info
  const fetchLoggedInUser = async () => {
    try {
      const res = await api.get("/auth/me");
      return res.data;
    } catch (err) {
      navigate("/login");
      return null;
    }
  };

  const fetchProfile = async (profileId) => {
    try {
      const userRes = await api.get(`/auth/${profileId}`); // <-- FIXED
      const postsRes = await api.get(`/posts/user/${profileId}`);
      setUser({
        name: userRes.data.name,
        email: userRes.data.email,
        bio: userRes.data.bio,
      });
      setPosts(postsRes.data);
    } catch (err) {
      setUser(null);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const loggedInUser = await fetchLoggedInUser();
      if (!loggedInUser) return;
      // If no id param, show logged-in user's profile
      const profileId = id || loggedInUser._id;
      fetchProfile(profileId);
    };
    loadProfile();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <span className="text-3xl font-bold text-red-600 mb-4">
            User not found
          </span>
          <p className="text-gray-500 text-lg">
            The profile you are looking for does not exist.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <div className="max-w-2xl mx-auto px-4 pt-24 pb-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 flex flex-col items-center border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-3xl shadow">
                {user?.name?.charAt(0) || "U"}
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.name}
                </h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <p className="mt-2 text-gray-700 text-center">{user?.bio}</p>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-blue-700">
            Posts by {user?.name?.split(" ")[0] || "User"}:
          </h3>

          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow hover:shadow-lg transition"
              >
                <p className="text-gray-800 text-base">{post.content}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400 text-right">
                    {new Date(post.createdAt).toLocaleDateString()}{" "}
                    {new Date(post.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <span className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                    <FaThumbsUp className="text-base" />
                    {post.likes?.length || 0}
                  </span>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <p className="text-gray-500 text-center">No posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

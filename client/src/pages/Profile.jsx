import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    try {
      const userRes = await api.get(`/auth/me`);
      const postsRes = await api.get(`/posts/user/${id}`);
      const authorName = postsRes.data[0]?.author?.name;

      setUser({
        name: authorName || userRes.data.name,
        email: userRes.data.email,
        bio: userRes.data.bio,
      });
      setPosts(postsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="blue-background2">
        <div className="max-w-2xl mx-auto mt-12 px-4">
          {/* LinkedIn-style profile card */}
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
            Posts by {user?.name?.split(" ")[0] || "You"}:
          </h3>

          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow hover:shadow-lg transition"
              >
                <p className="text-gray-800 text-base">{post.content}</p>
                <p className="text-xs text-gray-400 mt-2 text-right">
                  {new Date(post.createdAt).toLocaleDateString()}{" "}
                  {new Date(post.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
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

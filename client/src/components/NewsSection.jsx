import React, { useEffect, useState } from "react";
import { FaRegNewspaper } from "react-icons/fa";

const dummyNews = [
  {
    title: "OpenAI launches new GPT-5 model with advanced reasoning",
    url: "https://technews.example.com/openai-gpt5",
  },
  {
    title: "Microsoft announces major Windows 12 update",
    url: "https://technews.example.com/windows12-update",
  },
  {
    title: "Apple unveils next-gen MacBook Pro with M4 chip",
    url: "https://technews.example.com/apple-macbook-m4",
  },
  {
    title: "Google introduces AI-powered search enhancements",
    url: "https://technews.example.com/google-ai-search",
  },
  {
    title: "Tesla reveals new self-driving software improvements",
    url: "https://technews.example.com/tesla-self-driving",
  },
  {
    title: "Meta launches VR workspace for remote teams",
    url: "https://technews.example.com/meta-vr-workspace",
  },
  {
    title: "Amazon expands drone delivery service in US cities",
    url: "https://technews.example.com/amazon-drone-delivery",
  },
  {
    title: "Samsung debuts foldable tablet at tech expo",
    url: "https://technews.example.com/samsung-foldable-tablet",
  },
  {
    title: "IBM partners with NASA for quantum computing research",
    url: "https://technews.example.com/ibm-nasa-quantum",
  },
  {
    title: "Netflix rolls out interactive movie technology",
    url: "https://technews.example.com/netflix-interactive-movie",
  },
];

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setNews(dummyNews);
      setLoading(false);
    }, 800); // Simulate loading
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-gray-100 border rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <FaRegNewspaper className="text-blue-600 text-2xl" />
        <span className="font-bold text-xl text-blue-700">Tech News</span>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600 mr-2"></span>
          <span className="text-gray-500 font-medium">Loading...</span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {news.slice(0, 10).map((item, idx) => (
            <li key={idx} className="py-3 flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3"></span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-gray-800 hover:text-blue-700 font-medium transition"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsSection;

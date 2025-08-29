import { useState } from "react";
import { useRouter } from "next/router";
import { useVoiceAssistant } from "../hooks/useVoiceAssistant";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { listening, transcript, startListening, stopListening } = useVoiceAssistant();

  const handleSearch = () => {
    const finalQuery = transcript || query;
    if (finalQuery.trim()) {
      router.push(`/results?q=${encodeURIComponent(finalQuery)}`);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/travel-bg.jpg')" }}
    >
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg flex items-center px-4 py-2">
        <input
          type="text"
          value={transcript || query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for flights, hotels, cabs, events..."
          className="flex-grow px-4 py-2 outline-none text-lg"
        />
        <button
          onClick={listening ? stopListening : startListening}
          className="mx-2 text-gray-600 hover:text-blue-500"
        >
          🎤
        </button>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          🔍 Search
        </button>
      </div>
    </div>
  );
}

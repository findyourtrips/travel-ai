import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (q) {
      fetch(`/api/chat-search?q=${q}`)
        .then((res) => res.json())
        .then((data) => setResults(data.results));
    }
  }, [q]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Results for: {q}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((item, idx) => (
          <div key={idx} className="border p-4 rounded-xl shadow">
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

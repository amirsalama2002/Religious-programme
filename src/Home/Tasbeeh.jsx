import { useState, useEffect } from "react";

const azkarList = [
  { title: "سبحان الله", key: "subhan" },
  { title: "الحمد لله", key: "hamd" },
  { title: "الله أكبر", key: "akbar" },
  { title: "لا إله إلا الله", key: "la_ila" },
];

function Tasbeeh() {
  const [counts, setCounts] = useState(() => {
    // ✅ استرجاع القيم من localStorage عند أول تحميل
    const saved = localStorage.getItem("tasbeehCounts");
    return saved
      ? JSON.parse(saved)
      : {
          subhan: 0,
          hamd: 0,
          akbar: 0,
          la_ila: 0,
        };
  });

  // ✅ حفظ تلقائي عند أي تغيير
  useEffect(() => {
    localStorage.setItem("tasbeehCounts", JSON.stringify(counts));
  }, [counts]);

  const handleTasbeeh = (key) => {
    setCounts((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  };

  const resetCount = (key) => {
    setCounts((prev) => ({
      ...prev,
      [key]: 0,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 text-center">
      <h1 className="text-3xl font-bold mb-8 text-blue-600 dark:text-sky-400">
        🕋 الأذكار اليومية - التسبيح
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {azkarList.map(({ title, key }) => (
          <div
            key={key}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col justify-between items-center"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              {title}
            </h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-yellow-400 mb-4">
              {counts[key]}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => resetCount(key)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                تصفير
              </button>
              <button
                onClick={() => handleTasbeeh(key)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                تسبيح
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasbeeh;

// src/Pages/AzkarEvening.jsx
import React from "react";

const eveningAzkar = [
  {
    id: 1,
    text: "اللهم بك أمسينا وبك أصبحنا، وبك نحيا وبك نموت وإليك المصير.",
  },
  {
    id: 2,
    text: "رضيت بالله ربا، وبالإسلام دينا، وبمحمد ﷺ نبيًا.",
  },
  {
    id: 3,
    text: "اللهم إني أمسيت أشهدك، وأشهد حملة عرشك، وملائكتك، وجميع خلقك أنك أنت الله لا إله إلا أنت وحدك لا شريك لك، وأن محمدًا عبدك ورسولك. (4 مرات)",
  },
  {
    id: 4,
    text: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
  },
  {
    id: 5,
    text: "اللهم ما أمسى بي من نعمة أو بأحد من خلقك، فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر.",
  },
];

function AzkarEvening() {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("✅ تم نسخ الذكر!");
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold text-purple-600 dark:text-sky-400 mb-8">
        🌃️ أذكار المساء
      </h1>

      <div className="space-y-6">
        {eveningAzkar.map((zekr) => (
          <div
            key={zekr.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 text-gray-800 dark:text-white text-lg leading-loose relative"
          >
            <p>{zekr.text}</p>
            <button
              onClick={() => handleCopy(zekr.text)}
              className="absolute top-3 left-3 text-sm text-blue-600 dark:text-yellow-400 hover:underline"
            >
              نسخ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AzkarEvening;

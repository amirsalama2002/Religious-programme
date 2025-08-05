// src/Pages/AzkarMorning.jsx
import React from "react";

const morningAzkar = [
  {
    id: 1,
    text: "اللهم بك أصبحنا وبك أمسينا، وبك نحيا وبك نموت وإليك النشور.",
  },
  {
    id: 2,
    text: "رضيت بالله ربا، وبالإسلام دينا، وبمحمد ﷺ نبيًا.",
  },
  {
    id: 3,
    text: "اللهم إني أصبحت أشهدك، وأشهد حملة عرشك، وملائكتك، وجميع خلقك أنك أنت الله لا إله إلا أنت وحدك لا شريك لك، وأن محمدًا عبدك ورسولك. (4 مرات)",
  },
  {
    id: 4,
    text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
  },
  {
    id: 5,
    text: "اللهم ما أصبح بي من نعمة أو بأحد من خلقك، فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر.",
  },
];

function AzkarMorning() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-yellow-400 mb-8">
        🌅 أذكار الصباح
      </h1>

      <div className="space-y-6">
        {morningAzkar.map((zekr) => (
          <div
            key={zekr.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 text-gray-800 dark:text-white text-lg leading-loose"
          >
            {zekr.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AzkarMorning;

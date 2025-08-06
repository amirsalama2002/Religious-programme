import { useEffect, useState } from "react";

const hadiths = [
  {
    text: "قال رسول الله ﷺ: \"من كان يؤمن بالله واليوم الآخر فليقل خيرًا أو ليصمت\".",
    category: "الصدق",
  },
  {
    text: "قال رسول الله ﷺ: \"من لا يشكر الناس لا يشكر الله\".",
    category: "الشكر",
  },
  {
    text: "قال رسول الله ﷺ: \"خيركم خيركم لأهله وأنا خيركم لأهلي\".",
    category: "بر الأهل",
  },
  {
    text: "قال رسول الله ﷺ: \"تبسمك في وجه أخيك صدقة\".",
    category: "الخلق الحسن",
  },
  // يمكنك إضافة المزيد لاحقًا
];

function HadithOfTheDay() {
  const [hadith, setHadith] = useState(hadiths[0]);

  useEffect(() => {
    const dayIndex = new Date().getDate() % hadiths.length;
    setHadith(hadiths[dayIndex]);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hadith.text);
      alert("✅ تم نسخ الحديث");
    } catch {
      alert("❌ لم يتم النسخ");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "حديث نبوي",
          text: hadith.text,
        });
      } catch (err) {
        alert("لم يتم المشاركة");
      }
    } else {
      alert("المشاركة غير مدعومة في هذا المتصفح");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 text-center rounded-xl shadow p-6 mt-10">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-sky-400 mb-4">
        📖 حديث اليوم
      </h1>

      <p className="text-lg text-gray-800 dark:text-gray-100 mb-2">{hadith.text}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">📌 التصنيف: {hadith.category}</p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleCopy}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          نسخ الحديث
        </button>
        <button
          onClick={handleShare}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          مشاركة
        </button>
      </div>
    </div>
  );
}

export default HadithOfTheDay;

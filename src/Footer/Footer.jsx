// components/Footer.jsx
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t dark:border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-gray-700 dark:text-gray-300">
        
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/Imgs/ChatGPT Image Aug 5, 2025, 05_28_24 AM.png"
              alt="logo"
              className="w-12 h-12 rounded-full shadow-lg"
            />
            <span className="text-2xl font-extrabold text-blue-700 dark:text-sky-400 drop-shadow">
              نداء السماء
            </span>
          </div>
          <p className="text-sm leading-6">
            تطبيق روحاني يساعدك على متابعة صلاتك، تسبيحك، أذكارك ووردك القرآني بسهولة ويُسر.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">روابط سريعة</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-600 dark:hover:text-sky-400">🏠 الصفحة الرئيسية</a></li>
            <li><a href="/quran" className="hover:text-blue-600 dark:hover:text-sky-400">📖 استمع للقرآن</a></li>
            <li><a href="/tasbeeh" className="hover:text-blue-600 dark:hover:text-sky-400">🟢 التسبيح</a></li>
            <li><a href="/quiz" className="hover:text-blue-600 dark:hover:text-sky-400">❓ سؤال اليوم</a></li>
            <li><a href="/about" className="hover:text-blue-600 dark:hover:text-sky-400">ℹ️ من نحن</a></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">تواصل معنا</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><Mail size={16} /> hamirsalama@gmail.com</li>
            <li className="flex items-center gap-2">📍 القاهرة - مصر</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-blue-600 transition"><Facebook /></a>
            <a href="#" className="hover:text-sky-500 transition"><Twitter /></a>
            <a href="#" className="hover:text-pink-500 transition"><Instagram /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-500 py-4 border-t dark:border-gray-700">
        © {new Date().getFullYear()} نداء السماء - جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

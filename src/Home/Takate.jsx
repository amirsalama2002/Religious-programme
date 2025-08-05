import { useEffect, useState, useRef } from "react";
import moment from "moment-timezone";
import "moment/locale/ar";
import "moment-hijri";

const arabicNames = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

const prayerOrder = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

function Takate() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");
  const [location, setLocation] = useState({ city: "مدينتك", latitude: null, longitude: null });
  const [hijriDate, setHijriDate] = useState("");

  // ✅ الوضع الليلي يتم قراءته من localStorage أول مرة
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const audioRef = useRef(null);

  // ✅ تحديث localStorage عند تغيير الوضع الليلي
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    moment.locale("ar");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation((prev) => ({ ...prev, latitude, longitude }));

        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ar`
        );
        const data = await res.json();
        setLocation((prev) => ({
          ...prev,
          city: data.city || "مدينتك",
        }));
      });
    }
  }, []);

  useEffect(() => {
    if (!location.latitude || !location.longitude) return;

    const fetchPrayerTimes = async () => {
      const res = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${location.latitude}&longitude=${location.longitude}&method=5&timezonestring=Africa/Cairo`
      );
      const data = await res.json();
      setPrayerTimes(data.data.timings);
      const hijri = data.data.date.hijri;
      setHijriDate(`${hijri.day}-${hijri.month.ar}-${hijri.year}`);
    };

    fetchPrayerTimes();
  }, [location.latitude, location.longitude]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment.tz("Africa/Cairo");
      let next = null;

      for (let prayer of prayerOrder) {
        const time = prayerTimes[prayer];
        if (!time) continue;
        const prayerTime = moment.tz(time, "HH:mm", "Africa/Cairo");
        if (now.isBefore(prayerTime)) {
          next = prayer;
          break;
        }
      }

      if (!next && prayerTimes["Fajr"]) {
        const fajrTomorrow = moment
          .tz(prayerTimes["Fajr"], "HH:mm", "Africa/Cairo")
          .add(1, "day");
        const diff = moment.duration(fajrTomorrow.diff(now));
        setNextPrayer("الفجر (غدًا)");
        setCountdown(`${diff.hours()} س ${diff.minutes()} د ${diff.seconds()} ث`);
      } else if (next) {
        const prayerTime = moment.tz(prayerTimes[next], "HH:mm", "Africa/Cairo");
        const diff = moment.duration(prayerTime.diff(now));
        setNextPrayer(arabicNames[next]);
        setCountdown(`${diff.hours()} س ${diff.minutes()} د ${diff.seconds()} ث`);

        if (now.format("HH:mm") === prayerTime.format("HH:mm")) {
          audioRef.current?.play().catch(() => {});
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  return (
    <div
      dir="rtl"
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } max-w-6xl mx-auto shadow-xl rounded-xl p-6 mt-10 text-center transition duration-300`}
    >
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow transition"
      >
        {darkMode ? "الوضع النهاري ☀️" : "الوضع الليلي 🌙"}
      </button>

      <h1 className="text-3xl font-bold mb-3 text-blue-400">
        مواقيت الصلاة - {location.city}
      </h1>

      <p className="text-base font-semibold text-yellow-500 dark:text-sky-400 flex items-center justify-center gap-2 mb-4">
        <span className="text-xl">🌙</span>
        <span>التاريخ الهجري: {hijriDate}</span>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
        {prayerOrder.map((key) => (
          <div
            key={key}
            className={`${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            } p-4 rounded-lg shadow-sm`}
          >
            <p className="text-sm font-semibold">{arabicNames[key]}</p>
            <p className="text-xl font-bold">{prayerTimes[key]}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-700 text-white py-4 rounded-xl">
        <h2 className="text-lg font-semibold">الصلاة القادمة: {nextPrayer}</h2>
        <p className="text-sm mt-1">المتبقي: {countdown}</p>
      </div>

      <audio ref={audioRef} src="/Adue/019--1.mp3" className="hidden" />
    </div>
  );
}

export default Takate;

import { useEffect, useState } from "react";
import moment from "moment-timezone";
import "moment/locale/ar";

const arabicNames = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

const prayerOrder = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

function Azan() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");
  const [location, setLocation] = useState({
    city: "مدينتك",
    country: "",
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    moment.locale("ar");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ar`
          );
          const data = await res.json();
          setLocation((prev) => ({
            ...prev,
            city: data.city || "مدينتك",
            country: data.countryName || "",
          }));
        } catch (err) {
          console.error("مشكلة في تحديد الموقع:", err);
        }
      });
    }
  }, []);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      if (!location.latitude || !location.longitude) return;

      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${location.latitude}&longitude=${location.longitude}&method=5&timezonestring=Africa/Cairo`
        );
        const data = await res.json();
        setPrayerTimes(data.data.timings);
      } catch (err) {
        console.error("فشل جلب مواقيت الصلاة:", err);
      }
    };

    fetchPrayerTimes();
  }, [location.latitude, location.longitude]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment.tz("Africa/Cairo");
      const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      let foundNext = false;

      for (let i = 0; i < prayerNames.length; i++) {
        const prayer = prayerNames[i];
        const timeStr = prayerTimes[prayer];
        if (!timeStr) continue;

        const prayerTime = moment.tz(timeStr, "HH:mm", "Africa/Cairo");

        if (now.isBefore(prayerTime)) {
          setNextPrayer(arabicNames[prayer]);
          const diff = moment.duration(prayerTime.diff(now));
          setCountdown(
            `${diff.hours()} س ${diff.minutes()} د ${diff.seconds()} ث`
          );
          foundNext = true;
          break;
        }
      }

      if (!foundNext && prayerTimes["Fajr"]) {
        const fajrTomorrow = moment
          .tz(prayerTimes["Fajr"], "HH:mm", "Africa/Cairo")
          .add(1, "day");
        const diff = moment.duration(fajrTomorrow.diff(now));
        setNextPrayer("الفجر (غدًا)");
        setCountdown(
          `${diff.hours()} س ${diff.minutes()} د ${diff.seconds()} ث`
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  return (
    <div
      dir="rtl"
      className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6 mt-10 text-center"
    >
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        مواقيت الصلاة - {location.city}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
        {prayerOrder.map((key) => (
          <div key={key} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-500">
              {arabicNames[key]}
            </p>
            <p className="text-xl font-bold text-gray-800">
              {prayerTimes[key]}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-blue-100 text-blue-800 py-4 rounded-xl">
        <h2 className="text-lg font-semibold">
          الصلاة القادمة: {nextPrayer}
        </h2>
        <p className="text-sm mt-1">المتبقي: {countdown}</p>
      </div>
    </div>
  );
}

export default Azan;

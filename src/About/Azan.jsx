import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ar"; // لتفعيل اللغة العربية

function Azan() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");
  const [location, setLocation] = useState({ city: "مدينتك", country: "" });

  const arabicNames = {
    Fajr: "الفجر",
    Sunrise: "الشروق",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
  };

  const prayerOrder = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

  useEffect(() => {
    moment.locale("ar");
    getLocation();
  }, []);

  useEffect(() => {
    if (location.city !== "مدينتك") {
      fetchPrayerTimes();
    }
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      updateNextPrayer();
    }, 1000);
    return () => clearInterval(timer);
  }, [prayerTimes]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ar`
          );
          const data = await res.json();
          setLocation({
            city: data.city || "مدينتك",
            country: data.countryName || "",
          });
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      });
    }
  };

  const fetchPrayerTimes = async () => {
    const today = moment().format("DD-MM-YYYY");
    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${today}?city=${location.city}&country=${location.country}&method=5`
      );
      const data = await res.json();
      setPrayerTimes(data.data.timings);
    } catch (error) {
      console.error("Failed to fetch prayer times:", error);
    }
  };

  const updateNextPrayer = () => {
    const now = moment();
    const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    let foundNext = false;

    for (let i = 0; i < prayerNames.length; i++) {
      const prayer = prayerNames[i];
      const timeStr = prayerTimes[prayer];
      if (!timeStr) continue;

      const prayerTime = moment(timeStr, "HH:mm");
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
      const fajrTomorrow = moment(prayerTimes["Fajr"], "HH:mm").add(1, "day");
      const diff = moment.duration(fajrTomorrow.diff(now));
      setNextPrayer("الفجر (غدًا)");
      setCountdown(`${diff.hours()} س ${diff.minutes()} د ${diff.seconds()} ث`);
    }
  };

  return (
    <div dir="rtl" className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6 mt-10 text-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        مواقيت الصلاة - {location.city}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
        {prayerOrder.map((key) => (
          <div key={key} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-500">{arabicNames[key]}</p>
            <p className="text-xl font-bold text-gray-800">{prayerTimes[key]}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-100 text-blue-800 py-4 rounded-xl">
        <h2 className="text-lg font-semibold">الصلاة القادمة: {nextPrayer}</h2>
        <p className="text-sm mt-1">المتبقي: {countdown}</p>
      </div>
    </div>
  );
}

export default Azan;

import { useEffect, useRef, useState } from "react";
import moment from "moment";

function Adue() {
  const audioRef = useRef(null);
  const [prayerTimes, setPrayerTimes] = useState({});

  // تفعيل التشغيل بعد أول نقرة من المستخدم
  useEffect(() => {
    const allowPlay = () => {
      const dummy = new Audio();
      dummy.play().catch(() => {});
      document.removeEventListener("click", allowPlay);
    };
    document.addEventListener("click", allowPlay);
  }, []);

  // جلب مواقيت الصلاة مرة واحدة
  useEffect(() => {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5")
      .then((res) => res.json())
      .then((data) => setPrayerTimes(data.data.timings));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment();
      const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

      for (let i = 0; i < prayerNames.length; i++) {
        const prayer = prayerNames[i];
        const timeStr = prayerTimes[prayer];
        if (!timeStr) continue;

        const prayerTime = moment(timeStr, "HH:mm");
        if (now.format("HH:mm") === prayerTime.format("HH:mm")) {
          audioRef.current?.play().catch(() => {
            console.warn("المتصفح منع تشغيل الصوت تلقائيًا.");
          });
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  return (
    <div>
      <audio ref={audioRef} src="/Adue/019--1.mp3" className="hidden" />
    </div>
  );
}

export default Adue;

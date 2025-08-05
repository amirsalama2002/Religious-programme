import { useEffect, useRef, useState } from "react";
import moment from "moment";

function Adue() {
  const audioRef = useRef(null);
  const [prayerTimes, setPrayerTimes] = useState({});
  const [nextPrayer, setNextPrayer] = useState("");

  // ✅ هنا بنفعل التشغيل بعد أول كليك من المستخدم
  useEffect(() => {
    const allowPlay = () => {
      const dummy = new Audio();
      dummy.play().catch(() => {});
      document.removeEventListener("click", allowPlay);
    };
    document.addEventListener("click", allowPlay);
  }, []);

  useEffect(() => {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5")
      .then((res) => res.json())
      .then((data) => setPrayerTimes(data.data.timings));

    const timer = setInterval(() => {
      updateNextPrayer();
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  const updateNextPrayer = () => {
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

      if (now.isBefore(prayerTime)) {
        setNextPrayer(prayer);
        break;
      }
    }
  };

  return (
    <div>
      <audio ref={audioRef} src="/Adue/019--1.mp3" className="hidden" />
    </div>
  );
}

export default Adue;

/* ============================================
   Digital Clock
   Real-time · updates every second
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const hoursEl   = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const ampmEl    = document.getElementById("ampm");
  const dateEl    = document.getElementById("date");
  const zoneEl    = document.getElementById("zone");
  const dayProgEl = document.getElementById("dayProgress");
  const progFill  = document.getElementById("progressFill");
  const weekEl    = document.getElementById("week");
  const tzEl      = document.getElementById("tz");

  const pad = (n) => String(n).padStart(2, "0");

  const DAYS   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTHS = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

  /* ---------- Timezone info (once) ---------- */
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";
    tzEl.textContent = tz.split("/").pop().replace(/_/g, " ");
    zoneEl.textContent = tz.replace(/_/g, " ");
  } catch {
    tzEl.textContent = "Local";
  }

  /* ---------- Week number ---------- */
  const getWeekNumber = (d) => {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  };

  /* ---------- Main tick ---------- */
  const tick = () => {
    const now = new Date();

    // 12-hour format
    let h = now.getHours();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;

    hoursEl.textContent   = pad(h);
    minutesEl.textContent = pad(now.getMinutes());
    secondsEl.textContent = pad(now.getSeconds());
    ampmEl.textContent    = ampm;

    // Date
    dateEl.innerHTML =
      `${DAYS[now.getDay()]}, <span>${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}</span>`;

    // Day progress
    const secondsToday =
      now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const pct = (secondsToday / 86400) * 100;
    dayProgEl.textContent = pct.toFixed(1) + "%";
    progFill.style.width = pct + "%";

    // Week number
    weekEl.textContent = "W" + getWeekNumber(now);
  };

  tick();
  setInterval(tick, 1000);

  /* ---------- Update the document title with the time ---------- */
  setInterval(() => {
    const now = new Date();
    let h = now.getHours() % 12 || 12;
    document.title = `${pad(h)}:${pad(now.getMinutes())} — Digital Clock`;
  }, 1000);
});

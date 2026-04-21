import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const marigoldStrings = [
  { left: "8%", delay: 0, duration: 5.5, height: 210 },
  { left: "18%", delay: 0.5, duration: 6.5, height: 250 },
  { left: "82%", delay: 0.2, duration: 5.8, height: 230 },
  { left: "92%", delay: 0.8, duration: 6.8, height: 270 },
];

const petals = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  left: `${5 + i * 6}%`,
  delay: (i % 6) * 0.7,
  duration: 8 + (i % 4),
  size: 8 + (i % 3) * 4,
}));

const initialBlessings = [
  {
    id: 1,
    name: "Family Blessing",
    message: "Wishing Surya and Hema a lifetime filled with joy, harmony, and beautiful beginnings.",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "With Love",
    message: "May this engagement mark the start of a graceful and unforgettable journey together.",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Best Wishes",
    message: "Blessings for happiness, prosperity, laughter, and endless togetherness in the years ahead.",
    created_at: new Date().toISOString(),
  },
];

function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function downloadCalendarInvite() {
  const start = new Date("2026-04-29T18:30:00");
  const end = new Date("2026-04-29T21:30:00");

  const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Surya & Hema Engagement\nDTSTART:${formatICSDate(start)}\nDTEND:${formatICSDate(end)}\nLOCATION:Venue details to be added\nDESCRIPTION:Join us for the engagement celebration of Surya & Hema\nEND:VEVENT\nEND:VCALENDAR`;

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "surya-hema-engagement.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function MangoTorana() {
  return (
    <div className="absolute top-0 inset-x-0 h-36 md:h-44 overflow-hidden pointer-events-none z-20">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />
      <div className="absolute inset-x-0 top-2 flex items-start justify-center gap-1 md:gap-2">
        {Array.from({ length: 26 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ rotate: i % 2 === 0 ? -8 : 8, y: -6 }}
            animate={{ rotate: i % 2 === 0 ? [-8, -3, -8] : [8, 3, 8], y: [-6, 0, -6] }}
            transition={{ duration: 3 + (i % 4) * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
            className="flex flex-col items-center"
          >
            <div className="h-4 w-[2px] bg-amber-100/40" />
            <div className="h-8 w-4 md:h-10 md:w-5 rounded-b-full rounded-t-[60%] bg-gradient-to-b from-lime-200 via-green-300 to-emerald-500 shadow-[0_0_18px_rgba(120,255,160,0.12)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MarigoldString({ left, delay, duration, height }) {
  return (
    <motion.div
      initial={{ y: -24, rotate: -2 }}
      animate={{ y: [-24, -8, -24], rotate: [-2, 2, -2] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      className="absolute top-0 hidden md:flex flex-col items-center z-20"
      style={{ left }}
    >
      <div className="w-[2px] bg-amber-100/30" style={{ height: 60 }} />
      <div className="flex flex-col gap-1.5 rounded-full px-1 py-1 bg-amber-100/5 backdrop-blur-[2px]" style={{ height }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="rounded-full bg-gradient-to-b from-yellow-200 via-amber-400 to-orange-500 shadow-[0_6px_18px_rgba(255,170,0,0.24)]"
            style={{ width: 18 - (i % 2) * 2, height: 18 - (i % 2) * 2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function FloatingPetals() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: -20, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: [0, 260, 540, 860],
            x: [0, 20, -14, 18],
            rotate: [0, 70, 150, 230],
            opacity: [0, 0.8, 0.9, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            ease: "linear",
            delay: petal.delay,
          }}
          className="absolute top-0 rounded-full bg-gradient-to-br from-amber-200 via-orange-400 to-rose-300 blur-[0.2px]"
          style={{ left: petal.left, width: petal.size, height: petal.size * 0.75, borderRadius: "70% 30% 70% 30%" }}
        />
      ))}
    </div>
  );
}

function OpeningOverlay({ onEnter }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-[radial-gradient(circle_at_top,_rgba(255,205,90,0.18),_transparent_30%),linear-gradient(180deg,#2a1010,#120606)] flex items-center justify-center px-5 md:px-6"
    >
      <FloatingPetals />
      <div className="absolute top-0 inset-x-0">
        <MangoTorana />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl"
      >
        <p className="text-xs md:text-sm uppercase tracking-[0.6em] text-amber-200/70">With joy in our hearts</p>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.95] text-amber-50">
          Surya <span className="text-amber-300">&</span> Hema
        </h1>
        <p className="mt-6 text-sm sm:text-base md:text-xl text-stone-300 leading-7 md:leading-8 px-2 sm:px-0">
          Invite you to celebrate their engagement in an evening woven with family, blessings, and beautiful beginnings.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEnter}
          className="mt-10 rounded-full border border-amber-200/30 bg-white/10 px-7 py-3 text-xs md:text-sm uppercase tracking-[0.35em] text-amber-50 backdrop-blur-md shadow-xl shadow-black/20"
        >
          Enter Invitation
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-4">
      <p className="text-xs md:text-sm uppercase tracking-[0.45em] text-amber-200/70">{eyebrow}</p>
      <h2 className="text-3xl md:text-5xl font-serif text-amber-50 leading-tight">{title}</h2>
      {description ? <p className="text-sm md:text-base leading-8 text-stone-300">{description}</p> : null}
    </div>
  );
}

export default function EngagementInvitationPage() {
  const [showOpening, setShowOpening] = useState(true);
  const [blessings, setBlessings] = useState(initialBlessings);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [recentGlow, setRecentGlow] = useState(false);
  const [loadingBlessings, setLoadingBlessings] = useState(true);
  const [submittingBlessing, setSubmittingBlessing] = useState(false);
  const [blessingError, setBlessingError] = useState("");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  useEffect(() => {
    async function loadBlessings() {
      if (!supabase) {
        setBlessingError("Supabase is not configured yet.");
        setLoadingBlessings(false);
        setBlessings(initialBlessings);
        return;
      }

      setLoadingBlessings(true);
      setBlessingError("");

      const { data, error } = await supabase
        .from("blessings")
        .select("id, name, message, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading blessings:", error.message);
        setBlessingError("Could not load blessings right now.");
        setBlessings(initialBlessings);
      } else if (data && data.length > 0) {
        setBlessings(data);
      } else {
        setBlessings(initialBlessings);
      }

      setLoadingBlessings(false);
    }

    loadBlessings();
  }, []);

  const eventDetails = useMemo(
    () => ({
      day: "Wednesday",
      date: "29 April 2026",
      time: "6:30 PM onwards",
      venue: "Venue details to be added",
      mapsUrl: "https://maps.google.com",
    }),
    []
  );

  async function handleBlessingSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    if (!supabase) {
      setBlessingError("Supabase is not configured yet.");
      return;
    }

    setSubmittingBlessing(true);
    setBlessingError("");

    const { data, error } = await supabase
      .from("blessings")
      .insert([
        {
          name: name.trim(),
          message: message.trim(),
        },
      ])
      .select("id, name, message, created_at")
      .single();

    if (error) {
      console.error("Error saving blessing:", error.message);
      setBlessingError("Your blessing could not be posted. Please try again.");
      setSubmittingBlessing(false);
      return;
    }

    setBlessings((prev) => [data, ...prev]);
    setName("");
    setMessage("");
    setRecentGlow(true);
    setTimeout(() => setRecentGlow(false), 1500);
    setSubmittingBlessing(false);
  }

  return (
    <div className="min-h-screen bg-[#2a1010] text-stone-100 overflow-x-hidden relative">
      <AnimatePresence>{showOpening ? <OpeningOverlay onEnter={() => setShowOpening(false)} /> : null}</AnimatePresence>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,214,102,0.18),_transparent_30%),radial-gradient(circle_at_20%_20%,_rgba(255,120,60,0.14),_transparent_25%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.05),_transparent_35%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(50,12,12,0.92),rgba(23,7,7,0.98))] pointer-events-none" />

      <MangoTorana />
      <FloatingPetals />
      {marigoldStrings.map((item, index) => (
        <MarigoldString key={index} {...item} />
      ))}

      <header className="relative z-30 px-4 sm:px-6 md:px-10 py-4 sm:py-6 flex items-center justify-between gap-3 border-b border-white/5 backdrop-blur-sm bg-black/10">
        <div>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-amber-200/75">Engagement Celebration</p>
          <h1 className="text-base sm:text-lg md:text-2xl font-serif tracking-wide text-amber-50">Surya & Hema</h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#blessings"
            className="hidden md:inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-stone-200/90 hover:bg-white/10 transition"
          >
            Blessings
          </a>
          <button
            onClick={downloadCalendarInvite}
            className="rounded-full border border-amber-200/30 bg-white/5 px-3 sm:px-4 py-2 text-[10px] sm:text-xs md:text-sm tracking-[0.18em] sm:tracking-[0.25em] uppercase text-amber-100/90 hover:bg-amber-100/10 transition backdrop-blur-md whitespace-nowrap"
          >
            Save the Date
          </button>
        </div>
      </header>

      <main className="relative z-20">
        <section className="relative px-4 sm:px-6 md:px-10 pt-16 sm:pt-20 md:pt-28 pb-14 md:pb-20 min-h-[92vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="space-y-6 md:space-y-8"
            >
              <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-amber-200/70">With the blessings of our families</p>
              <div className="space-y-5">
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6.2rem] leading-[0.95] md:leading-[0.92] font-serif text-amber-50">
                  A celebration of
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-amber-300 to-orange-300 italic">love, tradition</span>
                  and togetherness
                </h2>
                <p className="max-w-2xl text-sm md:text-lg leading-7 md:leading-8 text-stone-300">
                  Step into an immersive invitation experience with floral motion, a cinematic names reveal, and every detail beautifully arranged for a premium wedding microsite feel.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex gap-3 sm:gap-4 pt-2">
                <div className="rounded-[1.75rem] border border-amber-100/10 bg-white/5 px-5 py-4 backdrop-blur-md min-w-0 shadow-xl shadow-black/20">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/70">Bride</p>
                  <p className="mt-2 text-2xl font-serif text-amber-50">Hema</p>
                </div>
                <div className="rounded-[1.75rem] border border-amber-100/10 bg-white/5 px-5 py-4 backdrop-blur-md min-w-0 shadow-xl shadow-black/20">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/70">Groom</p>
                  <p className="mt-2 text-2xl font-serif text-amber-50">Surya</p>
                </div>
                <div className="rounded-[1.75rem] border border-amber-100/10 bg-white/5 px-5 py-4 backdrop-blur-md min-w-0 sm:col-span-2 xl:col-span-1 shadow-xl shadow-black/20">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/70">Date</p>
                  <p className="mt-2 text-2xl font-serif text-amber-50">{eventDetails.date}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <a
                  href="#details"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.24em] sm:tracking-[0.3em] text-stone-100 hover:bg-white/10 transition text-center justify-center"
                >
                  Explore Details
                </a>
                <button
                  onClick={downloadCalendarInvite}
                  className="rounded-full border border-amber-200/30 bg-amber-200/10 px-5 py-3 text-xs uppercase tracking-[0.24em] sm:tracking-[0.3em] text-amber-50 hover:bg-amber-200/15 transition text-center justify-center"
                >
                  Add to Calendar
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-[2.7rem] bg-gradient-to-b from-amber-300/20 via-orange-400/10 to-transparent blur-3xl" />
              <div className="relative rounded-[2rem] md:rounded-[2.5rem] border border-amber-100/15 bg-[linear-gradient(180deg,rgba(255,248,220,0.10),rgba(255,255,255,0.04))] p-4 sm:p-5 md:p-7 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[1.6rem] md:rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,209,102,0.10),_transparent_35%),linear-gradient(180deg,#2a1111,#180a0a)] p-5 sm:p-6 md:p-8 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-amber-200/5 to-transparent" />
                  <div>
                    <p className="text-center text-[10px] uppercase tracking-[0.42em] text-amber-200/75">Traditional • Festive • Refined</p>
                    <div className="mt-8 flex items-center justify-center gap-4 text-amber-300/90">
                      <div className="h-px w-12 bg-amber-300/40" />
                      <span className="text-3xl">✦</span>
                      <div className="h-px w-12 bg-amber-300/40" />
                    </div>
                    <div className="mt-8 text-center space-y-3">
                      <p className="text-sm uppercase tracking-[0.35em] text-stone-400">Join us for the engagement of</p>
                      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-amber-50 leading-tight">Surya <span className="text-amber-300">&</span> Hema</h3>
                      <p className="text-base text-stone-300">as they begin a beautiful new chapter together</p>
                    </div>
                  </div>

                  <div className="space-y-5 relative z-10">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
                        <p className="text-[10px] uppercase tracking-[0.26em] text-stone-400">Day</p>
                        <p className="mt-1 text-lg font-medium text-amber-50">{eventDetails.day}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
                        <p className="text-[10px] uppercase tracking-[0.26em] text-stone-400">Time</p>
                        <p className="mt-1 text-lg font-medium text-amber-50">{eventDetails.time}</p>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-dashed border-amber-200/20 bg-white/[0.03] px-4 py-4 text-center">
                      <p className="text-[10px] uppercase tracking-[0.26em] text-amber-200/60">Venue</p>
                      <p className="mt-2 text-stone-200 leading-7">{eventDetails.venue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="details" className="px-6 md:px-10 py-16 md:py-24">
          <SectionTitle
            eyebrow="The Invitation"
            title="A graceful journey through the celebration"
            description="Scroll through the moment, save the date to your calendar, and explore the venue details as part of one immersive experience."
          />

          <div className="max-w-6xl mx-auto mt-10 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              { label: "Names Reveal", value: "Surya & Hema", note: "A grand opening with floral motion and festive warmth." },
              { label: "Date & Time", value: `${eventDetails.date} • ${eventDetails.time}`, note: "Designed to be saved instantly to every guest's calendar." },
              { label: "Celebration", value: "Engagement Ceremony", note: "A premium wedding microsite flow with an elegant visual rhythm." },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                className="rounded-[1.5rem] md:rounded-[1.8rem] border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-md shadow-lg shadow-black/20"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">{item.label}</p>
                <h3 className="mt-4 text-2xl font-serif text-amber-50 leading-tight">{item.value}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 py-10 md:py-16">
          <div className="max-w-6xl mx-auto rounded-[2rem] md:rounded-[2.5rem] border border-amber-100/10 bg-[linear-gradient(180deg,rgba(255,248,220,0.08),rgba(255,255,255,0.04))] p-5 sm:p-8 md:p-12 shadow-2xl shadow-black/20 backdrop-blur-md">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-10 items-center">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Calendar</p>
                <h3 className="text-3xl md:text-5xl font-serif text-amber-50 leading-tight">Save the celebration in one tap</h3>
                <p className="text-sm md:text-base leading-8 text-stone-300">
                  Guests can add the engagement directly to their phone or desktop calendar with the invitation details included.
                </p>
              </div>
              <div className="rounded-[1.6rem] md:rounded-[2rem] border border-white/10 bg-black/15 p-5 sm:p-6 md:p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-stone-400">Date</p>
                    <p className="mt-2 text-xl font-serif text-amber-50">{eventDetails.date}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-stone-400">Time</p>
                    <p className="mt-2 text-xl font-serif text-amber-50">{eventDetails.time}</p>
                  </div>
                </div>
                <button
                  onClick={downloadCalendarInvite}
                  className="mt-5 w-full rounded-full border border-amber-200/30 bg-amber-200/10 px-5 py-4 text-xs uppercase tracking-[0.35em] text-amber-50 hover:bg-amber-200/15 transition"
                >
                  Download Calendar Invite
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-16 md:py-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-5 md:gap-6 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-[1.6rem] md:rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-8 md:p-10 backdrop-blur-md shadow-xl shadow-black/20"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Location</p>
              <h3 className="mt-4 text-3xl md:text-4xl font-serif text-amber-50">Celebrate with us</h3>
              <p className="mt-4 text-sm md:text-base leading-8 text-stone-300">
                Venue details can be placed here along with the city, a short note for guests, parking information, or nearby stay recommendations.
              </p>
              <div className="mt-8 rounded-[1.5rem] border border-dashed border-amber-200/20 bg-black/15 p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Venue</p>
                <p className="mt-3 text-xl font-serif text-amber-50">{eventDetails.venue}</p>
                <a
                  href={eventDetails.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.3em] text-stone-100 hover:bg-white/10 transition"
                >
                  Open Location
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-[1.6rem] md:rounded-[2rem] border border-amber-100/10 bg-[linear-gradient(180deg,rgba(255,248,220,0.08),rgba(255,255,255,0.03))] p-5 sm:p-8 md:p-10 shadow-xl shadow-black/20"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Event Note</p>
              <h3 className="mt-4 text-3xl md:text-4xl font-serif text-amber-50">A moment shared with loved ones</h3>
              <p className="mt-4 text-sm md:text-base leading-8 text-stone-300">
                This section can also hold a short family note, dress code, event timeline, or a warm message welcoming guests to the celebration.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="blessings" className="px-6 md:px-10 py-16 md:py-24">
          <SectionTitle
            eyebrow="Blessings Wall"
            title="Add your wishes and let them appear live"
            description="Guests can leave a blessing message here, and it will appear on the site for a warm, shared celebration feel."
          />

          <div className="max-w-6xl mx-auto mt-10 md:mt-12 grid lg:grid-cols-[0.95fr_1.05fr] gap-5 md:gap-6 items-start">
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              onSubmit={handleBlessingSubmit}
              className="rounded-[1.6rem] md:rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8 backdrop-blur-md shadow-xl shadow-black/20 space-y-5"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">Leave a blessing</p>
                <h3 className="mt-3 text-2xl md:text-3xl font-serif text-amber-50">Share your love</h3>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.24em] text-stone-400">Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-stone-100 placeholder:text-stone-500 outline-none focus:border-amber-200/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.24em] text-stone-400">Blessing Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your blessing for the couple"
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-stone-100 placeholder:text-stone-500 outline-none focus:border-amber-200/30 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingBlessing}
                className="w-full rounded-full border border-amber-200/30 bg-amber-200/10 px-5 py-4 text-xs uppercase tracking-[0.35em] text-amber-50 hover:bg-amber-200/15 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submittingBlessing ? "Posting..." : "Post Blessing"}
              </button>

              {blessingError ? <p className="text-sm text-rose-300 leading-7">{blessingError}</p> : null}
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`rounded-[1.6rem] md:rounded-[2rem] border p-5 sm:p-6 md:p-8 backdrop-blur-md shadow-xl shadow-black/20 transition-all duration-500 ${recentGlow ? "border-amber-200/35 bg-amber-200/10" : "border-white/10 bg-white/5"}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">Live on the site</p>
                  <h3 className="mt-3 text-2xl md:text-3xl font-serif text-amber-50">Blessings from loved ones</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-stone-300">
                  {blessings.length} Messages
                </div>
              </div>

              <div className="mt-6 md:mt-8 grid gap-4 max-h-[520px] md:max-h-[640px] overflow-y-auto pr-1">
                {loadingBlessings ? (
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/15 p-5 text-sm text-stone-300">
                    Loading blessings...
                  </div>
                ) : null}

                {!loadingBlessings && blessings.map((item) => (
                  <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-black/15 p-5">
                    <p className="text-sm uppercase tracking-[0.25em] text-amber-200/70">{item.name}</p>
                    <p className="mt-3 text-sm md:text-base leading-8 text-stone-300">“{item.message}”</p>
                    {item.created_at ? (
                      <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-stone-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
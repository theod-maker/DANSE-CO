import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { useSchedule } from '../../hooks/useSanity';

const EASING = [0.25, 0.46, 0.45, 0.94] as const

const DAY_ORDER = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'Samedi (Stages)']

function ScheduleGrid() {
  const scheduleData = useSchedule();
  const days = useMemo(
    () => [...new Set(scheduleData.map(c => c.day))].sort(
      (a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b)
    ),
    [scheduleData]
  );
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    if (selectedDay && !days.includes(selectedDay)) {
      setSelectedDay('');
    }
  }, [days, selectedDay]);

  const activeDay = selectedDay || days[0] || '';
  const filteredClasses = scheduleData.filter(cls => cls.day === activeDay);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {days.map((day, i) => (
          <motion.button
            key={day}
            onClick={() => setSelectedDay(day)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`rounded-full px-3 py-1.5 md:px-5 md:py-2 text-sm font-medium transition-all ${
              activeDay === day
                ? 'bg-[#6C5CA8] text-white shadow-[0_4px_16px_rgba(124,58,237,0.35)]'
                : 'liquid-glass text-[#18102E]/50 hover:text-[#18102E]'
            }`}
          >
            {day}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: EASING }}
          className="flex flex-col gap-4"
        >
          {filteredClasses.map((cls, i) => (
            <motion.div
              key={cls._id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASING }}
              className="group liquid-glass rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative overflow-hidden"
            >
              {/* Shimmer */}
              <div className="card-shimmer-layer" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <h3
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-[#18102E] text-base md:text-lg"
                  >
                    {cls.name}
                  </h3>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                    className="bg-[#EDEAF6] rounded-full px-3 py-1 text-xs text-[#6C5CA8] font-medium"
                  >
                    {cls.level}
                  </motion.span>
                </div>
                <div className="flex items-center gap-2 md:gap-4 text-[#18102E]/40 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {cls.time}
                  </span>
                  {cls.venue && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {cls.venue}
                    </span>
                  )}
                </div>
              </div>

              {/* Accent violet subtil à droite */}
              <div className="hidden md:block w-1 h-10 rounded-full bg-[#6C5CA8]/15 group-hover:bg-[#6C5CA8]/35 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export { ScheduleGrid };

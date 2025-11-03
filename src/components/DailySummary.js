import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MotionConfig, motion } from "framer-motion";
import { Coffee, Sun, Moon, Droplet } from "lucide-react"; // optional icons
// NOTE: This file is a single-file React component for the "Tracking Page".
// It uses Tailwind CSS for styling and Recharts for charts.
// To fetch real data replace the `fetchDailyData()` stub with an Axios call to your backend.

const COLORS = ["#60a5fa", "#34d399", "#f59e0b", "#f97316"]; // breakfast, lunch, snacks, dinner
const SKIP_COLOR = "#e5e7eb";

const dummyApiResponse = {
  date: "2025-10-15",
  totals: { calories: 1920, protein: 95, carbs: 240, fats: 70, water_ml: 1850 },
  meals: [
    { id: "breakfast", name: "Breakfast", completed: true, skipped: false, calories: 480, items: ["Oats", "Milk", "Banana"] },
    { id: "lunch", name: "Lunch", completed: true, skipped: false, calories: 700, items: ["Grilled Chicken", "Rice", "Salad"] },
    { id: "snacks", name: "Snacks", completed: false, skipped: true, calories: 0, items: [] },
    { id: "dinner", name: "Dinner", completed: false, skipped: false, calories: 740, items: ["Paneer Curry", "Roti"] }
  ],
  goalCalories: 2000
};

export default function TrackingPage() {
  const [date, setDate] = useState(dummyApiResponse.date);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate load
    fetchDailyData(date).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [date]);

  async function fetchDailyData(selectedDate) {
    // Replace this with Axios GET to your API, e.g.:
    // const resp = await axios.get(`/api/daily-tracking?date=${selectedDate}`)
    // return resp.data
    await new Promise((r) => setTimeout(r, 350));
    return dummyApiResponse;
  }

  if (loading || !data) return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-48 bg-gray-100 rounded" />
      </div>
    </div>
  );

  const mealDistribution = data.meals.map((m, i) => ({ name: m.name, value: m.calories, color: COLORS[i] }));
  const skippedCount = data.meals.filter((m) => m.skipped).length;
  const completedCount = data.meals.filter((m) => m.completed).length;

  return (
    <MotionConfig>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Daily Tracking</h1>
            <p className="text-sm text-gray-500">Today’s Summary — {data.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="date"
              className="border rounded-md px-3 py-1"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md shadow">Save</button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: Summary card */}
          <div className="md:col-span-1 space-y-4">
            <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-medium">Today’s Summary</h2>
                  <p className="text-sm text-gray-500 mt-1">Calories, macros and hydration</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{data.totals.calories} kcal</div>
                  <div className="text-xs text-gray-500">Goal: {data.goalCalories} kcal</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Stat label="Protein" value={`${data.totals.protein} g`} icon={<Coffee size={16} />} />
                <Stat label="Carbs" value={`${data.totals.carbs} g`} icon={<Sun size={16} />} />
                <Stat label="Fats" value={`${data.totals.fats} g`} icon={<Moon size={16} />} />
                <Stat label="Water" value={`${Math.round(data.totals.water_ml / 250)} cups`} icon={<Droplet size={16} />} />
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-600">Meals completed</div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="text-xl font-semibold">{completedCount}/{data.meals.length}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full bg-green-400"
                      style={{ width: `${(completedCount / data.meals.length) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{skippedCount} meal(s) skipped</div>
              </div>

              <div className="mt-4 text-center text-sm text-green-600 font-medium">Great job staying healthy today!</div>
            </motion.div>

            {/* Pie chart card */}
            <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="text-sm font-medium mb-2">Calories distribution</h3>
              <div style={{ height: 240 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={mealDistribution} dataKey="value" nameKey="name" outerRadius={80} innerRadius={40} paddingAngle={4}>
                      {mealDistribution.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.value === 0 ? SKIP_COLOR : entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {data.meals.map((m, i) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full`} style={{ background: m.calories === 0 ? SKIP_COLOR : COLORS[i] }} />
                    <div className="text-sm">
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-gray-500">{m.calories} kcal • {m.skipped ? "Skipped" : m.completed ? "Completed" : "Pending"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skipped vs Completed Bar */}
            <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="text-sm font-medium mb-2">Completed vs Skipped</h3>
              <div style={{ height: 140 }}>
                <ResponsiveContainer>
                  <BarChart data={[{ name: "Meals", Completed: completedCount, Skipped: skippedCount }]}> 
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="Completed" radius={[6,6,0,0]} />
                    <Bar dataKey="Skipped" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Right column: Meal list */}
          <div className="md:col-span-2 space-y-4">
            <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl p-4 shadow-lg">
              <h2 className="text-lg font-medium mb-3">Meals</h2>
              <div className="space-y-3">
                {data.meals.map((meal, idx) => (
                  <MealCard key={meal.id} meal={meal} color={COLORS[idx]} />
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="text-md font-medium mb-2">Daily Notes</h3>
              <textarea className="w-full border rounded p-3 h-32" placeholder="Add a note about your day, cravings, or adjustments..." />
              <div className="mt-3 flex justify-end">
                <button className="px-4 py-2 rounded bg-gray-200 mr-2">Discard</button>
                <button className="px-4 py-2 rounded bg-gradient-to-r from-green-400 to-blue-500 text-white">Save Note</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
      <div className="p-2 bg-white rounded-md shadow-sm">{icon}</div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}

function MealCard({ meal, color }) {
  const completion = meal.skipped ? 0 : meal.completed ? 100 : 50;
  return (
    <div className="p-3 border rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-white to-gray-100 shadow" style={{ border: `3px solid ${meal.calories === 0 ? "#f3f4f6" : color}` }}>
            <div className="text-sm font-semibold">{meal.calories} kcal</div>
          </div>
          <div className="text-xs text-gray-500 mt-1">{meal.skipped ? "Skipped" : meal.completed ? "Completed" : "Pending"}</div>
        </div>
        <div>
          <div className="font-medium">{meal.name}</div>
          <div className="text-sm text-gray-500">{meal.items.length ? meal.items.join(" • ") : "No items recorded"}</div>
        </div>
      </div>

      <div className="w-48">
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-3 rounded-full" style={{ width: `${completion}%`, background: meal.skipped ? "#f3f4f6" : color }} />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <div>{completion}%</div>
          <div>{meal.calories} kcal</div>
        </div>
      </div>
    </div>
  );
}

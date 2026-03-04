import React, { useState } from 'react';
import { Brain, Calculator, BookOpen, Globe, Microscope, Landmark, Calendar, Clock, Target, BarChart3, Utensils, Dumbbell, Coffee, Users, Moon, Sunrise, Heart, Plus } from 'lucide-react';
import { SYLLABUS } from './data/syllabus';
import { generateWeeklyRoutine, getSubjects } from './data/routineGenerator';

function App() {
  const [view, setView] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [syllabus, setSyllabus] = useState([]);
  const [routine] = useState(generateWeeklyRoutine());

  const iconMap = {
    reasoning: Brain,
    maths: Calculator,
    english: BookOpen,
    gk: Globe,
    science: Microscope,
    social: Landmark
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-y-auto">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">SSC CHSL Planner</h1>
                  <p className="text-xs text-slate-400">Your Study Companion</p>
                </div>
              </div>
              <nav className="flex space-x-4">
                <button onClick={() => setView('home')} className="text-slate-300 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/5">Home</button>
              </nav>
            </div>
          </div>
        </header>

      {/* Home View */}
      {view === 'home' && (
        <div className="flex-1 px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-4">
                Dhrriti's <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Personalized</span> Study Plan
              </h2>
              <p className="text-xl text-slate-400 mb-2 flex items-center justify-center gap-2">
                Tension maat le baby, nikal jaegi exam <span className="text-2xl">😘</span>
              </p>
              <button 
                onClick={() => setView('routine')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition duration-300"
              >
                <Calendar className="inline w-5 h-5 mr-2" />
                View Weekly Schedule
              </button>
            </div>

            {/* Analytics Dashboard */}
            {routine.length > 0 && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
                    <Clock className="w-8 h-8 text-emerald-400 mb-2" />
                    <p className="text-sm text-slate-400">Avg Study Hours/Day</p>
                    <p className="text-3xl font-bold text-white">
                      {(routine.reduce((acc, day) => acc + day.schedule.filter(s => s.type === 'study').reduce((sum, s) => sum + s.duration, 0), 0) / routine.length / 60).toFixed(1)}h
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-6">
                    <Heart className="w-8 h-8 text-pink-400 mb-2" />
                    <p className="text-sm text-slate-400">Boyfriend Time/Week</p>
                    <p className="text-3xl font-bold text-white">
                      {(routine.reduce((acc, day) => acc + day.schedule.filter(s => s.activity.includes('Boyfriend')).reduce((sum, s) => sum + s.duration, 0), 0) / 60).toFixed(1)}h
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6">
                    <Dumbbell className="w-8 h-8 text-orange-400 mb-2" />
                    <p className="text-sm text-slate-400">Workout Sessions/Week</p>
                    <p className="text-3xl font-bold text-white">
                      {routine.reduce((acc, day) => acc + day.schedule.filter(s => s.type === 'fitness').length, 0)}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
                    <Target className="w-8 h-8 text-emerald-400 mb-2" />
                    <p className="text-sm text-slate-400">Total Study Hours/Week</p>
                    <p className="text-3xl font-bold text-white">
                      {(routine.reduce((acc, day) => acc + day.schedule.filter(s => s.type === 'study').reduce((sum, s) => sum + s.duration, 0), 0) / 60).toFixed(1)}h
                    </p>
                  </div>
                </div>

                {/* Daily Study Hours Chart */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-indigo-400" />
                    Daily Study Hours Distribution
                  </h3>
                  <div className="space-y-4">
                    {routine.map((day, idx) => {
                      const studyHours = day.schedule.filter(s => s.type === 'study').reduce((sum, s) => sum + s.duration, 0) / 60;
                      const maxHours = 13;
                      const percentage = (studyHours / maxHours) * 100;
                      return (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-white w-24">{day.day}</span>
                            <span className="text-sm text-slate-400">{studyHours.toFixed(1)}h</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Activity Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Weekly Time Allocation</h3>
                    <div className="space-y-3">
                      {[
                        { type: 'study', label: 'Study', color: 'emerald', icon: BookOpen },
                        { type: 'sleep', label: 'Sleep', color: 'slate', icon: Moon },
                        { type: 'meal', label: 'Meals', color: 'slate', icon: Utensils },
                        { type: 'fitness', label: 'Fitness', color: 'orange', icon: Dumbbell },
                        { type: 'personal', label: 'Personal', color: 'pink', icon: Heart },
                      ].map(({ type, label, color, icon: Icon }) => {
                        const totalMinutes = routine.reduce((acc, day) => 
                          acc + day.schedule.filter(s => s.type === type).reduce((sum, s) => sum + s.duration, 0), 0
                        );
                        const hours = (totalMinutes / 60).toFixed(1);
                        return (
                          <div key={type} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-5 h-5 text-${color}-400`} />
                              <span className="text-slate-300">{label}</span>
                            </div>
                            <span className="text-white font-semibold">{hours}h</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Study Location Split</h3>
                    <div className="space-y-4">
                      {[
                        { location: 'Library', days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
                        { location: 'Home (Sun/Mon)', days: ['Sunday', 'Monday'] },
                        { location: 'Home (Saturday)', days: ['Saturday'] },
                      ].map(({ location, days }) => {
                        const studyHours = routine
                          .filter(day => days.includes(day.day))
                          .reduce((acc, day) => 
                            acc + day.schedule.filter(s => s.type === 'study').reduce((sum, s) => sum + s.duration, 0), 0
                          ) / 60;
                        return (
                          <div key={location}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-slate-300">{location}</span>
                              <span className="text-white font-semibold">{studyHours.toFixed(1)}h</span>
                            </div>
                            <div className="flex gap-1">
                              {days.map(day => (
                                <div key={day} className="flex-1 bg-emerald-500/30 rounded px-2 py-1 text-xs text-center text-emerald-300">
                                  {day.slice(0, 3)}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Subject-wise Daily Analysis */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-emerald-400" />
                    Subject-wise Daily Study Plan
                  </h3>
                  <div className="space-y-4">
                    {routine.map((day, idx) => {
                      const subjectStudy = {};
                      day.schedule.filter(s => s.type === 'study' && s.subject).forEach(session => {
                        if (!subjectStudy[session.subject]) {
                          subjectStudy[session.subject] = 0;
                        }
                        subjectStudy[session.subject] += session.duration;
                      });
                      
                      return (
                        <div key={idx} className="border border-slate-600 rounded-xl p-4 bg-slate-700/30">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-bold text-white">{day.day}</span>
                            <span className="text-xs text-slate-400">{day.date}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(subjectStudy).map(([subject, minutes]) => {
                              const Icon = iconMap[subject];
                              const hours = (minutes / 60).toFixed(1);
                              return (
                                <div key={subject} className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-3 py-2">
                                  {Icon && <Icon className="w-4 h-4 text-emerald-400" />}
                                  <span className="text-xs text-emerald-300 font-medium">{subject}</span>
                                  <span className="text-xs text-white font-semibold">{hours}h</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Weekly Subject-wise Hours Graph */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-emerald-400" />
                    Weekly Subject-wise Study Hours
                  </h3>
                  <div className="space-y-4">
                    {(() => {
                      const weeklySubjects = {};
                      routine.forEach(day => {
                        day.schedule.filter(s => s.type === 'study' && s.subject).forEach(session => {
                          if (!weeklySubjects[session.subject]) {
                            weeklySubjects[session.subject] = 0;
                          }
                          weeklySubjects[session.subject] += session.duration;
                        });
                      });
                      const maxHours = Math.max(...Object.values(weeklySubjects)) / 60;
                      
                      return Object.entries(weeklySubjects).map(([subject, minutes]) => {
                        const Icon = iconMap[subject];
                        const hours = (minutes / 60).toFixed(1);
                        const percentage = (hours / maxHours) * 100;
                        return (
                          <div key={subject}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {Icon && <Icon className="w-5 h-5 text-emerald-400" />}
                                <span className="text-sm font-semibold text-white capitalize">{subject}</span>
                              </div>
                              <span className="text-sm text-slate-400">{hours}h</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Daily Subject Distribution Graph */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-emerald-400" />
                    Daily Subject Distribution
                  </h3>
                  <div className="space-y-6">
                    {routine.map((day, idx) => {
                      const subjectStudy = {};
                      day.schedule.filter(s => s.type === 'study' && s.subject).forEach(session => {
                        if (!subjectStudy[session.subject]) {
                          subjectStudy[session.subject] = 0;
                        }
                        subjectStudy[session.subject] += session.duration;
                      });
                      
                      const totalDayStudy = Object.values(subjectStudy).reduce((a, b) => a + b, 0);
                      if (totalDayStudy === 0) return null;
                      
                      return (
                        <div key={idx} className="border border-slate-600 rounded-xl p-4 bg-slate-700/30">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-bold text-white">{day.day}</span>
                            <span className="text-xs text-slate-400">{(totalDayStudy / 60).toFixed(1)}h total</span>
                          </div>
                          <div className="space-y-2">
                            {Object.entries(subjectStudy).map(([subject, minutes]) => {
                              const Icon = iconMap[subject];
                              const hours = (minutes / 60).toFixed(1);
                              const percentage = (minutes / totalDayStudy) * 100;
                              return (
                                <div key={subject}>
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      {Icon && <Icon className="w-4 h-4 text-emerald-400" />}
                                      <span className="text-xs text-slate-300 capitalize">{subject}</span>
                                    </div>
                                    <span className="text-xs text-white font-semibold">{hours}h</span>
                                  </div>
                                  <div className="w-full bg-slate-600 rounded-full h-2">
                                    <div 
                                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}



      {/* Routine View */}
      {view === 'routine' && (
        <div className="flex-1 px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-2">Yeah karna hai Dhrriti 7 din tere ko <span className="text-3xl">😘</span></h2>
              <p className="text-slate-400 mb-8">Anirban loves you .......</p>
            
            {/* Weekly Table */}
            <div className="overflow-x-auto -mx-8 px-8 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-slate-700">
              <table className="w-full border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    <th className="border border-slate-600 px-6 py-3 text-left font-semibold text-white min-w-[150px]">Day</th>
                    <th className="border border-slate-600 px-6 py-3 text-left font-semibold text-white min-w-[300px]">Morning Session</th>
                    <th className="border border-slate-600 px-6 py-3 text-left font-semibold text-white min-w-[300px]">Afternoon Session</th>
                    <th className="border border-slate-600 px-6 py-3 text-left font-semibold text-white min-w-[300px]">Evening Session</th>
                  </tr>
                </thead>
                <tbody>
                  {routine.map((day, idx) => {
                    const morningActivities = day.schedule.filter(s => {
                      const hour = parseInt(s.time.split(':')[0]);
                      return hour >= 5 && hour < 12;
                    });
                    const afternoonActivities = day.schedule.filter(s => {
                      const hour = parseInt(s.time.split(':')[0]);
                      return hour >= 12 && hour < 17;
                    });
                    const eveningActivities = day.schedule.filter(s => {
                      const hour = parseInt(s.time.split(':')[0]);
                      return hour >= 17 || hour < 5;
                    });

                    const convertTo12Hour = (time24) => {
                      const [hours, minutes] = time24.split(':');
                      const hour = parseInt(hours);
                      const ampm = hour >= 12 ? 'PM' : 'AM';
                      const hour12 = hour % 12 || 12;
                      return `${hour12}:${minutes} ${ampm}`;
                    };

                    const calculateEndTime = (startTime, duration) => {
                      const [hours, minutes] = startTime.split(':');
                      let totalMinutes = parseInt(hours) * 60 + parseInt(minutes) + duration;
                      const endHours = Math.floor(totalMinutes / 60) % 24;
                      const endMinutes = totalMinutes % 60;
                      return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
                    };

                    const ActivityBox = ({ activities }) => (
                      <div className="space-y-2">
                        {activities.map((slot, sidx) => {
                          const typeColors = {
                            study: 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200',
                            meal: 'bg-slate-500/20 border-slate-400/50 text-slate-200',
                            fitness: 'bg-orange-500/20 border-orange-400/50 text-orange-200',
                            break: 'bg-slate-500/20 border-slate-400/50 text-slate-200',
                            leisure: 'bg-slate-500/20 border-slate-400/50 text-slate-200',
                            routine: 'bg-slate-500/20 border-slate-400/50 text-slate-200',
                            personal: slot.activity.includes('Boyfriend') ? 'bg-pink-500/20 border-pink-400/50 text-pink-200' : 'bg-slate-500/20 border-slate-400/50 text-slate-200',
                            travel: 'bg-slate-500/20 border-slate-400/50 text-slate-200',
                            sleep: 'bg-slate-600/20 border-slate-500/50 text-slate-300'
                          };
                          
                          const TypeIcon = {
                            study: BookOpen,
                            meal: Utensils,
                            fitness: Dumbbell,
                            break: Coffee,
                            leisure: Users,
                            routine: Sunrise,
                            personal: Users,
                            travel: Calendar,
                            sleep: Moon
                          }[slot.type];

                          return (
                            <div key={sidx} className={`border-2 rounded-xl p-3 ${typeColors[slot.type]} hover:shadow-lg hover:shadow-indigo-500/20 transition backdrop-blur-sm`}>
                              <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-3 h-3" />
                                  <span className="text-xs font-bold">
                                    {convertTo12Hour(slot.time)} - {convertTo12Hour(calculateEndTime(slot.time, slot.duration))}
                                  </span>
                                </div>
                                <TypeIcon className="w-4 h-4" />
                              </div>
                              <div className="text-sm font-semibold mb-1">{slot.activity}</div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="opacity-75">
                                  {slot.type === 'study' ? `${(slot.duration / 60).toFixed(1)} hours` : `${slot.duration} min`}
                                </span>
                                {slot.focus && <span className="font-medium capitalize">{slot.focus}</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );

                    return (
                      <tr key={idx} className="hover:bg-slate-700/30 transition">
                        <td className="border border-slate-600 px-6 py-4 font-bold text-white bg-slate-700/50 min-w-[150px]">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-indigo-400" />
                            <div>
                              <div>{day.day}</div>
                              <div className="text-xs text-slate-400 font-normal">{day.date}</div>
                              <div className="text-xs text-emerald-400 font-semibold mt-1">
                                Study: {(day.schedule.filter(s => s.type === 'study').reduce((acc, s) => acc + s.duration, 0) / 60).toFixed(1)}h
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="border border-slate-600 px-6 py-4 align-top bg-slate-800/30 min-w-[300px]">
                          <ActivityBox activities={morningActivities} />
                        </td>
                        <td className="border border-slate-600 px-6 py-4 align-top bg-slate-800/30 min-w-[300px]">
                          <ActivityBox activities={afternoonActivities} />
                        </td>
                        <td className="border border-slate-600 px-6 py-4 align-top bg-slate-800/30 min-w-[300px]">
                          <ActivityBox activities={eveningActivities} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Legend */}
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20">
              <h4 className="font-semibold text-white mb-3">Activity Types</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-slate-300">Study</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Utensils className="w-5 h-5 text-slate-400" />
                  <span className="text-sm text-slate-300">Meals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Dumbbell className="w-5 h-5 text-orange-400" />
                  <span className="text-sm text-slate-300">Fitness</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  <span className="text-sm text-slate-300">Boyfriend Time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Moon className="w-5 h-5 text-slate-400" />
                  <span className="text-sm text-slate-300">Sleep</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Syllabus View */}
      {view === 'syllabus' && selectedSubject && (
        <div className="flex-1 px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6">{selectedSubject.name} - Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {syllabus.map((topic, idx) => (
                  <div key={idx} className="border border-slate-600 bg-slate-700/30 rounded-xl p-4 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{topic.name}</h4>
                        <p className="text-sm text-slate-400">{topic.hours} hours</p>
                      </div>
                      <button className="bg-indigo-500/20 text-indigo-400 p-2 rounded-lg hover:bg-indigo-500/30 transition border border-indigo-500/30">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  </div>
  );
}

export default App;

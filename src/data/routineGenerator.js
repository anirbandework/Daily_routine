import { SYLLABUS } from './syllabus';

export const generateWeeklyRoutine = () => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
  
  const routine = [];
  const subjects = ["reasoning", "maths", "english", "gk", "science", "social"];
  
  for (let day = 0; day < 7; day++) {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + day);
    const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = dayDate.toISOString().split('T')[0];
    
    let daySchedule = [];
    
    if (dayName === "Saturday") {
      daySchedule = [
        { time: "08:00", activity: "Wake Up", type: "routine", duration: 30 },
        { time: "08:30", activity: "Boyfriend Time", type: "personal", duration: 570 },
        { time: "18:00", activity: "Dog Walk", type: "routine", duration: 20 },
        { time: "18:20", activity: "Home Workout", type: "fitness", duration: 40 },
        { time: "19:00", activity: `Study - ${SYLLABUS[subjects[day % subjects.length]].name}`, type: "study", subject: subjects[day % subjects.length], duration: 60, focus: "intensive" },
        { time: "20:00", activity: "Dinner", type: "meal", duration: 30 },
        { time: "20:30", activity: "Dog Walk", type: "routine", duration: 20 },
        { time: "20:50", activity: `Study - ${SYLLABUS[subjects[(day + 1) % subjects.length]].name}`, type: "study", subject: subjects[(day + 1) % subjects.length], duration: 160, focus: "moderate" },
        { time: "23:30", activity: "Boyfriend Time", type: "personal", duration: 90 },
        { time: "01:00", activity: "Sleep", type: "sleep", duration: 420 }
      ];
    } else if (dayName === "Sunday" || dayName === "Monday") {
      daySchedule = [
        { time: "08:00", activity: "Wake Up", type: "routine", duration: 30 },
        { time: "08:30", activity: "Dog Walk", type: "routine", duration: 20 },
        { time: "08:50", activity: "Freshen Up, Bath & Breakfast", type: "routine", duration: 40 },
        { time: "09:30", activity: `Study at Home - ${SYLLABUS[subjects[day % subjects.length]].name}`, type: "study", subject: subjects[day % subjects.length], duration: 180, focus: "intensive" },
        { time: "12:30", activity: `Study at Home - ${SYLLABUS[subjects[(day + 1) % subjects.length]].name}`, type: "study", subject: subjects[(day + 1) % subjects.length], duration: 30, focus: "practice" },
        { time: "13:00", activity: "Lunch", type: "meal", duration: 30 },
        { time: "13:30", activity: `Study at Home - ${SYLLABUS[subjects[(day + 2) % subjects.length]].name}`, type: "study", subject: subjects[(day + 2) % subjects.length], duration: 210, focus: "intensive" },
        { time: "17:00", activity: "Dog Walk", type: "routine", duration: 20 },
        { time: "17:20", activity: "Home Workout", type: "fitness", duration: 40 },
        { time: "18:00", activity: `Study - ${SYLLABUS[subjects[(day + 3) % subjects.length]].name}`, type: "study", subject: subjects[(day + 3) % subjects.length], duration: 120, focus: "revision" },
        { time: "20:00", activity: "Dinner", type: "meal", duration: 30 },
        { time: "20:30", activity: "Dog Walk", type: "routine", duration: 20 },
        { time: "20:50", activity: `Study - ${SYLLABUS[subjects[(day + 4) % subjects.length]].name}`, type: "study", subject: subjects[(day + 4) % subjects.length], duration: 160, focus: "moderate" },
        { time: "23:30", activity: "Boyfriend Time", type: "personal", duration: 90 },
        { time: "01:00", activity: "Sleep", type: "sleep", duration: 420 }
      ];
    } else {
      daySchedule = [
        { time: "08:00", activity: "Wake Up", type: "routine", duration: 30 },
        { time: "08:30", activity: "Dog Walk", type: "routine", duration: 20 },
        { time: "08:50", activity: "Freshen Up, Bath & Breakfast", type: "routine", duration: 40 },
        { time: "09:30", activity: "Travel to Library", type: "travel", duration: 30 },
        { time: "10:00", activity: `Study at Library - ${SYLLABUS[subjects[day % subjects.length]].name}`, type: "study", subject: subjects[day % subjects.length], duration: 180, focus: "intensive" },
        { time: "13:00", activity: "Lunch at Library", type: "meal", duration: 30 },
        { time: "13:30", activity: `Study at Library - ${SYLLABUS[subjects[(day + 1) % subjects.length]].name}`, type: "study", subject: subjects[(day + 1) % subjects.length], duration: 180, focus: "intensive" },
        { time: "16:30", activity: "Travel Back Home", type: "travel", duration: 30 },
        { time: "17:00", activity: "Dog Walk", type: "routine", duration: 20 },
        { time: "17:20", activity: "Home Workout", type: "fitness", duration: 40 },
        { time: "18:00", activity: `Study at Home - ${SYLLABUS[subjects[(day + 2) % subjects.length]].name}`, type: "study", subject: subjects[(day + 2) % subjects.length], duration: 120, focus: "revision" },
        { time: "20:00", activity: "Dinner", type: "meal", duration: 30 },
        { time: "20:30", activity: "Dog Walk", type: "routine", duration: 20 },
        { time: "20:50", activity: `Study at Home - ${SYLLABUS[subjects[(day + 3) % subjects.length]].name}`, type: "study", subject: subjects[(day + 3) % subjects.length], duration: 160, focus: "moderate" },
        { time: "23:30", activity: "Boyfriend Time", type: "personal", duration: 90 },
        { time: "01:00", activity: "Sleep", type: "sleep", duration: 420 }
      ];
    }
    
    routine.push({
      date: dateStr,
      day: dayName,
      schedule: daySchedule
    });
  }
  
  return routine;
};

export const getSubjects = () => {
  return Object.keys(SYLLABUS).map(key => ({
    id: key,
    name: SYLLABUS[key].name,
    total_topics: SYLLABUS[key].topics.length,
    estimated_hours: SYLLABUS[key].topics.reduce((sum, topic) => sum + topic.hours, 0)
  }));
};

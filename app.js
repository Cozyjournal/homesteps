// ========================================================
// HomeSteps — Core Logic (Full English UI)
// "Teach it. Track it. Print it. — All in one place."
// Plain JavaScript, 100% Client-Side, Local-First
// Offline-Ready with LocalStorage & JSON Backup
// ========================================================

// ========================================================
// FIREBASE AUTHENTICATION CONFIGURATION
// Replace the placeholder values with your exact Firebase project config
// ========================================================
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ========================================================
// EDITABLE VIDEO LINKS (Topic Keyword -> YouTube URL)
// The owner can customize, reorder, or add new topics below anytime!
// ========================================================
var VIDEO_LINKS = {
  "science experiments": "https://www.youtube.com/results?search_query=science+experiments+for+kids",
  "volcano experiment": "https://www.youtube.com/results?search_query=volcano+experiment+for+kids",
  "living vs non-living": "https://www.youtube.com/results?search_query=living+vs+non-living+things+for+kids",
  "five senses": "https://www.youtube.com/results?search_query=five+senses+for+kids",
  "water cycle": "https://www.youtube.com/results?search_query=water+cycle+for+kids",
  "solar system": "https://www.youtube.com/results?search_query=solar+system+for+kids",
  "parts of a plant": "https://www.youtube.com/results?search_query=parts+of+a+plant+for+kids"
};

// Rich metadata for Learning Videos section
var VIDEO_CATALOG = [
  { key: "science experiments", title: "Science Experiments for Kids", icon: "🔬", desc: "Easy kitchen science & fun experiments" },
  { key: "volcano experiment", title: "Volcano Experiment for Kids", icon: "🌋", desc: "Baking soda & vinegar erupting volcano" },
  { key: "living vs non-living", title: "Living vs Non-Living Things", icon: "🌿", desc: "Plants, animals & everyday objects" },
  { key: "five senses", title: "Five Senses for Kids", icon: "👀", desc: "Sight, hearing, smell, taste, and touch" },
  { key: "water cycle", title: "Water Cycle for Kids", icon: "💧", desc: "Evaporation, clouds, and rainfall journey" },
  { key: "solar system", title: "Solar System for Kids", icon: "🪐", desc: "Sun, Earth, Moon & 8 amazing planets" },
  { key: "parts of a plant", title: "Parts of a Plant for Kids", icon: "🌱", desc: "Roots, stem, leaves, flower & growth" }
];

function getVideoUrlForTopic(subject, topicTitle) {
  var lower = (topicTitle || "").toLowerCase();
  for (var k in VIDEO_LINKS) {
    if (lower.indexOf(k) !== -1) {
      return VIDEO_LINKS[k];
    }
  }
  if (subject === "Science") {
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(topicTitle + " for kids");
  }
  return null;
}

// ---------- Constants (9 Subjects) ----------
var SUBJECTS = [
  { name: "Reading", icon: "📖" },
  { name: "Writing", icon: "✍️" },
  { name: "Math/Counting", icon: "🔢" },
  { name: "Urdu", icon: "🇵🇰" },
  { name: "Islamiat", icon: "🌙" },
  { name: "Nazra", icon: "📖" },
  { name: "Science", icon: "🔬" },
  { name: "Social Studies", icon: "🌍" },
  { name: "Art & Craft", icon: "🎨" }
];

var STORE_KEY = "homesteps_v1";
var OLD_STORE_KEY = "seekhotrack_v1";

// ---------- Structured Syllabus Curriculum Data (PRD §8.2) ----------
var SYLLABUS_DATA = {
  "3-4": {
    label: "Age 3–4 (Hafsa)",
    subjects: {
      English: [
        { id: "e34_1", title: "Letter Recognition A to E", guide: "Identify A, B, C, D, E with phonics sounds", presetId: "en_trace_cap_ae", type: "tracing" },
        { id: "e34_2", title: "Phonics Sounds (A for Apple)", guide: "Sing phonics song and color apple", presetId: "en_color_apple", type: "coloring" },
        { id: "e34_3", title: "Matching Letters A to D", guide: "Draw connecting lines between matching letters", presetId: "en_match_caps_small_1", type: "matching" },
        { id: "e34_4", title: "Small Letter a to e Tracing", guide: "Gentle finger tracing and pencil practice", presetId: "en_trace_sml_ae", type: "tracing" }
      ],
      Urdu: [
        { id: "u34_1", title: "Letter Recognition: Alif, Bay, Pay (ا ب پ)", guide: "Repeat sounds aloud and trace along the dotted lines", presetId: "ur_trace_1", type: "tracing" },
        { id: "u34_2", title: "Letter Recognition: Tay, Ttay, Say (ت ٹ ث)", guide: "Show picture examples and practice letter shapes", presetId: "ur_trace_1", type: "tracing" },
        { id: "u34_3", title: "Letter Matching: Alif, Bay, Jeem (ا ب ج)", guide: "Connect matching letters with straight lines", presetId: "ur_match_huroof", type: "matching" },
        { id: "u34_4", title: "Color & Trace: Sayb (Apple / سیب)", guide: "Color the apple red and trace the word", presetId: "ur_color_seb", type: "coloring" }
      ],
      Math: [
        { id: "m34_1", title: "Counting 1 to 5 Objects", guide: "Count apples and stars with finger taps", presetId: "math_count_1to5", type: "counting" },
        { id: "m34_2", title: "Numbers 1 to 5 Tracing", guide: "Learn numeral shapes 1, 2, 3, 4, 5", presetId: "math_trace_1to5", type: "tracing" },
        { id: "m34_3", title: "Shapes Recognition (Circle, Square, Star)", guide: "Identify daily objects matching these shapes", presetId: "act_trace_shapes", type: "tracing" }
      ],
      Islamiat: [
        { id: "i34_1", title: "Reciting Bismillah (بِسْمِ اللَّهِ)", guide: "Practice reciting before eating and drinking", presetId: "isl_trace_bismillah", type: "tracing" },
        { id: "i34_2", title: "First Kalima Tayyaba Recitation", guide: "Recite aloud and trace the name of Allah", presetId: "isl_trace_allah", type: "tracing" }
      ],
      Nazra: [
        { id: "n34_1", title: "Noorani Qaida: Single Letters (ا to خ)", guide: "Pronounce with correct articulation (Makhraj)", presetId: "naz_trace_1", type: "tracing" }
      ],
      Science: [
        { id: "s34_1", title: "Common Animals & Their Sounds", guide: "Identify Cat, Dog, Cow, Lion sounds", presetId: "act_match_animals", type: "matching" },
        { id: "s34_2", title: "Body Parts (Eyes, Nose, Ears, Hands)", guide: "Point to body parts and repeat names", presetId: "sci_body_parts", type: "matching" },
        { id: "s34_3", title: "Day and Night (Sun vs Moon)", guide: "Observe bright sun and glowing moon", presetId: "isl_color_moon", type: "coloring" }
      ],
      "Social Studies": [
        { id: "ss34_1", title: "My Family (Ammi, Abu, Bhai, Behn)", guide: "Talk with affection about family members", presetId: "soc_family", type: "matching" },
        { id: "ss34_2", title: "My Home & Cleanliness", guide: "Keeping toys in order after playtime", presetId: "act_color_flower", type: "coloring" }
      ],
      "Art & Craft": [
        { id: "ac34_1", title: "Coloring & Scribbling Practice", guide: "Holding crayons with three fingers", presetId: "en_color_apple", type: "coloring" },
        { id: "ac34_2", title: "Sticking & Pasting Shapes", guide: "Cut colorful papers and stick in notebook", presetId: "act_trace_shapes", type: "tracing" }
      ]
    }
  },

  "4-5": {
    label: "Age 4–5 (Ahmed)",
    subjects: {
      English: [
        { id: "e45_1", title: "CVC Words & Short Vowels", guide: "Cat, Sun, Bat, Pen blending sounds", presetId: "en_fill_cvc", type: "fill" },
        { id: "e45_2", title: "Missing Letters Alphabet A to L", guide: "Fill in the blank boxes in order", presetId: "en_fill_abc_1", type: "fill" },
        { id: "e45_3", title: "Sight Words & Picture Matching", guide: "Read basic words like Car, Sun, Star", presetId: "en_match_word_pic", type: "matching" }
      ],
      Urdu: [
        { id: "u45_1", title: "Huroof Revision: Jeem, Chay, Hay, Khay (ج چ ح خ)", guide: "Identify letter curves and count dots accurately", presetId: "ur_trace_2", type: "tracing" },
        { id: "u45_2", title: "Simple 2-Letter Words (اب، جب، رب)", guide: "Practice blending two simple letters together", presetId: "ur_fill_1", type: "fill" }
      ],
      Math: [
        { id: "m45_1", title: "Counting 1 to 10 (Objects & Numbers)", guide: "Count pencils, fishes, candies up to 10", presetId: "math_count_6to10", type: "counting" },
        { id: "m45_2", title: "Missing Numbers 1 to 10", guide: "Fill blanks: 1, 2, _, 4, 5, _, 7, 8, _, 10", presetId: "math_fill_1to10", type: "fill" },
        { id: "m45_3", title: "Numbers 6 to 10 Tracing & Writing", guide: "Write clean numerals in boxes", presetId: "math_trace_6to10", type: "tracing" }
      ],
      Islamiat: [
        { id: "i45_1", title: "Five Pillars of Islam", guide: "Introduce the 5 pillars: Kalima, Salah, Sawm, Zakat, Hajj", presetId: "isl_count_pillars", type: "counting" },
        { id: "i45_2", title: "Surah Al-Ikhlas Memorization", guide: "Meaning: Allah is One with no partners", presetId: "isl_circle_basics", type: "circle" }
      ],
      Nazra: [
        { id: "n45_1", title: "Compound Letters (Murakkabat)", guide: "Practice connected letters with fluency", presetId: "naz_trace_compounds", type: "tracing" }
      ],
      Science: [
        { id: "s45_1", title: "Pets vs Wild Animals", guide: "Differentiate cat and goat from lion and bear", presetId: "sci_wild_pets", type: "circle" },
        { id: "s45_2", title: "Parts of a Plant (Root, Stem, Leaf, Flower)", guide: "Observe real garden plants and label parts", presetId: "sci_plant_parts", type: "matching" },
        { id: "s45_3", title: "Weather Types (Sunny, Rainy, Windy)", guide: "Notice daily outdoor sky conditions", presetId: "en_color_star", type: "coloring" }
      ],
      "Social Studies": [
        { id: "ss45_1", title: "Community Helpers (Doctor, Teacher, Police)", guide: "Discuss how they help our neighborhood", presetId: "soc_helpers", type: "matching" },
        { id: "ss45_2", title: "My School & Classroom Rules", guide: "Sharing toys and respecting friends", presetId: "soc_school", type: "circle" }
      ],
      "Art & Craft": [
        { id: "ac45_1", title: "Coloring Within Borders", guide: "Slow controlled hand movements inside lines", presetId: "act_color_flower", type: "coloring" },
        { id: "ac45_2", title: "Paper Folding & Boat Making", guide: "Basic origami boat and hat folding", presetId: "act_trace_shapes", type: "tracing" }
      ]
    }
  },

  "5-6": {
    label: "Age 5–6",
    subjects: {
      English: [
        { id: "e56_1", title: "4-Letter Words & Consonant Blends (st, bl, cl)", guide: "Star, Blue, Clap phonics practice", presetId: "en_fill_abc_1", type: "fill" },
        { id: "e56_2", title: "Simple 3-word Sentences ('I see a cat')", guide: "Reading with finger tracking", presetId: "en_match_word_pic", type: "matching" }
      ],
      Urdu: [
        { id: "u56_1", title: "3-Letter Words (سیب، مور، پانی)", guide: "Blend sounds and write words neatly", presetId: "ur_trace_4", type: "tracing" },
        { id: "u56_2", title: "Letter Shapes: Seen, Sheen, Suad, Zuad (س ش ص ض)", guide: "Distinguish curve teeth and dot positions", presetId: "ur_trace_4", type: "tracing" }
      ],
      Math: [
        { id: "m56_1", title: "Simple Addition up to 10", guide: "2 apples + 3 apples = 5 apples", presetId: "math_count_1to5", type: "counting" },
        { id: "m56_2", title: "Numbers 11 to 20 Counting & Tracing", guide: "Teen numbers recognition and order", presetId: "math_fill_1to10", type: "fill" }
      ],
      Islamiat: [
        { id: "i56_1", title: "First & Second Kalima with Meaning", guide: "Understand the meaning and recite with fluency", presetId: "isl_fill_kalima", type: "fill" }
      ],
      Nazra: [
        { id: "n56_1", title: "Tanween and Jazm Rules", guide: "Learn the Nun sound of Tanween and silent Jazm", presetId: "naz_trace_tanween", type: "tracing" }
      ],
      Science: [
        { id: "s56_1", title: "The Five Senses (Sight, Smell, Taste, Touch, Hearing)", guide: "Link each sense organ with daily activity", presetId: "sci_senses", type: "matching" },
        { id: "s56_2", title: "Water and Float vs Sink Experiment", guide: "Testing coins and leaves in a water bowl", presetId: "sci_float_sink", type: "circle" }
      ],
      "Social Studies": [
        { id: "ss56_1", title: "Pakistan Flag & National Colors", guide: "White crescent and green stripe meaning", presetId: "map_pak_flag", type: "map" },
        { id: "ss56_2", title: "Introduction to Globe & Our Earth", guide: "Continents and oceans on globe", presetId: "map_compass", type: "map" }
      ],
      "Art & Craft": [
        { id: "ac56_1", title: "Drawing Basic Objects & Animals", guide: "Using circles and triangles to draw a cat or house", presetId: "act_color_car", type: "coloring" }
      ]
    }
  },

  "6-7": {
    label: "Age 6–7",
    subjects: {
      English: [
        { id: "e67_1", title: "Short Paragraph Reading & Comprehension", guide: "3 to 4 sentences story reading", presetId: "en_match_word_pic", type: "matching" }
      ],
      Urdu: [
        { id: "u67_1", title: "Sentence Building (Simple Lines)", guide: "Form simple complete sentences and write neatly", presetId: "ur_trace_6", type: "tracing" }
      ],
      Math: [
        { id: "m67_1", title: "Times Table 2 and 3 Practice", guide: "Skip counting 2, 4, 6, 8, 10...", presetId: "math_fill_1to10", type: "fill" }
      ],
      Islamiat: [
        { id: "i67_1", title: "Steps of Wudu (Ablution)", guide: "Learn the 4 obligatory acts and Sunnah steps", presetId: "isl_match_basics", type: "matching" }
      ],
      Nazra: [
        { id: "n67_1", title: "Huroof-e-Maddah (Elongation)", guide: "Stretch the vowel sound to one Alif count", presetId: "naz_trace_maddah", type: "tracing" }
      ],
      Science: [
        { id: "s67_1", title: "Human Skeleton & Vital Organs", guide: "Heart, brain, lungs and bones roles", presetId: "sci_body_organs", type: "matching" },
        { id: "s67_2", title: "Solar System (The 8 Planets)", guide: "Earth orbit, Sun and planet names", presetId: "sci_solar_system", type: "circle" }
      ],
      "Social Studies": [
        { id: "ss67_1", title: "Provinces of Pakistan (Map Labeling)", guide: "Punjab, Sindh, KPK, Balochistan, GB", presetId: "map_pak_provinces", type: "map" },
        { id: "ss67_2", title: "Directions & Map Reading (N, S, E, W)", guide: "Compass rose and finding directions", presetId: "map_compass", type: "map" }
      ],
      "Art & Craft": [
        { id: "ac67_1", title: "Landscape Drawing & Scenery", guide: "Mountains, sun, river and trees drawing", presetId: "act_color_flower", type: "coloring" }
      ]
    }
  }
};


// ---------- State Management & Migration ----------
var state = loadState();

if (!state.kids || state.kids.length === 0) {
  state.kids = [
    { id: makeId(), name: "Ahmed", age: 4, ageBand: "4-5" },
    { id: makeId(), name: "Hafsa", age: 3, ageBand: "3-4" }
  ];
  state.activeKidId = state.kids[0].id;
  saveState();
}

var currentView = "tracker";

// ---------- Helpers ----------
function makeId() {
  return "k" + Date.now().toString(36) + Math.floor(Math.random() * 1000);
}

function dateStr(d) {
  var y = d.getFullYear();
  var m = ("0" + (d.getMonth() + 1)).slice(-2);
  var day = ("0" + d.getDate()).slice(-2);
  return y + "-" + m + "-" + day;
}

function friendlyDate(d) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
}

function loadState() {
  try {
    var raw = localStorage.getItem(STORE_KEY) || localStorage.getItem(OLD_STORE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (!parsed.kids) parsed.kids = [];
      if (!parsed.records) parsed.records = {};
      if (!parsed.notes) parsed.notes = {};
      if (!parsed.stars) parsed.stars = {};
      if (!parsed.customTopics) parsed.customTopics = [];
      if (!parsed.taughtTopics) parsed.taughtTopics = {};

      parsed.kids.forEach(function (k) {
        if (!k.ageBand) {
          k.ageBand = k.age <= 3 ? "3-4" : (k.age <= 5 ? "4-5" : (k.age === 6 ? "5-6" : "6-7"));
        }
      });

      return parsed;
    }
  } catch (e) {
    console.error("Failed to load state", e);
  }
  return { kids: [], records: {}, notes: {}, stars: {}, customTopics: [], taughtTopics: {}, activeKidId: null };
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function recordKey(kidId, ds) {
  return kidId + "_" + ds;
}

function getRecord(kidId, ds) {
  var k = recordKey(kidId, ds);
  if (!state.records[k]) {
    state.records[k] = {};
  }
  return state.records[k];
}

function getNote(kidId, ds) {
  return (state.notes && state.notes[recordKey(kidId, ds)]) || "";
}

function saveNote(kidId, ds, text) {
  if (!state.notes) state.notes = {};
  state.notes[recordKey(kidId, ds)] = text;
  saveState();
}

function isStarAwarded(kidId, ds) {
  return !!(state.stars && state.stars[recordKey(kidId, ds)]);
}

function toggleStarAward(kidId, ds) {
  if (!state.stars) state.stars = {};
  var k = recordKey(kidId, ds);
  state.stars[k] = !state.stars[k];
  saveState();
  return state.stars[k];
}

function activeKid() {
  if (!state.kids || state.kids.length === 0) return null;
  for (var i = 0; i < state.kids.length; i++) {
    if (state.kids[i].id === state.activeKidId) return state.kids[i];
  }
  state.activeKidId = state.kids[0].id;
  return state.kids[0];
}

function getMonday(d) {
  var date = new Date(d);
  var day = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getWeekStarsCount(kidId) {
  var count = 0;
  var mon = getMonday(new Date());
  for (var i = 0; i < 7; i++) {
    var cur = new Date(mon);
    cur.setDate(mon.getDate() + i);
    var ds = dateStr(cur);
    if (isStarAwarded(kidId, ds)) count++;
  }
  return count;
}


// ========================================================
// CORE UI RENDER
// ========================================================
function render() {
  renderTabs();
  renderActiveChildBadge();

  if (currentView === "tracker") {
    renderChecklist();
    renderDailyNote();
    renderWeek();
  } else if (currentView === "syllabus") {
    renderSyllabusPlanner();
    renderLearningVideos();
  } else if (currentView === "generator") {
    updateGeneratorKidName();
    renderWorksheetPreview();
  } else if (currentView === "report") {
    if (currentReportMode === "monthly") {
      renderMonthlyReport();
    } else {
      renderWeeklyReport();
    }
  }
}

// ---------- Kid Tabs & Info Pill ----------
function renderTabs() {
  var nav = document.getElementById("kidTabs");
  nav.innerHTML = "";

  state.kids.forEach(function (kid) {
    var btn = document.createElement("button");
    btn.className = "tab" + (kid.id === state.activeKidId ? " active" : "");
    btn.innerHTML = '<span>' + kid.name + '</span> <span class="x" title="Delete">×</span>';

    btn.onclick = function () {
      state.activeKidId = kid.id;
      saveState();
      render();
    };

    btn.querySelector(".x").onclick = function (ev) {
      ev.stopPropagation();
      if (confirm("Are you sure you want to remove " + kid.name + "? Their learning records will be deleted.")) {
        state.kids = state.kids.filter(function (k) { return k.id !== kid.id; });
        Object.keys(state.records).forEach(function (k) {
          if (k.indexOf(kid.id + "_") === 0) delete state.records[k];
        });
        state.activeKidId = state.kids.length ? state.kids[0].id : null;
        saveState();
        render();
      }
    };

    nav.appendChild(btn);
  });
}

function isDayComplete(kidId, ds) {
  var rec = state.records && state.records[recordKey(kidId, ds)];
  if (!rec) return false;
  for (var i = 0; i < SUBJECTS.length; i++) {
    if (!rec[SUBJECTS[i].name]) return false;
  }
  return true;
}

function getChildStreak(kidId) {
  if (!kidId || !state.records) return 0;
  var streak = 0;
  var d = new Date();
  var todayDs = dateStr(d);

  var checkDate = new Date(d);
  if (!isDayComplete(kidId, todayDs)) {
    // If today is not finished yet, check if yesterday was finished to keep ongoing streak
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    var ds = dateStr(checkDate);
    if (isDayComplete(kidId, ds)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function checkStreakCelebration(kidId) {
  var streak = getChildStreak(kidId);
  if (streak >= 7) {
    var storageKey = "homesteps_streak7_seen_" + kidId + "_" + streak;
    if (localStorage.getItem(storageKey) !== "true") {
      localStorage.setItem(storageKey, "true");
      var modal = document.getElementById("streakCelebrationModal");
      if (modal) modal.classList.remove("hidden");
    }
  }
}

// Checklist Undo Support (Requirement 3)
var lastChecklistAction = null;
var undoToastTimeout = null;

function recordChecklistAction(kidId, ds, subjectName, prevValue) {
  lastChecklistAction = {
    kidId: kidId,
    date: ds,
    subjectName: subjectName,
    prevValue: prevValue
  };
  showUndoToast();
}

function showUndoToast() {
  var toast = document.getElementById("undoToast");
  if (!toast) return;
  toast.classList.remove("hidden");
  if (undoToastTimeout) clearTimeout(undoToastTimeout);
  undoToastTimeout = setTimeout(function () {
    hideUndoToast();
  }, 5000);
}

function hideUndoToast() {
  var toast = document.getElementById("undoToast");
  if (toast) toast.classList.add("hidden");
  if (undoToastTimeout) {
    clearTimeout(undoToastTimeout);
    undoToastTimeout = null;
  }
}

function undoChecklistAction() {
  if (!lastChecklistAction) return;
  var kidId = lastChecklistAction.kidId;
  var ds = lastChecklistAction.date;
  var rec = getRecord(kidId, ds);
  rec[lastChecklistAction.subjectName] = lastChecklistAction.prevValue;

  var totalDone = 0;
  SUBJECTS.forEach(function (s) { if (rec[s.name]) totalDone++; });
  if (totalDone === SUBJECTS.length) {
    if (!state.stars) state.stars = {};
    state.stars[recordKey(kidId, ds)] = true;
  } else {
    if (state.stars) delete state.stars[recordKey(kidId, ds)];
  }

  saveState();
  lastChecklistAction = null;
  hideUndoToast();
  renderChecklist();
  renderWeek();
  renderActiveChildBadge();
}

function renderActiveChildBadge() {
  var badge = document.getElementById("activeChildBadge");
  var kid = activeKid();
  if (!kid) {
    badge.innerHTML = "<span>No child added yet. Add a child above to get started.</span>";
    return;
  }
  var starsThisWeek = getWeekStarsCount(kid.id);
  var streak = getChildStreak(kid.id);
  var bandText = kid.ageBand ? "Level: " + kid.ageBand : "Age: " + kid.age;
  badge.innerHTML =
    '<span>👤 <strong>' + kid.name + '</strong> (' + bandText + ')</span>' +
    '<span>⭐ <strong>' + starsThisWeek + '</strong> stars this week</span>' +
    '<span class="child-streak-pill">🔥 <strong>' + streak + '-day</strong> streak!</span>';
}


// ========================================================
// VIEW 1: DAILY TRACKER (9 Subjects)
// ========================================================
function renderChecklist() {
  var box = document.getElementById("checklist");
  var kid = activeKid();
  var todayObj = new Date();
  var today = dateStr(todayObj);
  document.getElementById("todayDate").textContent = friendlyDate(todayObj);

  box.innerHTML = "";

  if (!kid) {
    box.innerHTML = '<p class="empty-msg">Add your first child above to get started! 👆</p>';
    updateProgress(0);
    return;
  }

  var rec = getRecord(kid.id, today);
  var done = 0;

  SUBJECTS.forEach(function (sub) {
    var isDone = !!rec[sub.name];
    if (isDone) done++;

    var label = document.createElement("label");
    label.className = "check-item" + (isDone ? " done" : "");

    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = isDone;

    cb.onchange = function () {
      var prevVal = !cb.checked;
      rec[sub.name] = cb.checked;
      
      recordChecklistAction(kid.id, today, sub.name, prevVal);

      var totalDone = 0;
      SUBJECTS.forEach(function (s) { if (rec[s.name]) totalDone++; });
      if (totalDone === SUBJECTS.length) {
        if (!state.stars) state.stars = {};
        state.stars[recordKey(kid.id, today)] = true;
        checkStreakCelebration(kid.id);
      }

      saveState();
      renderChecklist();
      renderWeek();
      renderActiveChildBadge();
    };

    var iconSpan = document.createElement("span");
    iconSpan.className = "subject-icon";
    iconSpan.textContent = sub.icon;

    var nameSpan = document.createElement("span");
    nameSpan.className = "subject-name";
    nameSpan.textContent = sub.name;

    label.appendChild(cb);
    label.appendChild(iconSpan);
    label.appendChild(nameSpan);
    box.appendChild(label);
  });

  updateProgress(done);
  updateStarBadge(kid.id, today, done);
}

function updateProgress(done) {
  var total = SUBJECTS.length;
  var pct = Math.round((done / total) * 100);
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressText").textContent = done + " of " + total + " done (" + pct + "%)";

  var banner = document.getElementById("celebrationBanner");
  if (done === total && total > 0) {
    banner.classList.remove("hidden");
  } else {
    banner.classList.add("hidden");
  }
}

function updateStarBadge(kidId, today, done) {
  var pill = document.getElementById("starRewardBadge");
  var text = document.getElementById("starRewardText");
  var awarded = isStarAwarded(kidId, today);

  if (awarded) {
    pill.classList.add("awarded");
    text.textContent = "⭐ Star Earned!";
  } else {
    pill.classList.remove("awarded");
    text.textContent = done === SUBJECTS.length ? "Reward Star" : "Daily Star";
  }

  pill.onclick = function () {
    toggleStarAward(kidId, today);
    updateStarBadge(kidId, today, done);
    renderWeek();
    renderActiveChildBadge();
  };
}

function renderDailyNote() {
  var kid = activeKid();
  var noteInput = document.getElementById("dailyNote");
  var status = document.getElementById("noteSaveStatus");
  status.textContent = "Saved ✓";

  if (!kid) {
    noteInput.value = "";
    noteInput.disabled = true;
    return;
  }

  noteInput.disabled = false;
  var today = dateStr(new Date());
  noteInput.value = getNote(kid.id, today);

  noteInput.oninput = function () {
    status.textContent = "Saving...";
    saveNote(kid.id, today, noteInput.value);
    setTimeout(function () {
      status.textContent = "Saved ✓";
    }, 400);
  };
}

function renderWeek() {
  var wrap = document.getElementById("weekView");
  var starsSummary = document.getElementById("weekStarsSummary");
  var kid = activeKid();
  wrap.innerHTML = "";
  if (!kid) {
    starsSummary.textContent = "⭐ 0 stars";
    return;
  }

  var mon = getMonday(new Date());
  var dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var todayS = dateStr(new Date());
  var weekStars = 0;

  for (var i = 0; i < 7; i++) {
    var d = new Date(mon);
    d.setDate(mon.getDate() + i);
    var ds = dateStr(d);
    var rec = state.records[recordKey(kid.id, ds)] || {};

    var done = 0;
    SUBJECTS.forEach(function (s) { if (rec[s.name]) done++; });

    if (isStarAwarded(kid.id, ds)) weekStars++;

    var cell = document.createElement("div");
    cell.className = "day" + (ds === todayS ? " today" : "");
    if (done === SUBJECTS.length && done > 0) cell.classList.add("full");
    else if (done > 0) cell.classList.add("partial");

    cell.innerHTML =
      "<div>" + dayNames[i] + "</div>" +
      '<div class="dot" title="' + done + ' of ' + SUBJECTS.length + ' done"></div>' +
      "<div>" + Math.round((done / SUBJECTS.length) * 100) + "%</div>";

    wrap.appendChild(cell);
  }

  starsSummary.textContent = "⭐ " + weekStars + " stars this week";
}


// ========================================================
// VIEW 2: SYLLABUS & LESSON PLANNER
// ========================================================
function renderSyllabusPlanner() {
  var kid = activeKid();
  var bandSelect = document.getElementById("currentKidBand");
  var plannerList = document.getElementById("weeklyPlannerList");
  var currBox = document.getElementById("fullCurriculumView");

  if (!kid) {
    plannerList.innerHTML = '<p class="empty-msg">Please add or select a child first.</p>';
    return;
  }

  var currentBand = kid.ageBand || "4-5";
  bandSelect.value = currentBand;

  bandSelect.onchange = function () {
    kid.ageBand = bandSelect.value;
    saveState();
    renderSyllabusPlanner();
    renderActiveChildBadge();
  };

  plannerList.innerHTML = "";
  var syllabusForBand = SYLLABUS_DATA[currentBand] || SYLLABUS_DATA["4-5"];
  var dayNames = ["Day 1 (Mon)", "Day 2 (Tue)", "Day 3 (Wed)", "Day 4 (Thu)", "Day 5 (Fri)"];
  var subKeys = Object.keys(syllabusForBand.subjects);

  dayNames.forEach(function (dayLabel, dayIndex) {
    var dayBlock = document.createElement("div");
    dayBlock.className = "planner-day-block";

    var dayHeader = document.createElement("div");
    dayHeader.className = "planner-day-header";
    dayHeader.innerHTML = '<span>' + dayLabel + '</span>';
    dayBlock.appendChild(dayHeader);

    var topicsContainer = document.createElement("div");
    topicsContainer.className = "planner-topics-container";

    var primarySub = subKeys[dayIndex % subKeys.length];
    var secondarySub = subKeys[(dayIndex + 1) % subKeys.length];
    var topicsPool = [];

    if (syllabusForBand.subjects[primarySub]) {
      var itemA = syllabusForBand.subjects[primarySub][dayIndex % syllabusForBand.subjects[primarySub].length];
      if (itemA) topicsPool.push({ sub: primarySub, item: itemA });
    }
    if (syllabusForBand.subjects[secondarySub]) {
      var itemB = syllabusForBand.subjects[secondarySub][(dayIndex + 1) % syllabusForBand.subjects[secondarySub].length];
      if (itemB) topicsPool.push({ sub: secondarySub, item: itemB });
    }

    topicsPool.forEach(function (tObj) {
      var topicItem = document.createElement("div");
      var isTaught = !!(state.taughtTopics && state.taughtTopics[kid.id + "_" + tObj.item.id]);
      topicItem.className = "planner-topic-item" + (isTaught ? " completed" : "");

      var infoSide = document.createElement("div");
      infoSide.className = "topic-info-side";
      infoSide.innerHTML =
        '<div class="topic-badge-row">' +
        '  <span class="topic-subject-tag">' + tObj.sub + '</span>' +
        '  <span class="topic-title-text">' + tObj.item.title + '</span>' +
        '</div>' +
        '<div class="topic-guide-note">💡 ' + tObj.item.guide + '</div>';

      var actions = document.createElement("div");
      actions.className = "planner-actions";

      var printBtn = document.createElement("button");
      printBtn.className = "btn-plan-action btn-plan-print";
      printBtn.type = "button";
      printBtn.innerHTML = '🖨️ Practice Sheet';
      printBtn.title = "Print practice worksheet for this topic";
      printBtn.onclick = function () {
        openGeneratorWithTopic(tObj.sub, tObj.item);
      };

      var teachBtn = document.createElement("button");
      teachBtn.className = "btn-plan-action btn-plan-teach" + (isTaught ? " done" : "");
      teachBtn.type = "button";
      teachBtn.innerHTML = isTaught ? '✔ Taught' : 'Mark Taught';
      teachBtn.onclick = function () {
        if (!state.taughtTopics) state.taughtTopics = {};
        var key = kid.id + "_" + tObj.item.id;
        state.taughtTopics[key] = !state.taughtTopics[key];

        var today = dateStr(new Date());
        var rec = getRecord(kid.id, today);
        var mappedSub = mapSyllabusToTrackerSubject(tObj.sub);
        if (mappedSub) {
          rec[mappedSub] = state.taughtTopics[key];
        }

        saveState();
        renderSyllabusPlanner();
        renderActiveChildBadge();
      };

      actions.appendChild(printBtn);
      actions.appendChild(teachBtn);

      var videoUrl = getVideoUrlForTopic(tObj.sub, tObj.item.title);
      if (videoUrl) {
        var videoBtn = document.createElement("button");
        videoBtn.className = "btn-plan-action btn-plan-video";
        videoBtn.type = "button";
        videoBtn.innerHTML = '🎬 Watch Video';
        videoBtn.title = "Watch related video on YouTube";
        videoBtn.onclick = function () {
          window.open(videoUrl, "_blank");
        };
        actions.appendChild(videoBtn);
      }

      topicItem.appendChild(infoSide);
      topicItem.appendChild(actions);
      topicsContainer.appendChild(topicItem);
    });

    dayBlock.appendChild(topicsContainer);
    plannerList.appendChild(dayBlock);
  });

  currBox.innerHTML = "";
  Object.keys(syllabusForBand.subjects).forEach(function (sName) {
    var subBox = document.createElement("div");
    subBox.className = "curr-subject-box";
    subBox.innerHTML = '<div class="curr-subject-title">' + sName + '</div>';

    var pillsWrap = document.createElement("div");
    pillsWrap.className = "curr-topic-pills";

    syllabusForBand.subjects[sName].forEach(function (top) {
      var pill = document.createElement("span");
      pill.className = "curr-pill";
      pill.textContent = top.title;
      pillsWrap.appendChild(pill);
    });

    subBox.appendChild(pillsWrap);
    currBox.appendChild(subBox);
  });
}

// Render Curated Learning Videos Section (Requirement 7)
function renderLearningVideos() {
  var list = document.getElementById("learningVideosList");
  if (!list) return;
  list.innerHTML = "";

  VIDEO_CATALOG.forEach(function (item) {
    var card = document.createElement("div");
    card.className = "video-card-item";

    var top = document.createElement("div");
    top.innerHTML =
      '<div class="video-card-title">' + item.icon + ' ' + item.title + '</div>' +
      '<div class="video-card-sub">' + item.desc + '</div>';

    var btn = document.createElement("button");
    btn.className = "btn-video-watch";
    btn.type = "button";
    btn.innerHTML = '▶ Watch on YouTube ↗';
    btn.onclick = function () {
      window.open(VIDEO_LINKS[item.key], "_blank");
    };

    card.appendChild(top);
    card.appendChild(btn);
    list.appendChild(card);
  });
}

function mapSyllabusToTrackerSubject(subName) {
  if (subName === "English") return "Reading";
  if (subName === "Urdu") return "Urdu";
  if (subName === "Math") return "Math/Counting";
  if (subName === "Islamiat") return "Islamiat";
  if (subName === "Nazra") return "Nazra";
  if (subName === "Science") return "Science";
  if (subName === "Social Studies") return "Social Studies";
  if (subName === "Art & Craft") return "Art & Craft";
  return "Reading";
}

function openGeneratorWithTopic(subjectName, topicItem) {
  switchView("generator");

  var subKey = subjectName.toLowerCase();
  if (subKey === "social studies") subKey = "social";
  if (subKey === "art & craft") subKey = "art";
  if (subKey === "math/counting") subKey = "math";
  if (subKey === "reading" || subKey === "writing") subKey = "english";

  var subjectSelect = document.getElementById("wsSubject");
  if (subjectSelect) subjectSelect.value = subKey;

  var typeSelect = document.getElementById("wsType");
  if (typeSelect && topicItem.type) typeSelect.value = topicItem.type;

  updatePresetOptions();

  var presetSelect = document.getElementById("wsPreset");
  if (presetSelect && topicItem.presetId) {
    presetSelect.value = topicItem.presetId;
  }

  renderWorksheetPreview();
}


// ========================================================
// VIEW 3: PRINTABLE GENERATOR (7 Worksheet Types)
// 100% Language Purity & Kindergarten Design (Ages 3–7)
// ========================================================
var WORKSHEET_PRESETS = {
  english: {
    tracing: [
      { id: "en_trace_cap_ae", name: "Capital Letters A – E", letters: ["A", "B", "C", "D", "E"], type: "letters" },
      { id: "en_trace_cap_fj", name: "Capital Letters F – J", letters: ["F", "G", "H", "I", "J"], type: "letters" },
      { id: "en_trace_cap_ko", name: "Capital Letters K – O", letters: ["K", "L", "M", "N", "O"], type: "letters" },
      { id: "en_trace_cap_pt", name: "Capital Letters P – T", letters: ["P", "Q", "R", "S", "T"], type: "letters" },
      { id: "en_trace_cap_uz", name: "Capital Letters U – Z", letters: ["U", "V", "W", "X", "Y", "Z"], type: "letters" },
      { id: "en_trace_sml_ae", name: "Small Letters a – e", letters: ["a", "b", "c", "d", "e"], type: "letters" },
      { id: "en_trace_sml_fj", name: "Small Letters f – j", letters: ["f", "g", "h", "i", "j"], type: "letters" }
    ],
    matching: [
      { id: "en_match_caps_small_1", name: "Capital to Small Letters (A-E)", left: ["A", "B", "C", "D"], right: ["c", "a", "d", "b"] },
      { id: "en_match_caps_small_2", name: "Capital to Small Letters (F-J)", left: ["E", "F", "G", "H"], right: ["g", "e", "h", "f"] },
      { id: "en_match_word_pic", name: "Words to Pictures", left: ["🍎 Apple", "⭐ Star", "☀️ Sun", "🚗 Car"], right: ["Car", "Sun", "Apple", "Star"] }
    ],
    counting: [
      { id: "en_count_1to5", name: "Counting Fun 1 to 5", items: [
        { icon: "🍎", count: 3, label: "Apples" },
        { icon: "⭐", count: 5, label: "Stars" },
        { icon: "🎈", count: 2, label: "Balloons" },
        { icon: "🌸", count: 4, label: "Flowers" }
      ]},
      { id: "en_count_6to10", name: "Counting Objects 6 to 10", items: [
        { icon: "✏️", count: 6, label: "Pencils" },
        { icon: "🐟", count: 8, label: "Fishes" },
        { icon: "🍬", count: 10, label: "Candies" }
      ]}
    ],
    coloring: [
      { id: "en_color_apple", name: "Apple (A for Apple)", word: "APPLE", svg: "apple", prompt: "Color the Apple red and the leaf green, then trace the word below!" },
      { id: "en_color_star", name: "Star (Twinkle Star)", word: "STAR", svg: "star", prompt: "Color the star bright golden yellow, then trace the word below!" },
      { id: "en_color_car", name: "Car (Beep Beep!)", word: "CAR", svg: "car", prompt: "Color the car your favorite color, then trace the word below!" }
    ],
    circle: [
      { id: "en_circle_letters", name: "Find & Circle Letter", questions: [
        { target: "B", options: ["D", "B", "P", "R"] },
        { target: "M", options: ["W", "N", "M", "H"] },
        { target: "S", options: ["C", "S", "Z", "O"] }
      ]}
    ],
    fill: [
      { id: "en_fill_abc_1", name: "Missing Letters A to L", bank: ["B", "E", "H", "K"], rows: [
        ["A", "", "C", "D"],
        ["", "F", "G", ""],
        ["I", "J", "", "L"]
      ]},
      { id: "en_fill_cvc", name: "CVC Missing Vowels", bank: ["A", "E", "I", "O", "U"], rows: [
        ["C", "", "T (Cat)"],
        ["S", "", "N (Sun)"],
        ["B", "", "T (Bat)"]
      ]}
    ],
    map: [
      { id: "en_map_directions", name: "Cardinal Directions (N, S, E, W)", kind: "compass" }
    ]
  },

  urdu: {
    tracing: [
      { id: "ur_trace_1", name: "حروفِ تہجی: الف تا ث (ا ب پ ت ٹ ث)", letters: ["ا", "ب", "پ", "ت", "ٹ", "ث"], type: "urdu" },
      { id: "ur_trace_2", name: "حروفِ تہجی: جیم تا خے (ج چ ح خ)", letters: ["ج", "چ", "ح", "خ"], type: "urdu" },
      { id: "ur_trace_3", name: "حروفِ تہجی: دال تا زے (د ڈ ذ ر ڑ ز ژ)", letters: ["د", "ڈ", "ذ", "ر", "ڑ", "ز"], type: "urdu" },
      { id: "ur_trace_4", name: "حروفِ تہجی: سین تا ظوئے (س ش ص ض ط ظ)", letters: ["س", "ش", "ص", "ض", "ط", "ظ"], type: "urdu" },
      { id: "ur_trace_5", name: "حروفِ تہجی: عین تا گاف (ع غ ف ق ک گ)", letters: ["ع", "غ", "ف", "ق", "ک", "گ"], type: "urdu" },
      { id: "ur_trace_6", name: "حروفِ تہجی: لام تا یے (ل م ن و ہ ی)", letters: ["ل", "م", "ن", "و", "ہ", "ی"], type: "urdu" }
    ],
    matching: [
      { id: "ur_match_huroof", name: "حروف ملائیں (ا ب ج د)", left: ["ا", "ب", "ج", "د"], right: ["ب", "ا", "د", "ج"] },
      { id: "ur_match_words", name: "الفاظ اور تصویر ملائیں", left: ["سیب 🍎", "تارہ ⭐", "گاڑی 🚗", "پھول 🌸"], right: ["گاڑی", "پھول", "سیب", "تارہ"] }
    ],
    counting: [
      { id: "ur_count_1to5", name: "اردو گنتی (۱ تا ۵)", items: [
        { icon: "⭐", count: 2, label: "ستارے" },
        { icon: "🍎", count: 4, label: "سیب" },
        { icon: "🌸", count: 3, label: "پھول" }
      ]},
      { id: "ur_count_6to10", name: "اردو گنتی (۶ تا ۱۰)", items: [
        { icon: "✏️", count: 6, label: "پنسلیں" },
        { icon: "🐟", count: 8, label: "مچھلیاں" },
        { icon: "🍬", count: 10, label: "ٹافیاں" }
      ]}
    ],
    coloring: [
      { id: "ur_color_seb", name: "سیب (رنگ اور ٹریسنگ)", word: "سیب", svg: "apple", prompt: "سیب میں خوبصورت لال رنگ بھریں اور نیچے دیا گیا لفظ ٹریس کریں۔" },
      { id: "ur_color_phool", name: "پھول (رنگ اور ٹریسنگ)", word: "پھول", svg: "flower", prompt: "پھول میں پیارے رنگ بھریں اور نیچے دیا گیا لفظ ٹریس کریں۔" },
      { id: "ur_color_tara", name: "تارہ (رنگ اور ٹریسنگ)", word: "تارہ", svg: "star", prompt: "تارے میں سنہرا پیلا رنگ بھریں اور نیچے دیا گیا لفظ ٹریس کریں۔" }
    ],
    circle: [
      { id: "ur_circle_huroof", name: "درست حرف پر دائرہ لگائیں", questions: [
        { target: "ب", options: ["ت", "پ", "ب", "ث"] },
        { target: "ج", options: ["چ", "ح", "ج", "خ"] }
      ]}
    ],
    fill: [
      { id: "ur_fill_1", name: "خالی جگہ پُر کریں (حروف)", bank: ["ب", "ٹ", "چ"], rows: [
        ["ا", "", "پ", "ت"],
        ["", "ث", "ج", ""]
      ]}
    ],
    map: [
      { id: "ur_map_directions", name: "سمتیں (شمال، جنوب، مشرق، مغرب)", kind: "compass_ur" }
    ]
  },

  math: {
    tracing: [
      { id: "math_trace_1to5", name: "Numbers Tracing 1 to 5", letters: ["1", "2", "3", "4", "5"], type: "math" },
      { id: "math_trace_6to10", name: "Numbers Tracing 6 to 10", letters: ["6", "7", "8", "9", "10"], type: "math" }
    ],
    counting: [
      { id: "math_count_1to5", name: "Count Objects (1 to 5)", items: [
        { icon: "🚗", count: 2, label: "Cars" },
        { icon: "⭐", count: 4, label: "Stars" },
        { icon: "🐱", count: 1, label: "Cat" }
      ]},
      { id: "math_count_6to10", name: "Count Objects (6 to 10)", items: [
        { icon: "✏️", count: 6, label: "Pencils" },
        { icon: "🐟", count: 8, label: "Fishes" },
        { icon: "🍬", count: 10, label: "Candies" }
      ]}
    ],
    matching: [
      { id: "math_match_count", name: "Count to Numbers", left: ["⭐⭐", "⭐⭐⭐⭐", "⭐"], right: ["4", "1", "2"] }
    ],
    coloring: [
      { id: "math_color_star", name: "Number One Star", word: "ONE 1", svg: "star", prompt: "Color the big number 1 star and trace the number below!" }
    ],
    circle: [
      { id: "math_circle_num", name: "Circle the Target Number", questions: [
        { target: "3", options: ["1", "3", "5", "8"] },
        { target: "7", options: ["4", "2", "7", "9"] }
      ]}
    ],
    fill: [
      { id: "math_fill_1to10", name: "Missing Numbers 1 to 10", bank: ["3", "6", "9"], rows: [
        ["1", "2", "", "4", "5"],
        ["", "7", "8", "", "10"]
      ]}
    ],
    map: [
      { id: "math_map_grid", name: "Coordinate Compass Math", kind: "compass" }
    ]
  },

  islamiat: {
    tracing: [
      { id: "isl_trace_allah", name: "Allah & Muhammad (PBUH) Tracing", letters: ["اللَّه", "مُحَمَّد"], type: "arabic" },
      { id: "isl_trace_bismillah", name: "Bismillah Tracing", letters: ["بِسْمِ اللَّهِ"], type: "arabic" },
      { id: "isl_trace_subhanallah", name: "Tasbeeh Tracing", letters: ["سُبْحَانَ اللَّهِ", "الْحَمْدُ لِلَّهِ"], type: "arabic" }
    ],
    matching: [
      { id: "isl_match_basics", name: "Islamic Knowledge Matching", left: ["Holy Quran", "The Kaabah", "The Masjid"], right: ["Book of Allah", "House of Allah", "Place of Salah"] }
    ],
    counting: [
      { id: "isl_count_pillars", name: "Five Pillars of Islam", items: [
        { icon: "🕌", count: 5, label: "Daily Prayers" },
        { icon: "🕋", count: 1, label: "The Kaabah" }
      ]}
    ],
    coloring: [
      { id: "isl_color_masjid", name: "The Holy Masjid", word: "MASJID", svg: "masjid", prompt: "Color the dome and minarets with your favorite colors!" },
      { id: "isl_color_moon", name: "Crescent and Star", word: "CRESCENT", svg: "crescent", prompt: "Color the crescent moon and star bright yellow!" }
    ],
    circle: [
      { id: "isl_circle_basics", name: "Circle the Correct Answer", questions: [
        { target: "How many Gods?", options: ["One (Allah)", "Two", "Three"] },
        { target: "Holy Book of Islam?", options: ["Quran", "Stories", "Atlas"] }
      ]}
    ],
    fill: [
      { id: "isl_fill_kalima", name: "First Kalima Tayyaba", bank: ["Allah", "Prophet"], rows: [
        ["There is no God but", ""],
        ["Muhammad is the", "of Allah"]
      ]}
    ],
    map: [
      { id: "isl_map_makkah", name: "Qibla Direction (Kaabah in Makkah)", kind: "compass" }
    ]
  },

  nazra: {
    tracing: [
      { id: "naz_trace_1", name: "Noorani Qaida: Letters Alif to Khaa (ا to خ)", letters: ["ا", "ب", "ت", "ث", "ج", "ح", "خ"], type: "arabic" },
      { id: "naz_trace_2", name: "Noorani Qaida: Letters Daal to Saad (د to ص)", letters: ["د", "ذ", "ر", "ز", "س", "ش", "ص"], type: "arabic" },
      { id: "naz_trace_3", name: "Noorani Qaida: Letters Zaad to Faa (ض to ف)", letters: ["ض", "ط", "ظ", "ع", "غ", "ف"], type: "arabic" },
      { id: "naz_trace_4", name: "Noorani Qaida: Letters Qaaf to Yaa (ق to ی)", letters: ["ق", "ک", "ل", "م", "ن", "و", "ہ", "ی"], type: "arabic" },
      { id: "naz_trace_compounds", name: "Compound Letters (Murakkabat)", letters: ["لا", "با", "بل", "تم", "فی"], type: "arabic" },
      { id: "naz_trace_tanween", name: "Tanween Signs (Double Vowels)", letters: ["ـً", "ـٍ", "ـٌ"], type: "arabic" },
      { id: "naz_trace_maddah", name: "Huroof-e-Maddah (Elongation)", letters: ["بَا", "بُو", "بِی"], type: "arabic" }
    ],
    matching: [
      { id: "naz_match_shapes", name: "Match Arabic Letter Shapes", left: ["ب", "ج", "د", "ر"], right: ["ر", "د", "ب", "ج"] }
    ],
    counting: [
      { id: "naz_count_dots", name: "Count the Dots on Letters", items: [
        { icon: "ب", count: 1, label: "Dot Below (1)" },
        { icon: "ت", count: 2, label: "Dots Above (2)" },
        { icon: "ث", count: 3, label: "Dots Above (3)" }
      ]}
    ],
    coloring: [
      { id: "naz_color_quran", name: "The Holy Quran", word: "QURAN", svg: "book", prompt: "Color the Holy Quran respectfully and trace the word below!" }
    ],
    circle: [
      { id: "naz_circle_letters", name: "Find the Target Arabic Letter", questions: [
        { target: "ب", options: ["ت", "ب", "ث", "ن"] },
        { target: "ج", options: ["ح", "خ", "ج", "ع"] }
      ]}
    ],
    fill: [
      { id: "naz_fill_alphabet", name: "Missing Arabic Alphabet", bank: ["ب", "ث", "ح"], rows: [
        ["ا", "", "ت"],
        ["", "ج", ""]
      ]}
    ],
    map: [
      { id: "naz_map_makkah", name: "Qibla Direction Compass", kind: "compass" }
    ]
  },

  science: {
    tracing: [
      { id: "sci_trace_words", name: "Science Terms Tracing", letters: ["SUN", "MOON", "RAIN", "TREE"], type: "letters" }
    ],
    matching: [
      { id: "sci_body_parts", name: "Body Parts to Senses", left: ["👀 Eyes", "👃 Nose", "👅 Tongue", "👂 Ears"], right: ["Smell", "See", "Hear", "Taste"] },
      { id: "sci_plant_parts", name: "Plant Parts Matching", left: ["Root", "Stem", "Leaf", "Flower"], right: ["Blossom", "Underground", "Green", "Trunk"] },
      { id: "sci_senses", name: "Five Senses & Daily Objects", left: ["👀 Eyes", "👃 Nose", "🖐️ Hands"], right: ["Perfume", "Picture", "Soft Pillow"] },
      { id: "sci_body_organs", name: "Internal Organs", left: ["❤️ Heart", "🧠 Brain", "🫁 Lungs"], right: ["Thinking", "Breathing", "Pumping Blood"] }
    ],
    counting: [
      { id: "sci_count_nature", name: "Nature Counting", items: [
        { icon: "🍃", count: 4, label: "Leaves" },
        { icon: "☀️", count: 1, label: "Sun" },
        { icon: "🌧️", count: 3, label: "Raindrops" }
      ]}
    ],
    coloring: [
      { id: "sci_color_flower", name: "Parts of a Flower", word: "FLOWER", svg: "flower", prompt: "Color the petal, stem and leaf with natural colors!" },
      { id: "sci_color_moon", name: "Night Sky Crescent", word: "NIGHT SKY", svg: "crescent", prompt: "Color the sky deep blue and the moon golden yellow!" }
    ],
    circle: [
      { id: "sci_wild_pets", name: "Circle the Wild Animal", questions: [
        { target: "Wild Animal", options: ["🐱 Cat", "🦁 Lion", "🐑 Sheep"] },
        { target: "Living Thing", options: ["🌱 Plant", "🪨 Stone", "🚗 Car"] }
      ]},
      { id: "sci_float_sink", name: "Circle the Object that Floats", questions: [
        { target: "Floats on Water", options: ["🪙 Coin", "🍃 Leaf", "🔑 Key"] }
      ]},
      { id: "sci_solar_system", name: "Circle the Planet We Live On", questions: [
        { target: "Our Planet", options: ["Mars", "Earth", "Jupiter"] }
      ]}
    ],
    fill: [
      { id: "sci_fill_day_night", name: "Day & Night Words", bank: ["SUN", "MOON", "STARS"], rows: [
        ["Day brings the bright", ""],
        ["Night brings the glowing", ""],
        ["Twinkling in the sky are", ""]
      ]}
    ],
    map: [
      { id: "sci_solar_map", name: "Solar System Orbit", kind: "compass" }
    ]
  },

  social: {
    tracing: [
      { id: "soc_trace_pak", name: "Pakistan & Lahore Tracing", letters: ["PAKISTAN", "LAHORE"], type: "letters" }
    ],
    matching: [
      { id: "soc_family", name: "My Family Members", left: ["Father", "Mother", "Brother", "Sister"], right: ["Abu", "Ammi", "Bhai", "Behn"] },
      { id: "soc_helpers", name: "Community Helpers", left: ["👨‍⚕️ Doctor", "👩‍🏫 Teacher", "👮 Police"], right: ["Hospital", "School", "Safety"] }
    ],
    counting: [
      { id: "soc_count_houses", name: "Neighborhood Counting", items: [
        { icon: "🏠", count: 3, label: "Houses" },
        { icon: "🚗", count: 2, label: "Cars" },
        { icon: "🌳", count: 5, label: "Trees" }
      ]}
    ],
    coloring: [
      { id: "soc_color_flag", name: "Pakistan National Flag", word: "PAKISTAN", svg: "crescent", prompt: "Color the crescent & star white, and the flag dark green!" }
    ],
    circle: [
      { id: "soc_school", name: "Good Habits in School", questions: [
        { target: "Good Habit", options: ["Sharing Toys", "Throwing Litter", "Yelling"] }
      ]}
    ],
    fill: [
      { id: "soc_fill_pak", name: "National Symbols of Pakistan", bank: ["Jasmine", "Urdu", "Islamabad"], rows: [
        ["National Flower is", ""],
        ["National Language is", ""],
        ["Federal Capital is", ""]
      ]}
    ],
    map: [
      { id: "map_pak_provinces", name: "Provinces of Pakistan (Map Labeling)", kind: "pak_provinces" },
      { id: "map_pak_flag", name: "Pakistan Flag Diagram & Labels", kind: "pak_flag" },
      { id: "map_compass", name: "Compass Rose (N, S, E, W)", kind: "compass" }
    ]
  },

  art: {
    tracing: [
      { id: "art_trace_patterns", name: "Pattern Lines & Shapes", letters: ["◯", "△", "▢", "⭐"], type: "math" }
    ],
    matching: [
      { id: "art_match_colors", name: "Colors to Real Objects", left: ["🔴 Red", "🟡 Yellow", "🟢 Green"], right: ["Apple", "Sun", "Leaf"] }
    ],
    counting: [
      { id: "art_count_crayons", name: "Counting Colors", items: [
        { icon: "🖍️", count: 5, label: "Crayons" },
        { icon: "🎨", count: 2, label: "Palettes" }
      ]}
    ],
    coloring: [
      { id: "art_color_flower", name: "Rainbow Flower Art", word: "ART & FUN", svg: "flower", prompt: "Color every petal with a different shade!" },
      { id: "art_color_car", name: "Sports Car Design", word: "MY CAR", svg: "car", prompt: "Design your dream sports car!" }
    ],
    circle: [
      { id: "art_circle_shape", name: "Circle the Round Shape", questions: [
        { target: "Round Shape", options: ["▢ Square", "◯ Circle", "△ Triangle"] }
      ]}
    ],
    fill: [
      { id: "art_fill_patterns", name: "Color Pattern Sequence", bank: ["RED", "BLUE"], rows: [
        ["RED", "BLUE", "RED", ""]
      ]}
    ],
    map: [
      { id: "art_map_art", name: "Coloring Pakistan's Map", kind: "pak_provinces" }
    ]
  },

  activity: {
    tracing: [
      { id: "act_trace_shapes", name: "Shapes Tracing (Circle, Square, Triangle)", letters: ["◯", "▢", "△", "⭐"], type: "math" }
    ],
    matching: [
      { id: "act_match_animals", name: "Animals to Sounds", left: ["🐱 Cat", "🐶 Dog", "🐮 Cow"], right: ["Meow", "Woof", "Moo"] }
    ],
    counting: [
      { id: "act_count_party", name: "Fun Party Counting", items: [
        { icon: "🎈", count: 4, label: "Balloons" },
        { icon: "🍰", count: 3, label: "Cakes" }
      ]}
    ],
    coloring: [
      { id: "act_color_flower", name: "Beautiful Flower", word: "FLOWER", svg: "flower", prompt: "Color the petals with rainbow colors!" }
    ],
    circle: [
      { id: "act_circle_odd", name: "Odd One Out", questions: [
        { target: "Different One", options: ["🍎", "🍎", "⭐", "🍎"] }
      ]}
    ],
    fill: [
      { id: "act_fill_patterns", name: "Shape Patterns", bank: ["⭐", "◯"], rows: [
        ["⭐", "◯", "⭐", ""]
      ]}
    ],
    map: [
      { id: "act_map_compass", name: "Treasure Map Compass", kind: "compass" }
    ]
  }
};

// Ink-friendly outline SVGs (no heavy black solid fills)
var COLORING_SVGS = {
  apple: '<svg viewBox="0 0 200 200" width="180" height="180"><path d="M100 45 C95 25 115 15 125 20 C120 35 105 45 100 45 Z" fill="#fff" stroke="#334155" stroke-width="2.5"/><path d="M100 50 C100 30 105 20 110 15" fill="none" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/><path d="M100 55 C80 35 30 50 30 105 C30 160 80 185 100 185 C120 185 170 160 170 105 C170 50 120 35 100 55 Z" fill="#fff" stroke="#334155" stroke-width="2.5"/></svg>',
  star: '<svg viewBox="0 0 200 200" width="180" height="180"><polygon points="100,15 125,75 190,75 138,115 158,175 100,135 42,175 62,115 10,75 75,75" fill="#fff" stroke="#334155" stroke-width="2.5" stroke-linejoin="round"/></svg>',
  car: '<svg viewBox="0 0 240 140" width="220" height="130"><path d="M20 90 L40 50 L90 40 L160 40 L190 70 L220 70 C225 70 230 75 230 85 L230 105 L210 105 C210 95 195 95 195 105 L75 105 C75 95 60 95 60 105 L20 105 Z" fill="#fff" stroke="#334155" stroke-width="2.5"/><circle cx="68" cy="105" r="16" fill="#fff" stroke="#334155" stroke-width="2.5"/><circle cx="202" cy="105" r="16" fill="#fff" stroke="#334155" stroke-width="2.5"/><path d="M95 48 L155 48 L155 70 L80 70 Z" fill="#fff" stroke="#334155" stroke-width="2"/></svg>',
  flower: '<svg viewBox="0 0 200 200" width="180" height="180"><circle cx="100" cy="60" r="28" fill="#fff" stroke="#334155" stroke-width="2.5"/><circle cx="140" cy="100" r="28" fill="#fff" stroke="#334155" stroke-width="2.5"/><circle cx="100" cy="140" r="28" fill="#fff" stroke="#334155" stroke-width="2.5"/><circle cx="60" cy="100" r="28" fill="#fff" stroke="#334155" stroke-width="2.5"/><circle cx="100" cy="100" r="24" fill="#fff" stroke="#334155" stroke-width="2.5"/><path d="M100 168 L100 200" stroke="#334155" stroke-width="3"/><path d="M100 180 C120 170 135 185 135 185 C135 185 120 195 100 185" fill="#fff" stroke="#334155" stroke-width="2"/></svg>',
  masjid: '<svg viewBox="0 0 240 200" width="210" height="180"><path d="M70 120 C70 70 120 40 120 40 C120 40 170 70 170 120 Z" fill="#fff" stroke="#334155" stroke-width="2.5"/><circle cx="120" cy="30" r="6" fill="#fff" stroke="#334155" stroke-width="2"/><path d="M116 24 C116 16 124 16 124 24" fill="none" stroke="#334155" stroke-width="2"/><rect x="60" y="120" width="120" height="70" fill="#fff" stroke="#334155" stroke-width="2.5"/><path d="M100 190 C100 155 140 155 140 190 Z" fill="#fff" stroke="#334155" stroke-width="2.5"/><rect x="30" y="70" width="25" height="120" fill="#fff" stroke="#334155" stroke-width="2.5"/><path d="M30 70 L42 45 L55 70 Z" fill="#fff" stroke="#334155" stroke-width="2.5"/><rect x="185" y="70" width="25" height="120" fill="#fff" stroke="#334155" stroke-width="2.5"/><path d="M185 70 L197 45 L210 70 Z" fill="#fff" stroke="#334155" stroke-width="2.5"/></svg>',
  crescent: '<svg viewBox="0 0 200 200" width="180" height="180"><path d="M120 30 C70 30 35 75 35 125 C35 175 80 190 125 190 C90 175 75 140 75 110 C75 70 100 45 120 30 Z" fill="#fff" stroke="#334155" stroke-width="2.5"/><polygon points="150,55 158,75 178,75 162,88 168,108 150,95 132,108 138,88 122,75 142,75" fill="#fff" stroke="#334155" stroke-width="2"/></svg>',
  book: '<svg viewBox="0 0 200 160" width="190" height="150"><path d="M100 40 C75 25 35 25 15 35 L15 130 C35 120 75 120 100 135 C125 120 165 120 185 130 L185 35 C165 25 125 25 100 40 Z" fill="#fff" stroke="#334155" stroke-width="2.5"/><line x1="100" y1="40" x2="100" y2="135" stroke="#334155" stroke-width="2.5"/><path d="M25 55 C45 45 75 45 90 55" fill="none" stroke="#64748B" stroke-width="1.5"/><path d="M25 75 C45 65 75 65 90 75" fill="none" stroke="#64748B" stroke-width="1.5"/><path d="M110 55 C125 45 155 45 175 55" fill="none" stroke="#64748B" stroke-width="1.5"/><path d="M110 75 C125 65 155 65 175 75" fill="none" stroke="#64748B" stroke-width="1.5"/></svg>'
};

function updateGeneratorKidName() {
  var kid = activeKid();
  var nameInput = document.getElementById("wsKidName");
  var dateInput = document.getElementById("wsDate");
  if (kid && (!nameInput.value || nameInput.value === "Ahmed" || nameInput.value === "Hafsa")) {
    nameInput.value = kid.name;
  }
  if (!dateInput.value) {
    dateInput.value = friendlyDate(new Date());
  }
}

function updatePresetOptions() {
  var sub = document.getElementById("wsSubject").value;
  var typ = document.getElementById("wsType").value;
  var presetSelect = document.getElementById("wsPreset");
  presetSelect.innerHTML = "";

  var list = (WORKSHEET_PRESETS[sub] && WORKSHEET_PRESETS[sub][typ]) || [];

  if (list.length === 0) {
    var opt = document.createElement("option");
    opt.value = "general";
    opt.textContent = "Standard Practice Template";
    presetSelect.appendChild(opt);
    return;
  }

  list.forEach(function (p, idx) {
    var opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    if (idx === 0) opt.selected = true;
    presetSelect.appendChild(opt);
  });
}

function renderWorksheetPreview() {
  var sub = document.getElementById("wsSubject").value;
  var typ = document.getElementById("wsType").value;
  var presetId = document.getElementById("wsPreset").value;
  var kidName = document.getElementById("wsKidName").value || (activeKid() ? activeKid().name : "________________");
  var wsDate = document.getElementById("wsDate").value || friendlyDate(new Date());

  var displayBox = document.getElementById("worksheetDisplayArea");
  var list = (WORKSHEET_PRESETS[sub] && WORKSHEET_PRESETS[sub][typ]) || [];
  var preset = list.find(function (p) { return p.id === presetId; }) || list[0];

  var html = buildWorksheetHTML(sub, typ, preset, kidName, wsDate);
  displayBox.innerHTML = html;
}

// Standard Consistent Header on Every Page
function buildWorksheetHeader(sub, title, kidName, wsDate) {
  var isUrdu = (sub === "urdu");
  var out = '<div class="ws-header' + (isUrdu ? ' urdu-header' : '') + '">';

  if (isUrdu) {
    out += '  <div class="ws-brand-row urdu-text">';
    out += '    <div class="ws-brand-title">🌱 ہوم اسکول • HomeSteps</div>';
    out += '    <div class="ws-brand-badge">عمر ۳ تا ۷ سال • اردو مشق</div>';
    out += '  </div>';
    out += '  <div class="ws-title-row">';
    out += '    <h1 class="ws-title urdu-title">' + title + '</h1>';
    out += '  </div>';
    out += '  <div class="ws-meta-bar urdu-text">';
    out += '    <div class="ws-meta-item"><span>نام:</span> <span class="ws-meta-fill">' + kidName + '</span></div>';
    out += '    <div class="ws-meta-item"><span>تاریخ:</span> <span class="ws-meta-fill">' + wsDate + '</span></div>';
    out += '    <div class="ws-meta-item"><span>ستارے:</span> <span class="ws-stars">⭐ ⭐ ⭐</span></div>';
    out += '  </div>';
  } else {
    var subjectLabels = {
      english: "English",
      math: "Math",
      science: "Science",
      islamiat: "Islamiat",
      nazra: "Nazra (Quranic Arabic)",
      social: "Social Studies",
      art: "Art & Craft",
      activity: "Activity"
    };
    var subLabel = subjectLabels[sub] || "Homeschool Learning";

    out += '  <div class="ws-brand-row">';
    out += '    <div class="ws-brand-title">🌱 HomeSteps Homeschool</div>';
    out += '    <div class="ws-brand-badge">Ages 3–7 • ' + subLabel + '</div>';
    out += '  </div>';
    out += '  <div class="ws-title-row">';
    out += '    <h1 class="ws-title">' + title + '</h1>';
    out += '  </div>';
    out += '  <div class="ws-meta-bar">';
    out += '    <div class="ws-meta-item"><span>Name:</span> <span class="ws-meta-fill">' + kidName + '</span></div>';
    out += '    <div class="ws-meta-item"><span>Date:</span> <span class="ws-meta-fill">' + wsDate + '</span></div>';
    out += '    <div class="ws-meta-item"><span>Score:</span> <span class="ws-stars">⭐ ⭐ ⭐</span></div>';
    out += '  </div>';
  }

  out += '</div>';
  return out;
}

// Clear Single-Language Instruction at Top of Page
function buildWorksheetInstructions(sub, typ, preset) {
  var isUrdu = (sub === "urdu");

  var englishInstructions = {
    tracing: "Trace carefully along the dotted lines with your pencil.",
    matching: "Draw a straight line to match each correct pair.",
    counting: "Count the objects in each box and write the number in the square.",
    coloring: preset && preset.prompt ? preset.prompt : "Color neatly inside the lines and trace the word below.",
    circle: "Look at the target and circle the matching answer.",
    fill: "Use the word bank to fill in the missing blanks.",
    map: "Look at the diagram and write the correct label in each box."
  };

  if (sub === "islamiat" && typ === "tracing") {
    englishInstructions.tracing = "Trace the sacred Arabic words carefully with your pencil.";
  }
  if (sub === "nazra" && typ === "tracing") {
    englishInstructions.tracing = "Trace the Arabic letters carefully along the dotted lines with correct pronunciation (Makhraj).";
  }

  var urduInstructions = {
    tracing: "نقطوں پر پنسل چلائیں اور بار بار لکھنے کی مشق کریں۔",
    matching: "لکیر لگا کر صحیح جوڑے آپس میں ملائیں۔",
    counting: "چیزیں گنیں اور خالی ڈبے میں درست ہندسہ لکھیں۔",
    coloring: preset && preset.prompt ? preset.prompt : "تصویر میں خوبصورت رنگ بھریں اور نیچے دیا گیا لفظ ٹریس کریں۔",
    circle: "پہلے حرف کو دیکھ کر صحیح جواب پر گول دائرہ لگائیں۔",
    fill: "اوپر دیے گئے خانے کی مدد سے خالی جگہ پُر کریں۔",
    map: "نقشہ دیکھیں، رنگ بھریں اور خالی خانے میں درست سمت کا نام لکھیں۔"
  };

  var out = '<div class="ws-instructions' + (isUrdu ? ' urdu-instructions' : '') + '">';
  if (isUrdu) {
    out += '  <span class="ws-inst-text">✏️ ' + (urduInstructions[typ] || "دی گئی مشق مکمل کریں۔") + '</span>';
  } else {
    out += '  <span class="ws-inst-text">✏️ ' + (englishInstructions[typ] || "Complete the exercises below.") + '</span>';
  }
  out += '</div>';
  return out;
}

// 1. Tracing Body with Kindergarten 3-Line Ruled Writing Guides
function buildTracingBody(sub, preset) {
  var letters = (preset && preset.letters) || ["A", "B", "C", "D"];
  var isUrdu = (sub === "urdu");
  var isArabic = (sub === "nazra" || (sub === "islamiat" && preset && preset.type === "arabic"));

  var html = '<div class="tracing-grid">';
  letters.forEach(function (char, idx) {
    html += '<div class="trace-card">';
    html += '  <div class="trace-card-header">';
    html += '    <span class="trace-num-badge">#' + (idx + 1) + '</span>';
    html += '    <span class="trace-star-cue">⭐</span>';
    html += '  </div>';

    var letterClass = 'trace-letter-big';
    if (isUrdu) letterClass += ' trace-letter-urdu';
    else if (isArabic) letterClass += ' trace-letter-arabic';

    html += '  <div class="' + letterClass + '">' + char + '</div>';

    html += '  <div class="trace-guidelines-container' + (isUrdu || isArabic ? ' rtl-guide' : '') + '">';

    // Line 1: Dotted tracing repetitions
    html += '    <div class="ruled-line-guide">';
    html += '      <span class="guide-slot trace-dotted-sample' + (isUrdu ? ' urdu-char' : (isArabic ? ' arabic-char' : '')) + '">' + char + '</span>';
    html += '      <span class="guide-slot trace-dotted-sample' + (isUrdu ? ' urdu-char' : (isArabic ? ' arabic-char' : '')) + '">' + char + '</span>';
    html += '      <span class="guide-slot trace-dotted-sample' + (isUrdu ? ' urdu-char' : (isArabic ? ' arabic-char' : '')) + '">' + char + '</span>';
    html += '    </div>';

    // Line 2: Starter trace + free writing slots
    html += '    <div class="ruled-line-guide">';
    html += '      <span class="guide-slot trace-dotted-sample' + (isUrdu ? ' urdu-char' : (isArabic ? ' arabic-char' : '')) + '">' + char + '</span>';
    html += '      <span class="guide-slot guide-slot-empty"></span>';
    html += '      <span class="guide-slot guide-slot-empty"></span>';
    html += '    </div>';

    html += '  </div>';
    html += '</div>';
  });
  html += '</div>';
  return html;
}

// 2. Counting Body with Generous Spacing and Big Answer Box
function buildCountingBody(sub, preset) {
  var items = (preset && preset.items) || [
    { icon: "🍎", count: 3, label: "Apples" },
    { icon: "⭐", count: 5, label: "Stars" },
    { icon: "🎈", count: 2, label: "Balloons" },
    { icon: "🌸", count: 4, label: "Flowers" }
  ];
  var isUrdu = (sub === "urdu");

  var html = '<div class="counting-list' + (isUrdu ? ' urdu-counting' : '') + '">';
  items.forEach(function (it, idx) {
    html += '<div class="counting-row">';
    html += '  <div class="counting-index-badge">#' + (idx + 1) + '</div>';

    html += '  <div class="counting-objects-stage">';
    for (var i = 0; i < it.count; i++) {
      html += '    <span class="count-item-icon">' + it.icon + '</span>';
    }
    html += '  </div>';

    html += '  <div class="counting-answer-group">';
    html += '    <div class="counting-answer-label">' + (isUrdu ? 'تعداد لکھیں' : 'Count & Write') + '</div>';
    html += '    <div class="counting-answer-box">';
    html += '      <div class="counting-box-inner-guide"></div>';
    html += '    </div>';
    html += '    <span class="counting-reward-star" title="Color when correct">⭐</span>';
    html += '  </div>';

    html += '</div>';
  });
  html += '</div>';
  return html;
}

// 3. Matching Body with Two Spacious Columns and Central Drawing Lane
function buildMatchingBody(sub, preset) {
  var left = (preset && preset.left) || ["A", "B", "C", "D"];
  var right = (preset && preset.right) || ["c", "a", "d", "b"];
  var isUrdu = (sub === "urdu");

  var html = '<div class="matching-container' + (isUrdu ? ' urdu-matching' : '') + '">';

  html += '  <div class="matching-column left-col">';
  left.forEach(function (item, idx) {
    html += '    <div class="match-item match-left" data-index="' + idx + '">';
    html += '      <span class="match-text">' + item + '</span>';
    html += '      <span class="match-connector">○</span>';
    html += '    </div>';
  });
  html += '  </div>';

  html += '  <div class="matching-divider-space">';
  html += '    <div class="matching-center-cue">✏️ Draw Line ✏️</div>';
  html += '  </div>';

  html += '  <div class="matching-column right-col">';
  right.forEach(function (item, idx) {
    html += '    <div class="match-item match-right" data-index="' + idx + '">';
    html += '      <span class="match-connector">○</span>';
    html += '      <span class="match-text">' + item + '</span>';
    html += '    </div>';
  });
  html += '  </div>';

  html += '</div>';
  return html;
}

// 4. Coloring + Kindergarten Ruled Tracing Banner Below
function buildColoringBody(sub, preset) {
  var svgKey = (preset && preset.svg) || "apple";
  var svgCode = COLORING_SVGS[svgKey] || COLORING_SVGS.apple;
  var word = (preset && preset.word) || "COLOR";
  var isUrdu = (sub === "urdu");
  var isArabic = (sub === "nazra");

  var html = '<div class="coloring-container' + (isUrdu ? ' urdu-coloring' : '') + '">';

  html += '  <div class="coloring-art-box">';
  html += '    <div class="coloring-corner-star top-left">⭐</div>';
  html += '    <div class="coloring-corner-star top-right">⭐</div>';
  html += '    ' + svgCode;
  html += '    <div class="coloring-corner-star bottom-left">⭐</div>';
  html += '    <div class="coloring-corner-star bottom-right">⭐</div>';
  html += '  </div>';

  html += '  <div class="coloring-trace-section">';
  html += '    <div class="coloring-trace-label">' + (isUrdu ? '✏️ نیچے دیا گیا لفظ ٹریس کریں:' : '✏️ Trace the Word Below:') + '</div>';
  html += '    <div class="coloring-ruled-banner' + (isUrdu ? ' urdu-ruled' : (isArabic ? ' arabic-ruled' : '')) + '">';
  html += '      <span class="coloring-trace-word">' + word + '</span>';
  html += '    </div>';
  html += '  </div>';

  html += '</div>';
  return html;
}

// 5. Circle the Correct Answer with Big Target Card & Spacious Choices
function buildCircleBody(sub, preset) {
  var questions = (preset && preset.questions) || [
    { target: "B", options: ["D", "B", "P", "R"] },
    { target: "5", options: ["2", "5", "8", "3"] }
  ];
  var isUrdu = (sub === "urdu");
  var isArabic = (sub === "nazra");

  var html = '<div class="circle-list' + (isUrdu ? ' urdu-circle' : '') + '">';
  questions.forEach(function (q) {
    html += '<div class="circle-row">';

    html += '  <div class="circle-target-card">';
    html += '    <div class="circle-target-label">' + (isUrdu ? 'تلاش کریں' : 'FIND THIS') + '</div>';
    html += '    <div class="circle-target-val' + (isUrdu ? ' urdu-val' : (isArabic ? ' arabic-val' : '')) + '">' + q.target + '</div>';
    html += '  </div>';

    html += '  <div class="circle-divider-arrow">' + (isUrdu ? '⬅' : '➔') + '</div>';

    html += '  <div class="circle-options">';
    q.options.forEach(function (opt) {
      html += '    <div class="circle-choice' + (isUrdu ? ' urdu-choice' : (isArabic ? ' arabic-choice' : '')) + '">';
      html += '      <span>' + opt + '</span>';
      html += '    </div>';
    });
    html += '  </div>';

    html += '</div>';
  });
  html += '</div>';
  return html;
}

// 6. Fill in the Blanks with Dedicated Word Bank Pills
function buildFillBody(sub, preset) {
  var bank = (preset && preset.bank) || ["A", "B", "C"];
  var rows = (preset && preset.rows) || [["A", "", "C"]];
  var isUrdu = (sub === "urdu");

  var html = '<div class="fill-container' + (isUrdu ? ' urdu-fill' : '') + '">';

  html += '<div class="fill-wordbank">';
  html += '  <div class="wordbank-title">🏷️ ' + (isUrdu ? 'الفاظ کا خانہ (Word Bank):' : 'WORD BANK') + '</div>';
  html += '  <div class="wordbank-pills">';
  bank.forEach(function (b) {
    html += '    <span class="wordbank-pill">' + b + '</span>';
  });
  html += '  </div>';
  html += '</div>';

  html += '<div class="fill-sequences">';
  rows.forEach(function (row, rIdx) {
    html += '<div class="fill-row">';
    html += '  <div class="fill-row-num">#' + (rIdx + 1) + '</div>';
    html += '  <div class="fill-cells-group">';
    row.forEach(function (cell) {
      if (cell === "") {
        html += '<div class="fill-cell blank">';
        html += '  <div class="fill-blank-guide"></div>';
        html += '  <span class="fill-blank-qmark">?</span>';
        html += '</div>';
      } else {
        html += '<div class="fill-cell">' + cell + '</div>';
      }
    });
    html += '  </div>';
    html += '</div>';
  });
  html += '</div>';

  html += '</div>';
  return html;
}

// 7. Map & Diagram Labeling with Clean Ink-Friendly Line Art
function buildMapLabelingBody(sub, preset) {
  var kind = (preset && preset.kind) || "pak_provinces";
  var isUrdu = (sub === "urdu");
  var html = '<div class="map-worksheet-box' + (isUrdu ? ' urdu-map' : '') + '">';

  if (kind === "pak_flag") {
    html += '<div class="map-svg-container">';
    html += '  <svg viewBox="0 0 240 160" width="220" height="150" style="border: 1.5px solid #475569; border-radius: 6px; background: #FFF;">';
    html += '    <rect x="0" y="0" width="60" height="160" fill="#fff" stroke="#475569" stroke-width="2"/>';
    html += '    <rect x="60" y="0" width="180" height="160" fill="#fff" stroke="#475569" stroke-width="2"/>';
    html += '    <path d="M165 50 C140 50 125 70 125 90 C125 110 140 130 165 130 C150 120 140 105 140 90 C140 75 150 60 165 50 Z" fill="#fff" stroke="#475569" stroke-width="2.5"/>';
    html += '    <polygon points="175,70 180,82 192,82 182,90 186,102 175,94 164,102 168,90 158,82 170,82" fill="#fff" stroke="#475569" stroke-width="2"/>';
    html += '  </svg>';
    html += '</div>';
    html += '<div class="fill-wordbank"><div class="wordbank-title">🏷️ WORD BANK:</div><div class="wordbank-pills"><span class="wordbank-pill">White Stripe</span><span class="wordbank-pill">Green Field</span><span class="wordbank-pill">Crescent Moon</span><span class="wordbank-pill">Five-pointed Star</span></div></div>';
    html += '<div class="map-labels-grid">';
    html += '  <div class="map-label-target-card"><span class="map-target-title">1. Left vertical stripe:</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">2. Main background field:</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">3. Moon symbol:</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">4. Star symbol:</span><div class="map-blank-input-box"></div></div>';
    html += '</div>';
  } else if (kind === "compass_ur") {
    html += '<div class="map-svg-container">';
    html += '  <svg viewBox="0 0 200 200" width="180" height="180">';
    html += '    <circle cx="100" cy="100" r="80" fill="#fff" stroke="#334155" stroke-width="2.5"/>';
    html += '    <line x1="100" y1="20" x2="100" y2="180" stroke="#64748B" stroke-width="1.5"/>';
    html += '    <line x1="20" y1="100" x2="180" y2="100" stroke="#64748B" stroke-width="1.5"/>';
    html += '    <polygon points="100,25 108,80 100,70 92,80" fill="#fff" stroke="#334155" stroke-width="2"/>';
    html += '    <polygon points="100,175 108,120 100,130 92,120" fill="#fff" stroke="#334155" stroke-width="2"/>';
    html += '    <text x="82" y="24" font-weight="bold" font-size="13" font-family="sans-serif">شمال</text>';
    html += '    <text x="82" y="196" font-weight="bold" font-size="13" font-family="sans-serif">جنوب</text>';
    html += '    <text x="176" y="105" font-weight="bold" font-size="13" font-family="sans-serif">مشرق</text>';
    html += '    <text x="4" y="105" font-weight="bold" font-size="13" font-family="sans-serif">مغرب</text>';
    html += '  </svg>';
    html += '</div>';
    html += '<div class="fill-wordbank"><div class="wordbank-title">🏷️ الفاظ کا خانہ (Word Bank):</div><div class="wordbank-pills"><span class="wordbank-pill">شمال</span><span class="wordbank-pill">جنوب</span><span class="wordbank-pill">مشرق</span><span class="wordbank-pill">مغرب</span></div></div>';
    html += '<div class="map-labels-grid">';
    html += '  <div class="map-label-target-card"><span class="map-target-title">اوپر کی سمت:</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">نیچے کی سمت:</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">دائیں سمت:</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">بائیں سمت:</span><div class="map-blank-input-box"></div></div>';
    html += '</div>';
  } else if (kind === "compass") {
    html += '<div class="map-svg-container">';
    html += '  <svg viewBox="0 0 200 200" width="180" height="180">';
    html += '    <circle cx="100" cy="100" r="80" fill="#fff" stroke="#334155" stroke-width="2.5"/>';
    html += '    <line x1="100" y1="20" x2="100" y2="180" stroke="#64748B" stroke-width="1.5"/>';
    html += '    <line x1="20" y1="100" x2="180" y2="100" stroke="#64748B" stroke-width="1.5"/>';
    html += '    <polygon points="100,25 108,80 100,70 92,80" fill="#fff" stroke="#334155" stroke-width="2"/>';
    html += '    <polygon points="100,175 108,120 100,130 92,120" fill="#fff" stroke="#334155" stroke-width="2"/>';
    html += '    <text x="94" y="20" font-weight="bold" font-size="16">N</text>';
    html += '    <text x="94" y="196" font-weight="bold" font-size="16">S</text>';
    html += '    <text x="184" y="105" font-weight="bold" font-size="16">E</text>';
    html += '    <text x="6" y="105" font-weight="bold" font-size="16">W</text>';
    html += '  </svg>';
    html += '</div>';
    html += '<div class="fill-wordbank"><div class="wordbank-title">🏷️ WORD BANK:</div><div class="wordbank-pills"><span class="wordbank-pill">North</span><span class="wordbank-pill">South</span><span class="wordbank-pill">East</span><span class="wordbank-pill">West</span></div></div>';
    html += '<div class="map-labels-grid">';
    html += '  <div class="map-label-target-card"><span class="map-target-title">Top Direction (N):</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">Bottom Direction (S):</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">Right Direction (E):</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">Left Direction (W):</span><div class="map-blank-input-box"></div></div>';
    html += '</div>';
  } else {
    html += '<div class="map-svg-container">';
    html += '  <svg viewBox="0 0 280 220" width="260" height="200" style="border: 1.5px solid #475569; border-radius: 8px; background: #FAF9F6;">';
    html += '    <path d="M70 140 L120 130 L100 190 L40 180 Z" fill="#fff" stroke="#475569" stroke-width="1.5" title="Balochistan"/>';
    html += '    <path d="M120 130 L170 120 L150 185 L100 190 Z" fill="#fff" stroke="#475569" stroke-width="1.5" title="Sindh"/>';
    html += '    <path d="M120 70 L190 70 L170 120 L120 130 Z" fill="#fff" stroke="#475569" stroke-width="1.5" title="Punjab"/>';
    html += '    <path d="M75 60 L120 70 L110 120 L65 100 Z" fill="#fff" stroke="#475569" stroke-width="1.5" title="KPK"/>';
    html += '    <path d="M140 25 L210 30 L190 70 L125 65 Z" fill="#fff" stroke="#475569" stroke-width="1.5" title="GB & Kashmir"/>';
    html += '    <text x="60" y="160" font-size="12" font-weight="bold">1</text>';
    html += '    <text x="135" y="160" font-size="12" font-weight="bold">2</text>';
    html += '    <text x="150" y="100" font-size="12" font-weight="bold">3</text>';
    html += '    <text x="85" y="85" font-size="12" font-weight="bold">4</text>';
    html += '    <text x="165" y="45" font-size="12" font-weight="bold">5</text>';
    html += '  </svg>';
    html += '</div>';
    html += '<div class="fill-wordbank"><div class="wordbank-title">🏷️ WORD BANK:</div><div class="wordbank-pills"><span class="wordbank-pill">Punjab</span><span class="wordbank-pill">Sindh</span><span class="wordbank-pill">Khyber Pakhtunkhwa</span><span class="wordbank-pill">Balochistan</span><span class="wordbank-pill">Gilgit-Baltistan</span></div></div>';
    html += '<div class="map-labels-grid">';
    html += '  <div class="map-label-target-card"><span class="map-target-title">1. Largest area (South-West):</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">2. Indus Delta (South-East):</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">3. Land of 5 Rivers (Central):</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">4. Mountain Valley (North-West):</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">5. High Peaks (North):</span><div class="map-blank-input-box"></div></div>';
    html += '</div>';
  }

  html += '</div>';
  return html;
}

// Master HTML Assembly
function buildWorksheetHTML(sub, typ, preset, kidName, wsDate) {
  var title = preset ? preset.name : "Practice Worksheet";
  var header = buildWorksheetHeader(sub, title, kidName, wsDate);
  var instructions = buildWorksheetInstructions(sub, typ, preset);

  var body = "";
  if (typ === "tracing") {
    body = buildTracingBody(sub, preset);
  } else if (typ === "counting") {
    body = buildCountingBody(sub, preset);
  } else if (typ === "matching") {
    body = buildMatchingBody(sub, preset);
  } else if (typ === "coloring") {
    body = buildColoringBody(sub, preset);
  } else if (typ === "circle") {
    body = buildCircleBody(sub, preset);
  } else if (typ === "fill") {
    body = buildFillBody(sub, preset);
  } else if (typ === "map") {
    body = buildMapLabelingBody(sub, preset);
  }

  return '<div class="ws-container">' + header + instructions + '  <div class="ws-body">' + body + '  </div>\n</div>';
}


// ========================================================
// VIEW 4: WEEKLY REPORT (9 Subjects)
// ========================================================
function renderWeeklyReport() {
  var kid = activeKid();
  var summaryBox = document.getElementById("reportSummaryBox");
  var detailsBox = document.getElementById("reportDetailsBox");
  var notesBox = document.getElementById("reportNotesBox");
  var dateRange = document.getElementById("reportDateRange");

  if (!kid) {
    summaryBox.innerHTML = '<p class="empty-msg">No active child selected.</p>';
    detailsBox.innerHTML = "";
    notesBox.innerHTML = "";
    return;
  }

  var mon = getMonday(new Date());
  var sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  dateRange.textContent = friendlyDate(mon) + " — " + friendlyDate(sun);

  var totalPossible = 7 * SUBJECTS.length;
  var totalDone = 0;
  var totalStars = 0;
  var dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  var tableHtml = '<table class="report-table"><thead><tr><th>Subject</th>';
  for (var i = 0; i < 7; i++) {
    tableHtml += '<th>' + dayNames[i] + '</th>';
  }
  tableHtml += '<th>Total</th></tr></thead><tbody>';

  var subjectTotals = {};
  SUBJECTS.forEach(function (s) { subjectTotals[s.name] = 0; });

  var weeklyNotes = [];

  for (var dIdx = 0; dIdx < 7; dIdx++) {
    var cur = new Date(mon);
    cur.setDate(mon.getDate() + dIdx);
    var ds = dateStr(cur);
    var rec = state.records[recordKey(kid.id, ds)] || {};

    if (isStarAwarded(kid.id, ds)) totalStars++;

    var n = getNote(kid.id, ds);
    if (n && n.trim()) {
      weeklyNotes.push({ date: dayNames[dIdx] + " (" + ds + ")", note: n });
    }

    SUBJECTS.forEach(function (s) {
      if (rec[s.name]) {
        totalDone++;
        subjectTotals[s.name]++;
      }
    });
  }

  SUBJECTS.forEach(function (s) {
    tableHtml += '<tr><td class="sub-name">' + s.icon + ' ' + s.name + '</td>';
    for (var dIdx = 0; dIdx < 7; dIdx++) {
      var cur = new Date(mon);
      cur.setDate(mon.getDate() + dIdx);
      var ds = dateStr(cur);
      var rec = state.records[recordKey(kid.id, ds)] || {};
      var done = !!rec[s.name];
      tableHtml += '<td style="color:' + (done ? '#2D6A4F' : '#CCC') + ';">' + (done ? '✔' : '—') + '</td>';
    }
    tableHtml += '<td><strong>' + subjectTotals[s.name] + ' / 7</strong></td></tr>';
  });
  tableHtml += '</tbody></table>';

  var overallPct = Math.round((totalDone / totalPossible) * 100);

  summaryBox.innerHTML =
    '<div class="report-stat-card">' +
    '  <div class="report-stat-value">' + totalDone + ' / ' + totalPossible + '</div>' +
    '  <div class="report-stat-label">Tasks Completed (' + overallPct + '%)</div>' +
    '</div>' +
    '<div class="report-stat-card">' +
    '  <div class="report-stat-value">⭐ ' + totalStars + '</div>' +
    '  <div class="report-stat-label">Stars Earned</div>' +
    '</div>' +
    '<div class="report-stat-card">' +
    '  <div class="report-stat-value">' + weeklyNotes.length + '</div>' +
    '  <div class="report-stat-label">Notes Written</div>' +
    '</div>';

  detailsBox.innerHTML = tableHtml;

  if (weeklyNotes.length > 0) {
    var notesHtml = '<h3 style="margin-bottom:8px; font-size:1.05rem;">📝 Weekly Notes:</h3>';
    weeklyNotes.forEach(function (item) {
      notesHtml +=
        '<div class="report-note-item">' +
        '  <div class="report-note-date">' + item.date + '</div>' +
        '  <div>' + item.note + '</div>' +
        '</div>';
    });
    notesBox.innerHTML = notesHtml;
  } else {
    notesBox.innerHTML = '<p class="hint" style="text-align:left;">No notes recorded for this week yet.</p>';
  }
}

// ========================================================
// MONTHLY REPORT & BATCH PRINTING (Requirements 4 & 6)
// ========================================================
var currentReportMode = "weekly";

function initReportControls() {
  var weeklyBtn = document.getElementById("reportWeeklyTabBtn");
  var monthlyBtn = document.getElementById("reportMonthlyTabBtn");
  var monthSelect = document.getElementById("reportMonthSelect");
  var printMonthlyBtn = document.getElementById("printMonthlyReportBtn");
  var shareMonthBtn = document.getElementById("shareMonthReportWhatsAppBtn");

  if (weeklyBtn) {
    weeklyBtn.onclick = function () {
      currentReportMode = "weekly";
      weeklyBtn.classList.add("active");
      if (monthlyBtn) monthlyBtn.classList.remove("active");
      document.getElementById("weeklyReportHeader").classList.remove("hidden");
      document.getElementById("monthlyReportHeader").classList.add("hidden");
      document.getElementById("monthlySelectorControls").classList.add("hidden");
      document.getElementById("weeklyReportContent").classList.remove("hidden");
      document.getElementById("monthlyReportContent").classList.add("hidden");
      renderWeeklyReport();
    };
  }

  if (monthlyBtn) {
    monthlyBtn.onclick = function () {
      currentReportMode = "monthly";
      monthlyBtn.classList.add("active");
      if (weeklyBtn) weeklyBtn.classList.remove("active");
      document.getElementById("weeklyReportHeader").classList.add("hidden");
      document.getElementById("monthlyReportHeader").classList.remove("hidden");
      document.getElementById("monthlySelectorControls").classList.remove("hidden");
      document.getElementById("weeklyReportContent").classList.add("hidden");
      document.getElementById("monthlyReportContent").classList.remove("hidden");
      populateMonthSelect();
      renderMonthlyReport();
    };
  }

  if (monthSelect) {
    monthSelect.onchange = function () {
      renderMonthlyReport();
    };
  }

  if (printMonthlyBtn) {
    printMonthlyBtn.onclick = function () {
      var kid = activeKid();
      var monthVal = document.getElementById("reportMonthSelect").value;
      var printBox = document.getElementById("printContainer");
      var monthlyBox = document.getElementById("monthlyReportContent");
      if (kid && printBox && monthlyBox) {
        printBox.innerHTML =
          '<div class="paper-page" style="border: 2px solid #000; padding: 10mm; background: #FFF;">' +
          '  <h2 style="font-size:1.4rem; margin-bottom: 4px;">HomeSteps — Monthly Progress Summary</h2>' +
          '  <p style="margin-bottom: 12px; font-size: 0.95rem;">Child: <strong>' + kid.name + '</strong> • Month: <strong>' + monthVal + '</strong></p>' +
          monthlyBox.innerHTML +
          '</div>';
        window.print();
      }
    };
  }

  if (shareMonthBtn) {
    shareMonthBtn.onclick = function () {
      var kid = activeKid();
      var monthVal = document.getElementById("reportMonthSelect").value;
      if (!kid) return;
      var text = "🌟 HomeSteps Monthly Learning Report for " + kid.name + " (" + monthVal + ")! We made steady homeschool progress this month! 📚✨";
      var url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(text);
      window.open(url, "_blank");
    };
  }
}

function populateMonthSelect() {
  var sel = document.getElementById("reportMonthSelect");
  if (!sel || sel.options.length > 0) return;

  var now = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  for (var i = 0; i < 6; i++) {
    var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    var val = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2);
    var label = months[d.getMonth()] + " " + d.getFullYear();
    var opt = document.createElement("option");
    opt.value = val;
    opt.textContent = label;
    if (i === 0) opt.selected = true;
    sel.appendChild(opt);
  }
}

function renderMonthlyReport() {
  var kid = activeKid();
  var summaryBox = document.getElementById("monthlySummaryBox");
  var detailsBox = document.getElementById("monthlyDetailsBox");
  var monthTitle = document.getElementById("reportMonthTitle");
  var monthSelect = document.getElementById("reportMonthSelect");

  if (!kid) {
    if (summaryBox) summaryBox.innerHTML = '<p class="empty-msg">No active child selected.</p>';
    if (detailsBox) detailsBox.innerHTML = "";
    return;
  }

  var selectedMonthVal = monthSelect ? monthSelect.value : "";
  if (!selectedMonthVal) {
    populateMonthSelect();
    selectedMonthVal = monthSelect ? monthSelect.value : "";
  }

  var parts = (selectedMonthVal || "2026-10").split("-");
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1;
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  if (monthTitle) monthTitle.textContent = monthNames[month] + " " + year;

  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var totalPossible = daysInMonth * SUBJECTS.length;
  var totalDone = 0;
  var totalStars = 0;
  var subjectTotals = {};
  SUBJECTS.forEach(function (s) { subjectTotals[s.name] = 0; });

  var bestStreakInMonth = 0;
  var currentMonthStreak = 0;

  for (var day = 1; day <= daysInMonth; day++) {
    var dStr = year + "-" + ("0" + (month + 1)).slice(-2) + "-" + ("0" + day).slice(-2);
    var rec = (state.records && state.records[recordKey(kid.id, dStr)]) || {};
    var dayDoneCount = 0;

    if (isStarAwarded(kid.id, dStr)) totalStars++;

    SUBJECTS.forEach(function (s) {
      if (rec[s.name]) {
        totalDone++;
        dayDoneCount++;
        subjectTotals[s.name]++;
      }
    });

    if (dayDoneCount === SUBJECTS.length) {
      currentMonthStreak++;
      if (currentMonthStreak > bestStreakInMonth) {
        bestStreakInMonth = currentMonthStreak;
      }
    } else {
      currentMonthStreak = 0;
    }
  }

  var overallPct = Math.round((totalDone / totalPossible) * 100);

  if (summaryBox) {
    summaryBox.innerHTML =
      '<div class="report-stat-card">' +
      '  <div class="report-stat-value">' + totalDone + ' / ' + totalPossible + '</div>' +
      '  <div class="report-stat-label">Month Tasks Completed (' + overallPct + '%)</div>' +
      '</div>' +
      '<div class="report-stat-card">' +
      '  <div class="report-stat-value">⭐ ' + totalStars + '</div>' +
      '  <div class="report-stat-label">Month Stars Earned</div>' +
      '</div>' +
      '<div class="report-stat-card">' +
      '  <div class="report-stat-value">🔥 ' + bestStreakInMonth + ' days</div>' +
      '  <div class="report-stat-label">Best Streak of the Month</div>' +
      '</div>';
  }

  if (detailsBox) {
    var tbl = '<table class="report-table"><thead><tr><th>Subject</th><th>Monthly Tasks Done</th><th>Completion %</th><th>Monthly Status</th></tr></thead><tbody>';
    SUBJECTS.forEach(function (s) {
      var sDone = subjectTotals[s.name];
      var sPct = Math.round((sDone / daysInMonth) * 100);
      var statusTag = sPct >= 80 ? '<span style="color:#166534;font-weight:800;">Mastered 🌟</span>' : (sPct >= 40 ? '<span style="color:#D97706;font-weight:700;">Consistent ⏳</span>' : '<span style="color:#64748B;">In Progress ✏️</span>');
      tbl += '<tr><td class="sub-name">' + s.icon + ' ' + s.name + '</td><td><strong>' + sDone + ' / ' + daysInMonth + ' days</strong></td><td>' + sPct + '%</td><td>' + statusTag + '</td></tr>';
    });
    tbl += '</tbody></table>';
    detailsBox.innerHTML = tbl;
  }
}

// Batch Print This Week Worksheets (Requirement 4)
function batchPrintWeeksWorksheets() {
  var kid = activeKid();
  if (!kid) {
    alert("Please add or select a child first.");
    return;
  }
  var currentBand = kid.ageBand || "4-5";
  var syllabusForBand = SYLLABUS_DATA[currentBand] || SYLLABUS_DATA["4-5"];
  var dayNames = ["Day 1 (Monday)", "Day 2 (Tuesday)", "Day 3 (Wednesday)", "Day 4 (Thursday)", "Day 5 (Friday)"];
  var subKeys = Object.keys(syllabusForBand.subjects);

  var printContainer = document.getElementById("printContainer");
  printContainer.innerHTML = "";

  for (var dayIndex = 0; dayIndex < 5; dayIndex++) {
    var primarySub = subKeys[dayIndex % subKeys.length];
    var item = syllabusForBand.subjects[primarySub] ? syllabusForBand.subjects[primarySub][dayIndex % syllabusForBand.subjects[primarySub].length] : null;

    var subKey = primarySub.toLowerCase();
    if (subKey === "social studies") subKey = "social";
    if (subKey === "art & craft") subKey = "art";
    if (subKey === "math/counting") subKey = "math";
    if (subKey === "reading" || subKey === "writing") subKey = "english";

    var typ = (item && item.type) ? item.type : "tracing";
    var list = (WORKSHEET_PRESETS[subKey] && WORKSHEET_PRESETS[subKey][typ]) || [];
    var preset = (item && item.presetId) ? list.find(function (p) { return p.id === item.presetId; }) : null;
    if (!preset && list.length > 0) preset = list[0];
    if (!preset) {
      preset = WORKSHEET_PRESETS.english.tracing[0];
      subKey = "english";
      typ = "tracing";
    }

    var wsDate = dayNames[dayIndex] + " — Week 1";
    var pageHtml = buildWorksheetHTML(subKey, typ, preset, kid.name, wsDate);

    var pageWrap = document.createElement("div");
    pageWrap.className = "paper-page printable-sheet-page";
    pageWrap.innerHTML = pageHtml;
    printContainer.appendChild(pageWrap);
  }

  window.print();
}


// ========================================================
// PRINT & SOCIAL ACTIONS
// ========================================================
function executePrint(contentHtml) {
  var printBox = document.getElementById("printContainer");
  printBox.innerHTML = contentHtml;
  window.print();
}

function shareWinOnWhatsApp() {
  var kid = activeKid();
  if (!kid) return;

  var text = "🎉 " + kid.name + " completed all daily homeschool targets on HomeSteps today! ⭐⭐⭐\n\nTeach it. Track it. Print it. — All in one place! #HomeSteps";
  var url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
}

function shareReportOnWhatsApp() {
  var kid = activeKid();
  if (!kid) return;
  var stars = getWeekStarsCount(kid.id);

  var text = "📊 Homeschool Weekly Update (" + kid.name + "):\nEarned " + stars + " stars this week and continuing steady progress! 🌟\n#HomeSteps";
  var url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
}


// ========================================================
// ACCESSIBILITY: BIG-TEXT & VOICE NOTES (PRD §23)
// ========================================================
function initAccessibility() {
  var isBig = localStorage.getItem("homesteps_big_text") === "true";
  if (isBig) {
    document.body.classList.add("big-text-mode");
  }

  document.getElementById("toggleBigTextBtn").onclick = function () {
    document.body.classList.toggle("big-text-mode");
    var active = document.body.classList.contains("big-text-mode");
    localStorage.setItem("homesteps_big_text", active ? "true" : "false");
  };

  var voiceBtn = document.getElementById("voiceNoteBtn");
  var statusText = document.getElementById("voiceStatus");
  var noteInput = document.getElementById("dailyNote");

  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceBtn.title = "Voice recognition is not supported in this browser";
    voiceBtn.onclick = function () {
      alert("Your browser does not support Speech Recognition. Please try using Google Chrome on desktop or Android.");
    };
    return;
  }

  var recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  var isListening = false;

  voiceBtn.onclick = function () {
    if (!isListening) {
      try {
        recognition.start();
        isListening = true;
        voiceBtn.classList.add("recording");
        voiceBtn.innerHTML = "⏹️ Stop Mic";
        statusText.classList.remove("hidden");
      } catch (err) {
        console.warn(err);
      }
    } else {
      recognition.stop();
    }
  };

  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    if (transcript) {
      var current = noteInput.value.trim();
      noteInput.value = current ? current + " " + transcript : transcript;
      var kid = activeKid();
      if (kid) {
        saveNote(kid.id, dateStr(new Date()), noteInput.value);
        document.getElementById("noteSaveStatus").textContent = "Saved ✓";
      }
    }
  };

  recognition.onend = function () {
    isListening = false;
    voiceBtn.classList.remove("recording");
    voiceBtn.innerHTML = "🎙️ Voice Note";
    statusText.classList.add("hidden");
  };

  recognition.onerror = function (event) {
    console.warn("Speech recognition error", event.error);
    isListening = false;
    voiceBtn.classList.remove("recording");
    voiceBtn.innerHTML = "🎙️ Voice Note";
    statusText.classList.add("hidden");
  };
}


// ========================================================
// JSON BACKUP & RESTORE & WIPE (Data Safety PRD §12 & §18)
// ========================================================
function exportJsonBackup() {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  var downloadAnchor = document.createElement("a");
  var today = dateStr(new Date());
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "homesteps_backup_" + today + ".json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importJsonBackup(file) {
  var reader = new FileReader();
  reader.onload = function (e) {
    try {
      var imported = JSON.parse(e.target.result);
      if (imported.kids && imported.records) {
        state = imported;
        saveState();
        alert("Backup restored successfully! 🎉");
        document.getElementById("backupModal").classList.add("hidden");
        render();
      } else {
        alert("Invalid file format. Please choose a valid HomeSteps backup JSON file.");
      }
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };
  reader.readAsText(file);
}

function wipeAllData() {
  if (confirm("⚠️ Are you sure you want to reset and delete all data? This action cannot be undone.")) {
    localStorage.removeItem(STORE_KEY);
    localStorage.removeItem(OLD_STORE_KEY);
    state = {
      kids: [
        { id: makeId(), name: "Ahmed", age: 4, ageBand: "4-5" },
        { id: makeId(), name: "Hafsa", age: 3, ageBand: "3-4" }
      ],
      records: {},
      notes: {},
      stars: {},
      taughtTopics: {},
      activeKidId: null
    };
    saveState();
    alert("All data has been reset to defaults.");
    document.getElementById("backupModal").classList.add("hidden");
    render();
  }
}


// ========================================================
// EVENT LISTENERS & SETUP
// ========================================================

// 1. Navigation Mode Switcher
document.getElementById("navTrackerBtn").onclick = function () { switchView("tracker"); };
document.getElementById("navSyllabusBtn").onclick = function () { switchView("syllabus"); };
document.getElementById("navGeneratorBtn").onclick = function () { switchView("generator"); };
document.getElementById("navReportBtn").onclick = function () { switchView("report"); };

function switchView(view) {
  currentView = view;
  document.getElementById("navTrackerBtn").classList.toggle("active", view === "tracker");
  document.getElementById("navSyllabusBtn").classList.toggle("active", view === "syllabus");
  document.getElementById("navGeneratorBtn").classList.toggle("active", view === "generator");
  document.getElementById("navReportBtn").classList.toggle("active", view === "report");

  document.getElementById("trackerView").classList.toggle("hidden", view !== "tracker");
  document.getElementById("syllabusView").classList.toggle("hidden", view !== "syllabus");
  document.getElementById("generatorView").classList.toggle("hidden", view !== "generator");
  document.getElementById("reportView").classList.toggle("hidden", view !== "report");

  render();
}

// 2. Kid Form Toggle & Add
document.getElementById("toggleAddKidBtn").onclick = function () {
  var form = document.getElementById("addKidForm");
  form.classList.toggle("hidden");
  if (!form.classList.contains("hidden")) {
    document.getElementById("kidName").focus();
  }
};

document.getElementById("addKidBtn").onclick = function () {
  var nameInput = document.getElementById("kidName");
  var ageInput = document.getElementById("kidAge");
  var bandSelect = document.getElementById("kidAgeBand");

  var name = nameInput.value.trim();
  var age = parseInt(ageInput.value, 10);
  var ageBand = bandSelect.value;

  if (!name) { alert("Please enter the child's name."); return; }
  if (!age || age < 1) { alert("Please enter a valid age."); return; }

  var kid = { id: makeId(), name: name, age: age, ageBand: ageBand };
  state.kids.push(kid);
  state.activeKidId = kid.id;
  nameInput.value = "";
  ageInput.value = "";
  document.getElementById("addKidForm").classList.add("hidden");

  saveState();
  render();
};

// 3. Syllabus Custom Topic Toggle & Save
document.getElementById("toggleCustomTopicBtn").onclick = function () {
  document.getElementById("addCustomTopicForm").classList.toggle("hidden");
};

document.getElementById("saveCustomTopicBtn").onclick = function () {
  var sub = document.getElementById("newTopicSubject").value;
  var title = document.getElementById("newTopicTitle").value.trim();
  var kid = activeKid();

  if (!title) {
    alert("Please enter a topic title.");
    return;
  }

  var band = kid ? kid.ageBand : "4-5";
  if (!SYLLABUS_DATA[band].subjects[sub]) {
    SYLLABUS_DATA[band].subjects[sub] = [];
  }

  var newTopic = {
    id: "custom_" + makeId(),
    title: title,
    guide: "Custom topic added by mother",
    presetId: "en_trace_cap_ae",
    type: "tracing"
  };

  SYLLABUS_DATA[band].subjects[sub].push(newTopic);
  document.getElementById("newTopicTitle").value = "";
  document.getElementById("addCustomTopicForm").classList.add("hidden");

  renderSyllabusPlanner();
};

document.getElementById("toggleCurriculumBtn").onclick = function () {
  var box = document.getElementById("fullCurriculumView");
  box.classList.toggle("hidden");
  document.getElementById("toggleCurriculumBtn").textContent = box.classList.contains("hidden") ? "View Details ▼" : "Hide Details ▲";
};

// 4. Generator Controls
document.getElementById("wsSubject").onchange = function () {
  updatePresetOptions();
  renderWorksheetPreview();
};
document.getElementById("wsType").onchange = function () {
  updatePresetOptions();
  renderWorksheetPreview();
};
document.getElementById("wsPreset").onchange = function () {
  renderWorksheetPreview();
};
document.getElementById("wsKidName").oninput = function () {
  renderWorksheetPreview();
};
document.getElementById("wsDate").oninput = function () {
  renderWorksheetPreview();
};
document.getElementById("refreshWsBtn").onclick = function () {
  renderWorksheetPreview();
};

// 5. Print Worksheet
document.getElementById("printWsBtn").onclick = function () {
  var previewHtml = document.getElementById("worksheetDisplayArea").innerHTML;
  executePrint('<div class="paper-page">' + previewHtml + '</div>');
};

// 6. Print Report
document.getElementById("printReportBtn").onclick = function () {
  var reportHtml =
    '<div class="paper-page">' +
    '  <div class="ws-header">' +
    '    <div class="ws-brand-row"><span>🌱 HomeSteps</span><span>Weekly Progress Report</span></div>' +
    '    <div class="ws-title-row"><div class="ws-title">Weekly Progress Report</div></div>' +
    '    <div class="ws-meta-bar">' +
    '      <div class="ws-meta-item"><span>Student:</span> <span class="ws-meta-fill">' + (activeKid() ? activeKid().name : "") + '</span></div>' +
    '      <div class="ws-meta-item"><span>Week:</span> <span class="ws-meta-fill">' + document.getElementById("reportDateRange").textContent + '</span></div>' +
    '    </div>' +
    '  </div>' +
    document.getElementById("reportSummaryBox").outerHTML +
    document.getElementById("reportDetailsBox").outerHTML +
    document.getElementById("reportNotesBox").outerHTML +
    '</div>';

  executePrint(reportHtml);
};

// 7. Social Share Buttons
document.getElementById("shareWinBtn").onclick = shareWinOnWhatsApp;
document.getElementById("shareReportWhatsAppBtn").onclick = shareReportOnWhatsApp;

// 8. Modals (Premium, Help, Privacy, Backup)
document.getElementById("premiumModalBtn").onclick = function () { document.getElementById("premiumModal").classList.remove("hidden"); };
document.getElementById("closePremiumModalBtn").onclick = function () { document.getElementById("premiumModal").classList.add("hidden"); };
document.getElementById("dismissPremiumModalBtn").onclick = function () { document.getElementById("premiumModal").classList.add("hidden"); };
document.getElementById("footerGoPremiumLink").onclick = function () { document.getElementById("premiumModal").classList.remove("hidden"); };
document.getElementById("premiumModal").onclick = function (e) {
  if (e.target === this) {
    this.classList.add("hidden");
  }
};

document.getElementById("helpModalBtn").onclick = function () { document.getElementById("helpModal").classList.remove("hidden"); };
document.getElementById("closeHelpModalBtn").onclick = function () { document.getElementById("helpModal").classList.add("hidden"); };
document.getElementById("footerHelpLink").onclick = function () { document.getElementById("helpModal").classList.remove("hidden"); };

document.getElementById("footerPrivacyLink").onclick = function () { document.getElementById("privacyModal").classList.remove("hidden"); };
document.getElementById("closePrivacyModalBtn").onclick = function () { document.getElementById("privacyModal").classList.add("hidden"); };
document.getElementById("dismissPrivacyModalBtn").onclick = function () { document.getElementById("privacyModal").classList.add("hidden"); };

document.getElementById("backupModalBtn").onclick = function () { document.getElementById("backupModal").classList.remove("hidden"); };
document.getElementById("closeBackupModalBtn").onclick = function () { document.getElementById("backupModal").classList.add("hidden"); };

document.getElementById("exportJsonBtn").onclick = exportJsonBackup;
document.getElementById("importJsonFile").onchange = function (e) {
  if (e.target.files && e.target.files[0]) {
    importJsonBackup(e.target.files[0]);
  }
};
document.getElementById("wipeAllDataBtn").onclick = wipeAllData;

// WhatsApp Premium Waitlist Notification Action
document.getElementById("notifyPremiumWhatsAppBtn").onclick = function () {
  var url = "https://wa.me/923226817030?text=Hi!%20I%20want%20HomeSteps%20Premium.%20Please%20notify%20me%20at%20launch.";
  window.open(url, "_blank");
};

// Premium Plan Card Selection (Monthly vs Yearly)
var monthlyCard = document.getElementById("premiumMonthlyCard");
var yearlyCard = document.getElementById("premiumYearlyCard");
if (monthlyCard && yearlyCard) {
  monthlyCard.onclick = function () {
    monthlyCard.classList.add("selected");
    yearlyCard.classList.remove("selected");
  };
  yearlyCard.onclick = function () {
    yearlyCard.classList.add("selected");
    monthlyCard.classList.remove("selected");
  };
}

// WhatsApp Support Action
document.getElementById("contactSupportWhatsAppBtn").onclick = function () {
  var text = "Hello Sualeha! I have a question regarding HomeSteps:";
  var url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
};

// Onboarding Dismiss
document.getElementById("dismissOnboardingBtn").onclick = function () {
  document.getElementById("onboardingBanner").classList.add("hidden");
  localStorage.setItem("homesteps_onboarded", "true");
};

if (localStorage.getItem("homesteps_onboarded") !== "true") {
  document.getElementById("onboardingBanner").classList.remove("hidden");
}

// ========================================================
// 9. NEW ENGAGEMENT FEATURES WIRING
// ========================================================

// 1. PWA Install & Offline Service Worker (Requirement 1)
var deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  deferredInstallPrompt = e;
  var installBtn = document.getElementById("pwaInstallBtn");
  if (installBtn) installBtn.classList.remove("hidden");
});

var pwaBtn = document.getElementById("pwaInstallBtn");
if (pwaBtn) {
  pwaBtn.onclick = function () {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then(function (res) {
        if (res.outcome === "accepted") {
          console.log("PWA installed");
        }
        deferredInstallPrompt = null;
        pwaBtn.classList.add("hidden");
      });
    }
  };

  window.addEventListener("appinstalled", function () {
    console.log("PWA was installed");
    pwaBtn.classList.add("hidden");
    deferredInstallPrompt = null;
  });
}

// PWA one-time toast hint
if (!localStorage.getItem("homesteps_pwa_hint_seen")) {
  setTimeout(function () {
    var hint = document.getElementById("pwaToastHint");
    if (hint) {
      hint.classList.remove("hidden");
      setTimeout(function () {
        hint.classList.add("hidden");
        localStorage.setItem("homesteps_pwa_hint_seen", "true");
      }, 7000);
    }
  }, 2000);
}

var dismissPwaToastBtn = document.getElementById("dismissPwaToastBtn");
if (dismissPwaToastBtn) {
  dismissPwaToastBtn.onclick = function () {
    var hint = document.getElementById("pwaToastHint");
    if (hint) hint.classList.add("hidden");
    localStorage.setItem("homesteps_pwa_hint_seen", "true");
  };
}

try {
  if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js").catch(function (err) {
      console.log("Service worker registration skipped:", err);
    });
  }
} catch (e) {}

// 2. Daily Reminder (Opt-in) (Requirement 2)
function initDailyReminder() {
  var toggle = document.getElementById("dailyReminderToggle");
  var timeInput = document.getElementById("dailyReminderTime");
  var container = document.getElementById("reminderTimeContainer");

  var enabled = localStorage.getItem("homesteps_reminder_enabled") === "true";
  var remTime = localStorage.getItem("homesteps_reminder_time") || "20:00";

  if (toggle) toggle.checked = enabled;
  if (timeInput) timeInput.value = remTime;
  if (container) {
    if (enabled) container.classList.remove("hidden");
    else container.classList.add("hidden");
  }

  if (toggle) {
    toggle.onchange = function () {
      var isChecked = toggle.checked;
      localStorage.setItem("homesteps_reminder_enabled", isChecked ? "true" : "false");
      if (container) {
        if (isChecked) container.classList.remove("hidden");
        else container.classList.add("hidden");
      }
      if (isChecked && "Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    };
  }

  if (timeInput) {
    timeInput.onchange = function () {
      localStorage.setItem("homesteps_reminder_time", timeInput.value);
    };
  }

  checkDailyReminderBanner();
}

function checkDailyReminderBanner() {
  var enabled = localStorage.getItem("homesteps_reminder_enabled") === "true";
  if (!enabled) return;

  var remTime = localStorage.getItem("homesteps_reminder_time") || "20:00";
  var parts = remTime.split(":");
  var remHour = parseInt(parts[0], 10);
  var remMin = parseInt(parts[1], 10);

  var now = new Date();
  var curMins = now.getHours() * 60 + now.getMinutes();
  var remMins = remHour * 60 + remMin;

  if (curMins >= remMins) {
    var kid = activeKid();
    if (kid) {
      var today = dateStr(now);
      var rec = getRecord(kid.id, today);
      var done = 0;
      SUBJECTS.forEach(function (s) { if (rec[s.name]) done++; });
      if (done < SUBJECTS.length) {
        var banner = document.getElementById("reminderBanner");
        if (banner) banner.classList.remove("hidden");
      }
    }
  }
}

document.getElementById("goToChecklistBtn").onclick = function () {
  document.getElementById("reminderBanner").classList.add("hidden");
  switchView("tracker");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

document.getElementById("dismissReminderBannerBtn").onclick = function () {
  document.getElementById("reminderBanner").classList.add("hidden");
};

// 3. Undo for Checklist (Requirement 3)
document.getElementById("undoActionBtn").onclick = undoChecklistAction;

window.addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z") && !e.shiftKey) {
    if (lastChecklistAction) {
      e.preventDefault();
      undoChecklistAction();
    }
  }
});

// 4. Batch Print Week Worksheets (Requirement 4)
document.getElementById("batchPrintWeekBtn").onclick = batchPrintWeeksWorksheets;

// 5. Streak Celebration Modal (Requirement 5)
document.getElementById("closeStreakModalBtn").onclick = function () {
  document.getElementById("streakCelebrationModal").classList.add("hidden");
};

document.getElementById("shareStreakWhatsAppBtn").onclick = function () {
  var text = "My child just hit a 7-day learning streak on HomeSteps! 🔥";
  var url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
};

// 6. Monthly Report Controls (Requirement 6)
initReportControls();

// ========================================================
// 7. FIREBASE AUTHENTICATION & APP GATING
// ========================================================
var authMode = "login"; // "login" or "signup"
var isFirebaseInitialized = false;

function initFirebaseAuth() {
  var authScreen = document.getElementById("authScreen");
  var appShell = document.getElementById("mainAppShell");

  if (typeof firebase === "undefined") {
    console.warn("Firebase SDK not loaded.");
    if (authScreen) authScreen.classList.remove("hidden");
    if (appShell) appShell.classList.add("hidden");
    showAuthAlert("Connecting to authentication service... Please verify your internet connection.", "info");
    setupAuthUI();
    return;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    isFirebaseInitialized = true;
  } catch (err) {
    console.warn("Firebase initialization notice:", err);
  }

  setupAuthUI();

  if (isFirebaseInitialized && firebase.auth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // Logged-in users go straight in
        if (authScreen) authScreen.classList.add("hidden");
        if (appShell) appShell.classList.remove("hidden");
        render();
      } else {
        // Not logged in: Show ONLY login screen, hide entire app
        if (authScreen) authScreen.classList.remove("hidden");
        if (appShell) appShell.classList.add("hidden");
      }
    });
  } else {
    // Gated fallback
    if (authScreen) authScreen.classList.remove("hidden");
    if (appShell) appShell.classList.add("hidden");
  }
}

function showAuthAlert(message, type) {
  var alertEl = document.getElementById("authAlert");
  if (!alertEl) return;
  alertEl.textContent = message;
  alertEl.className = "auth-alert " + (type || "error");
  alertEl.classList.remove("hidden");
}

function clearAuthAlert() {
  var alertEl = document.getElementById("authAlert");
  if (!alertEl) return;
  alertEl.textContent = "";
  alertEl.className = "auth-alert hidden";
}

function setupAuthUI() {
  var tabLogin = document.getElementById("authTabLogin");
  var tabSignup = document.getElementById("authTabSignup");
  var submitBtn = document.getElementById("authSubmitBtn");
  var submitText = document.getElementById("authSubmitText");
  var footerHint = document.getElementById("authFooterHint");
  var authForm = document.getElementById("authForm");
  var logoutBtn = document.getElementById("logoutBtn");

  if (tabLogin && tabSignup) {
    tabLogin.onclick = function () {
      authMode = "login";
      tabLogin.classList.add("active");
      tabSignup.classList.remove("active");
      if (submitText) submitText.textContent = "Log In";
      if (footerHint) footerHint.innerHTML = "First time using HomeSteps? Click <strong>Sign Up</strong> above.";
      clearAuthAlert();
    };

    tabSignup.onclick = function () {
      authMode = "signup";
      tabSignup.classList.add("active");
      tabLogin.classList.remove("active");
      if (submitText) submitText.textContent = "Create Account";
      if (footerHint) footerHint.innerHTML = "Already have an account? Click <strong>Log In</strong> above.";
      clearAuthAlert();
    };
  }

  if (authForm) {
    authForm.onsubmit = function (e) {
      if (e && e.preventDefault) e.preventDefault();
      var emailInput = document.getElementById("authEmail");
      var passInput = document.getElementById("authPassword");
      var email = (emailInput ? emailInput.value : "").trim();
      var password = passInput ? passInput.value : "";

      clearAuthAlert();

      if (!email) {
        showAuthAlert("Please enter your email address.", "error");
        if (emailInput) emailInput.focus();
        return false;
      }

      if (!password || password.length < 6) {
        showAuthAlert("Password must be at least 6 characters long.", "error");
        if (passInput) passInput.focus();
        return false;
      }

      if (!isFirebaseInitialized || !firebase.auth) {
        showAuthAlert("Firebase is not initialized. Please ensure your Firebase configuration is added in app.js.", "error");
        return false;
      }

      if (firebaseConfig.apiKey === "YOUR_API_KEY") {
        showAuthAlert("Please paste your Firebase configuration in app.js (firebaseConfig) to enable live authentication.", "info");
        return false;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitText) submitText.textContent = authMode === "login" ? "Logging in..." : "Creating account...";
      }

      var authPromise;
      if (authMode === "login") {
        authPromise = firebase.auth().signInWithEmailAndPassword(email, password);
      } else {
        authPromise = firebase.auth().createUserWithEmailAndPassword(email, password);
      }

      authPromise
        .then(function () {
          clearAuthAlert();
        })
        .catch(function (error) {
          showAuthAlert(getFriendlyErrorMessage(error), "error");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            if (submitText) submitText.textContent = authMode === "login" ? "Log In" : "Create Account";
          }
        });

      return false;
    };
  }

  if (logoutBtn) {
    logoutBtn.onclick = function () {
      if (confirm("Are you sure you want to log out of HomeSteps?")) {
        if (isFirebaseInitialized && firebase.auth) {
          firebase.auth().signOut().catch(function (err) {
            console.error("Sign out error:", err);
          });
        } else {
          var authScreen = document.getElementById("authScreen");
          var appShell = document.getElementById("mainAppShell");
          if (authScreen) authScreen.classList.remove("hidden");
          if (appShell) appShell.classList.add("hidden");
        }
      }
    };
  }
}

function getFriendlyErrorMessage(error) {
  if (!error) return "An error occurred. Please try again.";
  var code = error.code || "";
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again.";
    case "auth/email-already-in-use":
      return "An account already exists with this email address. Please Log In instead.";
    case "auth/weak-password":
      return "Password is too weak. Please choose at least 6 characters.";
    case "auth/network-request-failed":
      return "Network connection error. Please check your internet connection.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please wait a moment and try again.";
    case "auth/invalid-api-key":
    case "auth/api-key-not-valid":
      return "Invalid Firebase API key. Please check your firebaseConfig in app.js.";
    case "auth/operation-not-allowed":
      return "Email/Password sign-in is not enabled in your Firebase console under Authentication > Sign-in method.";
    default:
      return error.message || "Authentication failed. Please try again.";
  }
}

// ---------- Initial Boot ----------
initAccessibility();
initDailyReminder();
updatePresetOptions();
initFirebaseAuth();
render();

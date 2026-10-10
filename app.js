// ========================================================
// HomeSteps — Core Logic (Full English UI)
// "Teach it. Track it. Print it. — All in one place."
// Plain JavaScript, 100% Client-Side, Local-First
// Offline-Ready with LocalStorage & JSON Backup
// ========================================================

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
        { id: "n34_1", title: "Noorani Qaida: Single Letters (ا to خ)", guide: "Pronounce with correct articulation (Makhraj)", presetId: "ur_trace_1", type: "tracing" }
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
        { id: "n45_1", title: "Compound Letters (Murakkabat)", guide: "Practice connected letters with fluency", presetId: "ur_trace_2", type: "tracing" }
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
        { id: "n56_1", title: "Tanween and Jazm Rules", guide: "Learn the Nun sound of Tanween and silent Jazm", presetId: "ur_trace_5", type: "tracing" }
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
        { id: "n67_1", title: "Huroof-e-Maddah (Elongation)", guide: "Stretch the vowel sound to one Alif count", presetId: "ur_trace_6", type: "tracing" }
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
  } else if (currentView === "generator") {
    updateGeneratorKidName();
    renderWorksheetPreview();
  } else if (currentView === "report") {
    renderWeeklyReport();
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

function renderActiveChildBadge() {
  var badge = document.getElementById("activeChildBadge");
  var kid = activeKid();
  if (!kid) {
    badge.innerHTML = "<span>No child added yet. Add a child above to get started.</span>";
    return;
  }
  var starsThisWeek = getWeekStarsCount(kid.id);
  var bandText = kid.ageBand ? "Level: " + kid.ageBand : "Age: " + kid.age;
  badge.innerHTML =
    '<span>👤 <strong>' + kid.name + '</strong> (' + bandText + ')</span>' +
    '<span>⭐ <strong>' + starsThisWeek + '</strong> stars this week</span>';
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
      rec[sub.name] = cb.checked;
      
      var totalDone = 0;
      SUBJECTS.forEach(function (s) { if (rec[s.name]) totalDone++; });
      if (totalDone === SUBJECTS.length) {
        if (!state.stars) state.stars = {};
        state.stars[recordKey(kid.id, today)] = true;
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
  if (subKey === "nazra") subKey = "urdu";

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
      ]}
    ],
    coloring: [
      { id: "en_color_apple", name: "Apple (A for Apple)", word: "APPLE", svg: "apple", prompt: "Color the Apple red and the leaf green!" },
      { id: "en_color_star", name: "Star (Twinkle Star)", word: "STAR", svg: "star", prompt: "Color the star bright golden yellow!" },
      { id: "en_color_car", name: "Car (Beep Beep!)", word: "CAR", svg: "car", prompt: "Color the car your favorite color!" }
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
      { id: "ur_trace_1", name: "Urdu Alphabet: Alif to Say (ا ب پ ت ٹ ث)", letters: ["ا", "ب", "پ", "ت", "ٹ", "ث"], type: "urdu" },
      { id: "ur_trace_2", name: "Urdu Alphabet: Jeem to Khay (ج چ ح خ)", letters: ["ج", "چ", "ح", "خ"], type: "urdu" },
      { id: "ur_trace_3", name: "Urdu Alphabet: Daal to Zay (د ڈ ذ ر ڑ ز ژ)", letters: ["د", "ڈ", "ذ", "ر", "ڑ", "ز"], type: "urdu" },
      { id: "ur_trace_4", name: "Urdu Alphabet: Seen to Zoay (س ش ص ض ط ظ)", letters: ["س", "ش", "ص", "ض", "ط", "ظ"], type: "urdu" },
      { id: "ur_trace_5", name: "Urdu Alphabet: Ain to Gaaf (ع غ ف ق ک گ)", letters: ["ع", "غ", "ف", "ق", "ک", "گ"], type: "urdu" },
      { id: "ur_trace_6", name: "Urdu Alphabet: Laam to Yay (ل م ن و ہ ی)", letters: ["ل", "م", "ن", "و", "ہ", "ی"], type: "urdu" }
    ],
    matching: [
      { id: "ur_match_huroof", name: "Match Urdu Letters (ا ب ج د)", left: ["ا", "ب", "ج", "د"], right: ["ب", "ا", "د", "ج"] }
    ],
    counting: [
      { id: "ur_count_1to5", name: "Counting in Urdu (1 to 5)", items: [
        { icon: "⭐", count: 2, label: "Stars" },
        { icon: "🍎", count: 4, label: "Apples" },
        { icon: "🌸", count: 3, label: "Flowers" }
      ]}
    ],
    coloring: [
      { id: "ur_color_seb", name: "Sayb (Apple / سیب)", word: "سیب", svg: "apple", prompt: "Color the apple red and trace the word!" },
      { id: "ur_color_phool", name: "Phool (Flower / پھول)", word: "پھول", svg: "flower", prompt: "Color the flower nicely and trace the word!" }
    ],
    circle: [
      { id: "ur_circle_huroof", name: "Circle the Target Urdu Letter", questions: [
        { target: "ب", options: ["ت", "پ", "ب", "ث"] },
        { target: "ج", options: ["چ", "ح", "ج", "خ"] }
      ]}
    ],
    fill: [
      { id: "ur_fill_1", name: "Fill in Missing Urdu Letters", bank: ["ب", "ٹ", "چ"], rows: [
        ["ا", "", "پ", "ت"],
        ["", "ث", "ج", ""]
      ]}
    ],
    map: [
      { id: "ur_map_directions", name: "Directions (North, South, East, West)", kind: "compass_ur" }
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
      { id: "math_color_star", name: "Number One Star", word: "ONE 1", svg: "star", prompt: "Color the big number 1 star!" }
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
      { id: "isl_trace_allah", name: "Allah & Muhammad (PBUH) Tracing", letters: ["اللہ", "محمد"], type: "urdu" },
      { id: "isl_trace_bismillah", name: "Bismillah Tracing (بِسْمِ اللَّهِ)", letters: ["بِسْمِ اللَّهِ"], type: "urdu" }
    ],
    matching: [
      { id: "isl_match_basics", name: "Islamic Knowledge Matching", left: ["Quran", "Kaabah", "Masjid"], right: ["Makkah", "Book of Allah", "Place of Salah"] }
    ],
    counting: [
      { id: "isl_count_pillars", name: "Five Pillars of Islam", items: [
        { icon: "🕌", count: 5, label: "Daily Prayers (5)" },
        { icon: "🕋", count: 1, label: "One Kaabah (1)" }
      ]}
    ],
    coloring: [
      { id: "isl_color_masjid", name: "Masjid / Mosque", word: "MASJID", svg: "masjid", prompt: "Color the dome and minarets beautifully!" },
      { id: "isl_color_moon", name: "Crescent & Star", word: "CRESCENT", svg: "crescent", prompt: "Color the crescent moon and star!" }
    ],
    circle: [
      { id: "isl_circle_basics", name: "Circle the Correct Islamic Answer", questions: [
        { target: "How many Gods?", options: ["1", "2", "3"] }
      ]}
    ],
    fill: [
      { id: "isl_fill_kalima", name: "First Kalima Tayyaba", bank: ["Allah", "Rasool"], rows: [
        ["La ilaha illa", "", "Muhammadur", "", "Allah"]
      ]}
    ],
    map: [
      { id: "isl_map_makkah", name: "Qibla Direction Compass", kind: "compass" }
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
      { id: "sci_color_flower", name: "Parts of a Flower", word: "FLOWER", svg: "flower", prompt: "Color petal, stem and leaf with natural colors!" },
      { id: "sci_color_moon", name: "Night Sky Crescent", word: "NIGHT SKY", svg: "crescent", prompt: "Color sky deep blue and moon yellow!" }
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
        ["Twinkling in sky are", ""]
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
      { id: "soc_family", name: "My Family Words", left: ["Ammi", "Abu", "Bhai", "Behn"], right: ["Mother", "Father", "Brother", "Sister"] },
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
      { id: "act_color_flower", name: "Beautiful Flower", word: "FLOWER", svg: "flower", prompt: "Color petals with rainbow colors!" }
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

var COLORING_SVGS = {
  apple: '<svg viewBox="0 0 200 200" width="180" height="180"><path d="M100 45 C95 25 115 15 125 20 C120 35 105 45 100 45 Z" fill="#fff" stroke="#000" stroke-width="4"/><path d="M100 50 C100 30 105 20 110 15" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/><path d="M100 55 C80 35 30 50 30 105 C30 160 80 185 100 185 C120 185 170 160 170 105 C170 50 120 35 100 55 Z" fill="#fff" stroke="#000" stroke-width="5"/></svg>',
  star: '<svg viewBox="0 0 200 200" width="180" height="180"><polygon points="100,15 125,75 190,75 138,115 158,175 100,135 42,175 62,115 10,75 75,75" fill="#fff" stroke="#000" stroke-width="5" stroke-linejoin="round"/></svg>',
  car: '<svg viewBox="0 0 240 140" width="220" height="130"><path d="M20 90 L40 50 L90 40 L160 40 L190 70 L220 70 C225 70 230 75 230 85 L230 105 L210 105 C210 95 195 95 195 105 L75 105 C75 95 60 95 60 105 L20 105 Z" fill="#fff" stroke="#000" stroke-width="5"/><circle cx="68" cy="105" r="16" fill="#fff" stroke="#000" stroke-width="5"/><circle cx="202" cy="105" r="16" fill="#fff" stroke="#000" stroke-width="5"/><path d="M95 48 L155 48 L155 70 L80 70 Z" fill="#fff" stroke="#000" stroke-width="3"/></svg>',
  flower: '<svg viewBox="0 0 200 200" width="180" height="180"><circle cx="100" cy="60" r="28" fill="#fff" stroke="#000" stroke-width="4"/><circle cx="140" cy="100" r="28" fill="#fff" stroke="#000" stroke-width="4"/><circle cx="100" cy="140" r="28" fill="#fff" stroke="#000" stroke-width="4"/><circle cx="60" cy="100" r="28" fill="#fff" stroke="#000" stroke-width="4"/><circle cx="100" cy="100" r="24" fill="#fff" stroke="#000" stroke-width="5"/><path d="M100 168 L100 200" stroke="#000" stroke-width="6"/><path d="M100 180 C120 170 135 185 135 185 C135 185 120 195 100 185" fill="#fff" stroke="#000" stroke-width="3"/></svg>',
  masjid: '<svg viewBox="0 0 240 200" width="210" height="180"><path d="M70 120 C70 70 120 40 120 40 C120 40 170 70 170 120 Z" fill="#fff" stroke="#000" stroke-width="4"/><circle cx="120" cy="30" r="6" fill="#fff" stroke="#000" stroke-width="3"/><path d="M116 24 C116 16 124 16 124 24" fill="none" stroke="#000" stroke-width="3"/><rect x="60" y="120" width="120" height="70" fill="#fff" stroke="#000" stroke-width="4"/><path d="M100 190 C100 155 140 155 140 190 Z" fill="#fff" stroke="#000" stroke-width="4"/><rect x="30" y="70" width="25" height="120" fill="#fff" stroke="#000" stroke-width="4"/><path d="M30 70 L42 45 L55 70 Z" fill="#fff" stroke="#000" stroke-width="4"/><rect x="185" y="70" width="25" height="120" fill="#fff" stroke="#000" stroke-width="4"/><path d="M185 70 L197 45 L210 70 Z" fill="#fff" stroke="#000" stroke-width="4"/></svg>',
  crescent: '<svg viewBox="0 0 200 200" width="180" height="180"><path d="M120 30 C70 30 35 75 35 125 C35 175 80 190 125 190 C90 175 75 140 75 110 C75 70 100 45 120 30 Z" fill="#fff" stroke="#000" stroke-width="5"/><polygon points="150,55 158,75 178,75 162,88 168,108 150,95 132,108 138,88 122,75 142,75" fill="#fff" stroke="#000" stroke-width="4"/></svg>'
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

function buildWorksheetHTML(sub, typ, preset, kidName, wsDate) {
  var isUrdu = (sub === "urdu" || sub === "islamiat");
  var title = preset ? preset.name : "Practice Worksheet";
  var urduTitle = isUrdu ? "مشق شیٹ" : "";

  var instructions = {
    tracing: {
      en: "Trace carefully along the dotted lines with a pencil.",
      ur: "نقطوں پر پنسل چلائیں اور بار بار لکھیں۔"
    },
    matching: {
      en: "Draw a straight line to match the correct pairs.",
      ur: "لکیر لگا کر صحیح جوڑے ملائیں۔"
    },
    counting: {
      en: "Count the objects in each box and write the number in the square.",
      ur: "چیزیں گنیں اور خالی ڈبے میں درست ہندسہ لکھیں۔"
    },
    coloring: {
      en: preset && preset.prompt ? preset.prompt : "Color neatly inside the lines and trace the word.",
      ur: "خوبصورت رنگ بھریں اور نیچے دیے گئے لفظ کو ٹریس کریں۔"
    },
    circle: {
      en: "Look at the target and circle the correct matching answer.",
      ur: "پہلے حرف/نمبر کو دیکھ کر صحیح جواب پر گول دائرہ لگائیں۔"
    },
    fill: {
      en: "Use the word bank to fill in the missing blanks.",
      ur: "اوپر دیے گئے خانے کی مدد سے خالی جگہ پُر کریں۔"
    },
    map: {
      en: "Look at the diagram, color neatly and label each province or direction in the blank box.",
      ur: "نقشہ دیکھیں، رنگ بھریں اور خالی خانے میں صوبے کا نام لکھیں۔"
    }
  };

  var inst = instructions[typ] || { en: "Complete the exercises below.", ur: "نیچے دی گئی مشق مکمل کریں۔" };

  var out = '<div class="ws-container">';

  // 1. Header (HomeSteps Branding)
  out += '  <div class="ws-header">';
  out += '    <div class="ws-brand-row">';
  out += '      <span>🌱 HomeSteps Homeschool</span>';
  out += '      <span>Ages 3–7 • Bilingual</span>';
  out += '    </div>';
  out += '    <div class="ws-title-row">';
  out += '      <div class="ws-title">' + title + '</div>';
  if (urduTitle) {
    out += '      <div class="ws-title-urdu">' + urduTitle + '</div>';
  }
  out += '    </div>';
  out += '    <div class="ws-meta-bar">';
  out += '      <div class="ws-meta-item"><span>Name:</span> <span class="ws-meta-fill">' + kidName + '</span></div>';
  out += '      <div class="ws-meta-item"><span>Date:</span> <span class="ws-meta-fill">' + wsDate + '</span></div>';
  out += '      <div class="ws-meta-item"><span>Score:</span> <span>⭐ ⭐ ⭐</span></div>';
  out += '    </div>';
  out += '  </div>';

  // 2. Instructions
  out += '  <div class="ws-instructions">';
  out += '    <span class="ws-inst-en">✏️ ' + inst.en + '</span>';
  out += '    <span class="ws-inst-ur">' + inst.ur + '</span>';
  out += '  </div>';

  // 3. Body
  out += '  <div class="ws-body">';

  if (typ === "tracing") {
    out += buildTracingBody(preset);
  } else if (typ === "counting") {
    out += buildCountingBody(preset);
  } else if (typ === "matching") {
    out += buildMatchingBody(preset);
  } else if (typ === "coloring") {
    out += buildColoringBody(preset);
  } else if (typ === "circle") {
    out += buildCircleBody(preset);
  } else if (typ === "fill") {
    out += buildFillBody(preset);
  } else if (typ === "map") {
    out += buildMapLabelingBody(preset);
  }

  out += '  </div>';
  out += '</div>';

  return out;
}

function buildTracingBody(preset) {
  var letters = (preset && preset.letters) || ["A", "B", "C", "D"];
  var isUrdu = preset && preset.type === "urdu";
  var html = '<div class="tracing-grid">';

  letters.forEach(function (char) {
    html += '<div class="trace-card">';
    html += '  <div class="trace-letter-big' + (isUrdu ? ' trace-letter-urdu' : '') + '">' + char + '</div>';
    html += '  <div class="trace-lines-box"></div>';
    html += '  <div class="trace-lines-box"></div>';
    html += '</div>';
  });

  html += '</div>';
  return html;
}

function buildCountingBody(preset) {
  var items = (preset && preset.items) || [
    { icon: "🍎", count: 3, label: "Apples" },
    { icon: "⭐", count: 5, label: "Stars" },
    { icon: "🎈", count: 2, label: "Balloons" },
    { icon: "🌸", count: 4, label: "Flowers" }
  ];

  var html = '<div class="counting-list">';
  items.forEach(function (it) {
    html += '<div class="counting-row">';
    html += '  <div class="counting-objects">';
    for (var i = 0; i < it.count; i++) {
      html += '<span>' + it.icon + '</span>';
    }
    html += '  </div>';
    html += '  <div class="counting-answer-box">?</div>';
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function buildMatchingBody(preset) {
  var left = (preset && preset.left) || ["A", "B", "C", "D"];
  var right = (preset && preset.right) || ["c", "a", "d", "b"];

  var html = '<div class="matching-container">';
  html += '<div class="matching-column">';
  left.forEach(function (item) {
    html += '<div class="match-item left">' + item + '</div>';
  });
  html += '</div>';

  html += '<div class="matching-column">';
  right.forEach(function (item) {
    html += '<div class="match-item right">' + item + '</div>';
  });
  html += '</div>';
  html += '</div>';
  return html;
}

function buildColoringBody(preset) {
  var svgKey = (preset && preset.svg) || "apple";
  var svgCode = COLORING_SVGS[svgKey] || COLORING_SVGS.apple;
  var word = (preset && preset.word) || "COLOR";
  var isUrdu = word.match(/[\u0600-\u06FF]/);

  var html = '<div class="coloring-container">';
  html += '  <div class="coloring-art-box">' + svgCode + '</div>';
  html += '  <div>';
  html += '    <div class="coloring-word-trace' + (isUrdu ? ' coloring-word-urdu' : '') + '">' + word + '</div>';
  html += '  </div>';
  html += '</div>';
  return html;
}

function buildCircleBody(preset) {
  var questions = (preset && preset.questions) || [
    { target: "B", options: ["D", "B", "P", "R"] },
    { target: "5", options: ["2", "5", "8", "3"] }
  ];

  var html = '<div class="circle-list">';
  questions.forEach(function (q) {
    html += '<div class="circle-row">';
    html += '  <div class="circle-target">' + q.target + '</div>';
    html += '  <div class="circle-options">';
    q.options.forEach(function (opt) {
      html += '    <div class="circle-choice">' + opt + '</div>';
    });
    html += '  </div>';
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function buildFillBody(preset) {
  var bank = (preset && preset.bank) || ["A", "B", "C"];
  var rows = (preset && preset.rows) || [["A", "", "C"]];

  var html = '<div class="fill-container">';
  html += '<div class="fill-wordbank">';
  html += '  <span class="wordbank-label">📦 Word Bank:</span> ';
  bank.forEach(function (b) {
    html += '  <strong style="margin: 0 8px; font-size: 1.15rem;">' + b + '</strong>';
  });
  html += '</div>';

  html += '<div class="fill-sequences">';
  rows.forEach(function (row) {
    html += '<div class="fill-row">';
    row.forEach(function (cell) {
      if (cell === "") {
        html += '<div class="fill-cell blank">?</div>';
      } else {
        html += '<div class="fill-cell">' + cell + '</div>';
      }
    });
    html += '</div>';
  });
  html += '</div>';
  html += '</div>';
  return html;
}

function buildMapLabelingBody(preset) {
  var kind = (preset && preset.kind) || "pak_provinces";
  var html = '<div class="map-worksheet-box">';

  if (kind === "pak_flag") {
    html += '<div class="map-svg-container">';
    html += '  <svg viewBox="0 0 240 160" width="220" height="150" style="border: 2px solid #000; border-radius: 6px;">';
    html += '    <rect x="0" y="0" width="60" height="160" fill="#fff" stroke="#000" stroke-width="2"/>';
    html += '    <rect x="60" y="0" width="180" height="160" fill="#fff" stroke="#000" stroke-width="2"/>';
    html += '    <path d="M165 50 C140 50 125 70 125 90 C125 110 140 130 165 130 C150 120 140 105 140 90 C140 75 150 60 165 50 Z" fill="#fff" stroke="#000" stroke-width="3"/>';
    html += '    <polygon points="175,70 180,82 192,82 182,90 186,102 175,94 164,102 168,90 158,82 170,82" fill="#fff" stroke="#000" stroke-width="2"/>';
    html += '  </svg>';
    html += '</div>';
    html += '<div class="fill-wordbank"><span class="wordbank-label">📦 Word Bank:</span> <strong>White Stripe</strong> • <strong>Green Field</strong> • <strong>Crescent Moon</strong> • <strong>Five-pointed Star</strong></div>';
    html += '<div class="map-labels-grid">';
    html += '  <div class="map-label-target-card"><span class="map-target-title">1. Left vertical stripe:</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">2. Main background field:</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">3. Moon symbol:</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">4. Star symbol:</span><div class="map-blank-input-box"></div></div>';
    html += '</div>';
  } else if (kind === "compass" || kind === "compass_ur") {
    html += '<div class="map-svg-container">';
    html += '  <svg viewBox="0 0 200 200" width="180" height="180">';
    html += '    <circle cx="100" cy="100" r="80" fill="#fff" stroke="#000" stroke-width="4"/>';
    html += '    <line x1="100" y1="20" x2="100" y2="180" stroke="#000" stroke-width="3"/>';
    html += '    <line x1="20" y1="100" x2="180" y2="100" stroke="#000" stroke-width="3"/>';
    html += '    <polygon points="100,25 108,80 100,70 92,80" fill="#000"/>';
    html += '    <text x="94" y="20" font-weight="bold" font-size="16">N</text>';
    html += '    <text x="94" y="196" font-weight="bold" font-size="16">S</text>';
    html += '    <text x="184" y="105" font-weight="bold" font-size="16">E</text>';
    html += '    <text x="6" y="105" font-weight="bold" font-size="16">W</text>';
    html += '  </svg>';
    html += '</div>';
    html += '<div class="fill-wordbank"><span class="wordbank-label">📦 Word Bank:</span> <strong>North</strong> • <strong>South</strong> • <strong>East</strong> • <strong>West</strong></div>';
    html += '<div class="map-labels-grid">';
    html += '  <div class="map-label-target-card"><span class="map-target-title">Top Direction (N):</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">Bottom Direction (S):</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">Right Direction (E):</span><div class="map-blank-input-box"></div></div>';
    html += '  <div class="map-label-target-card"><span class="map-target-title">Left Direction (W):</span><div class="map-blank-input-box"></div></div>';
    html += '</div>';
  } else {
    html += '<div class="map-svg-container">';
    html += '  <svg viewBox="0 0 280 220" width="260" height="200" style="border: 2px solid #000; border-radius: 8px; background: #FAF9F6;">';
    html += '    <path d="M70 140 L120 130 L100 190 L40 180 Z" fill="#fff" stroke="#000" stroke-width="2" title="Balochistan"/>';
    html += '    <path d="M120 130 L170 120 L150 185 L100 190 Z" fill="#fff" stroke="#000" stroke-width="2" title="Sindh"/>';
    html += '    <path d="M120 70 L190 70 L170 120 L120 130 Z" fill="#fff" stroke="#000" stroke-width="2" title="Punjab"/>';
    html += '    <path d="M75 60 L120 70 L110 120 L65 100 Z" fill="#fff" stroke="#000" stroke-width="2" title="KPK"/>';
    html += '    <path d="M140 25 L210 30 L190 70 L125 65 Z" fill="#fff" stroke="#000" stroke-width="2" title="GB & Kashmir"/>';
    html += '    <text x="60" y="160" font-size="12" font-weight="bold">1</text>';
    html += '    <text x="135" y="160" font-size="12" font-weight="bold">2</text>';
    html += '    <text x="150" y="100" font-size="12" font-weight="bold">3</text>';
    html += '    <text x="85" y="85" font-size="12" font-weight="bold">4</text>';
    html += '    <text x="165" y="45" font-size="12" font-weight="bold">5</text>';
    html += '  </svg>';
    html += '</div>';
    html += '<div class="fill-wordbank"><span class="wordbank-label">📦 Word Bank:</span> <strong>Punjab</strong> • <strong>Sindh</strong> • <strong>Khyber Pakhtunkhwa</strong> • <strong>Balochistan</strong> • <strong>Gilgit-Baltistan</strong></div>';
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

// ---------- Initial Boot ----------
initAccessibility();
updatePresetOptions();
render();

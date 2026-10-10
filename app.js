// ========================================================
// SeekhoTrack — Complete Application Logic (v1 + v1.x + v2)
// Plain JavaScript, 100% Client-Side & Offline-Ready
// Database: Browser localStorage
// ========================================================

// ---------- Constants ----------
var SUBJECTS = [
  { name: "Reading", icon: "📖" },
  { name: "Writing", icon: "✍️" },
  { name: "Math/Counting", icon: "🔢" },
  { name: "Urdu", icon: "🇵🇰" },
  { name: "Islamiat", icon: "🌙" },
  { name: "Nazra", icon: "📖" },       // Added 10 Oct per PRD!
  { name: "Activity", icon: "🎨" }
];

var STORE_KEY = "seekhotrack_v1";

// ---------- State Initialization ----------
// state structure: {
//   kids: [{ id, name, age }],
//   records: { "kidId_YYYY-MM-DD": { "Reading": true, ... } },
//   notes: { "kidId_YYYY-MM-DD": "Note text" },
//   stars: { "kidId_YYYY-MM-DD": true },
//   activeKidId: "kidId"
// }
var state = loadState();

// First-time setup: pre-add Ahmed (4) and Hafsa (3) per PRD
if (!state.kids || state.kids.length === 0) {
  state.kids = [
    { id: makeId(), name: "Ahmed", age: 4 },
    { id: makeId(), name: "Hafsa", age: 3 }
  ];
  state.activeKidId = state.kids[0].id;
  saveState();
}

// Current active view: "tracker" | "generator" | "report"
var currentView = "tracker";

// ---------- Helpers ----------
function makeId() {
  return "k" + Date.now().toString(36) + Math.floor(Math.random() * 1000);
}

// Format Date as YYYY-MM-DD in local time
function dateStr(d) {
  var y = d.getFullYear();
  var m = ("0" + (d.getMonth() + 1)).slice(-2);
  var day = ("0" + d.getDate()).slice(-2);
  return y + "-" + m + "-" + day;
}

// Format friendly date like "Saturday, 10 Oct 2026"
function friendlyDate(d) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
}

function loadState() {
  try {
    var raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (!parsed.kids) parsed.kids = [];
      if (!parsed.records) parsed.records = {};
      if (!parsed.notes) parsed.notes = {};
      if (!parsed.stars) parsed.stars = {};
      return parsed;
    }
  } catch (e) {
    console.error("Failed to load state, starting fresh", e);
  }
  return { kids: [], records: {}, notes: {}, stars: {}, activeKidId: null };
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
  // Default to first kid if active ID not found
  state.activeKidId = state.kids[0].id;
  return state.kids[0];
}

// Get Monday of current week
function getMonday(d) {
  var date = new Date(d);
  var day = (date.getDay() + 6) % 7; // Monday = 0
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

// Count stars earned in the current week for a kid
function getWeekStarsCount(kidId) {
  var count = 0;
  var mon = getMonday(new Date());
  for (var i = 0; i < 7; i++) {
    var cur = new Date(mon);
    cur.setDate(mon.getDate() + i);
    var ds = dateStr(cur);
    if (isStarAwarded(kidId, ds)) {
      count++;
    }
  }
  return count;
}


// ========================================================
// RENDERERS (UI Synchronization)
// ========================================================
function render() {
  renderTabs();
  renderActiveChildBadge();

  if (currentView === "tracker") {
    renderChecklist();
    renderDailyNote();
    renderWeek();
  } else if (currentView === "generator") {
    updateGeneratorKidName();
    renderWorksheetPreview();
  } else if (currentView === "report") {
    renderWeeklyReport();
  }
}

// ---------- Kid Tabs & Badge ----------
function renderTabs() {
  var nav = document.getElementById("kidTabs");
  nav.innerHTML = "";

  state.kids.forEach(function (kid) {
    var btn = document.createElement("button");
    btn.className = "tab" + (kid.id === state.activeKidId ? " active" : "");
    btn.innerHTML = '<span>' + kid.name + '</span> <span class="x" title="Delete">×</span>';

    // Switch kid tab
    btn.onclick = function () {
      state.activeKidId = kid.id;
      saveState();
      render();
    };

    // Remove kid tab
    btn.querySelector(".x").onclick = function (ev) {
      ev.stopPropagation();
      if (confirm(kid.name + " ko remove karna chahte hain? Inka record delete ho jayega.")) {
        state.kids = state.kids.filter(function (k) { return k.id !== kid.id; });
        Object.keys(state.records).forEach(function (k) {
          if (k.indexOf(kid.id + "_") === 0) delete state.records[k];
        });
        if (state.notes) {
          Object.keys(state.notes).forEach(function (k) {
            if (k.indexOf(kid.id + "_") === 0) delete state.notes[k];
          });
        }
        if (state.stars) {
          Object.keys(state.stars).forEach(function (k) {
            if (k.indexOf(kid.id + "_") === 0) delete state.stars[k];
          });
        }
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
    badge.innerHTML = "<span>Koi bacha add nahi hai. Upar se bacha add karein.</span>";
    return;
  }
  var starsThisWeek = getWeekStarsCount(kid.id);
  badge.innerHTML =
    '<span>👤 <strong>' + kid.name + '</strong> (Umar: ' + kid.age + ' saal)</span>' +
    '<span>⭐ <strong>' + starsThisWeek + '</strong> stars this week</span>';
}


// ---------- VIEW 1: DAILY TRACKER ----------
function renderChecklist() {
  var box = document.getElementById("checklist");
  var kid = activeKid();
  var todayObj = new Date();
  var today = dateStr(todayObj);
  document.getElementById("todayDate").textContent = friendlyDate(todayObj);

  box.innerHTML = "";

  if (!kid) {
    box.innerHTML = '<p class="empty-msg">Upar se pehle bache ka naam add karein! 👆</p>';
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
      
      // Auto-award star if all 7 subjects completed today!
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

  // Clickable to award/unaward star manually
  pill.onclick = function () {
    var newState = toggleStarAward(kidId, today);
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
// VIEW 2: PRINTABLE GENERATOR (v2 CORE)
// ========================================================

// Rich Library of Educational Presets per Subject and Type
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
        { target: "S", options: ["C", "S", "Z", "O"] },
        { target: "A", options: ["V", "A", "H", "K"] }
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
        ["B", "", "T (Bat)"],
        ["P", "", "N (Pen)"]
      ]}
    ]
  },

  urdu: {
    tracing: [
      { id: "ur_trace_1", name: "حروفِ تہجی: ا ب پ ت ٹ ث", letters: ["ا", "ب", "پ", "ت", "ٹ", "ث"], type: "urdu" },
      { id: "ur_trace_2", name: "حروفِ تہجی: ج چ ح خ", letters: ["ج", "چ", "ح", "خ"], type: "urdu" },
      { id: "ur_trace_3", name: "حروفِ تہجی: د ڈ ذ ر ڑ ز ژ", letters: ["د", "ڈ", "ذ", "ر", "ڑ", "ز"], type: "urdu" },
      { id: "ur_trace_4", name: "حروفِ تہجی: س ش ص ض ط ظ", letters: ["س", "ش", "ص", "ض", "ط", "ظ"], type: "urdu" },
      { id: "ur_trace_5", name: "حروفِ تہجی: ع غ ف ق ک گ", letters: ["ع", "غ", "ف", "ق", "ک", "گ"], type: "urdu" },
      { id: "ur_trace_6", name: "حروفِ تہجی: ل م ن و ہ ی", letters: ["ل", "م", "ن", "و", "ہ", "ی"], type: "urdu" }
    ],
    matching: [
      { id: "ur_match_huroof", name: "حروف کو حروف سے ملائیں", left: ["ا", "ب", "ج", "د"], right: ["ب", "ا", "د", "ج"] },
      { id: "ur_match_alif_bey", name: "حروف کی پہچان (ت ث ر ز)", left: ["ت", "ث", "ر", "ز"], right: ["ث", "ت", "ز", "ر"] }
    ],
    counting: [
      { id: "ur_count_1to5", name: "گنتی: ۱ سے ۵ تک", items: [
        { icon: "⭐", count: 2, label: "ستارے" },
        { icon: "🍎", count: 4, label: "سیب" },
        { icon: "🌸", count: 3, label: "پھول" },
        { icon: "🎈", count: 5, label: "غبارے" }
      ]}
    ],
    coloring: [
      { id: "ur_color_seb", name: "سیب (س سے سیب)", word: "سیب", svg: "apple", prompt: "سیب میں لال رنگ بھریں اور لفظ ٹریس کریں" },
      { id: "ur_color_phool", name: "پھول (پ سے پھول)", word: "پھول", svg: "flower", prompt: "پھول میں خوبصورت رنگ بھریں" }
    ],
    circle: [
      { id: "ur_circle_huroof", name: "صحیح حرف پر دائرہ لگائیں", questions: [
        { target: "ب", options: ["ت", "پ", "ب", "ث"] },
        { target: "ج", options: ["چ", "ح", "ج", "خ"] },
        { target: "د", options: ["ڈ", "د", "ذ", "ر"] },
        { target: "س", options: ["ش", "ص", "س", "ض"] }
      ]}
    ],
    fill: [
      { id: "ur_fill_1", name: "خالی جگہ پُر کریں (ا سے خ)", bank: ["ب", "ٹ", "چ", "خ"], rows: [
        ["ا", "", "پ", "ت"],
        ["", "ث", "ج", ""],
        ["ح", ""]
      ]}
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
        { icon: "🐱", count: 1, label: "Cat" },
        { icon: "🎈", count: 5, label: "Balloons" }
      ]},
      { id: "math_count_6to10", name: "Count Objects (6 to 10)", items: [
        { icon: "✏️", count: 6, label: "Pencils" },
        { icon: "🐟", count: 8, label: "Fishes" },
        { icon: "🌸", count: 7, label: "Flowers" },
        { icon: "🍬", count: 10, label: "Candies" }
      ]}
    ],
    matching: [
      { id: "math_match_count", name: "Count to Numbers", left: ["⭐⭐", "⭐⭐⭐⭐", "⭐", "⭐⭐⭐"], right: ["4", "1", "3", "2"] }
    ],
    coloring: [
      { id: "math_color_star", name: "Number One Star", word: "ONE 1", svg: "star", prompt: "Color the big number 1 star!" }
    ],
    circle: [
      { id: "math_circle_num", name: "Circle the Target Number", questions: [
        { target: "3", options: ["1", "3", "5", "8"] },
        { target: "7", options: ["4", "2", "7", "9"] },
        { target: "5", options: ["2", "5", "6", "3"] },
        { target: "9", options: ["6", "9", "8", "0"] }
      ]}
    ],
    fill: [
      { id: "math_fill_1to10", name: "Missing Numbers 1 to 10", bank: ["3", "6", "9"], rows: [
        ["1", "2", "", "4", "5"],
        ["", "7", "8", "", "10"]
      ]}
    ]
  },

  islamiat: {
    tracing: [
      { id: "isl_trace_allah", name: "اللہ (Allah) & محمد ﷺ", letters: ["اللہ", "محمد"], type: "urdu" },
      { id: "isl_trace_bismillah", name: "بِسْمِ اللَّهِ", letters: ["بِسْمِ اللَّهِ"], type: "urdu" }
    ],
    matching: [
      { id: "isl_match_basics", name: "اسلامی معلومات ملائیں", left: ["قرآن", "کعبہ", "مسجد", "رمضان"], right: ["مکہ مکرمہ", "اللہ کی کتاب", "روزہ", "نماز کی جگہ"] }
    ],
    counting: [
      { id: "isl_count_pillars", name: "ارکانِ اسلام (Pillars of Islam)", items: [
        { icon: "🕌", count: 5, label: "روزانہ کی نمازیں (5)" },
        { icon: "🕋", count: 1, label: "ایک کعبہ (1)" },
        { icon: "🌙", count: 2, label: "سال کی عیدیں (2)" }
      ]}
    ],
    coloring: [
      { id: "isl_color_masjid", name: "مسجد (Masjid)", word: "مسجد", svg: "masjid", prompt: "مسجد کے میناروں اور گنبد میں خوبصورت رنگ بھریں" },
      { id: "isl_color_moon", name: "چاند تارا (Crescent & Star)", word: "چاند تارا", svg: "crescent", prompt: "چاند اور ستارے میں پیارا سا رنگ بھریں" }
    ],
    circle: [
      { id: "isl_circle_basics", name: "صحیح اسلامی جواب پر دائرہ لگائیں", questions: [
        { target: "اللہ کتنے ہیں؟", options: ["1", "2", "3"] },
        { target: "ہمارے نبی کا نام؟", options: ["محمد ﷺ", "علی", "احمد"] }
      ]}
    ],
    fill: [
      { id: "isl_fill_kalima", name: "پہلا کلمہ", bank: ["اللہ", "رسولُ"], rows: [
        ["لَا إِلٰهَ إِلَّا", "", "مُحَمَّدٌ", "", "اللَّهِ"]
      ]}
    ]
  },

  activity: {
    tracing: [
      { id: "act_trace_shapes", name: "Shapes Tracing (Circle, Square, Triangle)", letters: ["◯", "▢", "△", "⭐"], type: "math" }
    ],
    matching: [
      { id: "act_match_animals", name: "Animals to Sounds", left: ["🐱 Cat", "🐶 Dog", "🐮 Cow", "🦁 Lion"], right: ["Moo", "Meow", "Roar", "Woof"] }
    ],
    counting: [
      { id: "act_count_party", name: "Fun Party Counting", items: [
        { icon: "🎈", count: 4, label: "Balloons" },
        { icon: "🍰", count: 3, label: "Cakes" },
        { icon: "🎁", count: 5, label: "Gifts" },
        { icon: "🍭", count: 2, label: "Lollipops" }
      ]}
    ],
    coloring: [
      { id: "act_color_flower", name: "Beautiful Flower", word: "FLOWER", svg: "flower", prompt: "Color petals with rainbow colors!" },
      { id: "act_color_car", name: "Fast Sports Car", word: "CAR", svg: "car", prompt: "Make the car super shiny!" }
    ],
    circle: [
      { id: "act_circle_odd", name: "Odd One Out", questions: [
        { target: "Different One", options: ["🍎", "🍎", "⭐", "🍎"] },
        { target: "Different One", options: ["🐱", "🐶", "🐱", "🐱"] }
      ]}
    ],
    fill: [
      { id: "act_fill_patterns", name: "Shape Patterns", bank: ["⭐", "◯", "▢"], rows: [
        ["⭐", "◯", "⭐", ""],
        ["▢", "▢", "△", ""]
      ]}
    ]
  }
};

// Clean vector outlines for coloring worksheets
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
    // Fallback if combination has no custom presets
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
  
  // Find selected preset object
  var list = (WORKSHEET_PRESETS[sub] && WORKSHEET_PRESETS[sub][typ]) || [];
  var preset = list.find(function (p) { return p.id === presetId; }) || list[0];

  var html = buildWorksheetHTML(sub, typ, preset, kidName, wsDate);
  displayBox.innerHTML = html;
}

// Generate the complete A4 worksheet document structure
function buildWorksheetHTML(sub, typ, preset, kidName, wsDate) {
  var isUrdu = (sub === "urdu" || sub === "islamiat");
  var title = preset ? preset.name : "Practice Worksheet";
  var urduTitle = isUrdu ? "مشق شیٹ (پریکٹس ورک شیٹ)" : "";

  // English & Urdu instruction pairs
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
    }
  };

  var inst = instructions[typ] || { en: "Complete the exercises below.", ur: "نیچے دی گئی مشق مکمل کریں۔" };

  var out = '<div class="ws-container">';

  // 1. HEADER
  out += '  <div class="ws-header">';
  out += '    <div class="ws-brand-row">';
  out += '      <span>🌱 SeekhoTrack Homeschool</span>';
  out += '      <span>Level: Ages 3–6</span>';
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

  // 2. INSTRUCTIONS
  out += '  <div class="ws-instructions">';
  out += '    <span class="ws-inst-en">✏️ ' + inst.en + '</span>';
  out += '    <span class="ws-inst-ur">' + inst.ur + '</span>';
  out += '  </div>';

  // 3. BODY (Per Type)
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
  }

  out += '  </div>'; // End ws-body
  out += '</div>';   // End ws-container

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
  
  // Word bank
  html += '<div class="fill-wordbank">';
  html += '  <span class="wordbank-label">📦 Word Bank:</span> ';
  bank.forEach(function (b) {
    html += '  <strong style="margin: 0 8px; font-size: 1.2rem;">' + b + '</strong>';
  });
  html += '</div>';

  // Sequences
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


// ========================================================
// VIEW 3: WEEKLY REPORT
// ========================================================
function renderWeeklyReport() {
  var kid = activeKid();
  var summaryBox = document.getElementById("reportSummaryBox");
  var detailsBox = document.getElementById("reportDetailsBox");
  var notesBox = document.getElementById("reportNotesBox");
  var dateRange = document.getElementById("reportDateRange");

  if (!kid) {
    summaryBox.innerHTML = '<p class="empty-msg">Koi bacha active nahi hai.</p>';
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

  // Table setup
  var tableHtml = '<table class="report-table"><thead><tr><th>Mazmoon (Subject)</th>';
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

  // Build Table Rows
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

  // Summary Stat Cards
  summaryBox.innerHTML =
    '<div class="report-stat-card">' +
    '  <div class="report-stat-value">' + totalDone + ' / ' + totalPossible + '</div>' +
    '  <div class="report-stat-label">Tasks Done (' + overallPct + '%)</div>' +
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

  // Notes List
  if (weeklyNotes.length > 0) {
    var notesHtml = '<h3 style="margin-bottom:8px; font-size:1.05rem;">📝 Hafte Ke Notes:</h3>';
    weeklyNotes.forEach(function (item) {
      notesHtml +=
        '<div class="report-note-item">' +
        '  <div class="report-note-date">' + item.date + '</div>' +
        '  <div>' + item.note + '</div>' +
        '</div>';
    });
    notesBox.innerHTML = notesHtml;
  } else {
    notesBox.innerHTML = '<p class="hint" style="text-align:left;">Is hafte abhi tak koi note nahi likha gaya.</p>';
  }
}


// ========================================================
// PRINT EXECUTION (A4 Pixel-Perfect Native Print)
// ========================================================
function executePrint(contentHtml) {
  var printBox = document.getElementById("printContainer");
  printBox.innerHTML = contentHtml;
  
  // Trigger standard browser print
  window.print();
}


// ========================================================
// EVENT LISTENERS & SETUP
// ========================================================

// 1. Navigation Mode Switcher
document.getElementById("navTrackerBtn").onclick = function () {
  switchView("tracker");
};
document.getElementById("navGeneratorBtn").onclick = function () {
  switchView("generator");
};
document.getElementById("navReportBtn").onclick = function () {
  switchView("report");
};

function switchView(view) {
  currentView = view;
  document.getElementById("navTrackerBtn").classList.toggle("active", view === "tracker");
  document.getElementById("navGeneratorBtn").classList.toggle("active", view === "generator");
  document.getElementById("navReportBtn").classList.toggle("active", view === "report");

  document.getElementById("trackerView").classList.toggle("hidden", view !== "tracker");
  document.getElementById("generatorView").classList.toggle("hidden", view !== "generator");
  document.getElementById("reportView").classList.toggle("hidden", view !== "report");

  render();
}

// 2. Toggle Add-Kid Form
document.getElementById("toggleAddKidBtn").onclick = function () {
  var form = document.getElementById("addKidForm");
  form.classList.toggle("hidden");
  if (!form.classList.contains("hidden")) {
    document.getElementById("kidName").focus();
  }
};

// 3. Add-Kid Submit
document.getElementById("addKidBtn").onclick = function () {
  var nameInput = document.getElementById("kidName");
  var ageInput = document.getElementById("kidAge");
  var name = nameInput.value.trim();
  var age = parseInt(ageInput.value, 10);

  if (!name) {
    alert("Bache ka naam likhein.");
    return;
  }
  if (!age || age < 1) {
    alert("Bache ki sahi umar likhein.");
    return;
  }

  var kid = { id: makeId(), name: name, age: age };
  state.kids.push(kid);
  state.activeKidId = kid.id;
  nameInput.value = "";
  ageInput.value = "";
  document.getElementById("addKidForm").classList.add("hidden");

  saveState();
  render();
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

// 6. Print Weekly Report
document.getElementById("printReportBtn").onclick = function () {
  var reportHtml =
    '<div class="paper-page">' +
    '  <div class="ws-header">' +
    '    <div class="ws-brand-row"><span>🌱 SeekhoTrack</span><span>Weekly Progress Report</span></div>' +
    '    <div class="ws-title-row"><div class="ws-title">Hafte Ki Mukammal Report</div></div>' +
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

// ---------- Initial Boot ----------
updatePresetOptions();
render();

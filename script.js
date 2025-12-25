const VALID_HABITS = [
    // Health & Fitness
    "drink water", "hydration", "drinking water",
    "exercise", "workout", "gym", "fitness",
    "walking", "walk", "morning walk", "evening walk",
    "running", "jogging", "cycling",
    "yoga", "meditation", "breathing exercise", "stretching",
    "pushups", "situps", "plank", "skipping",
    "eat healthy", "healthy eating", "diet",
    "sleep early", "wake up early", "sleep on time",
    "no junk food", "take vitamins", "take medicine",
    "sunlight exposure", "10k steps", "steps walking",

    // Study & Career
    "study", "reading", "read", "read book", "study python",
    "coding", "learn coding", "practice coding",
    "practice java", "practice sql", "web development",
    "learn new skill", "watch tutorials",
    "revision", "write notes", "solve mcqs",
    "learn english", "vocabulary practice",

    // Productivity
    "planning", "journal", "journaling", "write journal",
    "organize room", "cleaning", "declutter",
    "make bed", "todo list", "check email",
    "time management", "goal setting",
    "budgeting", "track expenses",

    // Mind & Personal Development
    "gratitude", "affirmations", "visualization",
    "stay positive", "deep breathing",
    "no social media", "limit screen time",
    "digital detox", "focus session",
    "learn something new",

    // Hobbies
    "playing", "play games", "sports",
    "painting", "drawing", "sketching",
    "music practice", "play guitar",
    "practice singing", "dance practice",
    "gardening", "photography",

    // Cleaning & Home
    "dishwashing", "laundry", "clean desk",
    "clean room", "clean kitchen",
    "cooking", "cook food", "meal prep",
    "water plants",

    // Self-Care
    "skincare", "haircare", "self care",
    "take bath", "brush teeth",
    "evening skincare", "morning skincare",
    "relaxation", "me time",

    // Work / Office
    "check tasks", "complete tasks",
    "project work", "office work",
    "team meeting", "reply to emails",
    "update project",

    // Spiritual
    "prayer", "devotion", "read bible", "read bhagavad gita",
    "chanting", "meditation", "gratitude prayer",

    // Finance
    "save money", "track expenses", "budget planning",
    "no unnecessary spending",

    // Personal Growth
    "learn habit", "practice discipline",
    "no procrastination", "learn communication",
    "practice speaking", "practice writing",
    "improve vocabulary", "read article",

    // Food / Nutrition
    "eat fruits", "eat vegetables",
    "no sugar", "no caffeine",
    "drink milk", "eat breakfast",

    // Wellness
    "take break", "rest", "relax",
    "mindfulness", "hydrate",
    "posture correction",
    
    // Social / Family
    "talk to parents", "call family",
    "quality time", "help parents",
    "meet friends",

    // Other Useful Habits
    "no smoking", "no alcohol",
    "pet care", "feed pets",
    "practice driving", "learn driving",

    // Learning & Creative
    "learn maths", "learn physics",
    "practice problems",
    "creative writing", "content writing",
    "blog writing", "read news",

    // Technology / Developer Habits
    "practice github", "push code",
    "learn dsa", "practice dsa",
    "learn frontend", "learn backend",
    "practice mysql", "build projects"
];






/*******************************
      PAGE SWITCHER
*******************************/
function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}
/******** SHOW WEEKLY TAB ********/
function showWeeklyTab() {
    document.getElementById("tabHabits").classList.remove("active");
    document.getElementById("tabWeekly").classList.add("active");

    document.getElementById("habitsTab").classList.remove("active");
    document.getElementById("weeklyTab").classList.add("active");

    renderWeekly();
}

/******** SHOW HABITS TAB ********/
function showHabitsTab() {
    document.getElementById("tabWeekly").classList.remove("active");
    document.getElementById("tabHabits").classList.add("active");

    document.getElementById("weeklyTab").classList.remove("active");
    document.getElementById("habitsTab").classList.add("active");
}


/*******************************
      USER SYSTEM
*******************************/
function loadUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

/******** REGISTER ********/
function registerUser() {
    let user = document.getElementById("regUser").value.trim();
    let pass = document.getElementById("regPass").value.trim();
    let confirm = document.getElementById("regConfirm").value.trim();
    let error = document.getElementById("regError");

    error.textContent = "";

    if (!user || !pass || !confirm) {
        error.textContent = "All fields required.";
        return;
    }

    if (pass !== confirm) {
        error.textContent = "Passwords do not match.";
        return;
    }

    let users = loadUsers();
    let exists = users.find(u => u.username === user);

    if (exists) {
        alert("User already exists. Please login.");
        showPage("loginPage");
        return;
    }

    users.push({
        username: user,
        password: pass,
        habits: []
    });

    saveUsers(users);

    alert("Registration successful!");
    showPage("loginPage");
}

// GUEST LOGIN

function guestLogin() {
    // Create guest user if not exists
    let users = loadUsers();
    let guest = users.find(u => u.username === "Guest");

    if (!guest) {
        users.push({
            username: "Guest",
            password: "",
            habits: []
        });
        saveUsers(users);
    }

    // Set Guest as current user
    localStorage.setItem("currentUser", "Guest");

    // Go to Habit Page
    showHabitPage();
}


/******** LOGIN ********/
function loginUser() {
    let username = document.getElementById("loginUser").value.trim();
    let password = document.getElementById("loginPass").value.trim();
    let error = document.getElementById("loginError");

    error.textContent = "";

    let users = loadUsers();
    let user = users.find(u => u.username === username);

    if (!user) {
        alert("User not found. Please register.");
        showPage("registerPage");
        return;
    }

    if (user.password !== password) {
        error.textContent = "Wrong password.";
        return;
    }

    localStorage.setItem("currentUser", username);

    showHabitPage(); // 👈 IMPORTANT
}

/******** FORGOT PASSWORD ********/
function resetPassword() {
    let username = document.getElementById("forgotUser").value.trim();
    let newPass = document.getElementById("forgotNewPass").value.trim();
    let error = document.getElementById("forgotError");

    error.textContent = "";

    let users = loadUsers();
    let user = users.find(u => u.username === username);

    if (!user) {
        error.textContent = "User not found.";
        return;
    }

    user.password = newPass;
    saveUsers(users);

    error.style.color = "green";
    error.textContent = "Password changed successfully!";

    setTimeout(() => {
        showPage("loginPage");
        document.getElementById("loginUser").value = username;
    }, 1400);
}

function goToLogin() { showPage("loginPage"); }
function goToRegister() { showPage("registerPage"); }
function goToForgot() { showPage("forgotPage"); }

/*******************************
        HABIT SYSTEM
*******************************/
function getCurrentUserObj() {
    let user = localStorage.getItem("currentUser");
    let users = loadUsers();
    return users.find(u => u.username === user);
}

function saveCurrentUser(obj) {
    let users = loadUsers();
    let index = users.findIndex(u => u.username === obj.username);
    users[index] = obj;
    saveUsers(users);
}

/******** SHOW HABIT PAGE ********/
function showHabitPage() {
    let username = localStorage.getItem("currentUser");

    if (!username) {
        showPage("loginPage");
        return;
    }

    document.getElementById("user").textContent = username;

    showPage("habitPage"); // 👈 Fixes buttons not working
    renderHabits();
    renderWeekly();
}


function isValidHabit(name, existingHabits) {
    name = name.trim().toLowerCase();

    // 1. Basic checks
    if (name.length < 3) return "Habit name too short.";
    if (/[^a-zA-Z ]/.test(name)) return "Habit must contain only letters.";
    if (existingHabits.some(h => h.name.toLowerCase() === name))
        return "Habit already exists.";

    // 2. Check dictionary of real habits
    if (!VALID_HABITS.includes(name)) {
        return "This is not a valid habit. Please enter a real habit.";
    }

    return "";
}


/******** ADD HABIT ********/
function addHabit() {
    let input = document.getElementById("habitInput");
    let name = input.value.trim();
    let user = getCurrentUserObj();

    let validation = isValidHabit(name, user.habits);
    if (validation !== "") {
        alert(validation);
        return;
    }

    user.habits.push({
        name: name,
        streak: 0,
        lastDone: "",
        dates: []
    });

    saveCurrentUser(user);

    renderHabits();
    renderWeekly();
    input.value = "";
}

/******** MARK DONE TODAY ********/
function markDone(index) {
    let user = getCurrentUserObj();
    let habit = user.habits[index];

    let today = new Date().toISOString().split("T")[0];

    if (!habit.dates.includes(today)) {
        habit.dates.push(today);
    }

    // Calculate streak
    let streak = 0;
    let d = new Date(today);

    while (habit.dates.includes(d.toISOString().split("T")[0])) {
        streak++;
        d.setDate(d.getDate() - 1);
    }

    habit.streak = streak;
    habit.lastDone = today;

    saveCurrentUser(user);

    renderHabits();
    renderWeekly();
    renderChart();
}

/******** EDIT HABIT ********/
function editHabit(index) {
    let user = getCurrentUserObj();
    let newName = prompt("Enter new name:", user.habits[index].name);

    if (newName && newName.trim() !== "") {
        user.habits[index].name = newName.trim();
        saveCurrentUser(user);
        renderHabits();
        renderWeekly();
        renderChart();
    }
}

/******** RESET HABIT ********/
function resetHabit(index) {
    if (!confirm("Reset this habit?")) return;

    let user = getCurrentUserObj();
    user.habits[index].streak = 0;
    user.habits[index].lastDone = "";
    user.habits[index].dates = [];

    saveCurrentUser(user);
    renderHabits();
    renderWeekly();
    renderChart();
}

/******** DELETE HABIT ********/
function deleteHabit(index) {
    if (!confirm("Delete this habit?")) return;

    let user = getCurrentUserObj();
    user.habits.splice(index, 1);

    saveCurrentUser(user);
    renderHabits();
    renderWeekly();
    renderChart();
}

// Toggle Theme
document.getElementById("themeToggle").onclick = function() {
    document.body.classList.toggle("dark");

    // Save theme
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        this.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        this.textContent = "🌙";
    }
};

// Load theme on startup
window.addEventListener("load", () => {
    let saved = localStorage.getItem("theme");
    if (saved === "dark") {
        document.body.classList.add("dark");
        document.getElementById("themeToggle").textContent = "☀️";
    }
});

function getStreakClass(streak) {
    if (streak >= 6) return "streak-high";
    if (streak >= 3) return "streak-mid";
    return "streak-low";
}




function renderHabits() {
    let user = getCurrentUserObj();

    // Ensure values exist
    user.habits = user.habits.map(h => ({
        name: h.name,
        streak: h.streak ?? 0,
        lastDone: h.lastDone ?? "",
        dates: h.dates ?? []
    }));
    saveCurrentUser(user);

    let list = document.getElementById("habitList");
    list.innerHTML = "";

    let today = new Date().toISOString().split("T")[0];

    user.habits.forEach((h, index) => {
        let isDoneToday = h.dates.includes(today);
        let streakClass = getStreakClass(h.streak);

        let li = document.createElement("li");
        li.className = "habit-item";

        li.innerHTML = `
            <div class="habit-main">
                <div class="habit-name">${h.name}</div>
                <div class="habit-meta ${streakClass}">
                    Streak: ${h.streak} • Last: ${h.lastDone || "None"}
                </div>
            </div>

            <div class="habit-actions">
                <button class="${isDoneToday ? "done-today-btn" : ""}" onclick="markDone(${index})">
                    ${isDoneToday ? "✔ Done" : "Done Today"}
                </button>
                <button onclick="editHabit(${index})">Edit</button>
                <button onclick="resetHabit(${index})">Reset</button>
                <button onclick="deleteHabit(${index})">Delete</button>
            </div>
        `;

        list.appendChild(li);
    });
}



/******** WEEKLY VIEW ********/
function renderWeekly() {
    let user = getCurrentUserObj();
    let grid = document.getElementById("weeklyGrid");
    grid.innerHTML = "";

    function last7() {
        let arr = [];
        let names = ["S","M","T","W","T","F","S"];
        let now = new Date();

        for (let i = 6; i >= 0; i--) {
            let d = new Date();
            d.setDate(now.getDate() - i);
            arr.push({
                key: d.toISOString().split("T")[0],
                label: names[d.getDay()]
            });
        }
        return arr;
    }

    let days = last7();

    user.habits.forEach(h => {
        let row = document.createElement("div");
        row.className = "week-row";

        let title = document.createElement("div");
        title.className = "week-row-title";
        title.textContent = h.name;

        let box = document.createElement("div");
        box.className = "week-days";

        days.forEach(d => {
            let cell = document.createElement("div");
            cell.className = "day-cell";
            cell.innerHTML = `<div class="day-label">${d.label}</div>`;
            if (h.dates.includes(d.key)) cell.classList.add("done");
            box.appendChild(cell);
        });

        row.appendChild(title);
        row.appendChild(box);
        grid.appendChild(row);
    });
}

/******** CHART PAGE ********/
function showChartPage() {
    showPage("chartPage");
    document.getElementById("chartUser").textContent =
        localStorage.getItem("currentUser");
    renderChart();
}

function renderChart() {
    let user = getCurrentUserObj();
    let area = document.getElementById("chartArea");

    area.innerHTML = "";

    if (user.habits.length === 0) {
        area.innerHTML = "<p>No habits yet</p>";
        return;
    }

    let max = Math.max(...user.habits.map(h => h.streak));

    user.habits.forEach(h => {
        let row = document.createElement("div");
        row.className = "chart-row";

        let percent = (h.streak / max) * 100;

        row.innerHTML = `
            <div class="habit-name">${h.name}</div>
            <div class="bar-box">
                <div class="bar-fill" style="width:${percent}%"></div>
            </div>
            <div class="streak-text">Streak: ${h.streak}</div>
        `;
        area.appendChild(row);
    });
}



/******** PROFILE ********/
function showProfilePage() {
    let u = getCurrentUserObj();
    document.getElementById("profileName").textContent = u.username;
    document.getElementById("profileHabits").textContent = u.habits.length;

    let total = 0;
    u.habits.forEach(h => total += h.dates.length);
    document.getElementById("profileCompletions").textContent = total;

    showPage("profilePage");
}

/******** CLEAR ALL DATA ********/
function clearAllData() {
    if (!confirm("Delete ALL habits?")) return;

    let u = getCurrentUserObj();
    u.habits = [];
    saveCurrentUser(u);

    renderHabits();
    renderWeekly();
    renderChart();
}

/******** LOGOUT ********/
function logout() {
    localStorage.removeItem("currentUser");
    showPage("loginPage");
}

/******** INITIAL LOAD ********/
window.onload = () => {
    let users = loadUsers();

    if (users.length === 0) {
        showPage("registerPage");
    } else {
        showPage("loginPage");
    }
};

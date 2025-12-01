// ---------- UTILITIES ----------
function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function setTab(activeId) {
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));

    if(activeId === "habits"){
        document.getElementById("tabHabits").classList.add("active");
        document.getElementById("habitsTab").classList.add("active");
    }else if(activeId === "weekly"){
        document.getElementById("tabWeekly").classList.add("active");
        document.getElementById("weeklyTab").classList.add("active");
    }
}

function todayKey(){
    const d = new Date();
    return d.toISOString().split("T")[0]; // yyyy-mm-dd
}

function getLast7Days(){
    const days = [];
    const names = ["S","M","T","W","T","F","S"];
    const today = new Date();
    for(let i=6;i>=0;i--){
        const d = new Date();
        d.setDate(today.getDate() - i);
        days.push({
            key: d.toISOString().split("T")[0],
            label: names[d.getDay()]
        });
    }
    return days;
}

// ---------- STATE ----------
let habits = JSON.parse(localStorage.getItem("habits") || "[]");

// ensure dates field exists
habits.forEach(h => {
    if(!Array.isArray(h.dates)) h.dates = [];
});

// ---------- THEME ----------
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

function applyTheme(){
    const theme = localStorage.getItem("theme") || "light";
    if(theme === "dark"){
        body.classList.add("dark");
        if(themeToggle) themeToggle.textContent = "☀️";
    }else{
        body.classList.remove("dark");
        if(themeToggle) themeToggle.textContent = "🌙";
    }
}

if(themeToggle){
    themeToggle.addEventListener("click", () => {
        const current = localStorage.getItem("theme") || "light";
        const next = current === "light" ? "dark" : "light";
        localStorage.setItem("theme", next);
        applyTheme();
    });
}

applyTheme();

// ---------- LOGIN ----------
// ---------- LOGIN (Create + Login + Forgot Password) ----------

function loginOrCreate() {
    let storedUser = localStorage.getItem("habitUser");
    let storedPass = localStorage.getItem("habitPassword");

    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let confirmPass = document.getElementById("confirmPassword").value.trim();
    let error = document.getElementById("loginError");

    error.textContent = "";

    // No user exists → first time setup
    if (!storedUser || !storedPass) {

        if (username === "" || password === "" || confirmPass === "") {
            error.textContent = "All fields are required to create account.";
            return;
        }

        if (password !== confirmPass) {
            error.textContent = "Passwords do not match.";
            return;
        }

        localStorage.setItem("habitUser", username);
        localStorage.setItem("habitPassword", password);

        document.getElementById("confirmPassword").style.display = "none";

        showHabitPage();
        return;
    }

    // Existing user → login
    if (username !== storedUser) {
        error.textContent = "Username is incorrect.";
        return;
    }

    if (password !== storedPass) {
        error.textContent = "Wrong password.";
        return;
    }

    showHabitPage();
}

// Forgot Password Actions
// ---------- FORGOT PASSWORD PAGE ----------

function goToForgotPassword(){
    document.getElementById("resetUser").value = "";
    document.getElementById("newPass").value = "";
    document.getElementById("resetError").textContent = "";
    showPage("forgotPage");
}

function backToLogin(){
    document.getElementById("loginError").textContent = "";
    showPage("loginPage");
}

// ---------- FORGOT PASSWORD (RESET) ----------
function resetPassword() {
    const resetUser = document.getElementById("resetUser").value.trim();
    const newPass   = document.getElementById("newPass").value.trim();
    const error     = document.getElementById("resetError");

    // default error style
    error.style.color = "#ef4444";
    error.textContent = "";

    if (resetUser === "" || newPass === "") {
        error.textContent = "Both fields are required.";
        return;
    }

    // ✅ Overwrite stored username + password with new values
    localStorage.setItem("habitUser", resetUser);
    localStorage.setItem("habitPassword", newPass);

    // success message in green
    error.style.color = "green";
    error.textContent = "Password changed successfully! Redirecting to login...";

    // go back to login after a short delay
    setTimeout(() => {
        document.getElementById("loginUsername").value = resetUser;
        document.getElementById("loginPassword").value = "";
        showPage("loginPage");
    }, 1500);
}



function logout() {
    if (!confirm("Logout?")) return;

    // Clear habit data but not user login credentials
    habits = [];
    saveHabits();

    showPage("loginPage");
}


if (!storedPass) {
    // First-time user → show Create Account
} else {
    // Existing user → show Login only
}


// ---------- HABIT PAGE ----------
function saveHabits(){
    localStorage.setItem("habits", JSON.stringify(habits));
}

function showHabitPage(){
    document.getElementById("user").textContent = localStorage.getItem("habitUser") || "";
    showPage("habitPage");
    setTab("habits");
    renderHabits();
}

function addHabit(){
    const input = document.getElementById("habitInput");
    const name = input.value.trim();
    if(name === "") return;

    habits.push({
        name,
        streak: 0,
        lastDone: "",
        dates: []
    });

    saveHabits();
    renderHabits();
    renderWeekly();
    input.value = "";
}

function markDone(index){
    const today = todayKey();
    const habit = habits[index];

    if(!habit.dates) habit.dates = [];

    if(!habit.dates.includes(today)){
        habit.dates.push(today);
    }

    // calculate streak: consecutive days ending today
    let streak = 0;
    const datesSet = new Set(habit.dates);
    let d = new Date(today);
    while(true){
        const key = d.toISOString().split("T")[0];
        if(datesSet.has(key)){
            streak++;
            d.setDate(d.getDate() - 1);
        }else{
            break;
        }
    }
    habit.streak = streak;
    habit.lastDone = today;

    saveHabits();
    renderHabits();
    renderWeekly();
    renderChart();
}

function editHabit(index){
    const newName = prompt("Edit habit name:", habits[index].name);
    if(newName !== null){
        const trimmed = newName.trim();
        if(trimmed !== ""){
            habits[index].name = trimmed;
            saveHabits();
            renderHabits();
            renderWeekly();
            renderChart();
        }
    }
}

function resetHabit(index){
    if(!confirm("Reset streak and history for this habit?")) return;
    habits[index].streak = 0;
    habits[index].lastDone = "";
    habits[index].dates = [];
    saveHabits();
    renderHabits();
    renderWeekly();
    renderChart();
}

function deleteHabit(index){
    if(!confirm("Delete this habit?")) return;
    habits.splice(index, 1);
    saveHabits();
    renderHabits();
    renderWeekly();
    renderChart();
}

function renderHabits(){
    const list = document.getElementById("habitList");
    list.innerHTML = "";

    habits.forEach((habit, index) => {
        const li = document.createElement("li");
        li.className = "habit-item";

        const main = document.createElement("div");
        main.className = "habit-main";

        const name = document.createElement("div");
        name.className = "habit-name";
        name.textContent = habit.name;

        const meta = document.createElement("div");
        meta.className = "habit-meta";

        const last = habit.lastDone ? `Last done: ${habit.lastDone}` : "Not done yet";
        meta.textContent = `Streak: ${habit.streak} days • ${last}`;

        main.appendChild(name);
        main.appendChild(meta);

        const actions = document.createElement("div");
        actions.className = "habit-actions";

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done Today";
        doneBtn.onclick = () => markDone(index);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editHabit(index);

        const resetBtn = document.createElement("button");
        resetBtn.textContent = "Reset";
        resetBtn.onclick = () => resetHabit(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteHabit(index);

        actions.appendChild(doneBtn);
        actions.appendChild(editBtn);
        actions.appendChild(resetBtn);
        actions.appendChild(deleteBtn);

        // highlight if done today
        if(habit.lastDone === todayKey()){
            li.classList.add("done-today");
        }

        li.appendChild(main);
        li.appendChild(actions);
        list.appendChild(li);
    });

    renderWeekly();
}

// ---------- WEEKLY VIEW ----------
function renderWeekly(){
    const container = document.getElementById("weeklyGrid");
    if(!container) return;
    container.innerHTML = "";

    const days = getLast7Days();

    habits.forEach(habit => {
        const row = document.createElement("div");
        row.className = "week-row";

        const title = document.createElement("div");
        title.className = "week-row-title";
        title.textContent = habit.name;

        const week = document.createElement("div");
        week.className = "week-days";

        const datesSet = new Set(habit.dates || []);

        days.forEach(d => {
            const cell = document.createElement("div");
            cell.className = "day-cell";
            if(datesSet.has(d.key)){
                cell.classList.add("done");
            }

            cell.innerHTML = `
                <div class="day-label">${d.label}</div>
            `;
            week.appendChild(cell);
        });

        row.appendChild(title);
        row.appendChild(week);
        container.appendChild(row);
    });
}

// ---------- CHART PAGE ----------
function showChartPage(){
    document.getElementById("chartUser").textContent = localStorage.getItem("habitUser") || "";
    showPage("chartPage");
    renderChart();
}

function renderChart(){
    const chartArea = document.getElementById("chartArea");
    if(!chartArea) return;

    chartArea.innerHTML = "";
    if(habits.length === 0){
        chartArea.innerHTML = "<p class='subtitle'>No habits yet. Add some to see the chart.</p>";
        return;
    }

    const maxStreak = Math.max(...habits.map(h => h.streak), 1);

    habits.forEach(habit => {
        const row = document.createElement("div");
        row.className = "chart-row";

        const name = document.createElement("div");
        name.className = "habit-name";
        name.textContent = habit.name;

        const barBox = document.createElement("div");
        barBox.className = "bar-box";

        const barFill = document.createElement("div");
        barFill.className = "bar-fill";

        const percent = (habit.streak / maxStreak) * 100;
        setTimeout(() => {
            barFill.style.width = percent + "%";
        }, 50);

        barBox.appendChild(barFill);

        const info = document.createElement("div");
        info.className = "streak-text";
        info.innerHTML = `Streak: <b>${habit.streak}</b> day(s)`;

        row.appendChild(name);
        row.appendChild(barBox);
        row.appendChild(info);

        chartArea.appendChild(row);
    });
}

// ---------- WEEKLY TAB SWITCH ----------
function showHabitsTab(){
    setTab("habits");
    renderHabits();
}

function showWeeklyTab(){
    setTab("weekly");
    renderWeekly();
}

// ---------- PROFILE ----------
function showProfilePage(){
    const user = localStorage.getItem("habitUser") || "Guest";
    const profileName = document.getElementById("profileName");
    const profileHabits = document.getElementById("profileHabits");
    const profileCompletions = document.getElementById("profileCompletions");

    if(profileName) profileName.textContent = user;
    if(profileHabits) profileHabits.textContent = habits.length;

    let total = 0;
    habits.forEach(h => total += h.dates ? h.dates.length : 0);
    if(profileCompletions) profileCompletions.textContent = total;

    showPage("profilePage");
}

function clearAllData(){
    if(!confirm("This will clear all habits and history. Continue?")) return;
    habits = [];
    saveHabits();
    renderHabits();
    renderWeekly();
    renderChart();
    alert("All data cleared.");
}

function logout(){
    if(!confirm("Logout and clear current session?")) return;
    localStorage.removeItem("habitUser");
    showPage("loginPage");
}


// ---------- INITIAL LOAD ----------
window.addEventListener("load", () => {

    const storedPass = localStorage.getItem("habitPassword");

    if (!storedPass) {
        // First-time user
        document.getElementById("loginSubtitle").textContent =
            "Create your account to start tracking habits.";
        document.getElementById("confirmPassword").style.display = "block";

    } else {
        // Returning user
        document.getElementById("loginSubtitle").textContent =
            "Login to continue.";
        document.getElementById("confirmPassword").style.display = "none";
    }

    showPage("loginPage");
});


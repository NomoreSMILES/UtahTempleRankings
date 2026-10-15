/*
 * Utah Temple Ranking System
 *
 * Edit the eight numeric values in each temple's scores object to enter your
 * ratings. Every value should be between 0 and 10. A value of 0 means
 * "not applicable / essentially absent" according to the scoring guide.
 */

const WEIGHTS = {
    architecture: 0.25,
    grounds: 0.20,
    experience: 0.20,
    history: 0.10,
    uniqueness: 0.25
};

const CATEGORY_LABELS = {
    architecture: "🏛️ Architecture",
    grounds: "🌳 Grounds",
    experience: "✨ Overall Experience",
    history: "📜 Historical Significance",
    uniqueness: "⭐ Uniqueness"
};

const SORT_OPTIONS = [
    { value: "overall", label: "Overall Score" },
    { value: "architecture", label: "Best Architecture" },
    { value: "grounds", label: "Best Grounds" },
    { value: "experience", label: "Best Experience" },
    { value: "history", label: "Best Historical Significance" },
    { value: "uniqueness", label: "Most Unique" },
    { value: "favorite", label: "Favorites First" },
    { value: "visitAgain", label: "Would Visit Again" }
];

const STORAGE_KEY = "utah-temple-ranking-ratings-v1";
const PHOTO_DB_NAME = "utah-temple-photo-journal";
const PHOTO_STORE_NAME = "photos";

// The first three entries preserve the sequence already started in the HTML.
// All other Utah temples are included below. The initial scores are 0 so the
// system does not invent personal opinions before you enter your ratings.
const temples = [
    {
        id: "saratoga-springs",
        name: "Saratoga Springs Utah Temple",
        image: "Images/saratoga_springs_utah_temple.jpg",
        gallery: ["Images/saratoga_springs_utah_temple.jpg", "Images/saratoga-springs-utah-temple-35622.png"],
        status: "Dedicated",
        date: "Dedicated August 13, 2023",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "red-cliffs",
        name: "Red Cliffs Utah Temple",
        image: "Images/red_cliffs_utah_temple.jpg",
        gallery: ["Images/red_cliffs_utah_temple.jpg"],
        status: "Dedicated",
        date: "Dedicated March 24, 2024",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "st-george",
        name: "St. George Utah Temple",
        image: "Images/st_george_utah_temple.jpg",
        gallery: ["Images/st_george_utah_temple.jpg"],
        status: "Dedicated",
        date: "Dedicated April 6, 1877",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "bountiful",
        name: "Bountiful Utah Temple",
        image: "Images/bountiful_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated January 8, 1995",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "brigham-city",
        name: "Brigham City Utah Temple",
        image: "Images/brigham_city_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated September 23, 2012",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "cedar-city",
        name: "Cedar City Utah Temple",
        image: "Images/cedar_city_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated December 10, 2017",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "deseret-peak",
        name: "Deseret Peak Utah Temple",
        image: "Images/deseret_peak_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated November 10, 2024",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "draper",
        name: "Draper Utah Temple",
        image: "Images/draper_utah_temple.jpg",
        gallery: ["Images/draper_utah_temple.jpg"],
        status: "Dedicated",
        date: "Dedicated March 20, 2009",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "ephraim",
        name: "Ephraim Utah Temple",
        image: "Images/ephraim_utah_temple.jpg",
        status: "Opening Soon",
        date: "Opening soon",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "heber-valley",
        name: "Heber Valley Utah Temple",
        image: "Images/heber_valley_utah_temple.jpg",
        status: "Under Construction",
        date: "Under construction",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "jordan-river",
        name: "Jordan River Utah Temple",
        image: "Images/jordan_river_utah_temple.jpg",
        gallery: ["Images/jordan_river_utah_temple.jpg"],
        status: "Under Renovation",
        date: "Under renovation",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "layton",
        name: "Layton Utah Temple",
        image: "Images/layton_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated June 16, 2024",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "lehi",
        name: "Lehi Utah Temple",
        image: "Images/lehi_utah_temple.jpg",
        status: "Announced",
        date: "Announced",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "lindon",
        name: "Lindon Utah Temple",
        image: "Images/lindon_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated May 3, 2026",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "logan",
        name: "Logan Utah Temple",
        image: "Images/logan_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated May 17, 1884",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "manti",
        name: "Manti Utah Temple",
        image: "Images/manti_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated May 21, 1888",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "monticello",
        name: "Monticello Utah Temple",
        image: "Images/monticello_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated July 26, 1998",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "mount-timpanogos",
        name: "Mount Timpanogos Utah Temple",
        image: "Images/mount_timpanogos_utah_temple.jpg",
        gallery: ["Images/mount_timpanogos_utah_temple.jpg"],
        status: "Dedicated",
        date: "Dedicated October 13, 1996",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "ogden",
        name: "Ogden Utah Temple",
        image: "Images/ogden_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated January 18, 1972",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "oquirrh-mountain",
        name: "Oquirrh Mountain Utah Temple",
        image: "Images/oquirrh_mountain_utah_temple.jpg",
        gallery: ["Images/oquirrh_mountain_utah_temple.jpg"],
        status: "Dedicated",
        date: "Dedicated August 21, 2009",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "orem",
        name: "Orem Utah Temple",
        image: "Images/orem_utah_temple.jpg",
        gallery: ["Images/orem_utah_temple.jpg"],
        status: "Dedicated",
        date: "Dedicated January 21, 2024",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "payson",
        name: "Payson Utah Temple",
        image: "Images/payson_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated June 7, 2015",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "price",
        name: "Price Utah Temple",
        image: null,
        status: "Announced",
        date: "Announced",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "provo-city-center",
        name: "Provo City Center Utah Temple",
        image: "Images/provo_city_center_temple.jpg",
        gallery: ["Images/provo_city_center_temple.jpg"],
        status: "Dedicated",
        date: "Dedicated March 20, 2016",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "provo-rock-canyon",
        name: "Provo Utah Rock Canyon Temple",
        image: "Images/provo_utah_rock_canyon_temple.jpg",
        status: "Under Renovation",
        date: "Under renovation",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "salt-lake",
        name: "Salt Lake Temple",
        image: "Images/salt_lake_temple.jpg",
        status: "Under Renovation",
        date: "Under renovation",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "smithfield",
        name: "Smithfield Utah Temple",
        image: "Images/smithfield_utah_temple.jpg",
        status: "Under Construction",
        date: "Under construction",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "spanish-fork",
        name: "Spanish Fork Utah Temple",
        image: "Images/spanish_fork_utah_temple.jpg",
        status: "Announced",
        date: "Announced",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "syracuse",
        name: "Syracuse Utah Temple",
        image: "Images/syracuse_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated June 8, 2025",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "taylorsville",
        name: "Taylorsville Utah Temple",
        image: "Images/taylorsville_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated June 2, 2024",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "vernal",
        name: "Vernal Utah Temple",
        image: "Images/vernal_utah_temple.jpg",
        status: "Dedicated",
        date: "Dedicated November 2, 1997",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    },
    {
        id: "west-jordan",
        name: "West Jordan Utah Temple",
        image: "Images/west_jordan_utah_temple.jpg",
        status: "Announced",
        date: "Announced",
        scores: { architecture: 0, grounds: 0, experience: 0, history: 0, uniqueness: 0 },
        favorite: false,
        visitAgain: null
    }
];

function blankNotes() {
    return Object.keys(WEIGHTS).reduce((notes, category) => {
        notes[category] = "";
        return notes;
    }, {});
}

temples.forEach((temple) => {
    temple.notes = { ...blankNotes(), ...(temple.notes || {}) };
    temple.gallery = temple.gallery || (temple.image ? [temple.image] : []);
});

function clampScore(value) {
    if (value === "" || value === null || value === undefined) return null;
    const number = Number(value);
    if (!Number.isFinite(number)) return null;
    return Math.round(Math.min(10, Math.max(0, number)) * 10) / 10;
}

function scoreOrZero(value) {
    const score = clampScore(value);
    return score === null ? 0 : score;
}

function calculateOverall(temple) {
    return Object.entries(WEIGHTS).reduce((total, [category, weight]) => {
        return total + scoreOrZero(temple.scores[category]) * weight;
    }, 0);
}

function formatScore(score) {
    return Number(score).toFixed(2);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function imageMarkup(temple) {
    if (!temple.image) {
        return `<div class="temple-thumb-placeholder" role="img" aria-label="No image available for ${escapeHtml(temple.name)}">Image not added yet</div>`;
    }

    return `<img class="temple-thumb" src="${escapeHtml(temple.image)}" alt="${escapeHtml(temple.name)}" loading="lazy">`;
}

function scorePills(temple) {
    return Object.keys(WEIGHTS).map((category) => {
        return `<span class="score-pill">${escapeHtml(CATEGORY_LABELS[category])}: ${formatScore(scoreOrZero(temple.scores[category]))}</span>`;
    }).join("");
}

function scoreFields(temple) {
    return Object.keys(WEIGHTS).map((category) => {
        const value = clampScore(temple.scores[category]);
        const weight = `${Math.round(WEIGHTS[category] * 100)}%`;
        return `
            <label class="score-field">
                ${escapeHtml(CATEGORY_LABELS[category])}
                <input type="number" min="0" max="10" step="0.1" inputmode="decimal"
                    value="${value === null ? "" : value}"
                    data-temple-id="${escapeHtml(temple.id)}"
                    data-score-key="${escapeHtml(category)}"
                    aria-label="${escapeHtml(CATEGORY_LABELS[category])} score for ${escapeHtml(temple.name)}">
                <small>Weight: ${weight} · 0–10</small>
            </label>`;
    }).join("");
}

function visitAgainOptions(temple) {
    const current = clampScore(temple.visitAgain);
    const options = ['<option value="">Not rated</option>'];
    for (let score = 10; score >= 0; score -= 1) {
        options.push(`<option value="${score}"${current === score ? " selected" : ""}>${score} / 10</option>`);
    }
    return options.join("");
}

function renderCard(temple, rank) {
    const overall = calculateOverall(temple);

    return `
        <button class="temple-card" type="button" data-open-temple="${escapeHtml(temple.id)}" aria-label="Open details for ${escapeHtml(temple.name)}">
            ${imageMarkup(temple)}
            <div class="temple-card-content">
                <div class="temple-heading">
                    <div>
                        <h2>${temple.favorite ? "⭐ " : ""}${escapeHtml(temple.name)}</h2>
                        <p class="temple-meta">${escapeHtml(temple.date)}<span class="status">${escapeHtml(temple.status)}</span></p>
                    </div>
                    <span class="rank-badge">Rank #${rank}</span>
                </div>
                <div class="overall-score">${formatScore(overall)} / 10</div>
                <div class="score-strip" aria-label="Category scores">${scorePills(temple)}</div>
            </div>
            <span class="open-hint">View details →</span>
        </button>`;
}

let photoDbPromise = null;
let activeJournalPhotoUrls = [];
let journalPhotoRenderToken = 0;

function openPhotoDb() {
    if (photoDbPromise) return photoDbPromise;

    photoDbPromise = new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            reject(new Error("This browser does not support local photo storage."));
            return;
        }

        const request = window.indexedDB.open(PHOTO_DB_NAME, 1);
        request.onupgradeneeded = () => {
            const database = request.result;
            const store = database.objectStoreNames.contains(PHOTO_STORE_NAME)
                ? request.transaction.objectStore(PHOTO_STORE_NAME)
                : database.createObjectStore(PHOTO_STORE_NAME, { keyPath: "id" });
            if (!store.indexNames.contains("templeId")) store.createIndex("templeId", "templeId");
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error("Could not open local photo storage."));
    });

    return photoDbPromise;
}

async function getJournalPhotos(templeId) {
    const database = await openPhotoDb();
    return new Promise((resolve, reject) => {
        const request = database.transaction(PHOTO_STORE_NAME, "readonly")
            .objectStore(PHOTO_STORE_NAME).index("templeId").getAll(templeId);
        request.onsuccess = () => resolve(request.result.sort((a, b) => b.createdAt - a.createdAt));
        request.onerror = () => reject(request.error || new Error("Could not load journal photos."));
    });
}

function releaseJournalPhotoUrls() {
    activeJournalPhotoUrls.forEach((url) => URL.revokeObjectURL(url));
    activeJournalPhotoUrls = [];
}

async function renderJournalPhotos(temple) {
    const gallery = document.getElementById("modalPhotoGallery");
    if (!gallery) return;

    const token = ++journalPhotoRenderToken;
    releaseJournalPhotoUrls();

    try {
        const photos = await getJournalPhotos(temple.id);
        if (token !== journalPhotoRenderToken || activeTempleId !== temple.id) return;
        if (!photos.length) return;

        gallery.querySelector(".modal-photo-placeholder")?.remove();
        photos.forEach((photo, index) => {
            const url = URL.createObjectURL(photo.blob);
            activeJournalPhotoUrls.push(url);
            const image = document.createElement("img");
            image.className = "modal-photo modal-journal-photo";
            image.src = url;
            image.alt = `${temple.name} journal photo ${index + 1}`;
            image.loading = "lazy";
            gallery.appendChild(image);
        });
    } catch (error) {
        console.warn("Journal photos could not be loaded.", error);
    }
}

function galleryMarkup(temple) {
    if (!temple.gallery.length) {
        return `<div class="modal-photo-placeholder" role="img" aria-label="No image available for ${escapeHtml(temple.name)}">Image not added yet</div>`;
    }

    return temple.gallery.map((image, index) => {
        return `<img class="modal-photo" src="${escapeHtml(image)}" alt="${escapeHtml(temple.name)} photo ${index + 1}" loading="lazy">`;
    }).join("");
}

function modalScoreRows(temple) {
    return Object.keys(WEIGHTS).map((category) => {
        const score = scoreOrZero(temple.scores[category]);
        const weight = `${Math.round(WEIGHTS[category] * 100)}%`;
        return `
            <article class="modal-rating-row">
                <div>
                    <div class="rating-ring" data-modal-ring="${escapeHtml(category)}" style="--score: ${score}"><span>${formatScore(score)}</span></div>
                    <label class="ring-score">Score
                        <input class="modal-score-input" type="number" min="0" max="10" step="0.1" inputmode="decimal" value="${score}"
                            data-temple-id="${escapeHtml(temple.id)}" data-modal-score-key="${escapeHtml(category)}"
                            aria-label="${escapeHtml(CATEGORY_LABELS[category])} score for ${escapeHtml(temple.name)}">
                    </label>
                </div>
                <div class="rating-copy">
                    <div class="rating-label"><span>${escapeHtml(CATEGORY_LABELS[category])}</span><small>Weight ${weight}</small></div>
                    <textarea class="note-editor" rows="2" data-temple-id="${escapeHtml(temple.id)}" data-modal-note-key="${escapeHtml(category)}" placeholder="Add your thoughts about this category...">${escapeHtml(temple.notes[category] || "")}</textarea>
                </div>
            </article>`;
    }).join("");
}

function modalFooterMarkup(temple) {
    return `
        <div class="modal-overall">Overall: <span data-modal-overall>${formatScore(calculateOverall(temple))}</span> / 10</div>
        <div class="modal-preferences">
            <label class="checkbox-field">
                <input type="checkbox" data-temple-id="${escapeHtml(temple.id)}" data-modal-preference="favorite"${temple.favorite ? " checked" : ""}>
                ⭐ Favorite
            </label>
            <label class="control-field" for="modal-visit-again-${escapeHtml(temple.id)}">
                Would Visit Again?
                <select id="modal-visit-again-${escapeHtml(temple.id)}" data-temple-id="${escapeHtml(temple.id)}" data-modal-preference="visitAgain">${visitAgainOptions(temple)}</select>
            </label>
        </div>
        <button id="modalDone" type="button">Done</button>`;
}

let activeTempleId = null;
let lastFocusedElement = null;

function openTempleModal(templeId) {
    const temple = temples.find((item) => item.id === templeId);
    if (!temple) return;

    activeTempleId = templeId;
    lastFocusedElement = document.activeElement;
    document.getElementById("modalTempleName").textContent = temple.name;
    document.getElementById("modalTempleMeta").textContent = `${temple.date} · ${temple.status}`;
    document.getElementById("modalContent").innerHTML = `
        <section aria-labelledby="modalScoresHeading">
            <h3 id="modalScoresHeading" class="modal-section-title">Your temple ratings and notes</h3>
            <div class="modal-score-list">${modalScoreRows(temple)}</div>
        </section>
        <section aria-labelledby="modalPhotosHeading">
            <h3 id="modalPhotosHeading" class="modal-section-title">Pictures</h3>
            <div id="modalPhotoGallery" class="modal-photo-stack">${galleryMarkup(temple)}</div>
            <p class="photo-sync-note">Photos added from the map’s personal journal appear here for this temple.</p>
        </section>`;
    document.getElementById("modalFooter").innerHTML = modalFooterMarkup(temple);

    const modal = document.getElementById("templeModal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    document.getElementById("closeTempleModal").focus();
    renderJournalPhotos(temple);
}

function closeTempleModal() {
    const modal = document.getElementById("templeModal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    journalPhotoRenderToken += 1;
    releaseJournalPhotoUrls();
    activeTempleId = null;
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
}

function refreshModalOverall(temple) {
    const overall = document.querySelector("[data-modal-overall]");
    if (overall) overall.textContent = formatScore(calculateOverall(temple));

    Object.keys(WEIGHTS).forEach((category) => {
        const ring = document.querySelector(`[data-modal-ring="${category}"]`);
        if (!ring) return;
        const score = scoreOrZero(temple.scores[category]);
        ring.style.setProperty("--score", score);
        ring.querySelector("span").textContent = formatScore(score);
    });
}

function getSortValue(temple, sortBy) {
    if (sortBy === "overall") return calculateOverall(temple);
    if (sortBy === "favorite") return temple.favorite ? 1 : 0;
    if (sortBy === "visitAgain") return scoreOrZero(temple.visitAgain);
    return scoreOrZero(temple.scores[sortBy]);
}

function render() {
    const sortBy = document.getElementById("sortBy").value || "overall";
    const rankedTemples = [...temples].sort((first, second) => {
        const difference = getSortValue(second, sortBy) - getSortValue(first, sortBy);
        if (difference !== 0) return difference;
        return first._order - second._order;
    });

    document.getElementById("TempleRankings").innerHTML = rankedTemples
        .map((temple, index) => renderCard(temple, index + 1))
        .join("");

    const label = SORT_OPTIONS.find((option) => option.value === sortBy)?.label || "Overall Score";
    document.getElementById("rankingSummary").textContent = `Showing ${temples.length} Utah temples · Sorted by ${label} · Scores are out of 10`;
}

function saveRatings() {
    const saved = {};
    temples.forEach((temple) => {
        saved[temple.id] = {
            scores: temple.scores,
            notes: temple.notes,
            favorite: temple.favorite,
            visitAgain: temple.visitAgain
        };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

let saveRatingsTimer = null;

function scheduleSaveRatings() {
    window.clearTimeout(saveRatingsTimer);
    saveRatingsTimer = window.setTimeout(saveRatings, 120);
}

function loadRatings() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        temples.forEach((temple) => {
            const savedTemple = saved[temple.id];
            if (!savedTemple) return;

            Object.keys(WEIGHTS).forEach((category) => {
                if (savedTemple.scores && Object.prototype.hasOwnProperty.call(savedTemple.scores, category)) {
                    temple.scores[category] = clampScore(savedTemple.scores[category]);
                }
                if (savedTemple.notes && Object.prototype.hasOwnProperty.call(savedTemple.notes, category)) {
                    temple.notes[category] = String(savedTemple.notes[category] || "");
                }
            });
            temple.favorite = savedTemple.favorite === true;
            temple.visitAgain = clampScore(savedTemple.visitAgain);
        });
    } catch (error) {
        console.warn("Saved temple ratings could not be loaded.", error);
    }
}

function handleRatingChange(event) {
    const field = event.target;
    const temple = temples.find((item) => item.id === field.dataset.templeId);
    if (!temple) return;

    if (field.dataset.scoreKey) {
        temple.scores[field.dataset.scoreKey] = clampScore(field.value);
    } else if (field.dataset.preference === "favorite") {
        temple.favorite = field.checked;
    } else if (field.dataset.preference === "visitAgain") {
        temple.visitAgain = clampScore(field.value);
    } else {
        return;
    }

    saveRatings();
    render();
}

function handleModalFieldUpdate(event) {
    const field = event.target;
    const temple = temples.find((item) => item.id === field.dataset.templeId);
    if (!temple) return;

    if (field.dataset.modalScoreKey) {
        temple.scores[field.dataset.modalScoreKey] = clampScore(field.value);
        refreshModalOverall(temple);
        scheduleSaveRatings();
        if (event.type === "change") render();
        return;
    }

    if (field.dataset.modalNoteKey) {
        temple.notes[field.dataset.modalNoteKey] = field.value;
        scheduleSaveRatings();
        return;
    }

    if (field.dataset.modalPreference === "favorite") {
        temple.favorite = field.checked;
    } else if (field.dataset.modalPreference === "visitAgain") {
        temple.visitAgain = clampScore(field.value);
    } else {
        return;
    }

    saveRatings();
    render();
}

function populateSortOptions() {
    const sortBy = document.getElementById("sortBy");
    sortBy.innerHTML = SORT_OPTIONS.map((option) => {
        return `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`;
    }).join("");
}

function resetRatings() {
    if (!window.confirm("Reset all saved scores and personal preferences?")) return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
}

function initialize() {
    temples.forEach((temple, index) => { temple._order = index; });
    loadRatings();
    populateSortOptions();
    document.getElementById("sortBy").addEventListener("change", render);
    document.getElementById("TempleRankings").addEventListener("click", (event) => {
        const card = event.target.closest("[data-open-temple]");
        if (card) openTempleModal(card.dataset.openTemple);
    });
    document.getElementById("templeModal").addEventListener("input", handleModalFieldUpdate);
    document.getElementById("templeModal").addEventListener("change", handleModalFieldUpdate);
    document.getElementById("closeTempleModal").addEventListener("click", closeTempleModal);
    document.getElementById("templeModal").addEventListener("click", (event) => {
        if (event.target.id === "templeModal" || event.target.id === "modalDone") closeTempleModal();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && activeTempleId) closeTempleModal();
    });
    document.getElementById("resetRatings").addEventListener("click", resetRatings);
    render();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
} else {
    initialize();
}

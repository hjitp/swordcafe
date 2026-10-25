// Shared wallpaper for every page. To change it, replace images/Wallpaper_1.jpg
// or edit this list (several entries = a random one is picked on each page load).
const wallpapers = ["images/Wallpaper_1.jpg"];

const file = wallpapers[Math.floor(Math.random() * wallpapers.length)];
// paths are resolved relative to this script, so it also works from sub-pages
const url = new URL(file, document.currentScript.src).href;

// shown 6000 px wide (see style.css), height follows the image proportions
const bg = document.createElement("img");
bg.id = "wallpaper";
bg.alt = "";
bg.src = url;
document.body.prepend(bg);

// Soft navigation: clicking an internal link swaps the page content without reloading,
// so the wallpaper and the scroll position stay exactly where they are.
async function go(url, push) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const doc = new DOMParser().parseFromString(await res.text(), "text/html");
    const next = doc.querySelector(".stage");
    if (!next) throw new Error("no stage");
    document.querySelector(".stage").innerHTML = next.innerHTML;
    document.title = doc.title;
    if (push) history.pushState(null, "", url);
  } catch (err) {
    location.href = url; // fall back to a normal page load
  }
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a || a.target || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const u = new URL(a.href, location.href);
  if (u.origin !== location.origin) return; // external links load normally
  e.preventDefault();
  if (u.href !== location.href) go(u.href, true);
});

window.addEventListener("popstate", () => go(location.href, false));

// Shared wallpaper for every page. To change it, replace images/Wallpaper_1.jpg
// or edit this list (several entries = a random one is picked on each page load).
const wallpapers = ["images/Wallpaper_1.jpg"];

const file = wallpapers[Math.floor(Math.random() * wallpapers.length)];
// paths are resolved relative to this script, so it also works from sub-pages
const url = new URL(file, document.currentScript.src).href;

const bg = document.createElement("div");
bg.id = "wallpaper";
bg.style.backgroundImage = `url("${url}")`;
document.body.prepend(bg);

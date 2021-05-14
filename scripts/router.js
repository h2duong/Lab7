// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(e, s, t, i) {
   if (e === 1){
    window.history.replaceState(window.location.hostname, "Journal Entries", "index.html")
    s.className = "";
    t.textContent = "Journal Entries";
  }
  else if (e === 2){
    history.pushState(window.location.hostname, "Settings", "#settings");
    s.className = "settings";
    t.textContent = "Settings";

  }

  else if (e === 3){
    history.pushState(window.location.hostname, `Entry ${i}`, `#entry-${i}`);
    s.className = "single-entry";
    t.textContent = `Entry ${i}`;

  }
}

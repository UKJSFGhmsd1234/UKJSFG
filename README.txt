UKJSFG TROOP ROSTER + NAVIGATION REPAIR

Use a NEW GitHub branch from current main (e.g., roster-nav-repair).
Upload these TWO files preserving their paths:
- index.html (repo root)
- media/index.html (inside media folder)

No roster data or existing assets are replaced. Existing roster.html,
roster.js, roster.css, personnel.js and personnel.css remain untouched.

Changes:
- Restores TROOP ROSTER header link on homepage and Media page.
- Maintains clickable dossiers (all five still in index.html).
- Repairs links from Media to homepage and its sections.
- Keeps Media clean URL at /media/.
- Uses /roster.html for roster because no clean roster folder exists yet.
- Updates personnel asset references to v=2 to bypass stale caches.

After uploading on the branch, check:
- / homepage: TROOP ROSTER tab, all 5 admin dossiers
- /roster.html roster data and existing member records
- /media/ gallery, return to home, return to roster

Do not delete any files or merge until these checks pass.

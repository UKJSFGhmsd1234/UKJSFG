UKJSFG Personnel Dossiers + Clean Media URL
==========================================
Upload this package to the personnel-dossiers development branch.

What's changed:
- Main navigation MEDIA link now points to media/
- media/index.html is the new archive page at /media/
- The original media.html now redirects older links to /media/
- Homepage navigation from Media points to root anchors without .html
- All original assets, JavaScript, CSS and existing personnel dossiers preserved.

How to test:
1. Upload every file and directory from this ZIP to your development branch.
2. The clean URL /media/ works once GitHub Pages serves this branch
   (or via a branch preview / local static server).
3. Verify Media photos, galleries, and home navigation.
4. Do not merge into main until checked.

GitHub Pages uses directory index files for clean URLs; no _redirects
file, .htaccess or server rewrite rules are needed.

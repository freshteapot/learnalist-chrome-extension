echo "Building for the chrome folder."
npm run build
# Remove the existing files
rm chrome/index.html 2> /dev/null
rm chrome/bundle.js 2> /dev/null
rm chrome/bundle.css 2> /dev/null
# Add the fresh new ones.
cp public/index.html chrome/index.html
cp public/bundle.js chrome/bundle.js
cp public/bundle.css chrome/bundle.css
echo "Done."

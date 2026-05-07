#!/bin/bash
cd "$(dirname "$0")"
git init
git add .
git commit -m "Stockbridge — initial commit"
git branch -M main
git remote add origin https://github.com/clarkeys12/stockbridge.git
git push -u origin main
echo ""
echo "Done! Code is live at https://github.com/clarkeys12/stockbridge"
echo "Next step: import this repo into Vercel at https://vercel.com/new"

#!/bin/bash

# used:
# sublime text editor
# pip install when-changed

filesToMonitor="\
 pages/curriculum.htm\
 js/main.js\
 js/cv-data-it.js\
 js/cv-data-en.js\
 css/curriculum.css\
"

filesToEdit="$filesToMonitor CHANGELOG"

echo Files to edit: $filesToEdit
echo Files to monitor: $filesToMonitor

subl $filesToEdit

echo "Waiting for files change to create pdf"
killall when-changed
when-changed $filesToMonitor -c utils/cv2pdf.sh &


#!/bin/bash

# Used:
# sudo PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false npm install -g chromehtml2pdf
# Note that parameters run-all..., disable-checke...,virtual-time..., fullPage... doesn't work as expected, 
# waiting for the complete rendering of page with javascript post operation
echo "Creating pdf"
chromehtml2pdf \
	--headless \
	--allow-file-access-from-files \
	--out=zaglio_stefano_cv_ita.pdf \
	--run-all-compositor-stages-before-draw \
	--disable-checker-imaging \
	--disable-gpu \
	--virtual-time-budget=2500 \
	--executablePath=/usr/bin/chromium-browser \
	--marginTop=0.7cm --marginBottom=0.7cm --marginLeft=0.9cm --marginRight=0.9cm \
	--printBackground=true \
	--fullPage true \
	file:///home/stefano/develop/GitHub/site/curriculum_ita.htm?print

echo "Creating pdf for details"
chromehtml2pdf \
	--headless \
	--allow-file-access-from-files \
	--out=zaglio_stefano_cv_ita_details.pdf \
	--run-all-compositor-stages-before-draw \
	--disable-checker-imaging \
	--disable-gpu \
	--virtual-time-budget=4000 \
	--executablePath=/usr/bin/chromium-browser \
	--marginTop=0.7cm --marginBottom=0.7cm --marginLeft=0.9cm --marginRight=0.9cm \
	--printBackground=true \
	--fullPage true \
	file:///home/stefano/develop/GitHub/site/curriculum_ita.htm?print#details#projects

echo "Creating join of pdf letter and details"
pdftk zaglio_stefano_cv_ita.pdf zaglio_stefano_cv_ita_details.pdf cat output zaglio_stefano_cv_ita_letter_and_details.pdf

# chromehtml2pdf --out=zs_anonymouse_cv_ita.pdf --executablePath=/usr/bin/chromium-browser --marginTop=0.7cm --marginBottom=0.7cm --marginLeft=0.9cm --marginRight=0.9cm --printBackground=true file:///home/stefano/develop/GitHub/site/curriculum_ita.htm?anonymouse
# chromehtml2pdf --out=zaglio_stefano_cv_prjs_ita.pdf --executablePath=/usr/bin/chromium-browser --marginTop=0.7cm --marginBottom=0.7cm --marginLeft=0.9cm --marginRight=0.9cm --printBackground=true file:///home/stefano/develop/GitHub/site/curriculum_ita.htm?projects
echo "Creating static version"
chromium-browser \
	--headless \
	--allow-file-access-from-files \
	--save-page-as-mhtml \
	--run-all-compositor-stages-before-draw \
	--disable-checker-imaging \
	--disable-gpu \
	--dump-dom \
	file:///home/stefano/develop/GitHub/site/curriculum_ita.htm?print \
	> curriculum_ita_static.htm 


	# --virtual-time-budget=2500 \
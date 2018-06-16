#!/bin/bash

# Used:
# sudo PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false npm install -g chromehtml2pdf
# Note that parameters run-all..., disable-checke...,virtual-time..., fullPage... doesn't work as expected, 
# waiting for the complete rendering of page with javascript post operation
echo "Creatin pdf"
chromehtml2pdf \
	--headless \
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
# chromehtml2pdf --out=zs_anonymouse_cv_ita.pdf --executablePath=/usr/bin/chromium-browser --marginTop=0.7cm --marginBottom=0.7cm --marginLeft=0.9cm --marginRight=0.9cm --printBackground=true file:///home/stefano/develop/GitHub/site/curriculum_ita.htm?anonymouse
# chromehtml2pdf --out=zaglio_stefano_cv_prjs_ita.pdf --executablePath=/usr/bin/chromium-browser --marginTop=0.7cm --marginBottom=0.7cm --marginLeft=0.9cm --marginRight=0.9cm --printBackground=true file:///home/stefano/develop/GitHub/site/curriculum_ita.htm?projects
echo "Creating static version"
chromium-browser \
	--headless \
	--save-page-as-mhtml \
	--run-all-compositor-stages-before-draw \
	--disable-checker-imaging \
	--disable-gpu \
	--virtual-time-budget=2500 \
	--dump-dom \
	file:///home/stefano/develop/GitHub/site/curriculum_ita.htm?print \
	> curriculum_ita_static.htm 


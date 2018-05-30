#!/bin/bash

# Used:
# sudo PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false npm install -g chromehtml2pdf
chromehtml2pdf --out=zaglio_stefano_cv_ita.pdf --executablePath=/usr/bin/chromium-browser --marginTop=0.7cm --marginBottom=0.7cm --marginLeft=0.9cm --marginRight=0.9cm --printBackground=true file:///home/stefano/develop/GitHub/site/curriculum_ita.htm
# chromehtml2pdf --out=zs_anonymouse_cv_ita.pdf --executablePath=/usr/bin/chromium-browser --marginTop=0.7cm --marginBottom=0.7cm --marginLeft=0.9cm --marginRight=0.9cm --printBackground=true file:///home/stefano/develop/GitHub/site/curriculum_ita.htm?anonymouse
# chromehtml2pdf --out=zaglio_stefano_cv_prjs_ita.pdf --executablePath=/usr/bin/chromium-browser --marginTop=0.7cm --marginBottom=0.7cm --marginLeft=0.9cm --marginRight=0.9cm --printBackground=true file:///home/stefano/develop/GitHub/site/curriculum_ita.htm?projects



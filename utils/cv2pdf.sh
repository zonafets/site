#!/bin/bash

# Used:
# sudo PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false npm install -g chromehtml2pdf
# Note that parameters run-all..., disable-checke...,virtual-time..., fullPage... doesn't work as expected, 
# waiting for the complete rendering of page with javascript post operation

curDir=${PWD##*/}

echo ""
echo "Running from '$curDir'"
echo ""

if [ $curDir != "site" ] 
then
	echo "This util must be executed from 'home' (../site) directory."
	exit
fi


function printPDF() {

	chromehtml2pdf \
		--headless \
		--allow-file-access-from-files \
		--out=zaglio_stefano_cv_$2_$1.pdf \
		--run-all-compositor-stages-before-draw \
		--disable-checker-imaging \
		--disable-gpu \
		--virtual-time-budget=6000 \
		--executablePath=/usr/bin/chromium-browser \
		--marginTop=0.7cm --marginBottom=0.7cm --marginLeft=0.9cm --marginRight=0.9cm \
		--fullPage true \
		--printBackground=true \
		"file:///home/stefano/develop/GitHub/site/pages/curriculum.htm?print=true&lang=$1$3"

}

function join() {

	pdftk \
		zaglio_stefano_cv_cl_$1.pdf zaglio_stefano_cv_experiences_$1.pdf \
		cat output \
		zaglio_stefano_cv_$1.pdf

	rm zaglio_stefano_cv_cl_$1.pdf
	rm zaglio_stefano_cv_experiences_$1.pdf
}

echo ""
echo "Creating pdfs..."
echo ""

pushd download

echo ""
echo "Creating pdfs"
echo "-------------"
echo ""

echo "... cover letters"
echo ""

printPDF it cl
printPDF en cl

echo ""
echo "... details"
echo ""

printPDF it details "#details#projects"
printPDF en details "#details#projects"

printPDF it experiences "#details#experiences"
printPDF en experiences "#details#experiences"

echo ""
echo "... join of pdf letter and details by experiences and delete temps"
echo ""

join it
join en


#echo ""
#echo "Creating pdf for details ENG"
#echo ""
#
#chromium-browser \
#	--headless \
#	--allow-file-access-from-files \
#	--print-to-pdf=cv_eng.pdf \
#	--virtual-time-budget=5000 \
#	--run-all-compositor-stages-before-draw \
#	--disable-checker-imaging \
#	--disable-gpu \
#	"file:///home/stefano/develop/GitHub/site/pages/curriculum.htm?lang=en&print=true"

popd

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
	"file:///home/stefano/develop/GitHub/site/pages/curriculum.htm?print=true" \
	> pages/curriculum_static.htm 



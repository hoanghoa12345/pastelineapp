#!/bin/bash
npm run build

# check .build folder exists
if [ ! -d ".build" ]; then
rm -rf .build
fi
mkdir .build
# check temp folder exists
if [ ! -d "temp" ]; then
rm -rf temp
fi
mkdir temp
cd .build
mkdir src
cp -r ../dist/* ./src/
cp ../package.json ./

npm install --omit=dev
# check if zip exists and using zip to zip up lambda else using 7z
if [ -f "c:/Program Files/7-Zip/7z.exe" ]; then
    c:/Program\ Files/7-Zip/7z.exe a ../temp/lambda.zip *
else 
    zip -r ../temp/lambda.zip *
fi
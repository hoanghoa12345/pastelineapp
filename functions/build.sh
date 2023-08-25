#!/bin/bash
npm run build

rm -rf .build
mkdir .build
rm -rf temp
mkdir temp
cd .build
mkdir src
cp -r ../dist/* ./src/
cp ../package.json ./

npm install --omit=dev

if [ -f "c:/Program Files/7-Zip/7z.exe" ]; then
    c:/Program\ Files/7-Zip/7z.exe a ../temp/lambda.zip *
else 
    zip -r ../temp/lambda.zip *
fi
#!/bin/bash
npm run build

rm -rf .build
rm -rf temp
mkdir .build
mkdir temp
cd .build
mkdir src
cp -r ../dist/* ./src/
cp ../package.json ./

npm install --omit=dev
c:/Program\ Files/7-Zip/7z.exe a ../temp/lambda.zip *
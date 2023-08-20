npm run build
Remove-Item -Recurse -Force .build
Remove-Item -Recurse -Force temp
New-Item -ItemType Directory -Path .build
New-Item -ItemType Directory -Path temp
Set-Location .build
New-Item -ItemType Directory -Path src 
Copy-Item -Recurse ../dist/* ./src/
Copy-Item ../package.json ./
npm install --omit=dev --loglevel=error
Compress-Archive -Path * -DestinationPath ../temp/lambda.zip
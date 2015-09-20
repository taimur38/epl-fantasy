npm run build
docker build -t epl-frontend .
docker kill epl--frontend
docker rm epl--frontend
docker run -d -p 8008:80 --name epl--frontend epl-frontend

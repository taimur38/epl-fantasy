docker build -t epl-backend .
docker kill epl--backend
docker rm epl--backend
docker run -d -p 8080:5000 --name epl--backend epl-backend

pushd /home/ec2-user/larsjohansen-com/backend
docker build -t larsjohansen-backend:latest .
docker compose down
docker compose -p larsjohansen-backend up -d
docker image prune -a -f
popd
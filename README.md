# vvdev_testTask

Взаимодействие с сервером веду используя curl

curl -X POST -H "Content-Type: application/json" -d '{"name": "name"}' http://localhost:{port}/pet

curl -X POST -H "Content-Type: application/json" http://localhost:{port}/pet/feed

curl -X POST -H "Content-Type: application/json" http://localhost:{port}/pet/health

curl -X POST -H "Content-Type: application/json" http://localhost:{port}/pet/play

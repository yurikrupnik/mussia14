minikube start
#minikube addons enable gcp-auth
#minikube addons enable metrics-server
#minikube addons enable dashboard
minikube addons enable ingress
#helm install redis-release bitnami/redis
#echo $pwd
kubectl apply -f ../secrets.yaml
kubectl apply -f ../ingress1.yaml
kubectl apply -f ../api.yaml
kubectl apply -f ../users-tcp.yaml
kubectl apply -f ../users-redis.yaml
kubectl apply -f ../web-nest.yaml
#minikube service kubernetes-dashboard --namespace kubernetes-dashboard

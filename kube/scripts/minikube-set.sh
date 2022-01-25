minikube start
echo finished minikube init
minikube addons enable gcp-auth
echo finished enabling gcp-auth
minikube addons enable metrics-server
echo finished enabling metrics-server
minikube addons enable dashboard
echo finished enabling dashboard
minikube addons enable ingress
echo finished enabling ingress
kubectl apply -f kube/api.yaml
echo finished enabling api
minikube service kubernetes-dashboard --namespace kubernetes-dashboard

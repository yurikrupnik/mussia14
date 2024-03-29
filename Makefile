GCP_PROJECT:=$(gcloud config get-value project)


define get-secret
$(shell gcloud secrets versions access latest --secret=MONGO_URI --project=mussia14)
endef


# gcloud start
gcp-once:
	echo $(GCP_PROJECT)
	echo $GCP_PROJECT
	#gcloud services enable cloudfunctions.googleapis.com
# gcloud end

# NX start
ra:
	#call geg-secret
#	DB=$(call get-secret,$(MONGO_URI))
#	echo $GCP_PROJECT
#	echo $DB
	npx nx run-many --target=${target} --parallel --all --maxParallel=10
  # example to run: make ra target=lint

run-many:
	npx nx run-many --target=${target} --projects=${projects} --parallel=true --maxParallel=10

graph:
	npx nx dep-graph
affected-graph:
	npx nx affected:dep-graph
# NX end

build-nx:
	docker-compose -f docker-compose.nx.yml build --force-rm

rebuild-nx-docker:
	docker rmi eu.gcr.io/mussia8/nx
	make build-nx

to-kube:
	kompose convert

# Kubectl start
once:
	gcloud alpha artifacts packages list --limit=5 --repository=eu.gcr.io --location=europe


kind-cluster:
	kind create cluster
	kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml
	kubectl apply -f kube/api.yaml

kind-cluste-down:
	kind delete cluster

minikube-cluster:
	bash kube/scripts/minikube-set.sh
	#minikube start
	#minikube addons enable gcp-auth
#	minikube addons enable ingress
#	minikube addons enable metrics-server
#	minikube addons enable dashboard
#	minikube addons enable gcp-auth
#	minikube service kubernetes-dashboard --namespace kubernetes-dashboard &
	#minikube service api-service

kube-stop:
	minikube stop
	minikube delete

kube-start:
	minikube start
	kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=<path/to/.docker/config.json> \
    --type=kubernetes.io/dockerconfigjson
	minikube addons enable ingress
	minikube addons enable metrics-server
	minikube addons enable dashboard
	TOKEN=$(kubectl describe secret -n kube-system $(kubectl get secrets -n kube-system | grep default | cut -f1 -d ' ') | grep -E '^token' | cut -f2 -d':' | tr -d '\t' | tr -d " ")
	kubectl create secret docker-registry cfcr\
		--docker-server=registry.hub.docker.com/ \
		--docker-username=yurikrupnik \
		--docker-password=WAG0jech7jes-clic  \
		--docker-email=krupnik.yuri@gmail.com
	kubectl apply -f kube/deployment.yaml
	minikube service nginx-serivce --url
	minikube service web-service
	kubectl get all -l app=nginx
	minikube dashboard
	minikube ssh
	# auth part

kube-secret:
	kubectl get secrets

docker-config:
	gcloud iam service-accounts list
	scp -i $(minikube ssh-key) docker@$(minikube ip):.docker/config.json .docker/config.json
# Kubectl end

# k3s start

# k3s end

# Docker helpers

# clean running images
docker-clean:
	docker rm $(docker ps -aq)

deploy-cluster-example:
	gcloud beta container --project "mussia8" clusters create "cost-optimized-cluster-1" \
  --zone "europe-west1-d" --no-enable-basic-auth --cluster-version \
  "1.20.10-gke.1600" --release-channel "regular" --machine-type \
  "e2-medium" --image-type "COS_CONTAINERD" --disk-type "pd-standard" \
  --disk-size "100" --metadata disable-legacy-endpoints=true \
  --scopes "https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append" \
  --max-pods-per-node "110" --num-nodes "3" --logging=SYSTEM,WORKLOAD --monitoring=SYSTEM \
  --enable-ip-alias --network "projects/mussia8/global/networks/default" --subnetwork \
  "projects/mussia8/regions/europe-west1/subnetworks/default" --no-enable-intra-node-visibility \
  --default-max-pods-per-node "110" --enable-autoscaling --min-nodes "0" --max-nodes "3" \
  --no-enable-master-authorized-networks --addons HorizontalPodAutoscaling,HttpLoadBalancing,GcePersistentDiskCsiDriver \
  --enable-autoupgrade --enable-autorepair --max-surge-upgrade 1 --max-unavailable-upgrade 0 \
  --enable-autoprovisioning --min-cpu 2 --max-cpu 6 --min-memory 8 --max-memory 24 --enable-autoprovisioning-autorepair \
  --enable-autoprovisioning-autoupgrade --autoprovisioning-max-surge-upgrade 1 \
  --autoprovisioning-max-unavailable-upgrade 0 --autoscaling-profile optimize-utilization \
  --enable-vertical-pod-autoscaling --resource-usage-bigquery-dataset "nternal_gke" \
  --enable-resource-consumption-metering \
  --enable-shielded-nodes --node-locations "europe-west1-d"


helm-values:
	helm show values bitnami/grafana


docker-build:
	docker-compose -f docker-compose.nx.yml build
	GITHUB_REF=master npx nx run-many --parallel 10 --all --target=docker

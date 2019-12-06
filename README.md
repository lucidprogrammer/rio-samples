
# Example for using rio to watch a repo


Rio brings up the service [definition](deployments/my-stack.yaml). Compare it with the complexity of the various yamls. With the ability to do an end to end CI/CD, it makes it easy for apps in K8s.

Refer to riofile [README](https://github.com/rancher/rio/blob/master/docs/riofile.md) for detailed documentation.

```bash
namespace=something
kubectl create namespace ${namespace}
# based on your situation, you may have application level secrets to be created
# kubectl apply -f deployments/secrets
# if you have a private git repo, docker registry, you can use the above approach or you can create them using rio itself
# if you have build instructions and want to push to a private registry
# rio secrets create --docker
# since you wish to watch a repo for changes on the stack definition, rio must have the ability to create a webhook in your repository
# rio secrets create --github-webhook 
# try rio secrets create --help to see other options.
# make sure you pass --build-clone-secret gitcredential if you are having a private git repo
gituser=lucidprogrammer
rio -n ${namespace} up --name somename  --push-registry-secret dockerconfig \
    --file deployments/my-stack.yaml --build-webhook-secret githubtoken\
    --answers deployments/values-my-stack.json https://github.com/${gituser}/rio-samples.git

# you should be able to see the autoscaling in action with the following

hey -z 600s -c 60 endpointurlofweb1service
```
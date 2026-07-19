import SiteHeader from '../../../components/site-header';

const groups = [
  ['Git', ['git status', 'git switch -c feature/name', 'git add .', 'git commit -m "message"', 'git pull --rebase', 'git push -u origin feature/name']],
  ['Docker', ['docker build -t osb-web:local .', 'docker images', 'docker run --rm -p 3000:3000 osb-web:local', 'docker ps', 'docker logs <container>', 'docker exec -it <container> sh']],
  ['Terraform', ['terraform fmt -recursive', 'terraform init', 'terraform validate', 'terraform plan', 'terraform apply', 'terraform output']],
  ['Kubernetes', ['kubectl get nodes', 'kubectl get pods -A', 'kubectl describe pod <name>', 'kubectl logs <pod>', 'kubectl apply -f manifest.yaml', 'kubectl rollout status deployment/<name>']],
  ['Azure CLI', ['az login', 'az account show', 'az group list -o table', 'az acr list -o table', 'az aks list -o table', 'az monitor activity-log list --max-events 10']],
];

export default function CommandsPage() {
  return <><SiteHeader/><main><section className="pageHero compactHero"><p className="eyebrow">Command reference</p><h1>Use commands with intent, not from memory alone.</h1><p className="lead">For every command, explain what state it reads or changes, what evidence confirms success, and how you would recover from failure.</p></section><section className="section"><div className="grid">{groups.map(([title, commands]) => <article className="card" key={title as string}><h2>{title}</h2><div className="commandList">{(commands as string[]).map(command => <code key={command}>{command}</code>)}</div></article>)}</div></section></main></>;
}

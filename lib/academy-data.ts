export type AcademyTopic = {
  slug: string;
  title: string;
  summary: string;
  outcomes: string[];
  practice: string;
  interview: string;
};

export type Academy = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  audience: string;
  topics: AcademyTopic[];
};

const topic = (
  slug: string,
  title: string,
  summary: string,
  outcomes: string[],
  practice: string,
  interview: string,
): AcademyTopic => ({ slug, title, summary, outcomes, practice, interview });

export const academies: Academy[] = [
  {
    slug: 'azure',
    name: 'Azure Academy',
    eyebrow: 'Batch 01 · Cloud platform',
    description: 'Build practical Azure capability from core services through secure enterprise landing zones.',
    audience: 'Cloud engineers, infrastructure architects and platform teams',
    topics: [
      topic('fundamentals','Azure Fundamentals','Understand subscriptions, regions, resource groups and the shared-responsibility model.',['Explain the Azure hierarchy','Choose regions and availability options','Estimate service responsibility boundaries'],'Map a sample company into management groups, subscriptions and resource groups.','How would you separate production, non-production and shared services?'),
      topic('administrator','Azure Administrator','Operate identities, compute, storage, networking and governance controls.',['Manage resources safely','Apply RBAC and policy','Troubleshoot common operational failures'],'Build an operations checklist for a three-tier application.','A VM is unreachable after a network change. What do you check first?'),
      topic('architecture','Azure Architecture','Design resilient, scalable and supportable cloud solutions.',['Capture requirements and constraints','Select appropriate platform services','Document trade-offs and failure modes'],'Create a high-level design for a business-critical web platform.','When would you prefer PaaS over IaaS?'),
      topic('security','Azure Security','Apply defence-in-depth across identity, network, data and workloads.',['Use Zero Trust principles','Design security controls by layer','Plan detection and response'],'Threat-model an internet-facing Azure application.','How do Managed Identity and Key Vault reduce secret risk?'),
      topic('networking','Azure Networking','Design VNets, routing, private access, DNS, load balancing and hybrid connectivity.',['Plan IP address space','Control traffic paths','Troubleshoot DNS and routing'],'Design hub-and-spoke connectivity with private endpoints.','Why can forced tunnelling break a managed service?'),
      topic('storage','Azure Storage','Choose and secure Blob, Files, Disks, queues and lifecycle controls.',['Match storage type to workload','Design redundancy and recovery','Control access and cost'],'Create a storage decision matrix for backup, application data and file shares.','Compare LRS, ZRS, GRS and GZRS.'),
      topic('compute','Azure Compute','Select VMs, App Service, Functions, Container Apps and AKS.',['Compare compute models','Plan scaling and availability','Understand operational burden'],'Choose compute for three workloads with different latency and control needs.','What drives a decision between Container Apps and AKS?'),
      topic('identity','Azure Identity','Use Entra ID, RBAC, PIM, Conditional Access and workload identities.',['Separate authentication and authorization','Design privileged access','Reduce standing permissions'],'Create a least-privilege access model for platform operations.','How does PIM reduce privileged-access risk?'),
      topic('landing-zones','Azure Landing Zones','Establish enterprise-scale identity, networking, governance and platform foundations.',['Explain platform and application landing zones','Apply policy-driven guardrails','Plan subscription vending'],'Design a landing-zone backlog for a new enterprise tenant.','What must exist before application teams onboard?'),
      topic('governance','Azure Governance','Control standards, cost, compliance and change using policy, tags and management groups.',['Create enforceable guardrails','Design exception handling','Measure compliance'],'Write five policies for a regulated production estate.','When should policy audit rather than deny?'),
    ],
  },
  {
    slug: 'terraform',
    name: 'Terraform Academy',
    eyebrow: 'Batch 02 · Infrastructure as code',
    description: 'Move from basic HCL to reusable, governed and production-safe Terraform delivery.',
    audience: 'Cloud, DevOps and platform engineers',
    topics: [
      topic('basics','Terraform Basics','Understand providers, resources, data sources and the plan/apply lifecycle.',['Read HCL confidently','Predict plan behaviour','Separate configuration from state'],'Provision a resource group and storage account in a disposable environment.','What is the difference between a resource and a data source?'),
      topic('state','Terraform State','Protect state, locking and drift detection in team environments.',['Explain state sensitivity','Configure remote state','Recover from locking and drift issues'],'Design an Azure Storage backend with locking and restricted access.','Why must state never be treated as a normal source file?'),
      topic('modules','Terraform Modules','Build reusable interfaces without hiding critical infrastructure behaviour.',['Define clean inputs and outputs','Version modules','Test module contracts'],'Create a reusable network module with validation.','What makes a module too generic?'),
      topic('variables','Variables and Validation','Use types, validation, locals and outputs to create safe module contracts.',['Model complex inputs','Reject invalid plans early','Avoid duplicated expressions'],'Add validation rules to a production workload module.','When should you use locals instead of variables?'),
      topic('workspaces','Environments and Workspaces','Separate environments safely and understand the limits of CLI workspaces.',['Compare separation models','Prevent cross-environment impact','Select repository boundaries'],'Propose environment isolation for dev, test and production.','Why are workspaces not always sufficient for production separation?'),
      topic('azure-provider','Azure Provider','Authenticate securely and provision Azure resources with azurerm and azapi.',['Use workload identity','Manage provider features','Handle unsupported API capability'],'Configure OIDC authentication from GitHub Actions to Azure.','When would you use AzAPI alongside AzureRM?'),
      topic('best-practices','Production Practices','Apply formatting, validation, policy, testing, reviews and controlled applies.',['Build a quality gate','Limit blast radius','Plan rollback and recovery'],'Create a pull-request pipeline with plan review and protected apply.','Why should production apply run from automation?'),
      topic('interview','Terraform Interviews','Explain state, modules, dependencies, imports and failure recovery clearly.',['Answer scenario questions','Describe trade-offs','Use evidence-based troubleshooting'],'Practise ten senior Terraform scenarios.','How would you recover from a partially failed apply?'),
      topic('labs','Terraform Labs','Build progressively from local experimentation to remote, modular delivery.',['Complete guided labs','Capture evidence','Explain each design decision'],'Deploy a modular Azure workload using remote state and CI.','What did your lab prove beyond successful deployment?'),
    ],
  },
  {
    slug: 'kubernetes',
    name: 'Kubernetes & AKS Academy',
    eyebrow: 'Batch 03 · Container orchestration',
    description: 'Understand Kubernetes control loops, workload primitives and production AKS operations.',
    audience: 'DevOps, SRE and platform engineers',
    topics: [
      topic('architecture','Kubernetes Architecture','Understand API server, scheduler, controllers, etcd, kubelet and reconciliation.',['Explain desired state','Trace a deployment request','Locate control-plane responsibility'],'Trace what happens after kubectl apply.','Why is Kubernetes described as a reconciliation system?'),
      topic('pods','Pods','Use the smallest deployable unit correctly and understand lifecycle behaviour.',['Read pod status','Design probes','Handle resources and termination'],'Create a pod with readiness, liveness and resource limits.','Why should most production pods not be created directly?'),
      topic('replicasets','ReplicaSets','Understand replica control and why deployments normally own ReplicaSets.',['Explain replica reconciliation','Inspect ownership','Diagnose unavailable replicas'],'Scale a workload and inspect ownership references.','What happens when a pod managed by a ReplicaSet is deleted?'),
      topic('deployments','Deployments','Perform rolling releases, rollbacks and controlled application updates.',['Configure rollout strategy','Read rollout status','Recover safely'],'Deploy two versions and roll back after a simulated failure.','How do maxSurge and maxUnavailable affect risk?'),
      topic('daemonsets','DaemonSets','Run node-level agents for logging, networking and security.',['Identify valid use cases','Control scheduling','Plan safe updates'],'Design a node-monitoring DaemonSet.','Why is a DaemonSet unsuitable for a normal web API?'),
      topic('statefulsets','StatefulSets','Manage stable identity, ordered rollout and persistent storage.',['Explain stable identity','Plan storage','Understand operational constraints'],'Model a three-replica stateful service.','When should state remain outside Kubernetes?'),
      topic('services','Services','Provide stable discovery using ClusterIP, NodePort and LoadBalancer.',['Select service types','Trace traffic','Debug endpoints'],'Expose an internal API and inspect EndpointSlices.','Why can a Service exist while traffic still fails?'),
      topic('ingress','Ingress','Route external HTTP traffic with controllers, TLS and host/path rules.',['Separate resource and controller','Configure TLS','Troubleshoot routing'],'Publish two applications through one ingress controller.','What is the difference between Ingress and an ingress controller?'),
      topic('volumes','Volumes','Use ephemeral and persistent storage with PVs, PVCs and storage classes.',['Select access modes','Understand dynamic provisioning','Plan backup'],'Provision a PVC-backed workload in AKS.','Why does storage architecture vary by workload?'),
      topic('configmaps','ConfigMaps','Externalise non-secret application configuration safely.',['Inject configuration','Plan reload behaviour','Avoid environment coupling'],'Move application settings from an image into a ConfigMap.','Does updating a ConfigMap automatically restart pods?'),
      topic('secrets','Secrets','Handle sensitive configuration while recognising base64 is not encryption.',['Reduce secret exposure','Use external secret stores','Control RBAC'],'Integrate AKS workload identity with Key Vault.','Why are native Secrets alone insufficient for many enterprises?'),
      topic('aks','AKS Operations','Operate node pools, upgrades, identity, networking, policy and monitoring.',['Plan cluster topology','Manage upgrades','Integrate Azure controls'],'Create an AKS production-readiness checklist.','How do you reduce risk during an AKS upgrade?'),
      topic('troubleshooting','Kubernetes Troubleshooting','Use events, logs, describe, probes, DNS and network checks systematically.',['Follow a diagnostic order','Separate app and platform faults','Collect evidence'],'Diagnose CrashLoopBackOff, Pending and failed service connectivity.','What is your first five-minute Kubernetes triage sequence?'),
    ],
  },
  {
    slug: 'github-actions',
    name: 'GitHub Actions Academy',
    eyebrow: 'Batch 04 · CI/CD automation',
    description: 'Design secure, reusable and observable GitHub Actions delivery workflows.',
    audience: 'Developers, DevOps engineers and platform teams',
    topics: [
      topic('workflow-syntax','Workflow Syntax','Understand triggers, jobs, steps, runners and dependencies.',['Read YAML workflows','Control job order','Use permissions explicitly'],'Build a CI workflow with lint, test and package jobs.','What is the difference between a job and a step?'),
      topic('contexts','Contexts','Use github, env, vars, secrets, needs, matrix and runner data correctly.',['Select the right context','Avoid unsafe interpolation','Pass job outputs'],'Display safe diagnostic context values in a test workflow.','Why can context usage become a security risk?'),
      topic('expressions','Expressions','Apply conditions, functions and status checks predictably.',['Write if conditions','Use success and failure semantics','Avoid truthiness mistakes'],'Add conditional deployment and cleanup jobs.','When should always() be used carefully?'),
      topic('secrets','Secrets and Variables','Separate configuration from sensitive values and scope access tightly.',['Use environments','Limit secret exposure','Prefer OIDC where possible'],'Replace a cloud service principal secret with OIDC.','Why are repository secrets often too broadly scoped?'),
      topic('artifacts','Artifacts','Publish build outputs and transfer evidence between jobs.',['Upload artifacts','Control retention','Avoid confusing artifacts and caches'],'Package a static site and deploy the exact artifact.','Why is immutable artifact promotion safer than rebuilding?'),
      topic('caching','Caching','Accelerate dependencies without treating cache as a deployment artifact.',['Choose cache keys','Handle invalidation','Measure benefit'],'Add dependency caching with a lock-file key.','What causes stale-cache failures?'),
      topic('matrices','Matrix Builds','Test multiple versions and platforms efficiently.',['Generate matrices','Control fail-fast','Limit cost'],'Test an application across multiple Node versions.','When does a matrix create unnecessary complexity?'),
      topic('reusable-workflows','Reusable Workflows','Centralise governed workflow logic across repositories.',['Define inputs and secrets','Version workflows','Balance reuse and flexibility'],'Create a reusable deployment workflow for several services.','How do you prevent breaking all consumers?'),
      topic('composite-actions','Composite Actions','Package repeated step logic without creating a full reusable workflow.',['Choose the right reuse mechanism','Define inputs and outputs','Test locally'],'Create a composite setup-and-validate action.','Composite action or reusable workflow—which fits and why?'),
      topic('oidc','OIDC Federation','Use short-lived cloud credentials instead of stored secrets.',['Explain trust federation','Configure claims','Restrict identities'],'Configure GitHub-to-Azure workload identity federation.','How do subject claims limit token abuse?'),
      topic('deployments','Environments and Deployments','Use protected environments, approvals and concurrency for controlled releases.',['Add approval gates','Prevent overlapping deploys','Record deployment state'],'Create staging and production environments with approval.','Where should manual approval exist in a mature pipeline?'),
    ],
  },
  {
    slug: 'azure-devops',
    name: 'Azure DevOps Academy',
    eyebrow: 'Batch 05 · Enterprise delivery',
    description: 'Use Azure Boards, Repos, Pipelines, Artifacts and environments as one delivery system.',
    audience: 'Delivery teams, DevOps engineers and technical leads',
    topics: [
      topic('boards','Azure Boards','Plan epics, features, stories, tasks and defects with useful flow metrics.',['Design a work hierarchy','Use queries and dashboards','Limit work in progress'],'Create a delivery board for a platform release.','How do you stop Boards becoming administrative overhead?'),
      topic('repos','Azure Repos','Apply branching, reviews, policies and repository governance.',['Protect main','Configure reviewers','Use traceable commits'],'Define branch policies for a production repository.','Trunk-based or GitFlow—which fits your release model?'),
      topic('pipelines','Azure Pipelines','Build multi-stage YAML pipelines with templates, conditions and artifacts.',['Structure stages','Use templates','Promote immutable artifacts'],'Create build, test, staging and production stages.','How do you separate build from deployment?'),
      topic('artifacts','Azure Artifacts','Host and govern packages and feeds.',['Publish packages','Control upstream sources','Manage versioning'],'Publish a package and consume it from another pipeline.','How do package feeds improve supply-chain control?'),
      topic('test-plans','Test Plans','Manage manual, exploratory and traceable testing.',['Link tests to requirements','Capture evidence','Plan regression coverage'],'Create a test plan for a major infrastructure change.','When is manual testing still essential?'),
      topic('release-pipelines','Release Pipelines','Understand classic releases while planning migration to YAML.',['Operate existing releases','Use environments and approvals','Plan migration'],'Document a classic-to-YAML migration approach.','What risks appear during pipeline migration?'),
      topic('yaml-pipelines','YAML Pipelines','Treat delivery logic as reviewed, versioned code.',['Use templates','Manage variables securely','Design stage dependencies'],'Create a reusable enterprise pipeline template.','Why is YAML not automatically DevOps maturity?'),
      topic('environments','Environments','Track deployments to logical targets with checks and history.',['Model deployment targets','Apply checks','Audit releases'],'Create protected staging and production environments.','How do environment checks differ from job conditions?'),
      topic('approvals','Approvals and Checks','Control risk without creating unnecessary queues.',['Place gates intentionally','Automate evidence','Define emergency paths'],'Design approval policy for normal and emergency changes.','Which controls should be automated rather than manual?'),
      topic('agents','Self-hosted Agents','Operate secure, scalable and disposable build capacity.',['Harden agents','Manage pools','Avoid credential persistence'],'Design an ephemeral self-hosted agent model.','What makes long-lived agents risky?'),
    ],
  },
  {
    slug: 'docker',
    name: 'Docker Academy',
    eyebrow: 'Batch 06 · Containers',
    description: 'Build secure, efficient images and operate containers predictably across environments.',
    audience: 'Developers, DevOps engineers and application support teams',
    topics: [
      topic('dockerfile','Dockerfile','Create deterministic, maintainable build instructions.',['Order layers effectively','Pin dependencies','Use non-root runtime'],'Write a production Dockerfile for a web application.','Why does instruction order affect cache and risk?'),
      topic('images','Images','Understand layers, tags, digests and registries.',['Inspect image history','Use immutable references','Reduce image size'],'Compare two image builds and explain layer changes.','Why should production deploy by digest?'),
      topic('containers','Containers','Run isolated processes with explicit configuration and limits.',['Understand lifecycle','Set resources','Handle signals'],'Run and gracefully stop an application container.','What actually makes a container different from a VM?'),
      topic('volumes','Volumes','Persist data outside disposable container filesystems.',['Select volume types','Plan ownership','Back up data'],'Persist database data and test container recreation.','Why should application state not depend on the writable layer?'),
      topic('networks','Networks','Connect containers with DNS-based discovery and controlled exposure.',['Use bridge networks','Publish ports safely','Troubleshoot connectivity'],'Connect frontend and API services on a custom network.','What is the difference between expose and publish?'),
      topic('compose','Docker Compose','Model multi-container development and test environments.',['Define services','Use health checks','Manage dependencies'],'Create a local application stack with API and database.','Why is depends_on not always readiness?'),
      topic('registry','Registries','Store, scan, sign and promote images.',['Authenticate securely','Design retention','Promote immutable images'],'Push an image to ACR and deploy by digest.','How do you prevent untrusted images reaching production?'),
      topic('security','Container Security','Reduce privileges, vulnerabilities and supply-chain risk.',['Use minimal bases','Drop capabilities','Scan and sign images'],'Harden a deliberately insecure Dockerfile.','What are the highest-value container hardening controls?'),
      topic('optimization','Image Optimisation','Improve build speed, image size and runtime efficiency.',['Use multi-stage builds','Optimise cache','Remove build-only content'],'Reduce an oversized image and measure the result.','When does image-size optimisation become counterproductive?'),
    ],
  },
  {
    slug: 'platform-engineering',
    name: 'Platform Engineering Academy',
    eyebrow: 'Batch 07 · Internal platforms',
    description: 'Design an internal platform that improves developer flow without removing necessary control.',
    audience: 'Platform engineers, architects and engineering leaders',
    topics: [
      topic('golden-paths','Golden Paths','Provide paved workflows for common delivery journeys.',['Identify high-value paths','Encode standards','Allow justified escape routes'],'Design a golden path for a containerised API.','How do you avoid turning a golden path into a rigid mandate?'),
      topic('developer-portal','Developer Portal','Create a discoverable front door for services, templates and documentation.',['Define portal outcomes','Integrate ownership data','Measure adoption'],'Sketch a portal information architecture.','Why does a portal fail without accurate service ownership?'),
      topic('idp','Internal Developer Platform','Combine capabilities, APIs and workflows into a product for engineers.',['Treat platform as product','Define platform APIs','Manage lifecycle'],'Create a platform capability map and roadmap.','What distinguishes an IDP from a collection of tools?'),
      topic('backstage','Backstage','Use catalog, templates, docs and plugins to build a developer portal.',['Model catalog entities','Create software templates','Govern plugin growth'],'Create a sample service catalog model.','What operational burden does Backstage introduce?'),
      topic('gitops','GitOps','Use Git as declared operational intent with automated reconciliation.',['Explain reconciliation','Design promotion','Handle secrets and emergencies'],'Design GitOps delivery for Kubernetes environments.','How is GitOps different from simply deploying from Git?'),
      topic('argocd','Argo CD','Operate declarative Kubernetes delivery with health, sync and drift visibility.',['Configure applications','Plan sync policy','Manage multi-cluster delivery'],'Model an app-of-apps or ApplicationSet approach.','When should automated sync be disabled?'),
      topic('fluxcd','Flux CD','Build composable GitOps reconciliation using Flux controllers.',['Understand sources and kustomizations','Manage Helm releases','Design tenancy'],'Create a Flux repository layout for multiple environments.','Argo CD or Flux—which operational model fits your team?'),
    ],
  },
  {
    slug: 'finops',
    name: 'FinOps Academy',
    eyebrow: 'Batch 08 · Cloud economics',
    description: 'Connect engineering decisions with cloud value, accountability and sustainable cost control.',
    audience: 'Cloud engineers, architects, product owners and finance partners',
    topics: [
      topic('cost-optimization','Cost Optimisation','Reduce waste while protecting reliability and delivery outcomes.',['Identify idle and oversized resources','Prioritise by value','Validate savings safely'],'Create a cost-optimisation backlog with risk ratings.','How do you avoid cost cutting that damages resilience?'),
      topic('budgets','Budgets and Alerts','Create early-warning controls rather than after-the-fact reporting.',['Set meaningful scopes','Define thresholds','Route accountable alerts'],'Design budgets for platform and application subscriptions.','Why are budget alerts not hard spending limits?'),
      topic('advisor','Azure Advisor','Use recommendations as evidence, not automatic truth.',['Interpret recommendations','Validate context','Track actions'],'Review a set of recommendations and accept or reject each with rationale.','When should an Advisor recommendation be ignored?'),
      topic('reservations','Reservations','Commit predictable usage for discounts with ownership and utilisation controls.',['Identify stable demand','Model commitment risk','Track utilisation'],'Evaluate a reservation candidate using historical demand.','What happens when organisational ownership changes?'),
      topic('savings-plans','Savings Plans','Apply flexible compute commitments across eligible usage.',['Compare commitment options','Forecast spend','Monitor coverage'],'Compare a savings plan with reservations for mixed compute.','What workload profile favours a savings plan?'),
      topic('tagging','Tagging Strategy','Create reliable allocation metadata with policy and automation.',['Define mandatory tags','Handle inherited data','Measure compliance'],'Design a tag schema for owner, product, environment and cost centre.','Why does manual tagging degrade quickly?'),
      topic('governance','FinOps Governance','Embed cost into architecture, delivery and operational decisions.',['Define accountability','Create review cadences','Integrate cost into CI/CD'],'Add cost checks to an architecture and release process.','Who owns cloud cost—the platform team or product team?'),
    ],
  },
];

export const academyMap = Object.fromEntries(academies.map((academy) => [academy.slug, academy])) as Record<string, Academy>;

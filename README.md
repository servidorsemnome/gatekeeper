# ⛩️ Gatekeeper

Access grant manager – the broker between the Kratos and Atreus services

**Running**

🚨 Make sure both [kratos-iam-svc](https://github.com/servidorsemnome/kratos-iam-svc) and the [website](https://github.com/servidorsemnome/website) are already running.

```sh
yarn
yarn prisma generate
docker-compose up --build
```

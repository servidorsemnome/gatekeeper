<h1 align="center">
  <img src="https://i.imgur.com/cK9dU1t.png" />
  <br/>
  Gatekeeper
</h1>

<p align="center">
  Access grant manager — the broker between <a href="https://github.com/servidorsemnome/kratos-iam-svc">Kratos</a>, the IAM service, and Atreus, the auth plugin.
</p>

## Installing
**🚨 This requires both [Kratos](https://github.com/servidorsemnome/kratos-iam-svc) and the [website](https://github.com/servidorsemnome/website) to be running to work properly.**

Add this line to your `/etc/hosts` (Linux) or `%WinDir%\System32\Drivers\Etc\hosts` (Windows) file:
```sh
127.0.0.1 local.ssn.gg
```

Install the dependencies and setup Prisma:
```sh
yarn
yarn prisma generate
```

Copy the `.env.example` file, name it `.env` and fill it.

## Running

```sh
docker-compose up --build
```

Open [local.ssn.gg:3001](http://local.ssn.gg:3001) with your browser of choice.

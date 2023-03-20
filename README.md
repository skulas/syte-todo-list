# syte-todo-list
A basic todo list implemented in NestJS, Prisma.io, and React.js

## Architecture
- Three components<br>
Managed within a monolitic repository
    - _frontend_<Br>
    A [react](https://react.dev/) powered web application.
    - _backend_<br>
    The backend is writen in [NestJS](https://nestjs.com/).
    - _database_<br>
    PGSQL.<br>
    The database objects are wrapped by [prisma](https://www.prisma.io/) ORMs<br>
    The migrations folder is located in `<repo root>/backend/prisma/migrations`

## Setup
- Download the code from the [github repo](https://github.com/skulas/syte-todo-list)<br>
- Edit the `docker-compose.yml`
```
services:
  backend:
    build:
      context: <full path to syte-todo repo>/backend
      dockerfile: <full path to syte-todo repo>/Dockerfile.be
    ...

  frontend:
    build:
      context: <full path to syte-todo repo>/frontend
      dockerfile: <full path to syte-todo repo>/Dockerfile.fe
    ...

  db:
    image: postgres
    ...
    volumes:
      - <some path in the host machime>/postgresql/data
```
- 📝 Notes
    - The path `<some path in the host machime>/postgresql` must exist and be empty, the `data` directory is auto generated.
    - Make sure ports `5432`, `4000` and `3000` are free, as they are used by the db, fe and be respectively.
    - Make sure you don't have a postgres container up (as it might be using port `5432`)
- 🚧 Build 🚧<br>
  Open a terminal
    - Change directory to the root of `syte-todo` repo.
    - You may be required to allow execution of the `run` script.<br>
    In the repo/build directory run `chmod +x ./run.sh`
    - Build the docker images using docker compose:
    `docker-compose build --build-arg DB_HOST=db`
    - Run the project: `docker-compose up`

## Frontend
Navigate to `localhost:4000`<br>
Super advanced UI, from the best designers in Italy.<br>
Register / Login using email & password.<br>
Create tasks with name or just checkboxes, you are free!<br>
Tasks are saved as you go.<br>
Click logout when you are done.

## Backend
You can browse the APIs by visiting `localhost:4000/api`<br>
You can try the APIs using postman by importing the collection in the `backend` directory of the repo.

currently frontend isnt containerized, no need because of vite, also its early development (todo later before prod)

run backend+database (in root repository):

```
docker-compose up
```

no need to re-run after changes because of hot reloading. if something isnt working / did any importing or sth bigger try:

```
docker-compose down
docker-compose up --build
```

also remember about requirements.txt to add any new library

run frontend:

```
cd /frontend
npm install
npm run dev
```


now using:
python
fastapi
sqlalchemy
typescript
react
tailwindcss

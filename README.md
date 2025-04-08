## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Database set up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```

5. Assessment feedback

```
This was a lot of fun, trying to make something look good, and be optimal within a specific time period was challenging but a good time!

# If I had more time:

- I would probably make this a bit more scalable by utilizing something like zustand for state management. What I can see being the next steps would be to provide a contact form or integrate some type of scheduler like calendly

- Also when it comes to scalability, I would optimize the db queries, in the current scenario the table doesn't have too much data, but in the long run, as data grows, pagination on the backend would be necessary. For now, MUI's datagrid can handle frontend pagination.

- Unit tests, unit tests, unit tests
```

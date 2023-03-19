#!/bin/bash

# Wait for the database to be ready
while ! nc -z db 5432; do
  sleep 0.1
done

# Run the migrations
npx prisma migrate deploy
npx prisma generate

# Start the application
npm start
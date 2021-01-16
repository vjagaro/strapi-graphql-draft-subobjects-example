#!/bin/bash

npm install

echo "SQLite test..."
rm -rf .tmp
node test.js
rm -rf .tmp

# Test mysql
echo "MySQL test..."
DATABASE_CLIENT=mysql node test.js

# Test postgres
echo "PostgreSQL test..."
DATABASE_CLIENT=postgres node test.js

echo "Tests complete."

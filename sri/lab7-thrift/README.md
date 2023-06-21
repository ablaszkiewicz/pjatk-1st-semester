# How to run

Install dependencies:

```
npm install
```

Run server:

```
node src/server.js
```

Run client:

```
node src/client.js
```

# Expected result

Server

```
Server running on port 9090
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2
Cannot divide 10 by 0
```

Client

```
15
5
50
2
Received error from server: InvalidOperation: InvalidOperation
```

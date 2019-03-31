# Plant Watering Monitor system
Using Vue and Express with parcel.

## Local Development Setup

Clone the repo to your machine and change to the directory, then..
```
cp .env.example .env
npm install
npm install -g pm2
npm run dev     
```

## Local Development

```
npm run client:dev      // runs client in development mode
npm run server:dev      // runs server in development mode
npm run dev             // runs both client and server in development mode
```

## Build and Production

```
npm run prebuild        // delete built file (/dist)
npm run build           // build new client
```

```
npm run serve           // run application for production.
npm run client:prod     // run client in production mode.
npm run server:prod     // run server in production mode.
```

## Testing

```
npm run test            // run test with code coverage
```


# Pre-Requisites

## Install Rust

Follow - https://www.rust-lang.org/tools/install

## Install Node/npm

Follow - https://nodejs.org/en

## Install wasm-pack

Follow - https://rustwasm.github.io/wasm-pack/installer/

# Build `Blyss SDK` 

1. Clone `Blyss SDK`

```bash
git clone https://github.com/blyssprivacy/sdk.git
```

2. Install npm dependencies `sdk` root directory -

```bash
npm install
```

3. Build dependencies

```bash
npm run build
```

# Run `Blyss` PIR server

1. Go to `lib/server` directory.
2. Run - 
```bash
cargo run --release
```

This will run the Blyss Rust PIR server.

# Build and run our components

## Clone this repo - 

```bash
git clone https://github.com/FrailWords/blyss-pir.git
```

## Build and run the `ad-server`

1. Go to `ad-server` directory
2. Install npm dependencies - `npm install`
3. Run ad-server - `npm run start`

## Build and run the `pir`

1. Go to `pir` directory
2. Install npm dependencies - `npm install`
3. Run ad-server - `npm run start`

## Build and run the `app` - this is the front-end app

1. Go to `app` directory
2. Install npm dependencies - `npm install`
3. Run ad-server - `npm run start`

# Demo time

1. Add a new ad for 'health' category like this from the command-line -

```bash
curl -X POST http://localhost:8002/ad\?category\=health --data '{"img": "1.png"}' --header "content-type: application/json"
```

2. Query our PIR server to see if this shows up in the response - 

```bash
curl http://localhost:8001/ad\?category\=health
```

3. Click on the 'health' box in the React app and hopefully the ad should show up.
# dijido

Dijido is a Node.js web app for Kanban-style "To do" lists.

## Installation

### Get dependendencies

#### Node-sqit
This app relies on node server quick kit (node-sqit), which can be found here: https://github.com/dibidave/node-sqit. Make sure this is instaalled locally on the server, and available for npm linking.

#### MongoDB
This app also relies on MongoDB - make sure this is up and running on your server.

### Clone the repo
```
git clone https://github.com/dibidave/dijido.git
```

### Setup

```
cd dijido
npm install
npm link sqit
node <NODE_SQIT_DIR>\bin\setup.js .
```

## Running

```
./run_server.sh
```

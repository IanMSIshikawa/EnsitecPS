# EnsitecPS
This project use Node.js v20.11.1
## Project Setup
Check your node version, if your version is different of 20.11.1 run: 

```sh
nvm use v20.11.1
```
### Create database
Enter in project directory and login in MySQL 
```sh
mysql -p -u < your user >
```
Enter your password

```sh
source DDL.sql
```

## Package manager
use your favorite node package manager, you can use npm or yarn

### Yarn 
```sh
yarn install
```

### npm
```sh
npm install
```

### Running server

First, edit your user and password in server.js file.
In lines 9 and 10, put your mysql server user and password

#### Launching server
```sh
    cd src/
    node server.js
```

### Running app in browser 
Use yarn or npm to lauch 

#### Yarn
```sh
yarn dev
```

#### Npm
```sh
npm run dev
```

Finally, open the local host indicated in your terminal

## Fonts
https://vuejs.org/guide/introduction.html
https://stackoverflow.com/
https://chatgpt.com/





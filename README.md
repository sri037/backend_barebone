### Backend
#### Node.js applications

#### Development

###### Compile typescript to js
```
npm build
```
###### Perquisite
If you want to set environment. 
```
export BUILD_ENV=dev
``` 

###### Start server
```
npm run server
```

###### Running tests

```bash
npm test
```

### Linting

```
npm run lint
```

### Building a container

```
docker build
```

`tsc --watch` 
##### Above Script, compiles typescript into javascript and watch any changes (uses local tsconfig.json configuration)

`nodemon dist`
##### Above Script, Start node with debug (inspect) and in auto restart server when changes are made in dist folder.

 



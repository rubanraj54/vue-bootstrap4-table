
# vue-bootstrap4-table

> Advanced table based on Vue 2 and Bootstrap 4

[Quick Demo in Codepen](https://codepen.io/rubanraj54/full/zyZdzN).

[Docs in gitbook](https://rubanraj54.gitbook.io/vue-bootstrap4-table/). 

![Demo](https://raw.githubusercontent.com/rubanraj54/vue-bootstrap4-table/develop/src/assets/img/demo.gif)

# Features
* Multi column filtering (Optimized filtering)
* Single & Multi column sorting
* Pagination (True! It works out of the box intelligently)
* Pagination Information
* Checkbox selection for rows
* Highly customizable

# Installation
## Install via npm

**`$ npm i vue-bootstrap4-table --save`**

Currently this package will install only the vue-bootstrap4-table component, not their dependencies. So make sure to install the following dependencies.

### Dependencies

-   bootstrap 4 (js and css) You should include bootstrap before vue-bootstrap4-table plugin.
    

We are using **`lodash`** internally, so you don't need to install separately for this plugin.

## Install via CDN
```html
<link  rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"  crossorigin="anonymous">

...

<script  src="https://code.jquery.com/jquery-3.2.1.slim.min.js"  crossorigin="anonymous"></script>

<script  src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"  crossorigin="anonymous"></script>

<script  src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"  crossorigin="anonymous"></script>

...

<script  src="https://unpkg.com/vue-bootstrap4-table@1.0.7/dist/vue-bootstrap4-table.min.js"  crossorigin="anonymous"></script>
```
If you've included bootstrap & jQuery packages already in your project, then include only **vue-bootstrap4-table.min.js** script.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

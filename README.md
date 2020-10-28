# kuke

## run

```
deno run --allow-net --allow-read --allow-run kuke.ts
```

## bundle

```
deno bundle index.js > ./dist/bundle.js
```

## plugins

### systemjs

```
  <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.min.js"></script>
```

### ES6 Module

```
  <script src="https://cdn.bootcss.com/systemjs/6.2.6/extras/use-default.js"></script>
```

### Typescript

```
  <script src="https://cdn.jsdelivr.net/npm/systemjs-babel@0.2.2/dist/systemjs-babel.min.js"></script>

```

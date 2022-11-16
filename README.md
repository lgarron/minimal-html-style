# Minimal HTML `<style>`

An HTML style snippet that looks nice on all devices while being as small as possible.

## Snippet

Place in the `<head>` of a page:

```html
  <!-- From: https://github.com/lgarron/minimal-html-style -->
  <meta name="viewport" content="width=device-width, initial-scale=0.75">
  <style>
    html {
      font-family: -apple-system, Roboto, Ubuntu, Tahoma, sans-serif;
      font-size: 1.25rem; padding: 2em;
      display: grid; justify-content: center;
    }
    body { width: 100%; max-width: 40em; margin: 0; }
    @media (prefers-color-scheme: dark) {
      html { background: #000D; color: #EEE; }
      a { color: #669df5; }
      a:visited { color: #af73d5; }
    }
  </style>
```

See [`index.html`](./index.html) for more.

## Screenshots

### iOS

<img src="./screenshots/ios-safari-horizontal-dark.png" height="200">

<img src="./screenshots/iOS-safari-vertical-light.jpg" height="300">

### Android

<img src="./screenshots/android-chrome-light-landscape.png" height="200">

### Laptop

<img src="./screenshots/macOS-safari-medium_size-dark.png" height="400">

### Large screen (5K)

<img src="./screenshots/macOS-chrome-dark-5K.png" width="600">

### Narrow window

<img src="./screenshots/macOS-chrome-dark-tall.png" width="300">

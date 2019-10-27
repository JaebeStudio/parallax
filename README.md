# Jaebe Studio Parallax
JS module for parallax effect

## Usage
### Standard parallax
Parallax layer can be bigger than parent element

```html
<div class="parallax-container">
    <div class="parallax-layer"></div>
</div>
```

```javascript
    import Parallax from "jaebe-studio_parallax";

    var parallax = new Parallax(document.querySelector('.parallax-container'), {includeContainerHeight: true});
    parallax.addLayer(document.querySelector('.parallax-container .parallax-layer'), 1);
    parallax.start();
```

### Reversed parallax

```html
<div class="parallax-container">
    <div class="parallax-layer"></div>
</div>
```

```javascript
    import Parallax from "jaebe-studio_parallax";

    var parallax = new Parallax(document.querySelector('.parallax-container'), {includeContainerHeight: false});
    parallax.addLayer(document.querySelector('.parallax-container .parallax-layer'), -1);
    parallax.start();
```

## API

- constructor(container, options);
- addLayer(element, scrollMultiplier); // scrollMultiplier defines how fast and in which direction layer should move 
- start();
- stop();

## Options
```javascript
 let config = {
             includeContainerHeight: true
         }
```

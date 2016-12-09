# Blvr (Background Video Element Blur)
Blur behind your elements with an video backdrop in real time.
Name suggestions are very welcome.

### Usage
```html
<div id="my_container">
  <div class="blur">
    lorem ipsum dolor
  </div>
  <canvas id="background"></canvas>
</div>
```

args: canvas id, container id, elements to blur class name, blur ammount, video source
```javascript
var blvr = new Blvr('background', 'my_container', 'blur', 20,
					"path/to/video.mp4");
blvr.render();
```

### Requires
* [PixiJS v4](http://www.pixijs.com/)
* jQuery

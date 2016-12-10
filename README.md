# Flvr (Background Video Element Blur)
Blur behind your elements with an video backdrop in real time.

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
<<<<<<< HEAD
new Flvr('background', 'my_container', 'blur', 20, "/static/res/video/umbrella.mp4");
=======
var blvr = new Blvr('background', 'my_container', 'blur', 20, "path/to/video.mp4");
blvr.render();
>>>>>>> origin/master
```

### Requires
* [PixiJS v4](http://www.pixijs.com/)
* jQuery

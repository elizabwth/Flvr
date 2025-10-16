# Before the CSS Blur Filter Came Around, I nade this
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
new Flvr('background', 'my_container', 'blur', 20, "path/to/video.mp4");
```

### Requires
* [PixiJS v4](http://www.pixijs.com/)
* jQuery

### Videos

https://github.com/elizabwth/Flvr/blob/133ab9b7f84dfceb3b2d3cecf433774d315e06b5/demo-2016-12-08_13-12-13.webm

https://github.com/elizabwth/Flvr/blob/133ab9b7f84dfceb3b2d3cecf433774d315e06b5/demo-2016-11-08_15-08-07.webm

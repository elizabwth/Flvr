# Element Background Image Blur
Blur behind your elements with an image backdrop in real time.
Name suggestions are very welcome.

### Usage
Place image and canvas elements inside the element
you want to have an image background, assign them IDs.
```html
<div id="my_container">
  <div class="blur">
    lorem ipsum dolor
  </div>
  
  <img id="bg_img" src="myimage.jpg">
  <canvas id="background"></canvas>
</div>
```

args: canvas id, container id, elements to blur class name, blur ammount, video source
```javascript
var blvr = new Blvr('background', 'my_container', 'blur', 20,
					"/static/res/video/umbrella.mp4");
blvr.render();
```

### Requires
* [PixiJS v4](http://www.pixijs.com/)
* jQuery

# Element Background Image Blur
Blur behind your elements with an image backdrop in real time.
Name suggestions are very welcome.

### Usage
Place image and canvas elements inside the element
you want to have an image background, assign them IDs.
```html
<div class="my_container">
  <div class="this-will-have-a-blurred-backdrop">
    lorem ipsum dolor
  </div>
  
  <img id="bg_img" src="myimage.jpg">
  <canvas id="background"></canvas>
</div>
```

args: canvas id, image id, elements to blur class name, blur ammount
```javascript
var Blur = new ElementBackgroundImageBlur('background', 'bg_img', 'this-will-have-a-blurred-backdrop', 10);
Blur.render();

$(window).resize(function() {
	Blur.render();
});
```

### Using
* [StackBlur by flozz](https://github.com/flozz/StackBlur)
* [drawImageProp by Ken Fyrstenberg Nilsen](http://stackoverflow.com/a/21961894/3839159)

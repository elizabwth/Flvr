var ElementBackgroundImageBlur = function(canvas_id, image_id, blur_class, blur_ammount) {
	var self = this;
	self.canvas = $("#"+canvas_id)[0];
	self.context = self.canvas.getContext("2d");
	self.image = document.getElementById(image_id);
	self.blur_element = $("."+blur_class);
	self.canvas_parent = $("#"+canvas_id).parent();
	self.blur_ammount = blur_ammount;

	$(self.image).css({
		"display": "none"
	});

	$("#"+canvas_id).css({
		"z-index": "-1",
		"position": "absolute",
		"top": "0",
		"left": "0",
		"overflow": "hidden"
	});

	self.fit_canvas = function() {
		$(self.canvas).attr('width', self.canvas_parent.width()+"px");
		$(self.canvas).attr('height', self.canvas_parent.height()+"px");
	}

	self.draw_image = function() {
		drawImageProp(self.context, self.image, 0, 0, self.canvas.width, self.canvas.height);
	}

	self.apply_blur = function() {
		self.blur_element.each(function(index) {
			var p = $(this).offset();
			var x = p.left;
			var y = p.top;
			var w = $(this).outerWidth();
			var h = $(this).outerHeight();

			StackBlur.canvasRGB(self.canvas, x, y, w, h, self.blur_ammount);
		});
	}

	self.render = function() {
		self.fit_canvas();
		self.draw_image();
		self.apply_blur();
	}
}

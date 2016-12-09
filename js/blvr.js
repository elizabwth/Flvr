function Blvr(canvas_id, container_id, blur_class, blur_amount, video_source) {
	self = this;
	self.canvas = document.getElementById(canvas_id);
	self.container = $("#"+container_id);
	self.blur_amount = blur_amount;
	self.blur_class = blur_class;

	self.renderer = PIXI.autoDetectRenderer(256, 112, {view: self.canvas, transparent: true});
	self.stage = new PIXI.Container();
	self.video_container = new PIXI.Container();


	self.video_ready = false;
	self.video = document.createElement('video');
	self.video.src = video_source;
	self.video.loop = true;
	self.video.autoPlay = true;
	self.video.load();


	self.video.onloadeddata = function() {
		console.log('Video loaded.');
		self.video_ready = true;

		self.video_texture = PIXI.Texture.fromVideo(self.video);
		self.vid_sprite = new PIXI.Sprite(self.video_texture);
		self.vid_sprite_copy = new PIXI.Sprite(self.video_texture);
		self.vid_sprite.anchor.x = 0.5;
		self.vid_sprite.anchor.y = 0.5;
		self.vid_sprite_copy.anchor.x = 0.5;
		self.vid_sprite_copy.anchor.y = 0.5;

		self.video_container.addChild(self.vid_sprite);

		self.blur_overlay = new PIXI.Container();
		self.blur_filter = new PIXI.filters.BlurFilter();
		self.blur_filter.blur = self.blur_amount;
		self.vid_sprite_copy.filters = [self.blur_filter];
		self.blur_overlay.addChild(self.vid_sprite_copy);

		self.set_element_mask();
		self.fit_vid_proper();

		self.stage.addChild(self.video_container);
		self.stage.addChild(self.blur_overlay);
	}


	self.set_element_mask = function() {
		var mask_polys = new PIXI.Graphics();
		$(self.blur_class).each(function(index) {
			var p = $(this).offset();
			var x = p.left;
			var y = p.top;
			var w = $(this).outerWidth();
			var h = $(this).outerHeight();
			
			mask_polys.beginFill(0x000000);
			mask_polys.lineStyle(0);
			mask_polys.drawRect(x, y, w, h);
		});
		self.blur_overlay.mask = mask_polys;
	}


	self.fit_vid_proper = function() {
		var cont_w = self.container.width();
		var cont_h = self.container.height();
		var vid_w = self.video.videoWidth;
		var vid_h = self.video.videoHeight;

		self.renderer.resize(cont_w, cont_h);

		self.vid_sprite.position.x = cont_w/2;
		self.vid_sprite.position.y = cont_h/2;
		self.vid_sprite_copy.position.x = cont_w/2;
		self.vid_sprite_copy.position.y = cont_h/2;

		var ratio_x = 1;
		var ratio_y = 1;
		if (cont_w >= vid_w) {
			ratio_x = cont_w/vid_w;
		} else {
			ratio_x = vid_w/cont_w;
		}

		if (cont_h >= vid_h) {
			ratio_y = cont_h/vid_h;
		} else {
			ratio_y = vid_h/cont_h;
		}

		var ratio = Math.min(ratio_x, ratio_y);
		
		self.vid_sprite.scale.y = ratio;
		self.vid_sprite.scale.x = ratio;
		self.vid_sprite_copy.scale.x = ratio;
		self.vid_sprite_copy.scale.y = ratio;
	}

	self.render = function() {
		self.renderer.render(self.stage);
		requestAnimationFrame(self.render);
	}

	$(window).resize(function() {
		self.set_element_mask();
		self.fit_vid_proper();
	});
}

/**********************************
	Flvr v0.1
	https://github.com/Elizabwth/Flvr/
***********************************/

function Flvr(canvas_id, container_id, blur_class, blur_amount, video_source) {
	var self = this;
	self.canvas = document.getElementById(canvas_id);
	self.container = $("#"+container_id);
	self.blur_amount = blur_amount;
	self.blur_class = "."+blur_class;

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
			var off = self.container.offset();
			var pos = $(this).offset();
			var x = pos.left + off.left;
			var y = pos.top + off.top;
			var w = $(this).outerWidth();
			var h = $(this).outerHeight();
			
			mask_polys.beginFill(0x000000);
			mask_polys.lineStyle(0);
			if ($(this).css('border-radius') == '0px') {
				mask_polys.drawRect(x, y, w, h);
			} else {
				var radius = $(this).css('border-radius');
				mask_polys.drawRoundedRect(x, y, w, h, parseInt(radius));
			}
			
		});
		self.blur_overlay.mask = mask_polys;
	}


	self.fit_vid_proper = function() {
		var cont_w = self.container.outerWidth();
		var cont_h = self.container.outerHeight();
		var vid_w = self.video.videoWidth;
		var vid_h = self.video.videoHeight;

		self.renderer.resize(cont_w, cont_h);

		self.vid_sprite.position.x = cont_w/2;
		self.vid_sprite.position.y = cont_h/2;
		self.vid_sprite_copy.position.x = cont_w/2;
		self.vid_sprite_copy.position.y = cont_h/2;

		var ratio = 1;

		if (vid_w > cont_w && vid_h > cont_h) {
			ratio = Math.max(cont_w/vid_w, cont_h/vid_h);
		}
		if (vid_w < cont_w && vid_h < cont_h) {
			ratio = Math.min(cont_w/vid_w, cont_h/vid_h);
		}
		
		self.vid_sprite.scale.x = ratio;
		self.vid_sprite.scale.y = ratio;
		self.vid_sprite_copy.scale.x = ratio;
		self.vid_sprite_copy.scale.y = ratio;

		self.vid_sprite_copy.filterArea = new PIXI.Rectangle(0, 0, cont_w, cont_h);
	}

	self.render = function() {
		self.renderer.render(self.stage);
		requestAnimationFrame(self.render);
	}
	self.render();

	$(window).resize(function() {
		self.set_element_mask();
		self.fit_vid_proper();
	});
}

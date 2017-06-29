function Sprite( option ){
	this._init( option );
}
Sprite.prototype = {
	_init: function( option ){
		this.x = option.x === 0 ? 0 : (option.x || 0);
		this.y = option.y === 0 ? 0 : (option.y || 0);
		this.w = option.w || 40;
		this.h = option.h || 65;
		this.originW = option.originW || 40;
		this.originH = option.originH || 65;
		this.fps = option.fps || 10;
		this._dirIndex = 0;
		this._imgSrc = option.imgSrc || "";

	},
	render: function( ctx ){ //把自己画到画布上
		// 第一步 加载图片
		var frameIndex = 0;
		var img = new Image();
		img.src = this._imgSrc;
		var that = this;
		img.onload = function(){
			// 第二步 加载完图片后，启动一个定时器 不停渲染动画
			setInterval(function(){
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
				ctx.drawImage(
					img
					, frameIndex * that.originW
					, that._dirIndex * that.originH
					, that.originW
					, that.originH
					, that.x
					, that.y
					, that.w
					, that.h
				);

				frameIndex ++;
				frameIndex %= 4;
			},2000/that.fps)
		}
		
	},
	changeDir: function(dir){
		if(dir == 'left'){
			this._dirIndex = 1;
		}
		if(dir == 'right'){
			this._dirIndex = 2;
		}
		if(dir == 'up'){
			this._dirIndex = 3;
		}
		if(dir == 'down'){
			this._dirIndex = 0;
		}

	}
}
alert(123);
<template>
	<view>
		<text class="music">&#xe617;</text>
	</view>
</template>
<script>
	const innerAudioContext=uni.createInnerAudioContext();
	innerAudioContext.autoplay=true;
	innerAudioContext.loop=true;
	innerAudioContext.src="https://www.anthonyt.cn/static/bgm.mp3";
	export default{
		data(){
			return{
				duration:21,
				musicShow:true,
			}
		},
		methods:{
			musicControl:function(){
				if(this.musicShow){
					const timout=setTimeout(()=>{
						clearTimeout(timout);
						innerAudioContext.play();
					},500);
				}else{
					innerAudioContext.pause();
				}
				this.musicShow=!this.musicShow;
			}
		}
	}
</script>

<style>
	@font-face {
	  font-family: 'iconfont';  /* Project id 4300768 */
	  src: url('//at.alicdn.com/t/c/font_4300768_hvty2kh3f34.woff2?t=1698155512171') format('woff2'),
	       url('//at.alicdn.com/t/c/font_4300768_hvty2kh3f34.woff?t=1698155512171') format('woff'),
	       url('//at.alicdn.com/t/c/font_4300768_hvty2kh3f34.ttf?t=1698155512171') format('truetype');
	}
	.music{
		font-family: "iconfont" !important;
		font-size: 30px;
		font-style: normal;
	}
</style>
<template>
	<view class="content" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
		<image class="background" src="https://www.anthonyt.cn/static/background.png"></image>
		<image class="mountine" src="https://www.anthonyt.cn/static/mountains.png"></image>
		<image class="flower" src="https://www.anthonyt.cn/static/flower.png"></image>
		<image class="picture_2" src="https://www.anthonyt.cn/static/picture_2.png"></image>
		<image class="picture_3" src="https://www.anthonyt.cn/static/picture_3.png"></image>
		<text class="arrow" v-if="showGuide" @click="nextPage">&#xe642;</text>
		<!-- <div class="music">
			<text class="musicIcon" v-if="!musicShow" @click="musicControl">&#xe617;</text>
			<text class="musicStop" v-if="musicShow" @click="musicControl">&#xe617;</text>
		</div> -->
		<div class="yw">
			<text class="I">INVITATION</text>
			<text class="D">DINCERE</text>
			<text class="A">ATTEND</text>
		</div>
		<div class="title">
			<text class="cn">新家亮相</text>
			<text class="en">DEBUT</text>
		</div>
	</view>
</template>

<script>
	// const innerAudioContext=uni.createInnerAudioContext();
	// innerAudioContext.autoplay=true;
	// innerAudioContext.loop=true;
	// innerAudioContext.src="https://www.anthonyt.cn/static/bgm.mp3";
	export default{
		data() {
			return {
				startX: 0, // 记录触摸起始位置
				endX: 0,
				showGuide:false,
				musicShow:false,
			}
		},
		created(){
			setTimeout(()=>{
				this.showGuide=true;
			},8000);
		},
		onShareAppMessage(){
			return{
				title:"邀请函",
				path:'/pages/index/index',
				imageUrl:"https://www.anthonyt.cn/static/cover.png"
			};
		},
		onShareTimeline(){
			return{
				title:"邀请函",
				path:'/pages/index/index',
				imageUrl:"https://www.anthonyt.cn/static/cover.png"
			}
		},
		mounted() {
			// innerAudioContext.play();
		},
		methods: {
			handleTouchStart(event) {
			  this.startX = event.touches[0].clientX; // 记录触摸起始位置
			},
			handleTouchMove(event) {
			  // 阻止页面的垂直滚动
			  event.preventDefault();
			},
			handleTouchEnd(event) {
			  this.endX = event.changedTouches[0].clientX; // 记录触摸结束位置
			  
			  // 计算触摸移动距离
			  const deltaX = this.endX - this.startX;
			  
			  if (deltaX > 50) {
				uni.navigateBack();
			  } else if (deltaX < -50) {
				  this.showGuide=false;
				  console.log(this.showGuide);
				uni.navigateTo({
					url:'../list/page_4'
				})
			  }
			},
			nextPage(){
				this.showGuide=false;
				uni.navigateTo({
					url:'../list/page_4'
				})
			},
			// musicControl:function(){
			// 	if(this.musicShow){
			// 		const timout=setTimeout(()=>{
			// 			clearTimeout(timout);
			// 			innerAudioContext.play();
			// 		},500);
			// 		console.log("音乐——起！");
			// 	}else{
			// 		innerAudioContext.pause();
			// 		console.log("音乐——停！");
			// 	}
			// 	this.musicShow=!this.musicShow;
			// }
		}
	}
</script>

<style>
	@font-face {
	  font-family: 'iconfont';  /* Project id 4300768 */
	  src: url('//at.alicdn.com/t/c/font_4300768_5b8j9yd746w.woff2?t=1698156674059') format('woff2'),
	       url('//at.alicdn.com/t/c/font_4300768_5b8j9yd746w.woff?t=1698156674059') format('woff'),
	       url('//at.alicdn.com/t/c/font_4300768_5b8j9yd746w.ttf?t=1698156674059') format('truetype');
	}
	@keyframes fade-in-out-animation{
		0%{
			opacity: 0;
		}
		50%{
			opacity: 0.6;
		}
		100%{
			opacity: 0;
		}
	}
	.arrow{
		font-family: "iconfont" !important;
		font-size: 60px;
		font-style: normal;
		color: #F5F2B7;
		position: fixed;
		right: 2%;
		top:45%;
		z-index: 5;
		animation: fade-in-out-animation 2s ease infinite;
	}
	@keyframes fade-animation{
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}
	@keyframes mountine-animation{
		0%{
			bottom: -10%;
			opacity: 0;
		}
		100%{
			bottom: -2%;
			opacity: 1;
		}
	}
	@keyframes flower-animation{
		0%{
			-webkit-transform: rotate(-90deg);
		}
		100%{
			-webkit-transform: rotate(0deg);
		}
	}
	@keyframes p_2-animation{
		0%{
			opacity: 0;
			left: -35%;
			top: 54%;
			-webkit-transform: rotate(-90deg);
		}
		100%{
			opacity: 1;
			top: 36%;
			left: -6%;
			-webkit-transform: rotate(0deg);
		}
	}
	@keyframes p_3-animation{
		0%{
			opacity: 0;
			right: -30%;
			-webkit-transform: rotate(90deg);
		}
		100%{
			opacity: 1;
			top: 12%;
			right: -4%;
			-webkit-transform: rotate(0deg);
		}
	}
	@keyframes title-animation{
		0%{
			opacity: 0;
			left: 60%;
		}
		100%{
			opacity: 1;
			left: 55%;
		}
	}
	@keyframes scroll{
		0%{
			-webkit-transform: rotate(0deg);
		}
		50%{
			-webkit-transform: rotate(180deg);
		}
		100%{
			-webkit-transform: rotate(360deg);
		}
	}
	.content {
		width: 100vw;
		height: 100vh;
		position: absolute;
	}
	.background{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0%;
		left: 0;
		z-index: -1;
	}
	.mountine{
		position: fixed;
		bottom: -2%;
		left: 0%;
		width:100%;
		height:15%;
		animation: mountine-animation 1s ease infinite;
		animation-iteration-count: 1;
	}
	.flower{
		position: fixed;
		right:-3%;
		bottom:22%;
		width: 34%;
		height: 28%;
		transform-origin: right top;
		animation: flower-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.picture_3{
		position: fixed;
		right: -4%;
		top: 12%;
		height:26%;
		width: 52%;
		animation: p_3-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.picture_2{
		position: fixed;
		left: -6%;
		top:36%;
		height: 20%;
		width: 70%;
		transform-origin: center bottom;
		animation: p_2-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.musicIcon{
		font-family: "iconfont" !important;
		font-size: 30px;
		font-style: normal;
		position: fixed;
		color: rgba(0,0,0,0.5);
		top: 3%;
		right: 5%;
		z-index: 5;
		animation: scroll 2s linear infinite;
	}
	.musicStop{
		font-family: "iconfont" !important;
		font-size: 30px;
		font-style: normal;
		position: fixed;
		color: rgba(0,0,0,0.5);
		top: 3%;
		right: 5%;
		z-index: 5;
		
	}
	.I{
		position: fixed;
		top: 10%;
		left: 16%;
		z-index: 3;
		font-size: 24px;
		font-weight: 500;
		writing-mode: vertical-lr;
		letter-spacing: 12px;
		line-height: 0;
		color: rgba(196, 152, 83, 0.3);
		text-align: center;
		vertical-align: top;
		font-family: 'Times New Roman', Times, serif;
		animation: fade-animation 2s ease infinite;
		animation-iteration-count: 1
	}
	.D{
		position: fixed;
		top: 10%;
		left: 24%;
		z-index: 3;
		font-size: 24px;
		font-weight: 400;
		writing-mode: vertical-lr;
		letter-spacing: 12px;
		line-height: 0px;
		color: rgba(196, 152, 83, 0.3);
		text-align: center;
		vertical-align: top;
		font-family: 'Times New Roman', Times, serif;
		animation: fade-animation 2s ease infinite;
		animation-iteration-count: 1
	}
	.A{
		position: fixed;
		top: 32%;
		left: 30%;
		z-index: 3;
		font-size: 28px;
		font-weight: 400;
		line-height: 25.17px;
		color: rgba(196, 152, 83, 0.3);
		text-align: center;
		vertical-align: top;
		font-family: 'Times New Roman', Times, serif;
		animation: fade-animation 2s ease infinite;
		animation-iteration-count: 1
	}
	.en{
		position:fixed;
		top: 62%;
		left: 52%;
		font-size: 22px;
		font-weight: 400;
		writing-mode: vertical-lr;
		letter-spacing: 10px;
		line-height: 0px;
		color: rgba(196, 153, 82, 0.3);
		animation: fade-animation 5s ease infinite;
		animation-iteration-count: 1
	}
	.cn{
		position:fixed;
		top: 62%;
		left: 55%;
		text-shadow: 5px 3px 2px  rgba(0, 0, 0, 0.4);
		font-size: 24px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 31px;
		writing-mode: vertical-lr;
		letter-spacing: 10px;
		color: rgba(245, 242, 183, 1);
		font-family: monospace;
		animation: title-animation 3s ease infinite;
		animation-iteration-count: 1
	}
</style>
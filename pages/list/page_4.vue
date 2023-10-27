<template>
	<view class="content" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
		<image class="background" src="https://www.anthonyt.cn/static/background.png"></image>
		<image class="TH" src="https://www.anthonyt.cn/static/TH.png"></image>
		<image class="wave" src="https://www.anthonyt.cn/static/wave.png"></image>
		<image class="cloudRT" src="https://www.anthonyt.cn/static/cloudRT.png"></image>
		<image class="cloudLB" src="https://www.anthonyt.cn/static/cloudLB.png"></image>
		<image class="cloud_1" src="https://www.anthonyt.cn/static/cloud1.png"></image>
		<image class="cloud_2" src="https://www.anthonyt.cn/static/cloud2.png"></image>
		<image class="cloud_3" src="https://www.anthonyt.cn/static/cloud3.png"></image>
		<!-- <div clas s="music">
			<text class="musicIcon" v-if="!musicShow" @click="musicControl">&#xe617;</text>
			<text class="musicStop" v-if="musicShow" @click="musicControl">&#xe617;</text>
		</div> -->
		<div class="yw">
			<text class="A">ARRIVAL</text>
			<text class="E">EXPECTYOUR</text>
		</div>
		<text class="title">期待您的到来</text>
	</view>
</template>
<script>
	// const innerAudioContext=uni.createInnerAudioContext();
	// innerAudioContext.autoplay=true;
	// innerAudioContext.loop=true;
	// innerAudioContext.src="https://www.anthonyt.cn/static/bgm.mp3";
	export default {
		data() {
			return {
				startX: 0, // 记录触摸起始位置
				endX: 0,
				musicShow:false,
			}
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
			  } else if(deltaX<-50){
				  uni.navigateBack({
					  delta: 4,
				  })
			  }
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
	/* @import url('https://www.anthonyt.cn/static/PangMenChuTi.css'); */
	@font-face {
	  font-family: 'iconfont';  /* Project id 4300768 */
	  src: url('//at.alicdn.com/t/c/font_4300768_5b8j9yd746w.woff2?t=1698156674059') format('woff2'),
	       url('//at.alicdn.com/t/c/font_4300768_5b8j9yd746w.woff?t=1698156674059') format('woff'),
	       url('//at.alicdn.com/t/c/font_4300768_5b8j9yd746w.ttf?t=1698156674059') format('truetype');
	}
	@font-face{
		font-family: "PMCT";
		src:url('https://www.anthonyt.cn/static/庞门正道粗书体.ttf');
	}
	@keyframes wave-animation{
		0%{
			opacity: 0;
			left: -30%;
		}
		100%{
			opacity: 1;
			left: -3%;
		}
	}
	@keyframes cloud-animation{
		0%{
			opacity:0;
			left: -30%;
		}
		100%{
			opacity: 1;
			left: 1%;
		}
	}
	@keyframes fade-animation{
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}
	@keyframes title-animation{
		0%{
			top: 35%;
			opacity: 0;
		}
		100%{
			top: 22%;
			opacity: 1;
		}
	}
	@keyframes c_3-animation{
		0%{
			top: 6%;
			opacity: 0;
		}
		100%{
			top: 10%;
			opacity: 1;
		}
	}
	@keyframes c_2-animation{
		0%{
			left: 30%;
			opacity: 0;
		}
		100%{
			left: 36%;
			opacity: 1;
		}
	}
	@keyframes c_1-animation{
		0%{
			left: 50%;
			top: 70%;
			opacity: 0;
		}
		100%{
			left: 48%;
			top: 58%;
			opacity: 1;
		}
	}
	@keyframes A-animation{
		0%{
			letter-spacing: 0px;
			opacity: 0;
		}
		100%{
			letter-spacing: 6px;
			opacity: 1;
		}
	}
	@keyframes E-animation{
		0%{
			letter-spacing: 0px;
			opacity: 0;
		}
		100%{
			letter-spacing: 12px;
			opacity: 1;
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
		position: relative;
	}
	.background{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0%;
		left: 0;
		z-index: -1;
	}
	.wave{
		position: fixed;
		left: -3%;
		bottom: 0;
		height: 12%;
		width: 82%;
		z-index: 1;
		animation: wave-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.TH{
		position: fixed;
		left: 40%;
		top: 61%;
		width: 92%;
		height: 50%;
		z-index: 2;
		animation: fade-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.cloudRT{
		position: fixed;
		right: 0;
		top: 20%;
		width: 20%;
		height: 12%;
		z-index: 2;
	}
	.cloudLB{
		position: fixed;
		top:64%;
		left: 1%;
		height: 8%;
		width: 26%;
		z-index: 2;
		animation: cloud-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.cloud_3{
		position: fixed;
		left: 43%;
		top:10%;
		height: 11%;
		width: 18%;
		z-index: 2;
		animation: c_3-animation 6s ease infinite;
		animation-iteration-count: 1;
	}
	.cloud_2{
		position: fixed;
		left: 36%;
		top:40%;
		width: 17%;
		height: 14%;
		z-index: 2;
		animation: c_2-animation 6s ease infinite;
		animation-iteration-count: 1;
	}
	.cloud_1{
		position: fixed;
		left: 48%;
		top:58%;
		width: 17%;
		height: 14%;
		animation: c_1-animation 6s ease infinite;
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
	.A{
		position: fixed;
		top: 32%;
		left: 10%;
		z-index: 3;
		font-size: 20px;
		font-weight: 400;
		line-height: 25.17px;
		letter-spacing: 6px;
		color: rgba(196, 152, 83, 0.3);
		text-align: center;
		vertical-align: top;
		font-family: 'Times New Roman', Times, serif;
		animation: A-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.E{
		position: fixed;
		top: 20%;
		right: 20%;
		z-index: 3;
		font-size: 20px;
		font-weight: 400;
		writing-mode: vertical-lr;
		line-height: 25.17px;
		letter-spacing: 12px;
		color: rgba(196, 152, 83, 0.3);
		text-align: center;
		vertical-align: top;
		font-family: 'Times New Roman', Times, serif;
		animation: e-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.title{
		position: fixed;
		left: 46%;
		top:22%;
		font-family: PMCT;
		writing-mode: vertical-lr;
		-webkit-text-stroke:1px rgba(196, 152, 83, 1);
		/** 文本1 */
		font-size: 42px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 49.9px;
		color: rgba(245, 242, 183, 1);
		animation: title-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
</style>
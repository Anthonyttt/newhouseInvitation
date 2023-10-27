<template>
	<view class="content" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
		<image class="background" src="https://www.anthonyt.cn/static/background.png"></image>
		<image class="crane" src="https://www.anthonyt.cn/static/crane.png"></image>
		<image class="wave" src="https://www.anthonyt.cn/static/wave.png"></image>
		<image class="picture" src="https://www.anthonyt.cn/static/picture_1.png"></image>
		<text class="arrow" v-if="showGuide" @click="nextPage">&#xe642;</text>
		<!-- <div class="music">
			<text class="musicIcon" v-if="!musicShow" @click="musicControl">&#xe617;</text>
			<text class="musicStop" v-if="musicShow" @click="musicControl">&#xe617;</text>
		</div> -->
		<div class="info">
			<div class="yw">
				<text class="I">INVITATION</text>
				<text class="D">DINCERE</text>
				<text class="A">ATTEND</text>
			</div>
			<div class="ph">
				<text class="word">新屋落成</text>
				<text class="word">备酒席小宴以答谢</text>
				<text class="word">亲友关爱</text>
				<text class="word">诚邀各位亲友光临</text>
				<text class="word">感谢近年亲友关心支持</text>
			</div>
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
		mounted(){
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
				uni.navigateTo({
					url:'../list/page_3'
				})
			  }
			},
			nextPage(){
				this.showGuide=false;
				uni.navigateTo({
					url:'../list/page_3'
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
	@keyframes fade-animation{
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
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
	@keyframes crane-animation{
		0%{
			opacity: 0;
			right: -10%;
			top: 25%;
		}
		100%{
			opacity: 1;
			right: -1%;
			top:14%;
		}
	}
	@keyframes ph-animation{
		0%{
			opacity: 0;
			right: 0%;
			bottom: 8%;
		}
		100%{
			opacity: 1;
			right: 8%;
			bottom:16%;
		}
	}
	@keyframes p_1-animation{
		0%{
			opacity: 0;
			left: -30%;
		}
		100%{
			opacity: 1;
			left: -3%;
			top: 14%;
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
	.crane{
		position: fixed;
		right: -1%;
		top: 14%;
		width: 35%;
		height: 23%;
		z-index: 1;
		animation: crane-animation 2s ease infinite;
		animation-iteration-count: 1;
		
	}
	.picture{
		position: fixed;
		left: -3%;
		top: 14%;
		height: 34%;
		width: 60%;
		animation: p_1-animation 4s ease infinite;
		animation-iteration-count: 1;
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
		top: 17%;
		left: 52%;
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
		animation-iteration-count: 1;
	}
	.D{
		position: fixed;
		top: 17%;
		left: 60%;
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
		animation-iteration-count: 1;
	}
	.A{
		position: fixed;
		top: 48%;
		left: 64%;
		z-index: 3;
		font-size: 28px;
		font-weight: 400;
		line-height: 25.17px;
		color: rgba(196, 152, 83, 0.3);
		text-align: center;
		vertical-align: top;
		font-family: 'Times New Roman', Times, serif;
		animation: fade-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.ph{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		position: fixed;
		right: 8%;
		bottom: 16%;
		animation: ph-animation 2s ease infinite;
		animation-iteration-count: 1
	}
	.word{
		text-shadow: 5px 3px 2px  rgba(0, 0, 0, 0.4);
		font-size: 24px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 42px;
		color: rgba(245, 242, 183, 1);
		font-family: monospace;
	}

</style>
	
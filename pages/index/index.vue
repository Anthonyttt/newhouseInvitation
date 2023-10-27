<template>
	<view class="content" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
		<image class="background" src="https://www.anthonyt.cn/static/background.png"></image>
		<image class="bookCover" src="https://www.anthonyt.cn/static/bookcover.png"></image>
		<image class="cloud" src="https://www.anthonyt.cn/static/cloudLB.png"></image>
		<image class="wave" src="https://www.anthonyt.cn/static/wave.png"></image>
		<text class="arrow" v-if="showGuide" @click="nextPage">&#xe642;</text>
		<!-- <div class="music">
			<text class="musicIcon" v-if="!musicShow" @click="musicControl">&#xe617;</text>
			<text class="musicStop" v-if="musicShow" @click="musicControl">&#xe617;</text>
		</div> -->
		<div class="title">
			<text class="qi">乔</text>
			<text class="qian">迁</text>
			<text class="zhi">之</text>
			<text class="xi">喜</text>
			<text class="yw">HOUSEWARMING</text>
		</div>
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
				startzX: 0, // 记录触摸起始位置
				endX: 0, //触摸结束位置
				showGuide:false,
				musicShow:false,
				duration:21,
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
		created(){
			setTimeout(()=>{
				this.showGuide=true;
			},3000);
			innerAudioContext.play();
		},
		mounted() {
			
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
				
			  } else if (deltaX < -50) {
				this.showGuide=false;
				uni.navigateTo({
					url:'../list/page_1',
					
				})
			  }
			},
			nextPage(){
				this.showGuide=false;
				uni.navigateTo({
					url:'../list/page_1'
				})
			},
			// musicControl(){
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
	@keyframes cover-animation{
		0%{
			right: -40%;
		}
		100%{
			right: 0%;
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
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
		width: 100vw;
		height: 100vh;
		position: relative;
		overflow: hidden;
		opacity: 1;
		transform: opacity 0.3s;
	}

	.background{
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: -1;
	}
	
	.bookCover{
		position: fixed;
		height: 100vh;
		width: 46vw;
		right: 0%;
		z-index: 5;
		animation: cover-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.cloud{
		position: absolute;
		top:64%;
		left: 1%;
		height: 8vh;
		width: 29vw;
		opacity: 1;
		animation: cloud-animation 2s ease infinite;
		animation-iteration-count: 1;
		
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
	.icon{
		position: fixed;
		right: 5%;
		top: 5%;
	}
	.qi{
		position: fixed;
		left: 10%;
		top:18%;
		z-index: 5;
		font-family: PMCT;
		-webkit-text-stroke:2px rgba(196, 152, 83, 1);
		text-shadow: 21px 8px 4px  rgba(0, 0, 0, 0.25);
		font-size: 84px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 116.42px;
		color: rgba(245, 242, 183, 1);
		text-align: left;
		vertical-align: top;
		animation: fade-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	
	.qian{
		position: fixed;
		left: 30%;
		top:30%;
		z-index: 5;
		font-family: PMCT;
		-webkit-text-stroke:2px rgba(196, 152, 83, 1);
		text-shadow: 21px 8px 4px  rgba(0, 0, 0, 0.25);
		font-size: 88px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 116.42px;
		color: rgba(245, 242, 183, 1);
		text-align: left;
		vertical-align: top;
		animation: fade-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	
	.zhi{
		position: fixed;
		left: 26%;
		top:48%;
		z-index: 5;
		font-family: PMCT;
		-webkit-text-stroke:2px rgba(196, 152, 83, 1);
		text-shadow: 21px 8px 4px  rgba(0, 0, 0, 0.25);
		font-size: 84px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 116.42px;
		color: rgba(245, 242, 183, 1);
		text-align: left;
		vertical-align: top;
		animation: fade-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	
	.xi{
		position: fixed;
		left: 44%;
		top:64%;
		z-index: 5;
		font-family: PMCT;
		-webkit-text-stroke:2px rgba(196, 152, 83, 1);
		text-shadow: 21px 8px 4px  rgba(0, 0, 0, 0.25);
		font-size: 84px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 116.42px;
		color: rgba(245, 242, 183, 1);
		text-align: left;
		vertical-align: top;
		animation: fade-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	
	.yw{
		position: fixed;
		top: 17%;
		left: 46%;
		z-index: 2;
		font-size: 20px;
		font-weight: 400;
		writing-mode: vertical-lr;
		letter-spacing: 10px;
		line-height: 28.74px;
		color: rgba(196, 152, 83, 0.3);
		text-align: center;
		vertical-align: top;
		font-family: 'Times New Roman', Times, serif;
		animation: fade-animation 4s ease infinite;
		animation-iteration-count: 1;
	}
</style>

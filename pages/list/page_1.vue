<template>
	<view class="content" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
		<image class="background" src="https://www.anthonyt.cn/static/background.png"></image>
		<image class="TH" src="https://www.anthonyt.cn/static/TH.png"></image>
		<image class="wave" src="https://www.anthonyt.cn/static/wave.png"></image>
		<image class="cloud" src="https://www.anthonyt.cn/static/cloudRT.png"></image>
		<text class="arrow" v-if="showGuide" @click="nextPage">&#xe642;</text>
		<div class="info">
			<div class="yw">
				<text class="I">INVITATION</text>
				<text class="D">DINCERE</text>
				<text class="A">ATTEND</text>
			</div>
			<div class="title">
				<text class="m_1">诚挚地邀请</text>
				<text class="m_2">您和您的家人出席</text>
			</div>
			<div class="time">
				<div class="timeTitle">
					<test class="clock">&#xe8c5;</test>
					<text class="timeText">出席时间</text>
				</div>
				<text class="lunarTime">癸卯年九月十五</text>
				<text class="solarTime">2023/10/29</text>
				<text class="am">10:00am</text>
			</div>
			<div class="place"> 
				<div class="placeTitle">
					<text class="point">&#xe65e;</text>
					<text class="placeText">出席地点</text>
				</div>
				<text class="adressText">龙回国际电子商务村五区</text>
				<text class="adressText">七幢二单元1001</text>
			</div>
		</div>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				startX: 0, // 记录触摸起始位置
				endX: 0,
				showGuide:false,
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
		created(){
			setTimeout(()=>{
				this.showGuide=true;
			},8000);
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
					url:'../list/page_2'
				})
			  }
			},
			nextPage(){
				this.showGuide=false;
				uni.navigateTo({
					url:'../list/page_2'
				})
			},
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
	@keyframes m_1-animation{
		0%{
			opacity: 0;
			right: 0%;
		}
		100%{
			opacity: 1;
			right: 17%;
		}
	}
	@keyframes m_2-animation{
		0%{
			opacity: 0;
			right: 0%;
		}
		100%{
			opacity: 1;
			right: 8%;
		}
	}
	@keyframes time-animation{
		0%{
			opacity: 0;
			top:35%
		}
		100%{
			opacity: 1;
			top: 42%;
		}
	}
	@keyframes place-animation{
		0%{
			opacity: 0;
			top: 35%;
		}
		100%{
			opacity: 1;
			top: 60%;
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
	.clock{
		font-family: "iconfont" !important;
		font-size: 20px;
		font-style: normal;
		color: #F5F2B7;
	}
	.point{
		font-family: "iconfont" !important;
		font-size:20px;
		font-style:normal;
		color: #F5F2B7;
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
	.cloud{
		position: fixed;
		right: 0;
		top: 20%;
		width: 20%;
		height: 12%;
		z-index: 2;
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
	.I{
		position: fixed;
		top: 8%;
		left: 20%;
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
		animation: fade-animation 4s ease infinite;
		animation-iteration-count: 1;
	}
	.D{
		position: fixed;
		top: 8%;
		left: 28%;
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
		animation: fade-animation 4s ease infinite;
		animation-iteration-count: 1;
	}
	.A{
		position: fixed;
		top: 34%;
		left: 32%;
		z-index: 3;
		font-size: 28px;
		font-weight: 400;
		line-height: 25.17px;
		color: rgba(196, 152, 83, 0.3);
		text-align: center;
		vertical-align: top;
		font-family: 'Times New Roman', Times, serif;
		animation: fade-animation 4s ease infinite;
		animation-iteration-count: 1;
	}
	.m_1{
		position: fixed;
		top: 8%;
		right: 17%;
		z-index: 3;
		text-shadow: 6px 2px 2px  rgba(196, 152, 83, 0.5);
		font-size: 28px;
		font-weight: 600;
		letter-spacing: 0px;
		line-height: 40.24px;
		color: rgba(245, 242, 183, 1);
		text-align: left;
		letter-spacing: 14px;
		writing-mode: vertical-lr;
		font-family: 'Times New Roman', Times, serif;
		animation: m_1-animation 2s ease infinite;
		animation-iteration-count: 1
	}
	.m_2{
		position: fixed;
		top: 8%;
		right: 8%;
		z-index: 3;
		text-shadow: 6px 2px 2px  rgba(196, 152, 83, 0.5);
		font-size: 28px;
		font-weight: 600;
		letter-spacing: 0px;
		line-height: 40.24px;
		color: rgba(245, 242, 183, 1);
		text-align: left;
		letter-spacing: 14px;
		writing-mode: vertical-lr;
		font-family: 'Times New Roman', Times, serif;
		animation: m_2-animation 3s ease infinite;
		animation-iteration-count: 1
	}
	.time{
		position: fixed;
		top: 42%;
		left: 10%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		animation: time-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.place{
		position: fixed;
		top: 60%;
		left: 10%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		animation: place-animation 2s ease infinite;
		animation-iteration-count: 1;
	}
	.timeTitle{
		width: 100px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.placeTitle{
		width: 100px;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 5px;
	}
	.timeText{
		margin-left: 6px;
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 17.24px;
		color: rgba(245, 242, 183, 1);
		font-family: 'Times New Roman', Times, serif;
	}
	.placeText{
		margin-left: 6px;
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 17.24px;
		color: rgba(245, 242, 183, 1);
		font-family: 'Times New Roman', Times, serif;
	}
	.lunarTime{
		margin-top: 5px;
		font-size: 24px;
		font-weight: 600;
		letter-spacing: 0px;
		line-height: 36px;
		color: rgba(245, 242, 183, 1);
		font-family: 'Times New Roman', Times, serif;
	}
	.solarTime{
		font-size: 22px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 26px;
		color: rgba(245, 242, 183, 1);
		font-family: 'Times New Roman', Times, serif;
	}
	.am{
		font-size: 22px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 24px;
		color: rgba(245, 242, 183, 1);
		font-family: 'Times New Roman', Times, serif;
	}
	.adressText{
		margin-top: 5px;
		font-size: 22px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 25.87px;
		color: rgba(245, 242, 183, 1);
		font-family: 'Times New Roman', Times, serif;
	}
</style>
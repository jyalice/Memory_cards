// start indicates whether the game starts or not.
var start=0;
// The remaining time is shown in the yellow box during the game.
var remainingTime=120;
// Click the yellow box to start the game.
document.getElementById('timer').addEventListener('click',function(){
	start=1;	 
	countDown();
	timer=setInterval(countDown, 1000);
	function countDown(){
		if(remainingTime>=0 && count!==8){
			minutes=Math.floor(remainingTime/60).toString().padStart(2,'0');
	        seconds=Math.floor(remainingTime%60).toString().padStart(2,'0');
	        msg=`${minutes}:${seconds}`;
	        document.getElementById('timer').innerHTML=msg;
	        remainingTime--;
		}else{
			clearInterval(timer);
			// You have gotten all pairs of pictures.
			if(count===8){
				msg='Congratulations';
				document.getElementById('timer').innerHTML=msg;
			}
			// Time's up.
			else{
				msg='Game Over';
				document.getElementById('timer').innerHTML=msg;
			}
		}
	}
});

// The game guide is on the right.
var sliderbar=document.getElementById('sliderbar');
var guide=document.getElementById('guide');
// When the mouse cursor enters the sliderbar, the brief guide will slide to the left to be shown.
sliderbar.addEventListener('mouseenter',function() {
    animate(guide,-200,function() {
        sliderbar.children[0].innerHTML='→';
    });
})
// When the mouse cursor leaves the sliderbar, the brief guide will slide to the right to be hidden.
sliderbar.addEventListener('mouseleave', function() {
    animate(guide, 40, function() {
        sliderbar.children[0].innerHTML = '←';
    });
})

// The angel image moves with the cursor which is not displayed.
var angel=document.getElementById('angel');
document.addEventListener('mousemove',function(e){
	var x=e.pageX;
	var y=e.pageY;
	angel.style.left=x-15+'px';
	angel.style.top=y-70+'px';
})

/* 16 numbers (from 0 to 15) are arranged randomly and 16 pictures are set on the back of the brown areas accordingly.  */
var a=[],b=[],num=[];
for(var i=0;i<16;i++){
	a[i]=i;
}
for(var i=0;i<16;i++){
	num[i]=Math.floor(Math.random()*(16-i));
	b=b.concat(a.splice(num[i],1));
}
for(var i=0;i<16;i++){
	document.getElementById('img'+b[i]).src='img/level'+Math.floor(i/2+1)+'.jpg';
}

document.getElementById('d0').addEventListener('click',function(event){check(event,img0);});
document.getElementById('d1').addEventListener('click',function(event){check(event,img1);});
document.getElementById('d2').addEventListener('click',function(event){check(event,img2);});
document.getElementById('d3').addEventListener('click',function(event){check(event,img3);});
document.getElementById('d4').addEventListener('click',function(event){check(event,img4);});
document.getElementById('d5').addEventListener('click',function(event){check(event,img5);});
document.getElementById('d6').addEventListener('click',function(event){check(event,img6);});
document.getElementById('d7').addEventListener('click',function(event){check(event,img7);});
document.getElementById('d8').addEventListener('click',function(event){check(event,img8);});
document.getElementById('d9').addEventListener('click',function(event){check(event,img9);});
document.getElementById('d10').addEventListener('click',function(event){check(event,img10);});
document.getElementById('d11').addEventListener('click',function(event){check(event,img11);});
document.getElementById('d12').addEventListener('click',function(event){check(event,img12);});
document.getElementById('d13').addEventListener('click',function(event){check(event,img13);});
document.getElementById('d14').addEventListener('click',function(event){check(event,img14);});
document.getElementById('d15').addEventListener('click',function(event){check(event,img15);});
// 2 clicked pictures are put into compare[] to compare.
var compare=[];
// count indicates how many pairs of pictures you have already gotten.
var count=0;
function check(event,imgId){
	// if there is still remaining time and the clicked picture does not have the class of noRotation
	if(start&&remainingTime>=0&&!$(imgId).hasClass('noRotation')){
		// if there is no picture in compare[]
		if(compare.length===0){
			imgId.parentNode.parentNode.style.cssText="transform: rotateY(180deg); -ms-transform: rotateY(180deg); -moz-transform: rotateY(180deg); -webkit-transform: rotateY(180deg); -o-transform: rotateY(180deg);";
			$(imgId).addClass('noRotation');
			compare[0]=imgId;
		}
		// if there is already one picture in compare[]
		else{ 
			// if the compared pictures are not the same
			if(compare[0].src!==imgId.src){
				// transform:rotateY(360deg) -> transform:rotateY(0deg)
				if($(imgId).hasClass('threeSixO')){
					imgId.parentNode.parentNode.style.cssText="transform: rotateY(0deg); -ms-transform: rotateY(0deg); -moz-transform: rotateY(0deg); -webkit-transform: rotateY(0deg); -o-transform: rotateY(0deg);";
					$(imgId).removeClass('threeSixO');
				}
				// transform:rotateY(0deg) -> transform:rotateY(360deg)
				else{
					imgId.parentNode.parentNode.style.cssText="transform: rotateY(360deg); -ms-transform: rotateY(360deg); -moz-transform: rotateY(360deg); -webkit-transform: rotateY(360deg); -o-transform: rotateY(360deg);";
					$(imgId).addClass('threeSixO');
				}
				// transform:rotateY(180deg) -> transform:rotateY(360deg)
				compare[0].parentNode.parentNode.style.cssText="transform: rotateY(360deg); -ms-transform: rotateY(360deg); -moz-transform: rotateY(360deg); -webkit-transform: rotateY(360deg); -o-transform: rotateY(360deg);";
				$(compare[0]).addClass('threeSixO');
				$(compare[0]).removeClass('noRotation');
				compare=[];
			}
			// if the compared pictures are the same
			else{
				imgId.parentNode.parentNode.style.cssText="transform: rotateY(180deg); -ms-transform: rotateY(180deg); -moz-transform: rotateY(180deg); -webkit-transform: rotateY(180deg); -o-transform: rotateY(180deg);";
				$(imgId).addClass('noRotation');
				compare=[];
				count++;
			}
		}
	}
}
// function animate is used to slide obj so that its offsetLeft will reach target
function animate(obj,target,callback) {
    // to clear an old timer, if any
    clearInterval(obj.timer);
    obj.timer=setInterval(function() {
        // obj slides first quickly and then slowly
        var step=(target-obj.offsetLeft)/10;
        // to guarantee the step is an integer
        step=step>0?Math.ceil(step):Math.floor(step);
        if(obj.offsetLeft==target){           
            clearInterval(obj.timer);
            callback&&callback();
        }
        obj.style.left=obj.offsetLeft+step+'px';
    }, 15);
}
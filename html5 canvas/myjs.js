var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 8;
canvas.height = window.innerHeight - 8;
var ctx = canvas.getContext('2d');

var mouse = {
    x : undefined,
    y : undefined
}
window.addEventListener('mousemove' ,
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize' , function(event){
    canvas.width = window.innerWidth - 8;
    canvas.height = window.innerHeight - 8;
    init();
});
var color = [
    'rgba(255,172,0,0.8)',
    'rgba(156,8,28,0.8)',
    'rgba(255,0,47,0.8)',
    'rgba(21,0,99,0.8)', 
    'rgba(10,2,184,0.8)' 
] ;
function Circle(x,y,r,dx,dy){
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color[Math.floor((Math.random() * 4 )+ 0)];
    var max = 70;
    var min = r;    
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI * 2 , false);
        ctx.fill();
        ctx.stroke();
            ctx.fillStyle = this.color;
            ctx.strokeStyle = 'white';

    }
    this.update = function(){
        if(this.x +  this.r > innerWidth || this.x - this.r < 0){
            this.dx =- this.dx;
        }
        if(this.y + this.r > innerHeight || this.y - this.r < 0){
            this.dy =- this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 & mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.r < max){
                this.r += 5;
            }

        } else{
            if(this.r > min){
                this.r -= 5;
            }
        }

        this.draw();
    }
}

var circleArray = [];

function init(){
    circleArray = [];
    for(let i = 0 ;  i < 1000 ; i++){
        var r =  Math.floor((Math.random() * 10 )) + 2;
        var x = (Math.random() * (innerWidth - 2 * r)) + r;
        var y = (Math.random() * (innerHeight - 2 * r)) + r;
        var dx = (Math.random() - 0.5 ) * 4;
        var dy = (Math.random() - 0.5) * 4;
        circleArray.push(new Circle(x,y,r,dx,dy));
        console.log(circleArray[i]);
    }
}
function animation(){
    requestAnimationFrame(animation);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    //circle.update();
    for(let i = 0 ; i < circleArray.length ; i++){
        circleArray[i].update();
    }
}
init();
animation();
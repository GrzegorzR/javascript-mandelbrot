

var przestrzen = new ComplexArea(0,0,2);
var canvas = document.getElementById('screen');
        var context = canvas.getContext('2d');
        canvas.addEventListener("click", function(evt) {
        var mousePos = getMousePos(canvas, evt);
        przestrzen.mousezoom(mousePos.x ,mousePos.y, 17 )
         console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
        }, false);



function print(x , y, r ,g, b ,a) {
var c = document.getElementById("screen");
var myContext = c.getContext("2d");
myContext.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
myContext.fillRect( x, y, 2, 2);

}


function ComplexNumber(argRe, argIm){
    this.re = argRe;
    this.im= argIm;
}

function abs(complex){
    return Math.sqrt(complex.re*complex.re + complex.im*complex.im );
}

function square(complex){
    var out = new ComplexNumber(complex.re*complex.re - complex.im*complex.im, 2*complex.re * complex.im );
    return out;
}

function addComplex(complex1, complex2){
    var out = new ComplexNumber(complex1.re + complex2.re, complex1.im + complex2.im );
    return out;
}


function ComplexArea(argX,argY,argR) {
   //print(50,50,55, 66 ,55);
  this.centerX = argX;
  this.centerY = argY;
  this.r = argR;
  this.step = (2*this.r)/600;
  this.startX = this.centerX - this.r;
  this.startY = this.centerY + this.r;
 
  //alert(this.centerX + " " + this.centerY + " " + this.step + " " + this.r + " "+  this.startX + " " + this.startY);

}

ComplexArea.prototype.redefine = function(argX,argY,argR){
  this.centerX = argX;
  this.centerY = argY;
  this.r = argR;
  this.step = (2*this.r)/600;
  this.startX = this.centerX - this.r;
  this.startY = this.centerY + this.r;
 

};


ComplexArea.prototype.printAtPoint = function(argX , argY, r ,g, b ,a) {
    //print(50,50,55, 66 ,55);
    pixelX=(argX - this.startX)/this.step;
    pixelY=(this.startY - argY)/this.step;
    //alert(pixelX + " " + pixelY);

    print(pixelX,pixelY,r ,g, b ,a);

    //print(50,50,r ,g, b ,a);
};


ComplexArea.prototype.circle = function(argR) {
    for(i = this.startX; i < this.startX + 2*this.r; i = i+this.step ){
        for(j = this.startY; j > this.startY - 2*this.r; j = j-this.step ){
            var mhm = new ComplexNumber(i,j);
            if(abs(mhm) > argR)
                this.printAtPoint(mhm.re, mhm.im, 255 ,55, 66 ,55 );

        }
    }
};


ComplexArea.prototype.mandelbrot = function(iterations) {

    var colorstep = Math.floor(255/iterations);

    //czyszczenie ekranu
    var c = document.getElementById("screen");
    var myContext = c.getContext("2d");
    myContext.fillStyle = "#000000";
    myContext.fillRect(0,0,600,600);

    //obliczenia dla kazdego pixela po kolei
    for(i = this.startX; i < this.startX + 2*this.r; i = i+this.step ){
        for(j = this.startY; j > this.startY - 2*this.r; j = j-this.step ){

            var mhm = new ComplexNumber(i,j);
            var color = 0;
            var p = new ComplexNumber(0,0);
            for(k = 0; k < iterations; k++){
                    color = color + colorstep;
                    p = square(p);
                    p = addComplex(p, mhm);
                    if(abs(p) < 2)
                        this.printAtPoint(i, j, color ,color, color ,55);
                    else
                        break;   

            }
        }
    }
};


ComplexArea.prototype.mousezoom = function(mouseX, mouseY) {
    var argX = mouseX*this.step + this.startX; 
    var argY = this.startY-mouseY*this.step; 
    console.log("tutej1");
    if (document.getElementById('in').checked) {
        this.redefine(argX, argY, this.r * 0.25);
    }   
    else{
        this.redefine(argX, argY, this.r * 2);
    }
    var argument;
    argument = document.getElementById("interationsInput").value;
    this.mandelbrot(argument);
    
};




function render() {
    /*
    var x, text;

    // Get the value of the input field with id="numb"
    x = document.getElementById("x").value;
    y = document.getElementById("y").value;

    // If x is Not a Number or less than one or greater than 10
    print(x , y, 55 ,55, 55 ,55)

    for (i = 0; i < 600; i++) { 
        for (j = 0; j < 600; j++){
            if(i*i + j*j < 600){
                print(i , j, 255 ,55, 66 ,55)
            }
        }
    
    }

    */
    var przestrzen = new ComplexArea(0,0,2);

    var argument;
    argument = document.getElementById("interationsInput").value;


   
    przestrzen.printAtPoint(0,0,255 ,55, 66 ,55);
    //przestrzen.circle(0.5);
    przestrzen.mandelbrot(argument);
    //przestrzen.chuj();
    //var person1 = new Person("Alice");
    //person1.sayHello();
}






















    
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
            //console.log(argX + " " + argY);

        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }




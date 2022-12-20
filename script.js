
let upload_img_box = document.querySelector(".upload_img_box");
let selectedImage = document.querySelector("#selectedImage");
let choose_image = document.querySelector(".choose_image");
let image_holder = document.querySelector(".image_holder");
let image = document.querySelector("#image");
let slider = document.querySelectorAll(".slider");
let show_value = document.querySelectorAll(".show_value");
let list_options = document.querySelectorAll("ul li");
let options = document.querySelector(".options");
let option = document.querySelectorAll(".option");
let remove_img_btn = document.querySelector("#remove_img_btn");

let canvas = document.querySelector("#image_canvas");
const context = canvas.getContext("2d");

let File_Name;
let Edited = false;
let reset = document.querySelector("#reset");

//*handle choose image event-------------------------------------------
upload_img_box.addEventListener("click", function () {
   selectedImage.click();
});


/*choose image event*/
selectedImage.addEventListener("change", function () {
   const file = this.files[0];

   if (file) {
      const reader = new FileReader();
      File_Name = file.name;

      choose_image.style.display = "none";
      image_holder.style.display = "block";

      reader.addEventListener("load", function () {
         image.setAttribute("src", this.result);
      });

      reader.readAsDataURL(file);
      remove_img_btn.style.display = "block";
   }

   if (Edited == false) {
      Edited = true;
   }

});


/*function call when slider value change*/
for (let i = 0; i <= slider.length - 1; i++) {
   slider[i].addEventListener("input", editImage);
  
}

function editImage() {
   
   let bright = document.querySelector("#brightness");
   let blur = document.querySelector("#blur");
   let grey = document.querySelector("#greyScale");
   let hue = document.querySelector("#hue");
   let saturation = document.querySelector("#saturation");
   let crop = document.querySelector("#crop");
   let rotateL = document.querySelector("#rotateL");
   let rotateR = document.querySelector("#rotateR");
  
   let brightVal = bright.value;
   let greyVal = grey.value;
   let blurVal = blur.value;
   let hueVal = hue.value;
   let satuVal = saturation.value;
   let cropVal = crop.value;
   let rotateLVal = rotateL.value;
   let rotateRVal = rotateR.value;
   

   document.querySelector("#brightVal").innerHTML = brightVal;
   document.querySelector("#blurVal").innerHTML = blurVal;
   document.querySelector("#greyVal").innerHTML = greyVal;
   document.querySelector("#hueVal").innerHTML = hueVal;
   document.querySelector("#saturationVal").innerHTML = satuVal;
   document.querySelector("#cropVal").innerHTML = cropVal;
   document.querySelector("#rotateLVal").innerHTML = rotateLVal;
   document.querySelector("#rotateRVal").innerHTML = rotateRVal;
 

 
   image.style.filter = " grayscale(" + greyVal + "%) hue-rotate(" + hueVal + "deg) brightness(" + brightVal + "%) blur(" + blurVal + "px) saturate(" + satuVal + ")";
   /* mirror
    image.style.transform = "rotatey("+(rotateRVal*0.03142) + "rad)";
   context.style.transform = "rotatey("+(rotateRVal*0.03142) + "rad)";*/

   image.style.transform = "rotate("+(rotateRVal*0.9) + "deg)translateX("+(rotateRVal)+"px)rotate("+(rotateLVal*-0.9) + "deg)translateX("+(rotateLVal*=-1)+"px)";
   
  
   
   
   context.filter = "grayscale(" + greyVal + "%) hue-rotate(" + hueVal + "deg) brightness(" + brightVal + "%) blur(" + blurVal + "px) saturate(" + satuVal + ")";
   context.rotate(20 * Math.PI / 360);
   console.log(image.height);
   
  
   crop.addEventListener("click",()=>{
      image.style.height = ( cropVal+1)+"%";
      image.style.width = (cropVal+1)+"%";
      image.style.overflow = "hidden";
      image.style.clip = "rect (100px, 140px, 140px, 0px)";
   });
    
   
      //image.style.margin = "0px 0px 0px 0px";
      
    
   
  } 

 
  /*
  crop
   
   image.style.height = (+height - cropVal);
   image.style.width = (+width - cropVal);
  */
  //reset all btn function

reset.addEventListener("click", function () {
   clearAllRangeValue();
});

function clearAllRangeValue() {
   image.style.filter = "none";
   context.filter = "none";
   
   for (let i = 0; i <= slider.length - 1; i++) {
      if (i == 0) {
         slider[i].value = "100";
      } else {
         slider[i].value = "0";
      }
   }

   editImage();
   
}
  



/*handle each option click even*/
list_options.forEach((list_option, index) => {
   list_option.addEventListener("click", function () {


      if (image.getAttribute("src") == "") {
         alert("Please. Choose Image First");
      } else {

         options.style.transform = "translateY(0px)";
         

         if (Edited == true) {
            canvas.height = image.naturalHeight;
            canvas.width = image.naturalWidth;

            for (let i = 0; i <= 9; i++) {

               if (index != i) {
                  list_options[i].classList.remove("active_option");
                  option[i].classList.remove("active_controller");

               } else {
                  this.classList.add("active_option");
                  option[i].classList.add("active_controller");
               }
            }

         } else {
            alert("Edit Your Image First");
         }

      }

   });
});
/*
function drawImage(context, image, x, y, w, h, degrees){
   context.save();
   context.translate(x+w/2, y+h/2);
   context.rotate(degrees*Math.PI/180.0);
   context.translate(-x-w/2, -y-h/2);
   context.drawImage(image, x, y, w, h);
   context.restore();
 }
 */

//*download image btn click----------------------------------------------------------------------------------------
function Download_btn() {

   if (image.getAttribute("src") != "") {

      if (Edited == true) {
         context.drawImage(image, 0, 0, canvas.width, canvas.height);
         let jpegUrl = canvas.toDataURL("image/jpg");

         const link = document.createElement("a");
         document.body.appendChild(link);

         link.setAttribute("href", jpegUrl);
         link.setAttribute("download", File_Name);
         link.click();
         document.body.removeChild(link);

      }
   }
}






//*remove image btn click--------------------------------------------------------------------------------------
remove_img_btn.addEventListener("click", function () {
   image.src = "";
   this.style.display = "none";
   choose_image.style.display = "block";
   image_holder.style.display = "none";
   options.style.transform = "translateY(80px)";
   clearAllRangeValue();
});

//*balons function-----------------------------------------------------------------------------------------------
const canvasNew = document.querySelector(".balons");

const contextNew = canvasNew.getContext("2d");

let data = {
  balls: []
};

function update() {
  data.balls.forEach(function(ball) {
    ball.update();
    
  });
}


function draw() {
  contextNew.clearRect(0, 0, canvasNew.width, canvasNew.height);
  data.balls.forEach(function(ball) {
    ball.draw();
   
  });
}

function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}
loop();

function Ball() {
  this.r = random(5, 15);
  this.x = random(this.r, canvasNew.width - this.r);
  this.y = random(this.r, canvasNew.height - this.r);

  this.xDelta = random(-5, 5);
  this.yDelta = random(-5, 5);

  this.color ="rgb(255, 255, 255)";

  this.update = function() {
    if ((this.x + this.r) > canvasNew.width ||
      this.x - this.r < 0) {
      this.xDelta *= -1;
    }
    if ((this.y + this.r) > canvasNew.height ||
      this.y - this.r < 0) {
      this.yDelta *= -1;
    }

    this.x += this.xDelta;
    this.y += this.yDelta;
  };

  this.draw = function() {
   contextNew.strokeStyle = this.color;
   contextNew.beginPath();
   contextNew.lineWidth = 3;
   contextNew.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
   contextNew.stroke();
  };
}

setInterval(()=>{
    const ball = new Ball(); 
    if(data.balls.length === 15){
      data.balls.pop();
    }else {
      data.balls.push(ball);
    }
},2000);
  



function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
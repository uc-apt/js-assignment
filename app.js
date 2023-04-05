const gridContainer = document.getElementById('grid-container-main');
for(let i = 1 ; i < 25 ; i++){
  gridContainer.innerHTML += `<div class="grid-items" id="grid-item${i}">
  <div class="front front-style"  id="front${i}" value=""></div>
  <img src="" alt="pictures" class="img-card"     id="img-card${i}">
  </div>`
}

//first getting the mode from the user
let mode;

const options_radio = document.getElementsByClassName("options-radio");
let arr = [].slice.call(options_radio);

// looping through the options_radio to get the value
const get_value = () => {
  //converting the HTML collections into an array
  arr.forEach((ele) => {
    if (ele.checked) {
      mode = ele.value;
    }
  });
};

//get the random images from the 12 images

const img_arr_data = [
  {
    src: "./assets/img1.png",
    value: "apple",
  },
  {
    src: "./assets/img2.png",
    value: "pen",
  },
  {
    src: "./assets/img3.png",
    value: "car",
  },
  {
    src: "./assets/img4.png",
    value: "bottle",
  },
  {
    src: "./assets/img5.png",
    value: "laptop",
  },
  {
    src: "./assets/img6.png",
    value: "banana",
  },
  {
    src: "./assets/img7.png",
    value: "wall",
  },
  {
    src: "./assets/img8.png",
    value: "candy",
  },
  {
    src: "./assets/img9.png",
    value: "icecream",
  },
  {
    src: "./assets/img10.png",
    value: "sun",
  },
  {
    src: "./assets/img11.png",
    value: "earth",
  },
  {
    src: "./assets/img12.png",
    value: "community",
  },
];

const getRanNum = (n, arr) => {
  let set1 = new Set([]);
  while (true) {
    set1.add(Math.floor(Math.random() * 12));
    if (set1.size === n) {
      break;
    }
  }
  arr = Array.from(set1);
  return arr;
};

const get_random_img = () => {
  let random_index = [];
  // get random number from 0 to 11 and store them in an array they are the images you will use
  if (mode == "mode1") {
    random_index = [...getRanNum(12, random_index)];
    // require each image 2 times
    random_index = [...random_index, ...random_index];
    return random_index.sort(() => Math.random() - 0.5);
  } else if (mode == "mode2") {
    random_index = [...getRanNum(8, random_index)];
    // require each image 3 times
    random_index = [...random_index, ...random_index, ...random_index];
    return random_index.sort(() => Math.random() - 0.5);
  } else if (mode == "mode3") {
    random_index = [...getRanNum(6, random_index)];
    // require each image 4 times
    random_index = [
      ...random_index,
      ...random_index,
      ...random_index,
      ...random_index,
    ];
    return random_index.sort(() => Math.random() - 0.5);
  }
};

// new game btn functionality


//setting the images into the img element
const set_img = (img, front, arr) => {
  for (let i = 0; i < 24; i++) {
    img.item(i).src = img_arr_data[arr[i]].src;
    front.item(i).value = img_arr_data[arr[i]].value;
  }
};

//timer function
const timerOn = (e) => {
  if(!(e === undefined)){
    document.getElementById('timer').innerText = e;
  }
}

let startClick = 0;

const start_game_btn = (img) => {
  if (mode === undefined) {
    window.alert("Please select a mode");
  } else {
    startClick+=1; // check is it is neccessary
    get_value();
    let array = get_random_img();
    const img = document.getElementsByTagName("img");
    const front = document.getElementsByClassName("front");
    //disabling the other modes
    if(mode === "mode1"){
      document.getElementById('mode2').setAttribute('disabled','');
      document.getElementById('mode3').setAttribute('disabled','');
    }else if(mode === "mode2"){
      document.getElementById('mode1').setAttribute('disabled','');
      document.getElementById('mode3').setAttribute('disabled','');
    }else{
      document.getElementById('mode1').setAttribute('disabled','');
      document.getElementById('mode2').setAttribute('disabled','');
    }
    
    document.getElementById('new-game-btn').setAttribute('disabled','')

    //setting the images in the random way and according to the mode
    set_img(img, front, array);
    let t = 60;
    setInterval(() => {
      timerOn(t,startClick)
      t-=1;
    }, 1000);
    // timerOn();
    // setting the logic according to the mode of the game
    setTimeout(() => {
      // document.getElementById('modalID').classList.toggle('modelOpen')
      //resetting the game setting
      //click to reload
      window.alert('Time up !')
      location.reload()
    }, 61000);
  }
};
function reload(){
  location.reload();
}
// game logic
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const cards = document.querySelectorAll(".front");
cards.forEach((card) => card.addEventListener("click", flipCard));
var valueSet = new Set([]);
var idSet = new Set([]);
var click = 1;
var correct = 0;
function flipCard() {
  const valu = document.getElementById('new-game-btn').getAttribute('disabled')
  if(valu != null){
    if (mode  == 'mode1'){
      switch (click) {
        case 1:
          this.classList.toggle("flip");
          valueSet.add(this.value);
          idSet.add(this.id);
          click += 1;
          break;
        case 2:
          this.classList.toggle("flip");
          valueSet.add(this.value);
          idSet.add(this.id);
          if (valueSet.size == 1) {
            valueSet.clear();
            idSet.clear();
            click = 1;
            correct += 1;
            document.getElementById('countData').innerText = correct
            if (correct === 12) {
              document.getElementById('countData').innerText = correct
              setTimeout(() => {
                window.alert("Congrats !");
                location.reload();
              }, 500);
            }
          } else {
            setTimeout(() => {
              for (ele of idSet.values()) {
                const element = document.getElementById(ele);
                element.classList.toggle("flip");
              }
              valueSet.clear();
              idSet.clear();
              click = 1;
            }, 600);
          }
          break;
        default:
          break;
      }
    }else if(mode == 'mode2'){
      switch (click) {
        case 1:
          this.classList.toggle("flip");
          valueSet.add(this.value);
          idSet.add(this.id);
          click += 1;
          break;
        case 2:
          this.classList.toggle("flip");
          valueSet.add(this.value);
          idSet.add(this.id);
          if (valueSet.size == 2) {
            setTimeout(() => {
              for (ele of idSet.values()) {
                const element = document.getElementById(ele);
                element.classList.toggle("flip");
              }
              valueSet.clear();
              idSet.clear();
              click = 1;    
            }, 600);
          } else {
            click += 1;
          }
          break;
        case 3:
          this.classList.toggle("flip");
          valueSet.add(this.value);
          idSet.add(this.id);
          if (valueSet.size == 2) {
            setTimeout(() => {
              for (ele of idSet.values()) {
                const element = document.getElementById(ele);
                element.classList.toggle("flip");
              }
              valueSet.clear();
              idSet.clear();
              click = 1;  
            }, 600);
          } else {
            valueSet.clear();
            idSet.clear();
            click = 1;
            correct += 1;
            document.getElementById('countData').innerText = correct
            if (correct === 8) {
              setTimeout(() => {
                window.alert("Congrats !");
                location.reload();
              }, 500);
            }
          }
  
        default:
          break;
      }
    }else if (mode == 'mode3'){
      switch (click) {
        case 1:
          this.classList.toggle("flip");
          valueSet.add(this.value);
          idSet.add(this.id);
          click += 1;
          break;
        case 2:
          this.classList.toggle("flip");
          valueSet.add(this.value);
          idSet.add(this.id);
          if (valueSet.size == 2) {
            setTimeout(() => {
              for (ele of idSet.values()) {
                const element = document.getElementById(ele);
                element.classList.toggle("flip");
              }
              valueSet.clear();
              idSet.clear();
              click = 1;     
            }, 600);
          } else {
            click += 1;
          }
          break;
        case 3:
          this.classList.toggle("flip");
          valueSet.add(this.value);
          idSet.add(this.id);
          if (valueSet.size == 2) {
            setTimeout(() => {
              for (ele of idSet.values()) {
                const element = document.getElementById(ele);
                element.classList.toggle("flip");
              }
              valueSet.clear();
              idSet.clear();
              click = 1;       
            }, 600);
          } else {
            click += 1;
          }
          break;
        case 4:
          this.classList.toggle("flip");
          valueSet.add(this.value);
          idSet.add(this.id);
          if (valueSet.size == 2) {
            setTimeout(() => {
              for (ele of idSet.values()) {
                const element = document.getElementById(ele);
                element.classList.toggle("flip");
              }
              valueSet.clear();
              idSet.clear();
              click = 1;    
            }, 600);
          } else {
            valueSet.clear();
            idSet.clear();
            click = 1;
            correct += 1;
            document.getElementById('countData').innerText = correct
            if (correct === 6) {
              setTimeout(() => {
                window.alert("Congrats !");
                location.reload();
              }, 500);
            }
          }
          break ;
        
            
        default:
          break;
      }      
    }
  }else{
    window.alert('Please first click on the New Game button')
  }
}

// show btn functionality
const show_btn_function = () => {
  const valu = document.getElementById('new-game-btn').getAttribute('disabled')
  if (mode === undefined || valu === null) {
    window.alert("Please start the game first");
  } else {
      //write the logic to show the answer
      const img = document.getElementsByTagName("img");
      const front = document.getElementsByClassName("front");
      for (let i = 0; i < 24; i++) {
        front[i].classList.remove("front-style");
        front[i].classList.add("front-show-btn");
        img[i].classList.remove("img-card");
        img[i].classList.add("show-answer");
      }
      setTimeout(() => {
        for (let i = 0; i < 24; i++) {
          img[i].classList.remove("show-answer");
          img[i].classList.add("img-card");
          front[i].classList.add("front-style");
          front[i].classList.remove("front-show-btn");
        }
      }, 3000);
  }
};

//help btn functionality
const instructions = `Instructions
1. First select a mode and then click on New Game 
2. You will get 60 seconds to complete the puzzle, different modes :-
3. Series of 2 pics: 1st pic is flipped > 2nd pic is flipped > if both are same, they stay visible; if both are different, they flip back
4. Series of 3 pics: 1st pic is flipped > 2nd pic is flipped > if both are same, they stay visible; if both are different, they flip back. 
Then, 3rd pic is flipped, if it is same to the 1st and 2nd pic, it stays visible, otherwise all flip back
5. Series of 4 pics: Logical functionality same as “series of 3 pics”, this works for matching 4 pics in continuation
`;
const help_btn_function = () => {
  window.alert(instructions);
};


// restart btn functionality

const restart_btn_funtion = () => {
  const valu = document.getElementById('new-game-btn').getAttribute('disabled')
  if(mode === undefined || valu === null){
    window.alert('Please first start the game!')
  }else{
    // document.getElementById('modalRestart').classList.toggle('modelOpen')
    let conf = confirm('You really want to restart the game ?')
    if(conf == true){
      location.reload()
    }
  }
}

const restart = () => {
  location.reload()
}

const noRestart = () => {
  document.getElementById('modalRestart').classList.toggle('modelOpen')
}

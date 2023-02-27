
//first getting the mode from the user
let mode;

const options_radio = document.getElementsByClassName('options-radio')

// looping through the options_radio to get the value
const get_value = () => {
    //converting the HTML collections into an array
    var arr = [].slice.call(options_radio);
    arr.forEach((ele) => {
        if(ele.checked){
            mode = ele.value;
            //for debugging 
            // console.log(ele.value);
        }
    })
}


//get the random images from the 12 images
const img_arr = ["./assets/img1.png","./assets/img2.png","./assets/img3.png","./assets/img4.png","./assets/img5.png","./assets/img6.png","./assets/img7.png","./assets/img8.png","./assets/img9.png","./assets/img10.png","./assets/img11.png","./assets/img12.png"];

const img_arr_data = [
    {
        src : "./assets/img1.png",
        value : "apple"
    },
    {
        src : "./assets/img2.png",
        value : "pen"
    },
    {
        src : "./assets/img3.png" ,
        value : "car"
    },
    {
        src : "./assets/img4.png",
        value : "bottle"
    },
    {
        src : "./assets/img5.png",
        value : "laptop"
    },
    {
        src : "./assets/img6.png",
        value : "banana"
    },
    {
        src : "./assets/img7.png",
        value : "wall"
    },
    {
        src : "./assets/img8.png",
        value : "candy"
    },
    {
        src : "./assets/img9.png",
        value : "icecream"
    },
    {
        src : "./assets/img10.png",
        value : "sun"
    },
    {
        src : "./assets/img11.png",
        value : "earth"
    },
    {
        src : "./assets/img12.png",
        value : "community"
    }
]

const getRanNum = (n,arr) => {
    var set1 = new Set([]);
    while(true){
        set1.add(Math.floor(Math.random() * (12)));
        if(set1.size === n){
            break;
        }
    }
    arr = Array.from(set1);
    // console.log(arr)
    return arr ;
}

const get_random_img = () => {

    let random_index = [];
    // get random number from 0 to 11 and store them in an array they are the images you will use 
    if(mode == "mode1"){
        random_index = [...getRanNum(12,random_index)];
        // require each image 2 times
        random_index = [...random_index,...random_index];
        return random_index.sort(() => Math.random() - 0.5);
    }else if(mode == "mode2"){
        random_index = [...getRanNum(8,random_index)];
        // require each image 3 times
        random_index = [...random_index,...random_index,...random_index];
        return random_index.sort(() => Math.random() - 0.5);
    }else if(mode == "mode3"){
        random_index = [...getRanNum(6,random_index)];
        // require each image 4 times
        random_index = [...random_index,...random_index,...random_index,...random_index];
        return random_index.sort(() => Math.random() - 0.5);
    }
    
}




// new game btn functionality 

// console.log(img);

//setting the images into the img element
const set_img = (img,front, arr) => {
    for(let i = 0 ; i < 24 ; i++ ){
        img.item(i).src = img_arr_data[arr[i]].src;
        front.item(i).value = img_arr_data[arr[i]].value;
    }
}


const start_game_btn = (img) => {
    if(mode === undefined){
        window.alert("Please select a mode");
    }else{
        get_value();
        const array = get_random_img();
        console.log(array)
        const img = document.getElementsByTagName('img');
        const front = document.getElementsByClassName('front');        
        // console.log(img)
        //setting the images in the random way and according to the mode
        set_img(img,front,array)
        // setting the logic according to the mode of the game
        console.log(front)
        

    }
    //adding the time restraint of 60 seconds
    // setTimeout(() => {
    //     console.log("You ran out of time!")
    //     window.alert("Game over")
    //     // reset the game settings 
    // }, 3000);

}


// game logic 

const cards =  document.querySelectorAll('.front');
// const flipCard = () => {
//     console.log('I was clicked');
//     console.log(this)
// }
cards.forEach(card => card.addEventListener('click' , flipCard))
var valueSet = new Set([]);
var idSet = new Set([]);
var click = 1;
function flipCard(){
    switch (click) {
        case 1:
            this.classList.toggle('flip');
            valueSet.add(this.value);
            idSet.add(this.id);
            click += 1;
            console.log('first pic selected');
            console.log('value set :',valueSet);
            console.log('id set : ',idSet);
            console.log('click number :',click);
            break;
        case 2:
            this.classList.toggle('flip');
            valueSet.add(this.value);
            idSet.add(this.id);
            console.log('this is the second click');
            console.log('value set :',valueSet);
            console.log('id set : ',idSet);
            console.log('click number :',click)
            if(valueSet.size == 1){
                console.log('These are same pics');
                valueSet.clear();
                idSet.clear();
                click = 1;
            }else {
                for(ele of idSet.values()){
                    const element = document.getElementById(ele);
                    element.classList.toggle('flip');
                    console.log('fliping the img back')
                }
                console.log('Not same pics');
                valueSet.clear();
                idSet.clear();
                click = 1;
                console.log('click value at last : ',click)
            }
            break;
        default:

            break;
    }

}


// show btn functionality
const show_btn_function = () =>{
    if(mode === undefined){
        window.alert('Please start the game first')
    }else{
        if(confirm("This will show the answer")){
            //write the logic to show the answer
            const img = document.getElementsByTagName('img');
            const front = document.getElementsByClassName('front'); 
            for(let i =0 ; i<24 ; i++){
                front[i].classList.remove('front-style');
                front[i].classList.add('front-show-btn')
                img[i].classList.remove('img-card');
                img[i].classList.add('show-answer');
            }
            setTimeout(() => {
                for(let i =0 ; i<24 ; i++){
                    img[i].classList.remove('show-answer');
                    img[i].classList.add('img-card');
                    front[i].classList.add('front-style');
                    front[i].classList.remove('front-show-btn');
                }
            }, 3000);
        }else{
            console.log('opted out')
        }
    }
}






//help btn functionality
const instructions = `Instructions
1. Series of 2 pics: 1st pic is flipped > 2nd pic is flipped > if both are same, they stay visible; if both are different, they flip back
2. Series of 3 pics: 1st pic is flipped > 2nd pic is flipped > if both are same, they stay visible; if both are different, they flip back. 
Then, 3rd pic is flipped, if it is same to the 1st and 2nd pic, it stays visible, otherwise all flip back
3. Series of 4 pics: Logical functionality same as “series of 3 pics”, this works for matching 4 pics in continuation
`
const help_btn_function = () => {
    window.alert(instructions)
}






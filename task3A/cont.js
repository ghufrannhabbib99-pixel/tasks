let count= Number(localStorage.getItem("count")) || 0;
;


const counter=document.getElementById('counter');
const increaseBtn=document.getElementById('increase');
const decreaseBtn=document.getElementById('decrease');
const resetBtn=document.getElementById('reset');
const plusBtn=document.getElementById('plus5');
const minusBtn=document.getElementById('minus5');
const status=document.getElementById('status');
const highscore=document.getElementById('highscore');

let highscoreValue=Number(localStorage.getItem("highscore")) || 0;
highscore.innerText=highscoreValue;

increaseBtn.addEventListener("click",function(){
    count++;
    if(count>highscoreValue){
        highscoreValue=count;
        localStorage.setItem("highscore",highscoreValue);
        highscore.innerText=highscoreValue;
    }
    updateCounter();
    updateStatus();
});

decreaseBtn.addEventListener("click",function(){
    
    if(count>-50){count--;} else{alert("Counter cannot go below -50");}
    updateCounter();
    updateStatus();
});

function updateCounter(){
    counter.innerText=count;
    counter.classList.add("animate");
    setTimeout(() => {
        counter.classList.remove("animate");
    }, 300);
}

function updateStatus(){
    if(count > 0){
        counter.style.color="green";
        status.innerText="Positive";
    } else if(count < 0){ counter.style.color="red";
        status.innerText="Negative";
    } else { counter.style.color="black";
        status.innerText="Zero";
    }
    if(count==10){
        alert("Great job! You reached 10!");
    }
    if(count==50){
        alert("Amazing! You reached 50!");
    }
}
localStorage.setItem("count",count);

resetBtn.addEventListener("click",function(){
    count=0;
    updateCounter();
    updateStatus();
});

plusBtn.addEventListener("click",function(){
    count+=5;
    updateCounter();
    updateStatus();
});

minusBtn.addEventListener("click",function(){
    count-=5;
    updateCounter();
    updateStatus();
});

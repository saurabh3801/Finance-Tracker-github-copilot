let progressBar=document.querySelector(".circular-progress");
let valueContainer=document.querySelector(".value-container");
let progressValue= 0;
let progressEndVaue=65;
let speed=10;


let progress= setInterval(() => {
    progressValue++;
    valueContainer.textContent=`${progressValue}%`;
    progressBar.style.background = `conic-gradient(
        #ffffff ${progressValue * 3.6 }deg,
        #190451 ${progressValue * 3.6 }deg

    )`;
    if(progressValue == progressEndVaue){
        clearInterval(progress);
    }
    
});
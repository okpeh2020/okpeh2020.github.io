// request notification permission from browser

Notification.requestPermission().then(permission=>{
    if(permission === "granted"){
        console.log(`hurray`)
    }else{
        console.log(`boooo`)
    }
});


// this are the link to the html elements
const formEl=document.querySelector('.form')
const userTextinEl=document.querySelector('.text-enter')
const userTimeEl=document.querySelector('.time-enter')
const listUl=document.querySelector('.input-house')
const allUserInput=theRetriver()
 listUpdator()

formEl.addEventListener('submit',function(e){
        e.preventDefault()
        addInput()

})


// add input to the allUserinput array
function addInput(){
    const text=userTextinEl.value.trim()
    const time=userTimeEl.value.trim()
    userTextinEl.value='';
    userTimeEl.value='';
    const inputObject={text,time}
  if(text.length>0 ){
      allUserInput.push(inputObject)
      inputKeeper()
      listUpdator()
     
  }else{
    alert('enter todo and time')
  }

  
    if(time.length>0){
      buzzer(text,time)
    }else{
        console.log('time do go')
    }
  
  
}

// update ul
function listUpdator(e){
    listUl.innerHTML='';
    allUserInput.forEach((input,inputIndex)=>{
        list=listCreator(input,inputIndex)
        listUl.append(list)
    })
}

// create list & delete list element  

function listCreator(input,inputIndex){
    const unique=`for-${inputIndex}`        //this line make sure the label and input are specific to each other
    const inputLi=document.createElement('li')
    inputLi.className='user-input';
    inputLi.innerHTML=`
     <li class="">
                <input type="checkbox" name="" id="${unique}">
                <label for="${unique}" class="user-text" >
                    ${input.text}
                </label>
                 <span >${input.time}</span>
                <button class="delbtn">X</button>
            </li>
    `;

    // the handles the deleting process
    const delbtnEL=inputLi.querySelector('.delbtn')
    delbtnEL.addEventListener('click',function(){
        delbtnEL.style.scale='0.99';
        allUserInput.splice(inputIndex,1)
        inputKeeper()
        listUpdator()
    })
    return inputLi
}

// save the input in the array 
function inputKeeper(){
    const theHand=JSON.stringify(allUserInput)
    localStorage.setItem('vault',theHand)
}

// retrive the input from the array
function theRetriver(){
    const theHand=   localStorage.getItem('vault')
    return JSON.parse(theHand)
  
}

// the alarm guy
function buzzer(text,b){

    let now = new Date()
    let t= new Date() 
    let [hour,min]= b.split(':')

    t.setHours(hour);
    t.setMinutes(min);
    t.setMilliseconds(0)

    let alram= t-now
     console.log(alram)
     setTimeout(()=>{
       alert(`it's time to ${text} `)

       if(Notification.permission==="granted"){
           new Notification("reminder",`is time to ${text}`);
       }
     },alram)
   
    }

// my first public project


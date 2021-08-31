// console.log("this is my project");

// utility function to get element from string

function getElementFromString(string)
{
  let div = document.createElement("div");
  div.innerHTML=string;
  return div.firstElementChild;
}

let addparamcount=1;

// hide default
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";


let paramsradio = document.getElementById("custom");
// hide and show

paramsradio.addEventListener("click", () => {
  document.getElementById("requestjsonbox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

let jsonradio = document.getElementById("json");
// hide and show
jsonradio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestjsonbox").style.display = "block";
});


// if user clicks on  + button add more parameters
let addparam = document.getElementById("addparam");

addparam.addEventListener("click", () => 
{
  let params = document.getElementById("params");
  let string = `<div class="form-row my-2">
        <label for="url" class="col-sm-2 col-form-label">Parameter ${addparamcount+1}</label>
        <div class="col-md-4">
          <input type="text" class="form-control" id="parameterKey${addparamcount+1}" placeholder="Enter parameter key ${addparamcount+1}">
        </div>
        <div class="col-md-4">
          <input type="text" class="form-control" id="parameterValue${addparamcount+1}" placeholder="Enter parameter value ${addparamcount+1}">
            </div>
          <button class="btn btn-primary deleteparam" id="addparam">-</button>
          </div>
        </div>`;
        // convert the element string to Dom node
        let paramElement =  getElementFromString(string);
        params.appendChild(paramElement);
        // add an event listener to remove the parameter on click - button 
        let deleteparam = document.getElementsByClassName("deleteparam");
        for(item of deleteparam)
        {
          item.addEventListener('click',(event)=>{
              event.target.parentElement.remove();
          });
        }
        addparamcount+=1;
});

//  click one submit

let submit = document.getElementById("submit");

submit.addEventListener("click",()=>{
  document.getElementById("responcejsontext").value="please wait...fetching responce";
 
  // fetching value from url that user had entered
  
  let url = document.getElementById("urlfield").value;
  let requestType = document.querySelector("input[name='reqtype']:checked").value;
  let contentType = document.querySelector("input[name='custype']:checked").value; 
  
  if( contentType == 'params' )
  {
    data={};
    for(let i=0; i<addparamcount + 1; i++)
    {
      if(document.getElementById("parameterKey" + (i+1)) !=undefined)
      {
        let key=document.getElementById("parameterKey" + (i+1)).value;
        let value=document.getElementById("parameterValue" + (i+1)).value;
        // console.log(key , value);
        data[key]=value;  
      }
    }
    data=JSON.stringify(data);
  }
  else{
    data=document.getElementById("requestjsontext").value;
  }
 
  // go for post request 
if(requestType=='GET') 
{
  fetch(url , {
    method : "GET"
  })
  .then(responce => responce.text())
  .then((text)=>{
    document.getElementById("responcejsontext").value = text;
  }); 
}
else
{
  fetch(url , {
    method : 'POST' ,
    body : data ,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(responce => responce.text())
  .then((text)=>{
    document.getElementById("responcejsontext").value = text;
  });
}
});



const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdowns = document.querySelectorAll("#from select, #to select");
const btn = document.querySelector("#Exchange-btn");
const fromCurr = document.querySelector("#from select");
const toCurr = document.querySelector("#to select");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name==="from" && currCode==="USD"){
            newOption.selected = true;
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected = true;
        } 
        select.append(newOption);
        
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click",async (evt)=>{
   evt.preventDefault();
   let amount = document.querySelector("#amount input");
   let amtVal = amount.value;
   if(amtVal==="" || amtVal<0){
    amtVal.value=1;
    amount.value="1";
   }

   let URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

   let response = await fetch(URL);

   let data =response.json;
   let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   console.log(rate);

   let finalAmount = amtVal * rate;
let msg = document.querySelector("#msg");
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});

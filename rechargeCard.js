let serialPin = document.getElementById("serial");
let rechargePin = document.getElementById('recharge');
let networkCode = 
{
    Mtn:        '*555*',
    Airtel:     '*126*',
    Glo:        '*123*',
    Etisalat:   '*888*'
};

let pinData = ''

function deriveBtn()
// To let the user know if he or she has selected an option,
//  before generating a pin to be recharged.....
{
    if (document.getElementById('network').value == 'network'){
        network.value = "";
        alert('You need to pick a network of your choice')
        return
      }else if (document.getElementById('amount').value == 'amount'){
        serialPin.value = "";
        alert('You need to select an amount')
        return
      }
    let randomNumber = Math.floor(Math.random()* 726012345667890);
    serialPin.value = randomNumber;
};

let userList = [];
userList = JSON.parse(localStorage.getItem('card'))


function saveBtn(){
    // i discovered that i should have created some global variables instead of using a local one.....
    let network = document.getElementById("network").value;
    let buy = document.getElementById("amount").value;
    let pin = document.getElementById("serial").value;
    printRef = `${networkCode[network]}${pin}#`;
    rechargePin.value = printRef;
    
    pinData = 
    {
        'network': network,
        'amount': buy,
        'date': date(),
        'pin': pin,
        'printRef': printRef,
        'status': false 
    }
    userList.push(pinData);
    display();
    localStorage.setItem('card', JSON.stringify(userList))
    alert("Saved Successfully !!!!!!")
}

function date(){
    let current = new Date();
    let day = current.getDate();
    let month = current.getMonth();
    let year = current.getFullYear();
    return current = `${day}/${month}/${year}`;
} 



function display(){
    // let userList = JSON.parse(localStorage.getItem('card'))......the display function is nt to be pushed
    displayScreen.innerHTML = ''
    userList.forEach(function(elem, i) {
        displayScreen.innerHTML +=
        `
        <tr>
            <td>${i + 1}</td>
            <td>${elem.network}</td>
            <td>${elem.date}</td>
            <td>${elem.amount}</td>
            <td>${elem.pin}</td>
            <td>${elem.printRef}</td>
            <td>${elem.status ? 'Used' : 'Unused'}</td>
            <td>
                <button onclick="del(${i})" id="del">delete</button>
            </td>
        </tr>
        `
    })
}

function del(i){
    userList.splice(i,1);
    // The local storage below is to make whatever i delete also clear from my local storage.....
    localStorage.setItem('card', JSON.stringify(userList))
    alert('Are you sure you want to delete??')
    display()

}

// Load recharge card............

function loadButton() {

    let getData =userList.find((b)=>b.printRef===rechargePin.value)
    if (!getData) {
        alert('invalid pin!!', false)
    }
    if (getData.status) {
        alert('Pin Used!!!', false)
        return
    }
   
    userList.forEach((b)=>{

        if (rechargePin.value === b.printRef) {
            if(getData){
                getData.status =true

                display()
                alert('recharged succesfully')
            }
    }
})

    
}
 
// function loadbttn(){

// }

// function loadbttn() {
//     let enteredPin = recharge.value;
//     let matchedEntry = userList.find(function(elem) {
//       return elem.pin === enteredPin;
//     });
  
//     if (getData) {
//       alert('Recharge Successful');
//     }
//      else if (!getData){
//       alert('Recharge Unsuccessful');
//     }
//   }
  
// function loadbttn(){
// userList = JSON.parse(localStorage.getItem('card'))
//     let pinRef = document.getElementById("recharge")
//     if (recharge.value === printRef.value) {
//         alert('Recharge Successful')
//     }else{
//         alert('Recharge Unsuccessful')
//     }
    
// }

display()
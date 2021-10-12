const smallPlusBtn = document.querySelector(".plusBtn.small");
const mediumPlusBtn = document.querySelector(".plusBtn.medium");
const largePlusBtn = document.querySelector(".plusBtn.large");

const smallPlusBtnBuy = document.querySelector(".plusBtn.small.buy");
const mediumPlusBtnBuy = document.querySelector(".plusBtn.medium.buy");
const largePlusBtnBuy = document.querySelector(".plusBtn.large.buy");

const smallMinusBtn = document.querySelector(".minusBtn.small");
const mediumMinusBtn = document.querySelector(".minusBtn.medium");
const largeMinusBtn = document.querySelector(".minusBtn.large");

const smallPizzaQuantity = document.querySelector(".smallPizzaQuantity");
const mediumPizzaQuantity = document.querySelector(".mediumPizzaQuantity");
const largePizzaQuantity= document.querySelector(".largePizzaQuantity");

const smallPizzaTotal = document.querySelector(".smallPizzaTotal");
const mediumPizzaTotal = document.querySelector(".mediumPizzaTotal");
const largePizzaTotal = document.querySelector(".largePizzaTotal");
const cartTotal = document.querySelector(".cartTotal");

const checkOut = document.querySelector(".checkOut");

const payOut = document.querySelector(".payOut");
const message = document.querySelector(".message");
const payAmt = document.querySelector(".payAmt");
const payBtn = document.querySelector(".payBtn");

const containerBox = document.querySelector(".container");
const closeBtn = document.querySelector(".close");

const factoryFunction = Factory();

var width = screen.availWidth;
var height = screen.availHeight;


function BtnClicked(event) {
    factoryFunction.BtnClicked(event.target.dataset.size);

    
smallPizzaQuantity.innerHTML= factoryFunction.quantityUpdate().smallQuantity;
mediumPizzaQuantity.innerHTML= factoryFunction.quantityUpdate().mediumQuantity;
largePizzaQuantity.innerHTML= factoryFunction.quantityUpdate().largeQuantity;


smallPizzaTotal.innerHTML= factoryFunction.priceUpdate().smallCost;
mediumPizzaTotal.innerHTML= factoryFunction.priceUpdate().mediumCost;
largePizzaTotal.innerHTML= factoryFunction.priceUpdate().largeCost;
cartTotal.innerHTML= factoryFunction.priceUpdate().totalCart;
    
  

    if (factoryFunction.priceUpdate().totalCart > 0) {
        checkOut.classList.remove('hidden');
    } else {
        checkOut.classList.add('hidden');
        payOut.classList.add('hidden');
    }
}


function checkOutClick(){
    checkOut.classList.add('hidden');
    payOut.classList.remove('hidden');
}

function payment() {
    
    message.classList.toggle('hidden');
    var paymentAmt = Number(payAmt.value);
    if (paymentAmt == factoryFunction.priceUpdate().totalCart) {
        
        message.innerHTML = "Enjoy your Pizza!";
        checkOut.classList.remove('hidden');
        factoryFunction.resetCart();
        

        smallPizzaQuantity.innerHTML = factoryFunction.resetCart().smallQuantity;
        mediumPizzaQuantity.innerHTML = factoryFunction.resetCart().mediumQuantity;
        largePizzaQuantity.innerHTML = factoryFunction.resetCart().largeQuantity;

        smallPizzaTotal.innerHTML= factoryFunction.resetCart().smallCost;
        mediumPizzaTotal.innerHTML= factoryFunction.resetCart().mediumCost;
       largePizzaTotal.innerHTML= factoryFunction.resetCart().largeCost;
       cartTotal.innerHTML= factoryFunction.resetCart().totalCart;

       

        setTimeout(function () {
            
            message.classList.toggle('hidden');
            checkOut.classList.toggle('hidden');
            payOut.classList.add('hidden');
            payAmt.value = "";
        }, 4500);

    } else if (paymentAmt > factoryFunction.priceUpdate().totalCart) {
        
       
        message.innerHTML = "Enjoy your Pizza, here's your change R" + factoryFunction.change(paymentAmt);
        factoryFunction.resetCart();
        checkOut.classList.toggle('hidden');
        
        smallPizzaQuantity.innerHTML = factoryFunction.resetCart().smallQuantity;
        mediumPizzaQuantity.innerHTML = factoryFunction.resetCart().mediumQuantity;
        largePizzaQuantity.innerHTML = factoryFunction.resetCart().largeQuantity;

        smallPizzaTotal.innerHTML= factoryFunction.resetCart().smallCost;
        mediumPizzaTotal.innerHTML= factoryFunction.resetCart().mediumCost;
       largePizzaTotal.innerHTML= factoryFunction.resetCart().largeCost;
       cartTotal.innerHTML= factoryFunction.resetCart().totalCart;
 


        setTimeout(function () {
            
            message.classList.toggle('hidden');
            checkOut.classList.toggle('hidden');
            payOut.classList.add('hidden');
            payAmt.value = "";
        }, 4500);

    } else {
        
        
        message.innerHTML = "Sorry, insuffient!";
        setTimeout(function () {
            message.classList.toggle('hidden');
            checkOut.classList.add('hidden');
           
        }, 4500);
    }
}





smallPlusBtn.addEventListener('click', BtnClicked);
smallMinusBtn.addEventListener('click', BtnClicked);
smallPlusBtnBuy.addEventListener('click',BtnClicked);

mediumPlusBtn.addEventListener('click', BtnClicked);
mediumMinusBtn.addEventListener('click', BtnClicked);
mediumPlusBtnBuy.addEventListener('click',BtnClicked);

largePlusBtn.addEventListener('click', BtnClicked);
largeMinusBtn.addEventListener('click', BtnClicked);
largePlusBtnBuy.addEventListener('click',BtnClicked);

checkOut.addEventListener('click', checkOutClick)

payBtn.addEventListener('click',payment)
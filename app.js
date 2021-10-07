module.exports=function Factory() {
  
    let smallQuantity = 0;
    let mediumQuantity = 0;
    let largeQuantity = 0;

    let smallTotal = 0;
    let mediumTotal = 0;
    let largeTotal = 0;
    let totalCart = 0;
    let hiddenBtn='hidden';

    function BtnClicked(event) {
        if (event === "smallPlus") {
            smallQuantity++;
        } else if (event === "mediumPlus") {
            mediumQuantity++;
        } else if (event === "largePlus") {
            largeQuantity++;
        }
        if (event === "smallMinus") {
            smallQuantity--;
            if (smallQuantity < 0) {
                smallQuantity = 0;
            }
        } else if (event === "mediumMinus") {
            mediumQuantity--;
            if (mediumQuantity < 0) {
                mediumQuantity = 0;
            }
        } else if (event === "largeMinus") {
            largeQuantity--;
            if (largeQuantity< 0) {
                largeQuantity = 0;
            }
        }
    }
    // function quantityUpdate() {
    //     return {
    //         smallQuantity,
    //         mediumQuantity,
    //         largeQuantity
    //     }
    // }

    function priceUpdate() {
        smallTotal = (smallQuantity * 49).toFixed(2);
        mediumTotal = (mediumQuantity * 89).toFixed(2);
        largeTotal = (largeQuantity * 129).toFixed(2);
        totalCart = (smallQuantity * 49.00 + mediumQuantity * 89.00 + largeQuantity * 129.00).toFixed(2);

        // return {
        //     smallCost,
        //     mediumCost,
        //     largeCost,
        //     totalCart
        // }
    }
    function change(amount) {
        return (amount - totalCart).toFixed(2);
    }

    function resetCart() {
        smallQuantity = 0;
        mediumQuantity = 0;
        largeQuantity = 0;
        smallTotal = 0;
        mediumTotal = 0;
        largeTotal = 0;
        totalCart = 0;

        return {
            smallQuantity,
            mediumQuantity,
            largeQuantity,
            smallTotal,
            mediumTotal,
            largeTotal,
            totalCart,
        }
    }

    function buySmall(){
        smallTotal=smallTotal + 49.00
        smallQuantity++
        totalCart= totalCart + smallTotal
        showCheckoutBtn();
    }
    function removeSmall(){
        smallTotal=smallTotal - 49.00
        smallQuantity--
        totalCart= totalCart - 49.00
        showCheckoutBtn();
        
    }
    function buyMedium(){
        mediumTotal=mediumTotal + 89.00
        mediumQuantity++
        totalCart= totalCart + mediumTotal
        showCheckoutBtn();
    }
    function removeMedium(){
        mediumTotal=mediumTotal - 89.00
        mediumQuantity--
        totalCart= totalCart - 89.00
        showCheckoutBtn();
        
    }
    function buyLarge(){
        largeTotal=largeTotal + 129.00
        largeQuantity++
        totalCart= totalCart + largeTotal
        showCheckoutBtn();
    }
    function removeLarge(){
        largeTotal=largeTotal - 129.00
        largeQuantity--
        totalCart= totalCart - 129.00
        showCheckoutBtn();
        
    }
    function getTotals(){
        return {
            smallTotal,
            mediumTotal,
            largeTotal,
            totalCart
        }

    }
    function getQuantities(){
        return{
            smallQuantity,
            mediumQuantity,
            largeQuantity
        }
    }
    function showCheckoutBtn(){
        if (totalCart>0){
            hiddenBtn='block';
        }
        else{
            hiddenBtn='hidden';
        }
    }
    function getHiddenBtn(){
        return hiddenBtn
    }


//



function BtnClicked(event) {
    factoryFunction.BtnClicked(event.target.dataset.size);

    
smallPizzaQuantity.innerHTML= factoryFunction.quantityUpdate().smallQuantity;
mediumPizzaQuantity.innerHTML= factoryFunction.quantityUpdate().mediumQuantity;
largePizzaQuantity.innerHTML= factoryFunction.quantityUpdate().largeQuantity;


smallPizzaTotal.innerHTML= factoryFunction.priceUpdate().smallTotal;
mediumPizzaTotal.innerHTML= factoryFunction.priceUpdate().mediumTotal;
largePizzaTotal.innerHTML= factoryFunction.priceUpdate().largeTotal;
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

        smallPizzaTotal.innerHTML= factoryFunction.resetCart().smallTotal;
        mediumPizzaTotal.innerHTML= factoryFunction.resetCart().mediumTotal;
       largePizzaTotal.innerHTML= factoryFunction.resetCart().largeTotal;
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

        smallPizzaTotal.innerHTML= factoryFunction.resetCart().smallTotal;
        mediumPizzaTotal.innerHTML= factoryFunction.resetCart().mediumTotal;
       largePizzaTotal.innerHTML= factoryFunction.resetCart().largeTotal;
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


    return {
        BtnClicked,
        // quantityUpdate,
        priceUpdate,
        change,
        resetCart,
        buySmall,
        buyMedium,
        buyLarge,
        removeSmall,
        removeMedium,
        removeLarge,
        getTotals,
        getQuantities,
        getHiddenBtn,
        checkOutClick,
        payment
        
    }


    }

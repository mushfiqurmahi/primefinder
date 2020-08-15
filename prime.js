document.addEventListener("DOMContentLoaded", documentFunc);

function documentFunc(){
    document.getElementById("search").addEventListener("click", inputVal);
    document.getElementById("search-input").onkeydown = e => {
        if (event.which == 13 || event.keyCode == 13){
            inputVal();
        }
    }
}

function inputVal(){
    console.log("[TAKING INPUT]");
    let input_str = document.getElementById("search-input").value;
    let nums = input_str.split('-');
    console.log("[INPUT]", nums);
    if (nums.length === 1){
        calculate(1, nums[0]) // 1 is not prime (starting from 1)
    }
    else if (nums.length === 2){
        // start-end
        calculate(...nums)
    }
    else if (nums.length === 3){
        // start-end-step
        calculate(...nums)
    }
    else {
        // wrong input
        console.error("[WRONG INPUT]");
        return;
    }
}

function calculate(start, end, step=1){
    console.log("[CACULATING]")

    let all_primes = []; //all prime number's array
    
    start = parseInt(start);
    end = parseInt(end);
    step = parseInt(step);
    
    console.log(start, end, step);
    if (!(start && end && step && start>0 && end>0 && step>0 && start!=end)){
        //wrong input
        console.error("[WRONG INPUT]");
        return;
    }

    // check if isPrime
    for (let i=start; i<=end; i+=step){
        if(isPrime(i, all_primes)){ // returns bool
            console.info('[Prime]', i);
            all_primes.push(i);
        }
    }

    console.log("[All Primes] ", all_primes);
    // all primes are found --> all_primes array

    // update dom
    updateDom(start, end, step, all_primes)
}

function isPrime(num, all_primes){
    // num = integer > 0; so no extra check

    // '1' may come so check it
    if(num < 2) return false;
    else if(num === 2) return true; // 2-only even prime
    else if(!(num % 2)) return false; // even number, not=2
    else {
        //check if divisible by every prime less than sqrt(num)
        let sqrt_num = Math.sqrt(num);
        for (let i of all_primes){
            if (i > sqrt_num) break;
            if (!(num%i)) return false; //if any i can divide num return false
        }
        return true; // if none returns false than its a prime number
    }
}

function updateDom(start, end, step, all_primes){
    
    document.querySelector('.result-visual').innerHTML = '';
    // clearing dom af there was any
    
    let new_array = all_primes.slice(); 
    //copying array for efficiency (there are several method for copying an array)

    for (let i=start; i<=end; i+=step){
        if (!new_array.length || i < new_array[0]){
            /*Checking if ...
            1. new_array is empty (means no prime left)
            2. or if not empty check current num is less than 1st element of primes 
            */

            // insert them as normal* numbers
            document.querySelector('.result-visual').innerHTML+=`<div><span>${i}</span></div>`;
        }
        else{ 
            // if i==all_primes[0] --> means its a prime number

            // insert it as prime*  number
            // and delete the 1st item(prime) of the array
            document.querySelector('.result-visual').innerHTML+=`<div data-prime><span>${i}</span></div>`;
            new_array.shift();
        }
    }
}
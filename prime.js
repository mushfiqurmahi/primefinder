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
        calculate(2, nums[0]) // 1 is not prime
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
        return;
    }
}

function calculate(start, end, step=1){
    console.log("[CACULATING]")
    let all_primes = [];
    
    start = parseInt(start);
    end = parseInt(end);
    step = parseInt(step);
    
    console.log(start, end, step);
    if (!(start && end && step && start>0 && end>0 && step>0 && start!=end)){
        console.error("[WRONG INPUT]")
        //wrong input
        return;
    }

    // check if isPrime
    for (let i=start; i<=end; i+=step){
        if(isPrime(i, all_primes)){ // returns bool
            console.info('[Prime]', i)
            all_primes.push(i)
        }
    }

    // all primes found
    // update dom;
    let new_array = all_primes.slice(); //creating nwe array

    for (let i=start; i<=end; i+=step){
        if (i < new_array[0])
            document.querySelector('.result-visual').innerHTML+=`<div><span>${i}</span></div>`;
        else{ //if i==all_primes[0]
            document.querySelector('.result-visual').innerHTML+=`<div data-prime><span>${i}</span></div>`;
            new_array.shift();
        }

    }
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
document.addEventListener("DOMContentLoaded", () => {
    // on documenat_content_loaded add eventlistener
    document.getElementById("search").addEventListener("click", inputVal);
    document.getElementById("search-input").onkeydown = e => {
        if (event.which == 13 || event.keyCode == 13){
            inputVal();
        }
    }

    // get stuff from localStorage, if not then => []
    all_primes = localStorage.getItem('all_primes') || [];
});

// gobal_var --so that u have to count var only once
let all_primes = [];

function inputVal(){
    console.log("[TAKING INPUT]");
    let input_str = document.getElementById("search-input").value;
    let nums = input_str.split('-');

    console.log("[INPUT]", nums);

    if (nums.length === 1){
        // he just passed only one number
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
        document.getElementById('search-input').setAttribute('data-error', '');
        return;
    }
}

function calculate(start, end, step=1){
    // input is right
    console.log("[RIGHT INPUT]");
    document.getElementById('search-input').removeAttribute('data-error');

    console.log("[CACULATING]")
    
    start = parseInt(start);
    end = parseInt(end);
    step = parseInt(step);
    
    console.log(start, end, step);
    if (!(start && end && step && start>0 && end>0 && step>0 && start<end)){
        //wrong input
        console.error("[WRONG INPUT]");
        document.getElementById('search-input').setAttribute('data-error', '');
        return;
    }

    // check if isPrime
    

    console.log("[All Primes] ", all_primes);
    // all primes are found --> all_primes array

    // update dom
    updateDom(start, end, step, all_primes)
}

function isAllPrime(end){
    /* This func calculate all prime and mutate the global all_primes variable */

    let starting_point =1; //calculation will be started form this val
    if (all_primes.length){
        // if the array is not empty, check how many values has caculated already
        
        let  last_element = all_primes[all_primes.length - 1];
        if (end <= last_element) {
            // means all values are caculated and no need to count(mutate global var)
            return;
        }else{
            // end > last_element
            // some values nedd to be calculated

        }
    }

    for (let i=1; i<=end; i+=step){
        // starting from 1 because we need those prime to calculate higher value.
        /*Check -->
            1. if the list contains the already.
            2. if not then check the number is a prime.
        */
        let  last_element = all_primes[all_primes.length - 1];
        if (i <= last_element){
            // if i <= last_element_of_the_list
            // means the list already contains the number (means its prime*)
            // nothing to do
            continue;
        }
        else if(isPrime(i, all_primes)){ 
            // returns bool
            // list not contains that number
            // add it to the list
            //console.info('[new Prime]', i);
            all_primes.push(i);
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

function updateDom(start, end, step, all_primes){
    
    document.querySelector('.result-visual').innerHTML = '';
    // clearing dom af there was any
    
    let new_array = all_primes.slice(); 
    //copying array for efficiency (there are several method for copying an array)

    // delete those primes which are less than starting number
    // terminating "i > new_array[0]" condition
    while (true){
        if (!new_array.length || new_array[0] >= start) break;
        // break if array is empty OR array[0] > starting_value
        new_array.shift();
    }
    // after deleting all unnecessary prime, length of the new_array will be the total_primes value
    let total_primes = new_array.length;
    // update dom
    document.querySelector('.totals').innerHTML = total_primes;

    console.log('[Primes] ', new_array)

    for (let i=start; i<=end; i+=step){
        if (!new_array.length || i < new_array[0]){
            /*Checking if ...
            1. new_array is empty (means no prime left)
            2. or if not empty check current num is less than 1st element of primes 
            */

            // insert them as normal* numbers
            document.querySelector('.result-visual').innerHTML+=`<div><span>${i}</span></div>`;
            continue;
        }
        else{ 
            // if i==all_primes[0] --> means its a prime number

            /*as we have deleted all i > new_array[0] numbers this condition will never true */
            
            // insert it as prime*  number
            // and delete the 1st item(prime) of the array
            document.querySelector('.result-visual').innerHTML+=`<div data-prime><span>${i}</span></div>`;
            new_array.shift();
            continue;
        }
    }
}

function changeDarkMode(){
    if (document.body.style.backgroundColor == "rgb(255, 255, 255)"){
        document.body.style.backgroundColor = "rgb(36, 37, 42)";
    }else {
        document.body.style.backgroundColor = 'rgb(255, 255, 255)'
    }
}
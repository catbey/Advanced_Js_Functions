// 1-Currying
const curry = (fn, ...args) => 
  args.length >= fn.length 
    ? fn(...args) 
    : (...moreArgs) => curry(fn, ...args, ...moreArgs);

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log("1. Currying : " + curriedAdd(1)(2)(3));

// 2-Memoization
const memoize = (fn) => {
    const cache = {};
    return (...args) => {
      const stringifiedArgs = JSON.stringify(args);
      return cache[stringifiedArgs] || (cache[stringifiedArgs] = fn(...args));
    };
  };
  
  const fibonacci = memoize((n) => (n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2)));
  
  console.log("2. Memoization: " + fibonacci(10));

// 3-Function Composition
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const add5 = (x) => x + 5;
const multiplyBy2 = (x) => x * 2;
const add5AndMultiplyBy2 = compose(multiplyBy2, add5);

console.log("3. Function Composition: " + add5AndMultiplyBy2(3));

// 4-Generators
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  }
  
  const sequence = generateSequence(1, 5);
  
  console.log("4. Generators: " + [...sequence]);

// 5-Noop
const noop = () => {};
function myFunction(callback = noop) {
  console.log("Hello World");
  callback();
}

console.log("5. No operation lol");
// 6-Throttle
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  // 7-Debounce
  const debounce = (func, delay) => {
    let timeoutId;
    return function() {
      const args = arguments;
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  };
  
  window.addEventListener('scroll', throttle(() => console.log("6. Throttle: "+'Scrolling...'), 1000));
  window.addEventListener('input', debounce(() => console.log("7. Debounce: "+'Input changed...'), 500));
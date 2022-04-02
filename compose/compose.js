function  compose(...[first, ...others]) {
    console.log(first);
    console.log(others)
    return function(...args) {
        let params = first(...args);
        console.log(params)
        others.forEach(fn => {
            params = fn(params)
        })
        return params
    }
}

function square(x) {
    return x*x;
}

function add(x) {
    return x + x;
}
const fn = compose(square,add);

console.log(fn(2,3))
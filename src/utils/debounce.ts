const debounce = (func, timeout = 300) => {
    let timer: number | undefined;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => { 
            func.apply(this, args); 
        }, timeout);
    };
}

export default debounce;
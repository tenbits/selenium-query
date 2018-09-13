function Classify (Ctor) {
    
    const Class: typeof Ctor =  function (...args) {
        return new Ctor(...args);
    }
    Class.prototype = Ctor.prototype;

    for (let key in Ctor) {
        if (key in Class === false) {
            Class[key] = Ctor[key];
        }
    }
    return Class;    
}

function FnPrototypeAlias (Ctor) {
    Ctor.fn = Ctor.prototype;
    return Ctor;    
}


export { Classify, FnPrototypeAlias };
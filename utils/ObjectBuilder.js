export default class ObjectBuilder {
    constructor() {
        this.orgObject = {}
    }


    get(key) {
        return this.orgObject[key]
    }

//{'corner':{'ilkyari':'value'}}

    set() {
        // let args = Array.from(arguments);
        // let value = args.pop();
        // //key
        // for (let i = 0; i < args.length; i++) {
        //         this.
        // }
    }

    set2Key(key1, key2, value) {

        if (key1 && key2) {
            this.set(key1, key2)
        }
        return this.orgObject[key] = value;
    }

}
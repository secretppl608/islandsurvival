class Entity {
    //实体基类
    constructor() { }
}

class Env_Entity extends Entity {
    //继承自上一个类
    constructor() { }
}

class Liquid {
    //这里也应该继承自上一个类
    constructor() {
        this.attr = {
            canStandOn: false,
            canAcross: true,
            oxygen: false,
            safe: false,
            canFire: false,
        };
    }
    static clearFire(...args) {
        const arg = args;
        let b = false;
        for (let i of arg) {
            if (typeof i == "boolean") {
                b = i;
                break;
            }
        }
        //根据b为true灭火
    }
}

class Water extends Liquid {
    constructor() {
        super();
        this.Entity_ID = "liquid_water_common";
        this.Entity_NAME = "water";
    }
    static get hc() {
        return {
            fluidity: true,
            canClearFire: true,
        };
    }
    static waterFire() {
        return super.clearFire(this.hc.canClearFire);
    }
}

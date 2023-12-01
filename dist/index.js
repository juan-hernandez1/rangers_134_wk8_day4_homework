"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const readlineSync = __importStar(require("readline-sync"));
function testMe(name) {
    console.log(name);
}
testMe('The Rock');
// noImplicitAny
// set to true
// function implicitAny(id:number):number {
//     return id
// }
// noImplicitReturns
// set to true
// function noImplicitReturns(name:string):string{
//     console.log(name)
// }
// noUnusedlocals
// set to true
// function noUnusedlocals(): void {
//     let unused = 5
//     console.log("yolo")
// }
// noUnusedParameters
// set to true
// function noUnusedParameters(id: number):void {
//     console.log("youre a goofy goober")
// }
// strictNullChecks
// set to true
// function strictNullChecks(id: number): void {
//     console.log(id)
// }
// strictNullChecks(null)
// allowUnreachebleCode
// set to false
// function unreachable(id: number): number {
//     while(typeof id === "number"){
//         // break
//     }
//     return id
// }
// noImplicitOverrides
// set to true
// class Father {
//     constructor(public age: number){}
//     playSmash():string{
//         return "Get rekt my son"
//     }
// }
// class Son extends Father {
//     override playSmash():string {
//         return "One day I shall defeat you, father, and regain my honor"
//     }
// }
let myUuid = (0, uuid_1.v4)();
console.log(myUuid);
class UserClass {
    constructor(name) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.cart = [];
    }
}
class ItemClass {
    constructor(name, description, price) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = 0;
    }
}
function createUser(name) {
    return new UserClass(name);
}
function createItem(name, description, price) {
    return new ItemClass(name, description, price);
}
function addToCart(item, user, quantity) {
    if (quantity > 0) {
        const existingItem = user.cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            user.cart.push(Object.assign(Object.assign({}, item), { quantity }));
        }
    }
    else {
        console.log('Quantity must be greater than zero.');
    }
}
function removeFromCart(item, user, quantity) {
    const index = user.cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
        if (quantity <= user.cart[index].quantity) {
            user.cart[index].quantity -= quantity;
            console.log(`\nRemoved Qty: ${quantity} ${item.name} from the cart.`);
            if (user.cart[index].quantity <= 0) {
                user.cart.splice(index, 1);
            }
        }
        else {
            console.log(`\nCannot remove ${quantity} ${item.name}. There are only ${user.cart[index].quantity} ${item.name} in the cart.`);
        }
    }
}
function cartTotal(user) {
    const total = user.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return total.toFixed(2);
}
function printCart(user) {
    console.log('\nItems in the cart:');
    user.cart.forEach((item) => {
        console.log(`ID: ${item.id}, Name: ${item.name}, Price: $${item.price} * Qty: ${item.quantity}`);
    });
    console.log(`Total: $${cartTotal(user)}`);
}
function getUserInput(prompt) {
    return readlineSync.question(prompt);
}
function getUserInputNumber(prompt) {
    return parseFloat(getUserInput(prompt));
}
const userName = getUserInput('Enter your name: ');
const user = createUser(userName);
function mainMenu() {
    while (true) {
        console.log('\n1. Add item to cart');
        console.log('2. Remove item from cart');
        console.log('3. View cart');
        console.log('4. Exit');
        const choice = getUserInputNumber('Enter your choice: ');
        switch (choice) {
            case 1:
                const itemName = getUserInput('Enter name for the item: ');
                const itemDescription = getUserInput('Enter description for the item: ');
                const itemPrice = getUserInputNumber('Enter price for the item: $');
                const quantity = getUserInputNumber(`Enter quantity for ${itemName}: `);
                const newItem = createItem(itemName, itemDescription, itemPrice);
                addToCart(newItem, user, quantity);
                console.log(`\nAdded Qty: ${quantity} ${itemName} to the cart.`);
                break;
            case 2:
                if (user.cart.length === 0) {
                    console.log('The cart is empty. There are no items to remove.');
                }
                else {
                    printCart(user);
                    const itemIdToRemove = getUserInput('\nEnter the ID of the item to remove: ');
                    const itemToRemove = user.cart.find((item) => item.id === itemIdToRemove);
                    if (itemToRemove) {
                        const quantityToRemove = getUserInputNumber(`Enter quantity to remove for ${itemToRemove.name}: `);
                        removeFromCart(itemToRemove, user, quantityToRemove);
                    }
                    else {
                        console.log(`Item with ID ${itemIdToRemove} not found in the cart.`);
                    }
                }
                break;
            case 3:
                printCart(user);
                break;
            case 4:
                console.log('Thank you for shopping with us. Please visit us again soon.');
                process.exit(0);
            default:
                console.log('\nInvalid choice. Please enter a valid option.');
        }
    }
}
mainMenu();

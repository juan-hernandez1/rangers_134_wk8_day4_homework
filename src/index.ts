import { v4 as uuid } from "uuid"
import * as readlineSync from 'readline-sync'


function testMe(name: string): void {
    console.log(name)
}

testMe('The Rock')

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

let myUuid = uuid()
console.log(myUuid)


class UserClass implements User {
    id: string
    name: string
    cart: Item[]
  
    constructor(name: string) {
      this.id = uuid()
      this.name = name
      this.cart = []
    }
  }

class ItemClass implements Item {
    id: string
    name: string
    description: string
    price: number   
    quantity: number
  
    constructor(name: string, description: string, price: number) {
      this.id = uuid()
      this.name = name
      this.description = description
      this.price = price      
      this.quantity = 0
    }
  }

interface User {
id: string
name: string
cart: Item[]
}

interface Item {
id: string
name: string
description: string
price: number   
quantity: number
}

function createUser(name: string): User {
return new UserClass(name)
}

function createItem(name: string, description: string, price: number): Item {
return new ItemClass(name, description, price)
}
  
function addToCart(item: Item, user: User, quantity: number): void {
if (quantity > 0) {
    const existingItem = user.cart.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
    existingItem.quantity += quantity
    } else {
    user.cart.push({ ...item, quantity })
    }
} else {
    console.log('Quantity must be greater than zero.')
}
}
  
function removeFromCart(item: Item, user: User, quantity: number): void {
const index = user.cart.findIndex((cartItem) => cartItem.id === item.id)
if (index !== -1) {

    if (quantity <= user.cart[index].quantity) {
    user.cart[index].quantity -= quantity
    console.log(`\nRemoved Qty: ${quantity} ${item.name} from the cart.`)

    if (user.cart[index].quantity <= 0) {
        user.cart.splice(index, 1)
    }
    } else {
    console.log(`\nCannot remove ${quantity} ${item.name}. There are only ${user.cart[index].quantity} ${item.name} in the cart.`)
    }
}
}
     
function cartTotal(user: User): string {
const total = user.cart.reduce((total, item) => total + item.price * item.quantity, 0)
return total.toFixed(2)
}
  
function printCart(user: User): void {
console.log('\nItems in the cart:')
user.cart.forEach((item) => {
    console.log(`ID: ${item.id}, Name: ${item.name}, Price: $${item.price} * Qty: ${item.quantity}`)
})
console.log(`Total: $${cartTotal(user)}`)
}

function getUserInput(prompt: string): string {
return readlineSync.question(prompt)
}
  
function getUserInputNumber(prompt: string): number {
return parseFloat(getUserInput(prompt))
}

const userName: string = getUserInput('Enter your name: ')
const user: User = createUser(userName)

function mainMenu() {
    while (true) {
      console.log('\n1. Add item to cart')
      console.log('2. Remove item from cart')
      console.log('3. View cart')
      console.log('4. Exit')
  
      const choice: number = getUserInputNumber('Enter your choice: ')
  
      switch (choice) {
        case 1:
        const itemName: string = getUserInput('Enter name for the item: ')
        const itemDescription: string = getUserInput('Enter description for the item: ')
        const itemPrice: number = getUserInputNumber('Enter price for the item: $')
        const quantity: number = getUserInputNumber(`Enter quantity for ${itemName}: `)

        const newItem: Item = createItem(itemName, itemDescription, itemPrice)
        addToCart(newItem, user, quantity)

        console.log(`\nAdded Qty: ${quantity} ${itemName} to the cart.`)
          break

        case 2:
        if (user.cart.length === 0) {
        console.log('The cart is empty. There are no items to remove.')
        } else {
        printCart(user)

        const itemIdToRemove: string = getUserInput('\nEnter the ID of the item to remove: ')
        const itemToRemove: Item | undefined = user.cart.find((item) => item.id === itemIdToRemove)

        if (itemToRemove) {
        const quantityToRemove: number = getUserInputNumber(`Enter quantity to remove for ${itemToRemove.name}: `)
        removeFromCart(itemToRemove, user, quantityToRemove)
        } else {
        console.log(`Item with ID ${itemIdToRemove} not found in the cart.`)
        }
    }
        break        

        case 3:
          printCart(user)
          break
        case 4:
          console.log('Thank you for shopping with us. Please visit us again soon.')
          process.exit(0)
        default:
          console.log('\nInvalid choice. Please enter a valid option.')
      }
    }
  }
  
mainMenu()
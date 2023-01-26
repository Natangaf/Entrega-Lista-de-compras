import { NextFunction, Request, Response } from "express"
import { listComps } from "../database";
import { iPurchaseList } from './../interfaces';

const verifyListExists = (request: Request, response: Response, next: NextFunction): Response | void => {
    const { purchaseListId } = request.params

    if (!+purchaseListId) {
        return response.status(400).json({
            messege: `this list ${purchaseListId} is not valid `
        })
    }
    const list: iPurchaseList | undefined = listComps.find(
        (iten) => iten.id == +purchaseListId)

    if (!list) {
        return response.status(400).json({ messege: `List with id ${purchaseListId} does not exist` })
    }
    request.List = list

    return next()
}

const verifyItenExists = (request: Request, response: Response, next: NextFunction): Response | void => {
    const { List } = request
    const { itemName } = request.params

    const valid: boolean = List.data.some(iten => itemName == iten.name)

    if (!valid) {
        return response.status(400).json({ message: `Item with name ${itemName} does not exist` })
    }
    return next()

    // const requiredKeysIten: string[] = ["name", "quantity"]
    // const requestKeys = Object.keys(request.body)
    // const valid = requestKeys.every(key => requiredKeysIten.includes(key))
    // if (!valid) {
    //     return response.status(400).json({ message: "Updatable fields are: name and quantity" })
    // }

    // const { quantity, name } = request.body


    // if (+quantity || +name) {
    //     return response.status(400).json({
    //         messege: `The list name need to be a string `
    //     })
    // }




    // return response.status(400).json({ messege: `teste` })
}



export { verifyListExists, verifyItenExists }
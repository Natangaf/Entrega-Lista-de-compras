import { NextFunction, Request, Response } from "express"
import { listComps } from "../database";
import { iPurchaseList, iBody } from './../interfaces';

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


}

const validateKeysData = (request: Request<any, any,iBody>, response: Response, next: NextFunction): Response | void => {

    const { body } = request

    const requiredKeys: string[] = ["listName", "data"]
    const requiredKeysIten: string[] = ["name", "quantity"]

    if (typeof body.listName == "number") {
        return response.status(400).json({ mensage: `Name not Valid : ${body.listName}` })
    }
    for (const key in body) {
        if (!requiredKeys.includes(key)) {
            return response.status(400).json({ mensage: `Requered Keys Are : ${key}` })
        }
        if (!body.hasOwnProperty("listName") || !body.hasOwnProperty("data")) {
            return response.status(400).json({ mensage: `Requered Keys Are : ${requiredKeys}` })
        }
    }
    body.data.map(iten => {
        for (const key in iten) {
            if (!requiredKeysIten.includes(key)) {
                return response.status(400).json({ mensage: `Requered Keys Are : ${requiredKeys}` })
            }
            if (!iten.hasOwnProperty("name") || !iten.hasOwnProperty("quantity")) {
                return response.status(400).json({ mensage: `Requered Keys Are : ${requiredKeys}` })
            }
        }
    })

    return next()
}

export { verifyListExists, verifyItenExists, validateKeysData }
import { NextFunction, Request, Response } from "express"
import { listComps } from "../database";
import { iPurchaseList, iBody, iPathList } from './../interfaces';

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

    const valid: boolean = List.data.some(item => itemName == item.name)

    if (!valid) {
        return response.status(400).json({ message: `Item with name ${itemName} does not exist` })
    }
    return next()


}
const validKensItens = (item: any) => {
    const requiredKeysItem: string[] = ["name", "quantity"]

    for (const key in item) {
        if (!requiredKeysItem.includes(key)) {
            throw new Error(`Is not valid Key : ${key}`)
        }
        if (!item.hasOwnProperty("name") || !item.hasOwnProperty("quantity")) {
            throw new Error(`Is not valid Key : ${key}`)
        }
    }
}
const validateKeysList = (request: Request<any, any, iBody>, response: Response, next: NextFunction): Response | void => {

    const { body } = request

    const requiredKeys: string[] = ["listName", "data"]

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

    body.data.map((item) => {
        try {
            validKensItens(item)
            return next()
        } catch (error) {
            if (error instanceof Error) {
                return response.status(400).json({ message: error.message })
            }
            return response.status(500).json({ message: "internal sever error" })
        }
    })
}
const validateKeysData = (request: Request<any, any, iPathList>, response: Response, next: NextFunction): Response | void => {
    const { body } = request

    const requiredKeysItem: string[] = ["name", "quantity"]

    for (const key in body) {
        
        if (!requiredKeysItem.includes(key)) {
            console.log(key);
            return response.status(400).json({ mensage: `Key Not Valid: ${key}` })
        }
        if (typeof body?.name !== "string" || typeof body?.quantity !== "string") {
            return response.status(400).json({ mensage: `Value the Keys not valid : ${body?.name || body?.quantity}` })
        }
    }
    return next()
}
export { verifyListExists, verifyItenExists, validateKeysList, validateKeysData }
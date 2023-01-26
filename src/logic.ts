import { Request, Response } from "express"
import { iPurchaseList } from "./interfaces"
import { listComps } from "./database"

const getList = (request: Request, response: Response): Response => {
    return response.status(200).json(listComps)
}
const getOneList = (request: Request, response: Response): Response => {
    const { purchaseListId } = request.params

    if (+purchaseListId) {
        console.log(+purchaseListId);
        
        const dataFilter = listComps.filter(iten => iten.id == +purchaseListId)
        return response.status(200).json(dataFilter)
    } else {
        return response.status(400).json({ message: `Requered Keys Are : not valid Id` })
    }

}

const validateData = (payload: iPurchaseList): iPurchaseList => {

    const requiredKeys: string[] = ["listName", "data"]
    const requiredKeysIten: string[] = ["name", "quantity"]

    if (typeof payload.listName == "number") {
        throw new Error(`Name not Valid : ${payload.listName}`)
    }
    for (const key in payload) {
        if (!requiredKeys.includes(key)) {
            throw new Error(`Requered Keys Are : ${key}`)
        }
        if (!payload.hasOwnProperty("listName") || !payload.hasOwnProperty("data")) {
            throw new Error(`Requered Keys Are : ${requiredKeys}`)
        }
    }
    payload.data.map(iten => {
        for (const key in iten) {
            if (!requiredKeysIten.includes(key)) {
                throw new Error(`Requered Keys Are : ${key}`)
            }
            if (!iten.hasOwnProperty("name") || !iten.hasOwnProperty("quantity")) {
                throw new Error(`Requered Keys Are : ${requiredKeysIten}`)
            }
        }
    })
    return payload
}

const createdList = (request: Request, response: Response): Response => {
    try {
        const validatedData = validateData(request.body)
        validatedData.id = listComps.length + 1
        listComps.push(validatedData)
        return response.status(201).json(validatedData);
    } catch (error) {
        if (error instanceof Error) {
            return response.status(400).json({ message: error.message })
        }
        console.log(error);
        return response.status(500).json({ message: error })
    }
    return response

}

const deleteInten = (request: Request, response: Response): Response => {

    const removeIten = request.List.data.findIndex(iten => iten.name == request.params.itemName)
    if (removeIten >= 0) {
        listComps.map(list => {
            if (list.id == request.List.id) {
                list.data.splice(removeIten, 1)
            }
        })
    } else {
        return response.status(404).json({
            message: `item ${request.params.itemName} not found.` })
    }
     return response.status(200).json({ message: "ok" })

}
const deleteList = (request: Request, response: Response): Response => {

    const removeIten = listComps.findIndex(list => list.listName == request.List.listName)
    console.log(removeIten);

    if (removeIten >= 0) {
        listComps.splice(removeIten, 1)    
    } else {
        return response.status(404).json({
            message: `list ${request.params.itemName} not found.`
        })
    }
    return response.status(200).json({ message: "ok" })

}

export { createdList, getList, getOneList, deleteInten, deleteList }
import { Request, Response } from "express"
import { listComps } from "./database"

const getList = (request: Request, response: Response): Response => {
    return response.status(200).json(listComps)
}

const getOneList = (request: Request, response: Response): Response => {
    const { purchaseListId } = request.params

    if (+purchaseListId) {

        const dataFilter = listComps.filter(iten => iten.id == +purchaseListId)
        return response.status(200).json(dataFilter)
    } else {
        return response.status(400).json({ message: `Requered Keys Are : not valid Id` })
    }

}

const createdList = (request: Request, response: Response): Response => {
    const { body } = request
    body.id = listComps.length + 1
    listComps.push(body)
    return response.status(201).json(body);
}

const updateList = (request: Request, response: Response): Response => {

    const indexList: number = listComps.findIndex(list => list.id == request.List.id)

    const data = listComps[indexList].data.findIndex(itemList => itemList.name == request.params.itemName)

    listComps[indexList].data[data] = { ...listComps[indexList].data[data], ...request.body }
    
    return response.json(listComps[indexList])

}

const deleteIntem = (request: Request, response: Response): Response => {

    const removeIten = request.List.data.findIndex(iten => iten.name == request.params.itemName)
    if (removeIten >= 0) {
        listComps.find(list => {
            if (list.id == request.List.id) {
                list.data.splice(removeIten, 1)
            }
        })
    } else {
        return response.status(404).json({
            message: `item ${request.params.itemName} not found.`
        })
    }
    return response.status(204).json()

}

const deleteList = (request: Request, response: Response): Response => {

    const removeIten = listComps.findIndex(list => list.listName == request.List.listName)

    if (removeIten >= 0) {
        listComps.splice(removeIten, 1)
    } else {
        return response.status(404).json({
            message: `list ${request.params.itemName} not found.`
        })
    }
    return response.status(204).json()

}

export { createdList, getList, getOneList, updateList, deleteIntem, deleteList }
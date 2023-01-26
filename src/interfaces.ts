
export type tPurchaseListKeys = "listName" | "data"
export type tIten = "name" | "quantity"

export interface iPurchaseList {
    id: number,
    listName: string,
    data: iItem[],
}
export interface iItem {
    name: string,
    quantity: string
}
export interface iBody {
    listName: string,
    data: iItem[],
}
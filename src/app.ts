import express, { Application } from "express";
import { createdList, getList, getOneList, deleteInten, deleteList } from "./logic";
import { verifyListExists, verifyItenExists } from "./middlewares/middlewares"
const app: Application = express();
app.use(express.json());


app.get("/purchaseList", getList)
app.post("/purchaseList", createdList)
app.get("/purchaseList/:purchaseListId", verifyListExists, getOneList)
app.patch("/purchaseList/:purchaseListId/:itemName", verifyListExists)
app.delete("/purchaseList/:purchaseListId/:itemName", verifyListExists, verifyItenExists, deleteInten)
app.delete("/purchaseList/:purchaseListId", verifyListExists, deleteList)


const PORT: number = 3000;
const runungMsg: string = `Sever runing on http://Localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(runungMsg);

})

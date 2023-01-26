import { iPurchaseList } from "../../interfaces";

declare global {
    namespace Express {
        interface Request {
            List: iPurchaseList;
        }
    }
}
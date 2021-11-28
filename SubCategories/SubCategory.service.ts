import { Service } from "typedi";
import * as crypto from "crypto";
import { v4 } from "uuid";
import GenerateToken from "../Utilities/GenerateTK";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { SubCategoryModel, SubCategory} from "./SubCategory.model";
import { SubCategoryInput } from "./SubCategory.input";

@Service('SubCategory_Service')
export class SubCategoryService {

    async CreateProduct(subCategoryInput: SubCategoryInput): Promise <SubCategory> {
        const { product_name, description, details, images, price  } = subCategoryInput;

        const sub_category = new SubCategoryModel();
        sub_category.product_name = product_name;
        sub_category.description = description
        sub_category.details = details;
        sub_category.images = images;
        sub_category.price = price;
        let saved;
        try {
            saved = await SubCategoryModel.create(sub_category)
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Cannot Save Product");
        }
        console.log(saved);
        return saved;
    }


    async getAllProducts():Promise <SubCategory[]> {
        let found;
        try {
            found = await SubCategoryModel.find()
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }

        return found;
    }

    async getProductById(_id: string): Promise<SubCategory> {
        const found = await SubCategoryModel.findById(_id)
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return ("Internal Server error");
            })

        return found;

    }

    // async deleteStore(): Promise<void> {
    //     // const id =""
    //     // const deleted = await ProductModel.deleteOne()
    //     //     .then((data: any) => {
    //     //         return data
    //     //     })
    //     //     .catch((err: Error) => {

    //     // return deleted;

    // }
    // async updateStore(prodctInput: ProductInput):Promise<Product> {
    //     // const data = {};
    //     // const id = ""
    //     // const updated = await ProductModel.update(filter: "")
    //     //     .then((data: any) => {
    //     //         return data
    //     //     })
    //     //     .catch((err: Error) => {
    //     //         console.log(err);
    //     //         return ("Internal Server error");
    //     //     })

    //     // return updated;

    // }

}

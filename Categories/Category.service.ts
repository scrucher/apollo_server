import { Service } from "typedi";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { CategoryModel, Category } from "./Category.model";
import { CategoryInput } from "./Category.input";
import { Context } from "apollo-server-core";


@Service('Category_Service')
export class CategoryService {

    async CreateProduct(productInput: CategoryInput, context: Context): Promise <Category> {
        const { product_name, description, details, images, price  } = productInput;
        // const user_id = context._id;
        const Category = new CategoryModel();
        Category.description = description
        Category.details = details;
        Category.images = images;
        Category.price = price;
        // Category.user = user_id;
        let saved;
        try {
            saved = await CategoryModel.create(Category)
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Cannot Save Category");
        }
        console.log(saved);
        return saved;
    }


    async getAllCategorys():Promise <Category[]> {
        let found;
        try {
            found = await CategoryModel.find()
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }

        return found;
    }

    async getCategoryById(_id: string): Promise<Category> {
        const found = await CategoryModel.findById(_id)
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
    //     // const deleted = await CategoryModel.deleteOne()
    //     //     .then((data: any) => {
    //     //         return data
    //     //     })
    //     //     .catch((err: Error) => {

    //     // return deleted;

    // }
    // async updateStore(prodctInput: CategoryInput):Promise<Category> {
    //     // const data = {};
    //     // const id = ""
    //     // const updated = await CategoryModel.update(filter: "")
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

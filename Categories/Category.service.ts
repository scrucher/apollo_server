import { Service } from "typedi";
import { InternalServerError} from "routing-controllers";
import { CategoryModel, Category } from "./Category.model";
import { CategoryInput } from "./Category.input";
import { Context } from "apollo-server-core";
import { CategoryArgs } from "./Category.args";


@Service('Category_Service')
export class CategoryService {

    async CreateCategory(categoryInput: CategoryInput, context: Context): Promise <Category> {
        const { category_name} = categoryInput;
        // const user_id = context._id;
        const Category = new CategoryModel();
        Category.category_name = category_name;
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


    async GetAllCategories():Promise <Category[]> {
        let found;
        try {
            found = await CategoryModel.find()
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }

        return found;
    }

    async GetCategoryById(categoryArgs: CategoryArgs): Promise<Category> {
        const _id  = categoryArgs;
        let found: any;
        try {
            found = await CategoryModel.findById(_id)
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }
        return found;
    }

    async DeleteCategory(categoryArgs: CategoryArgs): Promise<String> {
        const _id = categoryArgs;
        try {
            await CategoryModel.deleteOne(_id);
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }
        return ("Category Deleted Successfully");
    }


    async updateCategory(
        categoryInput: CategoryInput,
        categoryArgs: CategoryArgs
    ): Promise<Category> {

        const _id = categoryArgs;
        const update = categoryInput;
        let updated: any;
        try {
            updated = await CategoryModel.findOneAndUpdate({
                where: _id
            },update, {
                returnOriginal: false
            });
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error'); 
        }
        return updated;
    }

}

import { Service } from "typedi";
import { InternalServerError } from "routing-controllers";
import { SubCategoryModel, SubCategory } from "./SubCategory.model";
import { SubCategoryInput } from "./SubCategory.input";
import { Context } from "apollo-server-core";
import { SubCategoryArgs } from "./SubCategory.args";
import { mongoose } from "@typegoose/typegoose";


@Service('SubCategory_Service')
export class SubCategoryService {

    async CreateSubCategory(subCategoryInput: SubCategoryInput, context: Context): Promise<SubCategory> {
        const { sub_category_name, category_id } = subCategoryInput;
        // const user_id = context._id;
        const subCategory = new SubCategoryModel();
        subCategory.sub_category_name = sub_category_name;
        subCategory.category_id = category_id;
        let saved;
        try {
            saved = await SubCategoryModel.create(subCategory)
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Cannot Save Category");
        }
        console.log(saved);
        //@ts-ignore
        return saved;
    }


    async GetAllCategories(): Promise<SubCategory[]> {
        let found;
        try {
            found = await SubCategoryModel.find()
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }
//@ts-ignore
        return found;
    }

    async GetCategoryById(categoryArgs: SubCategoryArgs): Promise<SubCategory> {
        const _id = categoryArgs;
        let found: any;
        try {
            found = await SubCategoryModel.findById(_id)
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }
        return found;
    }

    async DeleteCategory(categoryArgs: SubCategoryArgs): Promise<String> {
        const _id = categoryArgs;
        try {
            await SubCategoryModel.deleteOne(_id);
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }
        return ("SubCategory Deleted Successfully");
    }


    async updateCategory(
        subCategoryInput: SubCategoryInput,
        categoryArgs: SubCategoryArgs
    ): Promise<SubCategory> {

        const _id = categoryArgs;
        const update = subCategoryInput;
        let updated: any;
        try {
            updated = await SubCategoryModel.findOneAndUpdate({
                _id: _id
            }, update, {
                returnOriginal: false,
                upsert: true,
            });
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }
        return updated;
    }

}

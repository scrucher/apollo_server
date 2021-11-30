import { Service } from "typedi";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { ProductModel, Product } from "./Product.model";
import { ProductInput } from "./Product.input";
import { ProductArgs } from "./Product.args";
import { Context } from "apollo-server-core";
import { StoreModel } from "../Store/Store.model";
import { mongoose } from "@typegoose/typegoose";


@Service('Product_Service')
export class ProductService {

    async CreateProduct(productInput: ProductInput, context: Context): Promise <Product> {
        const { product_name, description, details, images, price } = productInput;
        //@ts-ignore
        console.log({ "context": context.user._id })
        //@ts-ignore
        const store_id : mongoose.Types.ObjectId = context.user._id
        console.log({ "id ": store_id})
        // const store = await StoreModel.findById(store_id)
        // console.log(store)
        const product = new ProductModel();
        product.product_name = product_name;
        product.description = description
        product.details = details;
        product.images = images;
        product.price = price;
        //@ts-ignore
        // product.store_id = store_id;
        let saved;
        try {
            saved = await ProductModel.create(product);

        } catch (err) {
            console.log(err);
            throw new InternalServerError("Cannot Save Product");
        }
        // console.log(saved.store_id);
        return saved;
    }


    async getAllProducts():Promise <Product[]> {
        let found;
        try {
            found = await ProductModel.find().populate("")
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }

        return found;
    }

    async getProductById(_id: ProductArgs): Promise<Product> {
        const found = await ProductModel.findById(_id)
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return ("Internal Server error");
            })

        return found;

    }

    async DeleteProduct(id: string): Promise<void> {
        const _id = id
        let deleted;
        try {
            deleted = await ProductModel.deleteOne({_id})
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        }
        

        // return deleted;

    }
    async UpdateProduct(prodctInput: ProductInput, productArgs: ProductArgs): Promise<void> {
        const {_id} = productArgs 
        const update = ProductInput;
        let updated: any;
        try {
            updated = await ProductModel.findOneAndUpdate({_id: _id} , update, {
                returnOriginal: false
            });
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        }

        return updated;

    }

}

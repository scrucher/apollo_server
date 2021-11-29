import { Service } from "typedi";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { ProductModel, Product } from "./Product.model";
import { ProductInput } from "./Product.input";
import { ProductArgs } from "./Product.args";
import { Context } from "apollo-server-core";


@Service('Product_Service')
export class ProductService {

    async CreateProduct(productInput: ProductInput, context: Context): Promise <Product> {
        const { product_name, description, details, images, price } = productInput;
        //@ts-ignore
        console.log({ "context": context.user })
        //@ts-ignore
        const store_id = context._id
        console.log({"id ": store_id})
        const product = new ProductModel();
        product.product_name = product_name;
        product.description = description
        product.details = details;
        //@ts-ignore
        product.images = images;
        product.price = price;
        product.user = store_id;
        let saved;
        try {
            saved = await ProductModel.create(product)
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Cannot Save Product");
        }
        console.log(saved);
        return saved;
    }


    async getAllProducts():Promise <Product[]> {
        let found;
        try {
            found = await ProductModel.find()
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

import { Args,Ctx ,Mutation, Query, Resolver} from "type-graphql";
import { Inject, Service } from "typedi";
import { CategoryInput } from "./Category.input";
import { Category } from "./Category.model";
import { CategoryService } from "./Category.service";



@Service()
@Resolver(of => Category)

export class CategoryResolver {

    constructor(
        @Inject('Product_Service') private productService: CategoryService,
    ) { }

    @Query(returns => [Category])
    async getCategories(): Promise<Category[]> {
        const data = await this.productService.getAllCategorys()
        return data;
    }
    @Query(returns => Category)
    async getCategoryById( id : string):Promise<Category>{
      return await this.productService.getCategoryById(id);
    }



    @Mutation(returns => Category)
    //@ts-ignore
    async CreateCategory(@Args("storeInput") storeInput: CategoryInput, @Ctx() context: Context) {
        return await this.productService.CreateProduct(storeInput, context)
    }

    // @Mutation(returns => Category)
    // async StoreLogin() {
    //     return await this.productService.StoreLogin(storeLoginInput);
    //}

}

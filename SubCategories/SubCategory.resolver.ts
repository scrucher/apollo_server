import { Args, Mutation, Query, Resolver} from "type-graphql";
import { Inject, Service } from "typedi";
import { SubCategoryInput } from "./SubCategory.input";
import { SubCategory } from "./SubCategory.model";
import { SubCategoryService } from "./SubCategory.service";



@Service()
@Resolver(of => SubCategory)

export class SubCategoryResolver {

    constructor(
        @Inject('SubCategory_Service') private subCategoryService: SubCategoryService,
    ) { }

    @Query(returns => [SubCategory])
    async getSubCategories(): Promise<SubCategory[]> {
        const data = await this.subCategoryService.getAllProducts()
        return data;
    }
    
    @Query(returns => SubCategory)
    async getSubCategoriyById(id : string):Promise<SubCategory>{
      return await this.subCategoryService.getProductById(id);
    }



    @Mutation(returns => SubCategory)
    //@ts-ignore
    async CreateSubCategory(@Args("storeInput") subCategoryInput: SubCategoryInput) {
        return await this.subCategoryService.CreateProduct(subCategoryInput)
    }

    // @Mutation(returns => SubCategory)
    // async StoreLogin() {
    //     return await this.subCategoryService.StoreLogin(storeLoginInput);
    //}

}

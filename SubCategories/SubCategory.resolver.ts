import { Args,Ctx ,Mutation, Query, Resolver} from "type-graphql";
import { Inject, Service } from "typedi";
import { SubCategoryArgs } from "./SubCategory.args";
import { SubCategoryInput } from "./SubCategory.input";
import { SubCategory } from "./SubCategory.model";
import { SubCategoryService } from "./SubCategory.service";



@Service()
@Resolver(of => SubCategory)

export class SubCategoryResolver {

    constructor(
        @Inject('SubCategory_Service') private subCategorytService: SubCategoryService,
    ) { }

    @Query(returns => [SubCategory], { nullable: true })
    async GetSubCategories(): Promise<SubCategory[]> {
        const data = await this.subCategorytService.GetAllCategories()
        return data;
    }
    @Query(returns => SubCategory, { nullable: true })
    async GetSubCategoryById( @Args() subCategoryArgs: SubCategoryArgs):Promise<SubCategory>{
      return await this.subCategorytService.GetCategoryById(subCategoryArgs);
    }



    @Mutation(returns => SubCategory, { nullable: true })
    //@ts-ignore
    async CreateSubCategory(@Args("subCategoryInput") subCategoryInput: SubCategoryInput, @Ctx() context: Context) {
        return await this.subCategorytService.CreateSubCategory(subCategoryInput, context)
    }

    @Mutation(returns => SubCategory, {nullable: true})
    async UpdateSubCategory(
        @Args() subCategoryArgs: SubCategoryArgs,
        @Args() subCategoryInput : SubCategoryInput
    ) {
        return await this.subCategorytService.updateCategory(subCategoryInput, subCategoryArgs)
    }

    @Mutation(returns => SubCategory ,{nullable: true})
    async DeleteSubCategory(
        @Args() subCategoryArgs: SubCategoryArgs
    ) {
        return await this.subCategorytService.DeleteCategory(subCategoryArgs);
    }


}

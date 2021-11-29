import { Args,Ctx ,Mutation, Query, Resolver} from "type-graphql";
import { Inject, Service } from "typedi";
import { CategoryArgs } from "./Category.args";
import { CategoryInput } from "./Category.input";
import { Category } from "./Category.model";
import { CategoryService } from "./Category.service";



@Service()
@Resolver(of => Category)

export class CategoryResolver {

    constructor(
        @Inject('Category_Service') private categorytService: CategoryService,
    ) { }

    @Query(returns => [Category], {nullable: true})
    async getCategories(): Promise<Category[]> {
        const data = await this.categorytService.GetAllCategories()
        return data;
    }
    @Query(returns => Category, { nullable: true })
    async getCategoryById( @Args() categoryArgs: CategoryArgs):Promise<Category>{
      return await this.categorytService.GetCategoryById(categoryArgs);
    }



    @Mutation(returns => Category, { nullable: true })
    //@ts-ignore
    async CreateCategory(@Args("storeInput") storeInput: CategoryInput, @Ctx() context: Context) {
        return await this.categorytService.CreateCategory(storeInput, context)
    }

    @Mutation(returns => Category, {nullable: true})
    async UpdateCategory(
        @Args() categoryArgs: CategoryArgs,
        @Args() categoryInput : CategoryInput
    ) {
        return await this.categorytService.updateCategory(categoryInput, categoryArgs)
    }

    @Mutation(returns => Category, { nullable: true })
    async DeleteCategory(
        @Args() categoryArgs: CategoryArgs
    ) {
        return await this.categorytService.DeleteCategory(categoryArgs);
    }


}

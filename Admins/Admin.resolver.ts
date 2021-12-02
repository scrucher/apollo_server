import { Args, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { AdminInput } from "./Admin.input";
import { Admin} from "./Admin.model"
import { AdminService } from "./Admin.service";
import { AdminLoginInput } from "./AdminLogin.input";



@Service()
@Resolver(of => Admin)

export class AdminResolver {

    constructor(
        @Inject('Admin_Service') private adminService: AdminService,
    ) { }


    @Mutation(returns => Admin)
        //@ts-ignore
    async CreateAdmin(@Args("adminInput") adminInput: AdminInput){
        return await this.adminService.CreateAdmin(adminInput)
    }

    @Mutation(returns => Admin)
    async AdminLogin(@Args() adminLoginInput: AdminLoginInput) {
        return await this.adminService.AdminLogin(adminLoginInput);
    }

}

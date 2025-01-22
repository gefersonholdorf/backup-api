import { Body, Controller, Get, Post } from "@nestjs/common";
import { DeployService } from "./deploy.service";
import { CreateDeployDTO } from "./dto/create-deploy.dto";

@Controller('deploy')
export class DeployController {
    
    constructor(private readonly deployService : DeployService) {}

    @Post('create')
    async create(@Body() createDeploy : CreateDeployDTO) {
        return this.deployService.create(createDeploy)
    }

    @Get('find') 
    async findAll() {
        return this.deployService.findAll()
    }

}
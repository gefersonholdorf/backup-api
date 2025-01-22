import { IsDateString, IsNumber, IsString } from "class-validator"
import { format } from "date-fns"
import { Transform } from "class-transformer"

export class CreateDeployDTO {

    @IsString()
    name : string

    @IsString()
    system : string

    @IsString()
    typeDeploy : string

    @IsDateString()
    @Transform(({ value }) => format(new Date(value), 'dd-MM-yyyy-HH:mm'))
    date : Date
}
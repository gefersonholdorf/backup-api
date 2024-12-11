import { IsDateString, IsNumber, IsString } from "class-validator"
import { format } from "date-fns"
import { Transform } from "class-transformer"

export class CreateBackupDTO {

    @IsString()
    name : string

    @IsDateString()
    @Transform(({ value }) => format(new Date(value), 'dd-MM-yyyy-HH:mm'))
    date : Date

    @IsNumber()
    status : number

    @IsString()
    size ?: string
}
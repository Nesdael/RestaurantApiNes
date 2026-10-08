import { ApiProperty } from "@nestjs/swagger";
import { TableStatus } from "../enums/table.status.enum.js";
import { IsEnum } from "class-validator";

export class UpdateTableStatusDto {
    @ApiProperty({enum: TableStatus})
    @IsEnum(TableStatus)
    status: TableStatus
}
import { ApiPropertyOptional } from "@nestjs/swagger";
import { TableStatus } from "../enums/table.status.enum.js";
import { IsEnum, IsInt, IsOptional, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";

export class FilterTablesDto {
    @ApiPropertyOptional({enum: TableStatus})
    @IsOptional()
    @IsEnum(TableStatus)
    status?: TableStatus

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    zone?: string;

    @ApiPropertyOptional({example: 4})
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    capacity?: number
}
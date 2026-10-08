import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateTableDto {
    @ApiProperty({example: 1})
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    number: number;

    @ApiProperty({example: 4})
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    capacity: number;

    @ApiProperty({example: 'terrace'})
    @IsString()
    @IsNotEmpty()
    zone: string;
};

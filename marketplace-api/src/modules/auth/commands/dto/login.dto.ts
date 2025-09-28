import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'test@test.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: '123456'
    })
    @IsString()
    password: string;
}
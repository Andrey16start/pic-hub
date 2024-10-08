import { ApiProperty } from "@nestjs/swagger";


export class BanUserDto {
  @ApiProperty({ example: 1 })
  readonly userId: number;

  @ApiProperty({ example: 'For fraud' })
  readonly banReason: string;
}
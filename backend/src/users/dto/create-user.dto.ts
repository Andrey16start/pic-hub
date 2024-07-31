// FIXME:TODO: Why not UserCreationAttrs ? DRY

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
}
import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getUsers() {
    return [
      {
        id: 1,
        name: 'Johh Dou',
        email: 'john.dou@gmail.com',
      },
      {
        id: 2,
        name: 'Will Smith',
        email: 'will.smith@gmail.com',
      },
      {
        id: 3,
        name: 'Joe Biden',
        email: 'joe.biden@gmail.com',
      },
    ]
  }
}

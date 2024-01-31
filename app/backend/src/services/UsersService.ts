import * as bcrypt from 'bcryptjs';
import { IUser } from '../Interfaces/users/IUser';
import UsersModel from '../models/UsersModel';
import { IUsersModel } from '../Interfaces/users/IUserModel';
import { ServiceResponse, ServiceResponseError } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';

export default class UsersService {
  private invalidDataResponse: ServiceResponseError = {
    status: 'INVALID_DATA',
    data: { message: 'Invalid Data' },
  };

  constructor(
    private usersModel: IUsersModel = new UsersModel(),
    private jwtService = JWT,
  ) {}

  public async login(
    email: string,
    password: string,
  ): Promise<ServiceResponse<IUser | { token: string }>> {
    const user = await this.usersModel.findByEmail(email);
    if (!user) return this.invalidDataResponse;
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return this.invalidDataResponse;

    const token = this.jwtService.sign({ email: user.email, role: user.role });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities";
import { Repository } from "typeorm";
import { MainUserDataDTO } from "./dto/mainUserData.dto";
import * as bcrypt from 'bcrypt';
import { TokenPairDTO } from "./dto/tokenPair.dto";
import { SignInUserDTO } from "./dto/signInUser.dto";
import { SignUpUserDTO } from "./dto/signUpUser.dto";


const HASH_ROUNDS = 3;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<MainUserDataDTO | null> {
    const lowCaseEmail = email.toLowerCase();
    const user = await this.userRepository.findOne({
      where: { email: lowCaseEmail },
    });

    if (!user) return null;
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) return null;

    return {
      id: user.id,
      username: user.username,
      name: user.name,
      email: lowCaseEmail,
    };
  }

  async getUser(userId: number): Promise<MainUserDataDTO> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundException();
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
    };
  }

  async login(user: any): Promise<TokenPairDTO> {
    const payload = { userName: user.userName, sub: user.id };
    return{ accessToken: this.jwtService.sign(payload) };
  }

  async registry(user: SignUpUserDTO): Promise<UserEntity> {
    const emailInLowerCase = user.email.toLowerCase();
    const searchedUser = await this.userRepository.findOne({
      where: { email: emailInLowerCase },
    });

    const encryptedPass = await bcrypt.hash(user.password, HASH_ROUNDS);
    return await this.userRepository.save({
      username: user.username,
      email: emailInLowerCase,
      name: user.name,
      password: encryptedPass,
    });
  }
}
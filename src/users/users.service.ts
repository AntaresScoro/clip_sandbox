import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.UserModel.findOne({
      email: email.toLowerCase().trim(),
    }).exec();
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.UserModel.findById(id).exec();
    if (user) return user;
    throw new NotFoundException("L'utilisateur n'existe pas");
  }

  async create(user: CreateUserDto): Promise<UserDocument> {
    const userToCreate = new this.UserModel(user);
    return userToCreate.save();
  }
}

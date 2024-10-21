import { Model } from 'mongoose';

export class MongoRepository<T> {
  constructor(private model: Model<T>) {}

  public async findByIdWithSession(id: string, session: any): Promise<T | null> {
    return this.model.findById(id).session(session).exec();
  }

  public async countDocumentsWithSession(userId: string, session: any): Promise<number> {
    return this.model.countDocuments({ userId }).session(session);
  }

  async create(data: T): Promise<T> {
    const document = new this.model(data);
    return document.save() as T;
  }

  async createWithSession(data: T, session: any): Promise<T[]> {
    return this.model.create([data], {session});
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async updateWithSession(id: string, data: Partial<T>, session: any): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true, session }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async find(query: any, populate: string = ""): Promise<T[]> {
    return await this.model.find(query).populate(populate).exec();
  }

}

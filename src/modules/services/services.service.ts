import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private repo: Repository<ServiceEntity>,
  ) {}

  create(data: any) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}

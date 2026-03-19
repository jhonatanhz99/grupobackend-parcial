import { Repository } from 'typeorm';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlansService {
    private readonly planRepository;
    constructor(planRepository: Repository<Plan>);
    create(createPlanDto: CreatePlanDto): Promise<Plan>;
    findAll(): Promise<Plan[]>;
    findOne(id: number): Promise<Plan>;
    update(id: number, updatePlanDto: UpdatePlanDto): Promise<Plan>;
    remove(id: number): Promise<void>;
}

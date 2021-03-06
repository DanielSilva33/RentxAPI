import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from "../../../repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({ name, description });

        await this.repository.save(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }

    async findById(id: string[]): Promise<Specification[]> {
        const specification = await this.repository.findByIds(id);

        return specification;
    }
}

export { SpecificationsRepository };

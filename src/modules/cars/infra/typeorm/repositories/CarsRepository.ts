import { getRepository, Repository } from "typeorm";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { ICreateCarDTO } from "../../dtos/IcreateCarDTO";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name}: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand, 
            category_id, 
            daily_rate, 
            description, 
            fine_amount, 
            license_plate, 
            name
        });

        await this.repository.save(car);
        return car;
    }
    
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate
        });
        return car;
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository
        .createQueryBuilder("c")
        .where("c.available = :available", { available: true });

        if(brand) {
            carsQuery.andWhere("c.brand :brand", { brand });
        }

        if(category_id) {
            carsQuery.andWhere("c.category_id :category_id", { category_id });
        }

        if(name) {
            carsQuery.andWhere("c.name :name", { name });
        }

        const query = await carsQuery.getQuery();
        const cars = await carsQuery.getMany();

        return cars;
    }
}

export { CarsRepository };
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsMakes } from 'src/constants';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { CarEntity } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarEntity)
    private carEntity: Repository<CarEntity>,
  ) {}

  async findModels(makeId: number) {
    const make = CarsMakes.find((make) => make.id === makeId);
    const cars = await this.carEntity
      .createQueryBuilder('cars')
      .select('cars.make', 'make')
      .where('cars.make = :make', { make })
      .getMany();

    const models = cars.map((car) => car.model);

    return models;
  }

  findMakes() {
    return CarsMakes;
  }

  async findCarsAmount() {
    const cars = await this.carEntity
      .createQueryBuilder('cars')
      .select('cars.make', 'make')
      .addSelect('COUNT(cars.lot_id)', 'carAmount')
      .groupBy('cars.make')
      .getRawMany();
    if (!cars) throw new BadRequestException('Cannot find cars brands amount');

    return cars;
  }

  findAllPaginate(paginationDto: PaginationDto) {
    const { pageSize, page, searchTerm } = paginationDto;

    const query = this.carEntity.createQueryBuilder('cars').where('cars.');
  }

  /*year: {from: 4, to: number}
  color: [white, black, ...]
  costOfCar: {from:4,  to: 234, }
  damageType: [front end, ..]
  odometr: {from: 3, to: 4334}
  location: []*/

  // async findAllPaginate(
  //   paginateMoviesDto: PaginateMoviesDto,
  //   paginationBodyDTO: PaginationBodyDTO,
  // ): Promise<IMoviesPagination> {
  //   const { pageSize, page, searchTerm } = paginateMoviesDto;
  //   const {
  //     orderBy,
  //     dir,
  //     includeAdult,
  //     searchInDescription,
  //     voteAvarageFrom,
  //     voteCountFrom,
  //     releaseDateFrom,
  //     releaseDateTo,
  //     genres_ids,
  //   } = paginationBodyDTO;
  //   const currentTime = new Date();
  //   const currentYear = currentTime.getFullYear();
  //   const query = this.movieEntity.createQueryBuilder('movies');

  //   if (!includeAdult) {
  //     query.where('movies.adult = :adult', { adult: false });
  //   }

  //   if (orderBy === Ordering.Title) {
  //     query
  //       .andWhere(
  //         "movies.title is not null AND movies.title ~ '^[a-zA-Zа-яА-Я .:]+$'",
  //       )
  //       .orderBy('movies.title', dir === SortDirection.Ascend ? 'ASC' : 'DESC');
  //   } else {
  //     query.orderBy(
  //       `movies.${orderBy ? orderBy : Ordering.Popularity}`,
  //       dir === SortDirection.Ascend ? 'ASC' : 'DESC',
  //     );
  //   }

  //   query.take(pageSize).skip((page - 1) * pageSize);

  //   if (!query) throw new BadRequestException('No such page');

  //   if (releaseDateFrom || releaseDateTo) {
  //     query.andWhere(
  //       `movies.release_date BETWEEN '${
  //         releaseDateFrom && releaseDateFrom > 1990 ? releaseDateFrom : 1990
  //       }-01-01' AND '${
  //         releaseDateTo &&
  //         releaseDateFrom > 1990 &&
  //         releaseDateTo > releaseDateFrom
  //           ? releaseDateTo
  //           : currentYear
  //       }-12-31'`,
  //     );
  //   }

  //   if (genres_ids?.length) {
  //     query.andWhere('movies.genre_ids && :genres', { genres: genres_ids });
  //   }

  //   query.andWhere(
  //     'movies.vote_average >= :voteAvarage AND movies.vote_count >= :voteCount',
  //     {
  //       voteAvarage: voteAvarageFrom ? voteAvarageFrom : 1,
  //       voteCount: voteCountFrom ? voteCountFrom : 0,
  //     },
  //   );

  //   if (searchTerm) {
  //     const trimmedSearch = searchTerm.trim();
  //     query.andWhere(
  //       new Brackets((qb) => {
  //         qb.where('movies.title ILIKE :title', {
  //           title: `%${trimmedSearch}%`,
  //         }).orWhere('movies.original_title ILIKE :original_title', {
  //           original_title: `%${trimmedSearch}%`,
  //         });

  //         searchInDescription &&
  //           qb.orWhere('movies.overview ILIKE :overview', {
  //             overview: `%${trimmedSearch}%`,
  //           });
  //       }),
  //     );
  //   }

  //   const totalAmount = await query.getCount();
  //   const totalPages = Math.ceil(totalAmount / pageSize);

  //   const movies = await query.getMany();

  //   return {
  //     total_results: totalAmount,
  //     total_pages: totalPages,
  //     results: movies,
  //     page: page,
  //     page_size: pageSize,
  //   };
  // }

  async findOneCar(carId: string): Promise<CarEntity> {
    const searchCar = await this.carEntity.findOne({
      where: { lot_id: carId },
    });

    if (!searchCar) {
      throw new NotFoundException('Car not found');
    }

    return searchCar;
  }

  async findByVin(vin: string) {
    const searchCar = await this.carEntity.findOne({
      where: { vin: vin },
    });

    if (!searchCar) {
      throw new NotFoundException('Car not found');
    }

    return searchCar;
  }
}

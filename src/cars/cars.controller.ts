import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CarsService } from './cars.service';
import { CarEntity } from './entities/car.entity';
import { GetMakesListResDto } from './dto/get-makes-list.response.dto';
import { GetCarByVinOrIdDto } from './dto/get-car-by-vin-or-id.dto';
import { GetModelsListDto } from './dto/get-models-list.dto';
import { GetModelsResDto } from './dto/get-models-list.response.dto';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({ summary: 'Paginate cars' })
  @ApiResponse({ type: CarEntity })
  @Post('pagination/:makeId/:modelId')
  paginationAll(
    @Param('makeId') makeId: string,
    @Param('modelId') modelId: string,
    @Body() paginationDto: PaginationDto,
  ) {
    //return this.carsService.findAllPaginate(paginationDto, makeId, modelId);
  }

  @ApiOperation({ summary: 'Get list of car brands' })
  @ApiResponse({ type: GetMakesListResDto })
  @Get('get-makes')
  findAllMakes(): {
    id: number;
  }[] {
    return this.carsService.findMakes();
  }

  @ApiOperation({ summary: 'Get list of car models by make id' })
  @ApiResponse({ type: GetModelsResDto })
  @Get('get-models/:makeId')
  findAllModels(@Param('makeId') getModelsDto: GetModelsListDto) {
    return this.carsService.findModels(getModelsDto.id);
  }

  @ApiOperation({ summary: 'Get cars amount of brand' })
  // @ApiResponse({ type: GetModelsResDto })
  @Get('get-car-amount/:makeId')
  findCarsAmount() {
    return this.carsService.findCarsAmount();
  }

  @ApiOperation({ summary: 'Get car' })
  @ApiResponse({ type: CarEntity })
  @Get('get-one/:carId')
  findOneCar(@Param('carId') carId: string) {
    return this.carsService.findOneCar(carId);
  }

  @ApiOperation({ summary: 'Get car by vin code or lot id' })
  @Get('get-by-vin/:vinOrId')
  async findAndRedirect(
    @Param('vinOrId') getCarByVinOrIdDto: GetCarByVinOrIdDto,
    @Res() res: Response,
  ) {
    const { vinOrId } = getCarByVinOrIdDto;
    let searchCar: CarEntity;

    if (vinOrId.length > 8) {
      searchCar = await this.carsService.findByVin(vinOrId);
    } else {
      searchCar = await this.carsService.findOneCar(vinOrId);
    }
    const { make, model, lot_id } = searchCar;
    res.redirect(
      process.env.HOME_REDIRECT_DEV + `/car/${make}/${model}/${lot_id}`,
    );

    return searchCar;
  }
}

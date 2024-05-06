import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { AtrributeHeroService } from './atrribute-hero.service';
import { PowerHeroService } from './power-hero.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperHero } from 'src/domain/entities/superhero.entity';
import { Attribute } from 'src/domain/entities/attribute.entity';
import { SuperPower } from 'src/domain/entities/superpower.entity';
import { Alignment } from 'src/domain/entities/alignment.entity';
import { Colour } from 'src/domain/entities/colour.entity';
import { Comic } from 'src/domain/entities/comic.entity';
import { Gender } from 'src/domain/entities/gender.entity';
import { Publisher } from 'src/domain/entities/publisher.entity';
import { Race } from 'src/domain/entities/race.entity';
import { HeroAttribute } from 'src/domain/entities/heroAttribute.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SuperHero,
      Attribute,
      SuperPower,
      Alignment,
      Colour,
      Comic,
      Gender,
      Publisher,
      Race,
      HeroAttribute
    ])
  ],
  providers: [
    HeroService, 
    AtrributeHeroService, 
    PowerHeroService],
  exports: [
    HeroService, 
    AtrributeHeroService, 
    PowerHeroService]
})
export class HeroModule {}

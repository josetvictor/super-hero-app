import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { AtrributeHeroService } from './atrribute-hero.service';
import { PowerHeroService } from './power-hero.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from 'src/domain/entities/hero.entity';
import { AttributeHero } from 'src/domain/entities/attributeHero.entity';
import { PowerHero } from 'src/domain/entities/powerHero.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hero,
      AttributeHero,
      PowerHero
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

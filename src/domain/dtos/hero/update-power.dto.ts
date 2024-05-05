import { PartialType } from "@nestjs/swagger";
import { CreatePowerDto } from "./create-power.dto";

export class UpdatePowerDto extends PartialType(CreatePowerDto) {}
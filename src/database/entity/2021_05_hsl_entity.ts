import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Check } from "typeorm"
import { Db_modal_table } from "../modals/db_modal";

// a database table extends from its parent class(modal).
// check columns before insert data into table.
@Entity('table2021_05')
@Check('"distance_meter" > 10')
@Check('"duration_sec" > 10')
export class table_2021_05 extends Db_modal_table { }


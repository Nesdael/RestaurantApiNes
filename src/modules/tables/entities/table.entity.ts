import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TableStatus } from "../enums/table.status.enum.js";

@Entity('tables')
export class Table {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'int', unique: true})
    number:number;

    @Column({type: 'int'})
    capacity: number;

    @Column({type: 'varchar', length: 20})
    zone: string;

    @Column({type: 'enum', enum: TableStatus, default: TableStatus.AVALIABLE})
    status: TableStatus
}

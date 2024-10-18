import mysql from "mysql2/promise"
import {dbConfig} from "../configs/config"
export const db=mysql.createPool(dbConfig);

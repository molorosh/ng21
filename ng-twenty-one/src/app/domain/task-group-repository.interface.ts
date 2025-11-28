import { TaskGroup } from "./task-group.class";
import { Repository } from "../ddd/repository.interface";

interface TaskGroupRepository extends Repository<TaskGroup> {
    
}  
export type { TaskGroupRepository }; 
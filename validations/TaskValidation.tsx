import { z } from "zod";
import { ModelValidation } from "./ModelValidation";
import { IZodError } from "@interfaces/IAuth";
import { ITaskPartial } from "@interfaces/ITask";

const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  state: z.string().min(1),
});

export const TaskValidation = (
  data: ITaskPartial
): Array<IZodError> | string => {
  return ModelValidation(data, TaskSchema);
};

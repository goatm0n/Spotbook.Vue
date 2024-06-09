import { object, string } from "yup";

export interface SBLoginFormDTO  {
    email: string,
    password: string,
}

export const SBLoginFormDTOSchema = object<SBLoginFormDTO>().shape({
    email: string().required().email(),
    password: string().required(),
});
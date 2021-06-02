import * as E from "fp-ts/Either";
import { Donate } from "../models/donate";
export declare const createDonate: (data: unknown) => Promise<E.Either<string, Donate>>;

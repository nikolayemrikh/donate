import { Error as MongooseError, LeanDocument } from "mongoose";
import * as E from "fp-ts/Either";
import { DonateDoc, DonateModel, Donate, Currency } from "../models/donate";

const schema = Joi.object<Donate>({
  amount: Joi.number().integer().required(),
  currency: Joi.string().valid(...Object.keys(Currency)).required()
});

export const createDonate = async (data: unknown): Promise<E.Either<string, DonateDoc>> => {

  const validationRes = schema.validate(data);

  if (validationRes.error) {
    return E.left(validationRes.error);
  }


  try {
    const donateModel = await DonateModel.create(data);
    return E.right(donateModel.asJSON())
  } catch (err) {
    return E.left(`Error while saving donation`);
  }
};

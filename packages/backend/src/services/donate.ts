import * as E from "fp-ts/Either";
import { DonateModel, Donate, Currency } from "../models/donate";
import Joi from "joi";

const schema = Joi.object<Donate>({
  amount: Joi.number().integer().required(),
  currency: Joi.string()
    .valid(...Object.keys(Currency))
    .required()
});

export const createDonate = async (data: unknown): Promise<E.Either<string, Donate>> => {
  const validationRes = schema.validate(data);

  if (validationRes.error) {
    return E.left(validationRes.error.message);
  }

  try {
    const donateModel = await DonateModel.create(data);
    return E.right(donateModel.toJSON());
  } catch (err) {
    return E.left(`Error while saving donation`);
  }
};

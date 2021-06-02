import { Request, Response, Router } from "express";
import { createDonate } from "../services/donate";
import * as E from "fp-ts/Either";

export const getDonateRoute = (): Router => {
  const route = Router();

  route.post("/", async (req: Request, res: Response) => {
    const { body } = req;

    try {
      const donateRes = await createDonate(body);
      if (E.isLeft(donateRes)) {
        return res.json({ ok: false, errorMessage: donateRes.left }).status(200);
      }
      const donate = donateRes.right;

      res.json({ ok: true }).status(200);
    } catch (err) {
      res.json({ error: `Неизвестная ошибка: ${err?.message ?? ""}` }).status(500);
    }
  });

  return route;
};

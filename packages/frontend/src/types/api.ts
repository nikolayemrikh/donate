import { Currency } from "./currency";
import { ApiRoutes } from "../enums";

export interface DonateReqData {
  amount: number;
  currency: Currency["code"];
}

export interface RouteData {
  [ApiRoutes.DONATE]: DonateReqData;
}

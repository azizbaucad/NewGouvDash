import { object, string } from 'yup';

export const desc = object({
  week: string().trim(),
  dirValue: string().trim(),
  ibouValue: string().trim(),
  orangeMoneyValue: string().trim(),
  portalValue: string().trim(),
  chatbotValue: string().trim(),
  eannuaireValue: string().trim(),
  csatValue: string().trim(),
  dsatValue: string().trim(),
  serviceLevelValue: string().trim(),
  timeCycleValue: string().trim(),
  rateAbandonValue: string().trim(),
  npsValue: string().trim(),
  cesValue: string().trim(),
  trValue: string().trim(),
  caRebondValue: string().trim(),
  fcrValue: string().trim(),
});

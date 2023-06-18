import { OrderStages } from "../interface/order";

export const stages: OrderStages[] = [
  { name: "На этапе формирования", color: "rgb(119, 173, 179)" },
  { name: "Сформирован", color: "purple" },
  { name: "Ожидает оплаты", color: "#ff6c00" },
  { name: "Оплачен", color: "#0064ff" },
  { name: "Завершен", color: "green" },
  { name: "Отменeн", color: "red" },
];

export const communications: string[] = [
  "Телеграмм",
  "WhatsApp",
  "Телефонный звонок",
];

export const payments: string[] = ["Предоплата 50%", "Предоплата 100%"];

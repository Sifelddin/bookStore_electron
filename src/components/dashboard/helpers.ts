import { Data } from '../interfaces';

export default function setData(orders: Data | undefined, index: number) {
  let countTotal = 0;
  let countDiscount = 0;
  orders?.['hydra:member'].map((bookord) => {
    if ('orderDate' in bookord) {
      const { discount, orderDate, bookOrders } = bookord;
      const ordDate = new Date(orderDate.split('-').reverse().join('-')).getMonth();
      const total = bookOrders.reduce((a, c) => a + c.quantity * parseInt(c.unitPrice, 10), 0);
      if (ordDate === index) {
        countTotal += total;
        countDiscount += parseInt(discount, 10) || 0;
      }
    }
    return 0;
  });
  return countTotal - countDiscount;
}
// extract deferent order dates from
// export const getDates = (arr) => {
//   return arr.reduce((a, c) => {
//     if (a && !a.includes(c.orderDate.slice(-4))) {
//       a.push(c.orderDate.slice(-4));
//     }
//     return a;
//   }, []);
// };

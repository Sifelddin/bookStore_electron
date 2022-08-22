import { FormInputs, Order, User } from '../interfaces';

// total des produits without TVA nor discount
export const total = (order: Order) => {
  return order.bookOrders.reduce((a, c) => {
    const price = parseInt(c.unitPrice, 10);
    return a + c.quantity * price;
  }, 0);
};

// TVA total
export const totalTVA = (order: Order, TVA: number) => {
  return order.bookOrders.reduce((a, c) => {
    const price = parseInt(c.unitPrice, 10);
    return a + c.quantity * price * TVA;
  }, 0);
};

// global total books + TVA + (if exist discount)
export const finalTotal = (order: Order, TVA: number): number => {
  const tot = order.bookOrders.reduce((a, c) => {
    const price = parseInt(c.unitPrice, 10);
    return a + c.quantity * price * (1 + TVA);
  }, 0);
  return order.discount ? tot - parseInt(order.discount, 10) : tot;
};

type UserStatus = {
  private?: boolean | null;
  roles: string[];
};

export const statusData = (data: FormInputs) => {
  const userStatus = { roles: [] } as UserStatus;
  switch (data.private) {
    case 'private':
      userStatus.private = true;
      break;
    case 'professional':
      userStatus.private = false;
      break;
    case 'employee':
      userStatus.private = null;
      break;
    default:
  }
  if (data.roles) {
    userStatus.roles = new Array(data.roles);
  }
  return userStatus;
};

export const getStatus = (user: User | undefined) => {
  switch (user?.private) {
    case true:
      return 'private';

    case false:
      return 'professional';

    default:
      return 'employee';
  }
};

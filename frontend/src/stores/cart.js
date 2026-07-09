import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const totalAmount = ref(0);

  const addItem = (item) => {
    const existing = items.value.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.value.push({ ...item, quantity: 1 });
    }
    calculateTotal();
  };

  const removeItem = (itemId) => {
    items.value = items.value.filter(i => i.id !== itemId);
    calculateTotal();
  };

  const calculateTotal = () => {
    totalAmount.value = items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    items.value = [];
    totalAmount.value = 0;
  };

  const checkout = async (paymentMethod) => {
    try {
      const response = await api.post('/payments/initiate', {
        items: items.value,
        paymentMethod
      });
      clearCart();
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    items,
    totalAmount,
    addItem,
    removeItem,
    clearCart,
    calculateTotal,
    checkout
  };
});

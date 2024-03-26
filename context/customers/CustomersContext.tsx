import React, {
  FC,
  createContext,
  useState,
  useContext,
} from 'react';

import { prepareCustomersInfo } from '@/utils/date';
import { calcAverageAges, calcStandardDeviation } from '@/utils/calculations'

import { CustomerData, CustomizedCustomer } from '@/types';

interface CustomerContextData {
  addCustomer: (customerData: CustomerData) => void;
  deleteCustomer: (id: string) => void;
  getCustomer: (id: string) => void;
  editCustomer: (id: string, customerData: CustomerData) => void;
  customers: CustomizedCustomer[];
  customer: CustomerData;
  statistics: {
    average: number,
    standardDeviation: number,
  };
}

const CustomersContext = createContext<CustomerContextData | undefined>(undefined);

interface CustomerProviderProps {
  children: React.ReactNode;
  customers: CustomizedCustomer[];
}

const CustomerProvider: FC<CustomerProviderProps> = ({
  children,
  customers: customersProps,
}) => {
  const [statistics, setStatistics] = useState({
    average: 0,
    standardDeviation: 0,
  })
  const [customers, setCustomers] = useState(customersProps);
  const [customer, setCustomer] = useState({
    name: '',
    lastName: '',
    age: 0,
    birthdayDate: null,
  });

  const addCustomer = async (customerData: CustomerData) => {
    try {
      const res = await fetch('/api/customer', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(customerData),
      });

      const response = await res.json();

      await getCustomers();

      return response;
    } catch (error) {
      throw error;
    }
  };

  const getCustomers = async () => {
    try {
      const res = await fetch('/api/customer', {
        method: 'GET',
      });

      const customersResponse = await res.json();
      const customersData = prepareCustomersInfo(customersResponse.data);

      const cutomerAges = customersData.map((value: any) => value.age);

      const average = parseFloat(calcAverageAges(cutomerAges).toFixed(2));
      const standardDeviation = parseFloat(calcStandardDeviation(cutomerAges).toFixed(2));

      setCustomers(customersData);
      setStatistics({
        average,
        standardDeviation,
      })


      return customersData;
    } catch (error) {
      return error;
    }
  };

  const deleteCustomer = async (id: string) => {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid customer ID');
    }
  
    try {
      const res = await fetch(`/api/customer/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error deleting customer');
      }
  
      const customer = await res.json();
  
      await getCustomers();
  
      return customer;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  };
  

  const editCustomer = async (id: string, customerData: CustomerData) => {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid customer ID');
    }
  
    try {
      const res = await fetch(`/api/customer/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(customerData),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error updating customer');
      }
  
      const customer = await res.json();
  
      return customer;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  };

  const getCustomer = async (id: string) => {
    try {
      const res = await fetch(`/api/customer/${id}`, {
        method: 'GET',
      });

      const customer = await res.json();

      setCustomer(customer.data)
    } catch (error) {
      throw error;
    }
  }

  const contextValue: CustomerContextData = {
    addCustomer,
    deleteCustomer,
    getCustomer,
    editCustomer,
    customers,
    customer,
    statistics,
  };

  return (
    <CustomersContext.Provider value={contextValue}>
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomerProvider;

export function useCustomersContext() {
  return useContext(CustomersContext) as CustomerContextData;
}

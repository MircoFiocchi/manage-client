import React from 'react';
import SideBar from '@/components/sidebar/Sidebar';
import type { GetServerSideProps } from 'next';
import ModalsProvider from '@/context/modal/ModalContext';
import CustomerDetails from '../components/customer/details/CustomerDetails';
import CustomersContext from '@/context/customers/CustomersContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import CardInformation from '@/components/cardInformation/CardInformation';
import { useRouter } from 'next/router';
import { prepareCustomersInfo } from '@/utils/date';
import { calcAverageAges, calcStandardDeviation } from '@/utils/calculations';

interface HomeProps {
  customers: any;
  statistics: {
    average: number;
    standardDeviation: number;
  };
}

export default function Home({ customers, statistics }: HomeProps) {
  const router = useRouter();
  const handleRedirect = () => {
    router.push('/edit');
  };

  if (!customers || customers.length === 0)
    return (
      <CardInformation
        title='Add your first customer'
        textButton='Go!'
        subtitle='Please go to the form where you can add the information'
        onClick={handleRedirect}
      />
    );

  return (
    <main>
      <CustomersContext customers={customers}>
        <ModalsProvider>
          <SideBar>
            <CustomerDetails statistics={statistics} />
          </SideBar>
        </ModalsProvider>
      </CustomersContext>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const queySnapshot = await getDocs(collection(db, 'customers'));

    const customers = queySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const customersProps = prepareCustomersInfo(customers);

    const cutomerAges = customersProps.map((value: any) => value.age);

    const average = parseFloat(calcAverageAges(cutomerAges).toFixed(2));
    const standardDeviation = parseFloat(
      calcStandardDeviation(cutomerAges).toFixed(2),
    );

    const statistics = {
      average,
      standardDeviation,
    };

    return { props: { customers: customersProps, statistics } };
  } catch (error) {
    return {
      props: {
        customers: [],
        statistics: {
          average: 0,
          standardDeviation: 0,
        },
      },
    };
  }
};

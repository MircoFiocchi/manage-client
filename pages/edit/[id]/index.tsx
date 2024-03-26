import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import useSWR from 'swr';

import ModalProvider from '@/context/modal/ModalContext';
import CustomersContext from '@/context/customers/CustomersContext';

import { getDateBirthday, prepareCustomersInfo } from '@/utils/date';
import { CustomizedCustomer } from '@/types';

import SideBar from '@/components/sidebar/Sidebar';
import FormCustomer from '@/components/customer/form/FormCustomer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

interface EditProps {
  customersProps: CustomizedCustomer[];
  errorServer: boolean;
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);


const Edit = ({ customersProps }: EditProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: customer, error } = useSWR(
    id ? `/api/customer/${id}` : null,
    fetcher
  );

  if (error) return <p className="container my-3">Falló en la carga...</p>;
  if (!customer) return <LoadingSpinner />;

  const customerForm = {
    name: customer.name,
    lastName: customer.lastName,
    age: customer.age,
    birthdayDate: getDateBirthday(customer.birthdayDate),
  };

  return (
    <CustomersContext customers={customersProps}>
      <ModalProvider>
        <SideBar>
          <FormCustomer customer={customerForm} customerId={id as string} isEditCustomer/>
        </SideBar>
      </ModalProvider>
    </CustomersContext>
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps<EditProps> = async () => {
  try {
    const queySnapshot = await getDocs(collection(db, 'customers'));

    const customers = queySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const customersProps = prepareCustomersInfo(customers);
    return { props: { customersProps, errorServer: false } };
  } catch (error) {
    return { props: { customersProps: [], errorServer: true } };
  }
};

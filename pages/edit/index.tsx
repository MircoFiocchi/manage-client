import ModalProvider from '@/context/modal/ModalContext';
import FormCustomer from '../../components/customer/form/FormCustomer';
import CustomersContext from '@/context/customers/CustomersContext';
import { prepareCustomersInfo } from '@/utils/date';
import type { GetServerSideProps } from 'next';
import SideBar from '../../components/sidebar/Sidebar';
import { CustomizedCustomer } from '@/types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

interface EditProps {
  customersProps: CustomizedCustomer[];
  errorServer: boolean;
}

const Edit = ({ customersProps }: EditProps) => {
  return (
    <CustomersContext customers={customersProps}>
      <ModalProvider>
        <SideBar>
          <FormCustomer />
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

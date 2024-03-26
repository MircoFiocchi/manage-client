import { NextApiRequest, NextApiResponse } from 'next';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const queySnapshot = await getDocs(collection(db, 'customers'));
      
      const customerData = queySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return res.status(200).json({ message: 'Success', data: customerData });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, lastName, age, birthdayDate } = req.body;
      
      if (!name || !lastName || !age || !birthdayDate) {
        return res.status(400).json({ error: 'All fields are required' });
      }   

      if (
        typeof name !== 'string' ||
        typeof lastName !== 'string' ||
        !name.trim() ||
        !lastName.trim()
      ) {
        return res.status(400).json({ error: 'Name and last name must be non-empty strings.' });
      }

      const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
      if (!dateRegex.test(birthdayDate)) {
        return res.status(400).json({ error: 'Invalid date format. Expected format: YYYY-MM-DDTHH:mm:ss.SSSZ' });
      }

      const parsedAge = parseInt(age, 10);
      if (isNaN(parsedAge) || parsedAge <= 0) {
        return res.status(400).json({ error: 'Age must be a valid number greater than zero.' });
      }

      const parsedBirthdayDate = new Date(birthdayDate);
      if (isNaN(parsedBirthdayDate.getTime())) {
        return res.status(400).json({ error: 'Date of birth is not valid' });
      }

      const docRef = await addDoc(collection(db, 'customers'), {
        name,
        lastName,
        age,
        birthdayDate,
      });

      return res
        .status(200)
        .json({ message: 'Syccessfully posted a customer', docRef });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  return res.status(500).json({ message: 'The method does not exist' });
};

export default handler;

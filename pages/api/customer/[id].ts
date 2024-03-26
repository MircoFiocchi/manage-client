import { NextApiRequest, NextApiResponse } from 'next';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      const id = req.query.id as string;

      if (!id || typeof id !== 'string' || id.length !== 20) {
        return res
          .status(400)
          .json({ error: 'Invalid or missing document ID' });
      }

      const customerBody = req.body;
      if (
        !customerBody ||
        typeof customerBody !== 'object' ||
        Object.keys(customerBody).length === 0
      ) {
        return res
          .status(400)
          .json({ error: 'Invalid or missing customer data' });
      }

      const customerRef = doc(db, 'customers', id);

      const docSnapshot = await getDoc(customerRef);
      if (!docSnapshot.exists()) {
        return res.status(404).json({ error: 'Document not found' });
      }

      await updateDoc(customerRef, customerBody);

      return res
        .status(200)
        .json({ message: 'Successfully update the document' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const id = req.query.id as string;

      if (!id || typeof id !== 'string' || id.length !== 20) {
        return res
          .status(400)
          .json({ error: 'Invalid or missing document ID' });
      }

      const customerRef = doc(db, 'customers', id);
      const docSnapshot = await getDoc(customerRef);
      if (!docSnapshot.exists()) {
        return res.status(404).json({ error: 'Document not found' });
      }
      await deleteDoc(customerRef);

      return res
        .status(200)
        .json({ message: 'Successfully delete the document' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  if (req.method === 'GET') {
    try {
      const id = req.query.id as string;
  
      if (!id || typeof id !== 'string' || id.length !== 20) {
        return res
          .status(400)
          .json({ error: 'Invalid or missing document ID' });
      }
  
      const customerRef = doc(db, 'customers', id);
      const docSnapshot = await getDoc(customerRef);
  
      if (!docSnapshot.exists()) {
        return res.status(404).json({ error: 'Document not found' });
      }
  
      const data = docSnapshot.data();
  
      return res.status(200).json({ message: 'Document found', data });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  return res.status(500).json({ message: 'The method does not exist' });
};

export default handler;

import { useEffect, useState } from 'react';
import detectEthereumProvider  from '@metamask/detect-provider';
import { useRouter } from 'next/router'
import { collection, query, where, getDocs, addDoc }from 'firebase/firestore';
import db from '../../../utils/firebaseConfig.js';
import Button from '@mui/material/Button'
import { useSettings } from 'src/@core/hooks/useSettings'

const MetaMaskButton: React.FC = () => {
  const [provider, setProvider] = useState<any>(null);
  const [account, setAccount] = useState<string>('');
  const { settings, saveSettings } = useSettings();
  const router = useRouter()

  const connectWallet = async () => {
    try {
      if (!provider) {
        const detectedProvider = await detectEthereumProvider();
        if (detectedProvider) {
          setProvider(detectedProvider);
          detectedProvider.on('accountsChanged', (accounts: string[]) => {
            setAccount(accounts[0] || '');
          });
        } else {
          throw new Error('MetaMask not found');
        }
      }

      if (provider) {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0] || '');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      if (provider && provider.disconnect) {
        await provider.disconnect();
      }
      setProvider(null);
      setAccount('');
      saveSettings({ ...settings, userId: '' });
    } catch (error) {
      console.error(error);
    }
  };
  
  const checkWallet =  async () => {
    try {
        const usersRef = collection(db, 'user');
        const querySnapshot = await getDocs(query(usersRef, where('wallet', '==', account)));
        if (!querySnapshot.empty) {
          router.push('/')
        } else {

        const dummyUser = {
          MockGrade : null,
          Region : null,
          SchoolGrade : null,
          SchoolType: null,
          StudyType : null,
          TargetGrade: null,
          wallet: account
        };
        const usersRef = collection(db, 'user');
        try {
          console.log(usersRef)
          const docRef = await addDoc(usersRef, dummyUser);
          console.log('Dummy user added with ID: ', docRef.id);
        } catch (error) {
          console.error('Error adding dummy user: ', error);
        }
          router.push('/pages/survey')
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      {!account && !settings.userId ? (
        <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} onClick={connectWallet}>Login With MetaMask</Button>
      ) : (
        <div>
            <p>Connected with address: {account}</p>
            <Button fullWidth size='large' variant='contained' onClick ={
              saveSettings({ ...settings, userId: account });
              checkWallet;
            }>Go to Home</Button>
            <Button fullWidth size='medium' onClick={logout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default MetaMaskButton;
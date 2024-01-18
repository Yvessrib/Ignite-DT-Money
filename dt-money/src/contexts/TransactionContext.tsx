import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: string;
}

interface TrasactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TrasactionContextType);

export function TransactionsProvider({children} : TransactionProviderProps) {
  const[transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string){
    const response = await api.get('transactions', {
     params: {
      q : query,
     }
    })
    console.log(response)
    setTransactions(response.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);
  
  return (
    <TransactionsContext.Provider value={{  
      transactions, 
      fetchTransactions, 
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}
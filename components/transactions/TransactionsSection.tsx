import React from 'react';
import TransactionCard from '../transactions/TransactionCard';
import { transactions } from '../../data/defaultTransactions';

export default function TransactionsSection(props: any) {
    const transactionsData = props.transactions ? props.transactions : transactions;
    const sortedTransactions = transactionsData.sort(
        (p1: any, p2: any) => (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0
    );

    return (
        <div 
          className='w-screen relative font-Hind bg-stone-100'
          data-testid="transactions-section"
        >
                <div className='pb-60 flex flex-col justify-center items-center'>
                    <div className='shadow-md rounded-t-lg border-slate-300 border-x border-t h-6 bg-white xs:w-11/12 sm:w-144 lg:w-192'></div>
                        { sortedTransactions.map((transaction: any) => (
                            <TransactionCard 
                              key={transaction.id} 
                              transaction={transaction} 
                            />
                        ))}
                    <div className='shadow-md rounded-b-lg border-slate-300 border-x border-b h-16 bg-white xs:w-11/12 sm:w-144 lg:w-192'></div>
                </div>
        </div>
    )
}


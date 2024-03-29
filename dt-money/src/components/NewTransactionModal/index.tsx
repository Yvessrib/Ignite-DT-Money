import * as Dialog from '@radix-ui/react-dialog'
import { DialogContent, Overlay, CloseButton, TransactionType, TransactionTypeButton } from './style'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { api } from '../../lib/axios'

const newTransactionsFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type NewTransactionsFormInputs = z.infer<typeof newTransactionsFormSchema>;

export function NewTransactionModal() {
  const { 
    control,
    register, 
    handleSubmit, 
    formState: {isSubmitting},
    reset
  } = useForm<NewTransactionsFormInputs>({
    resolver: zodResolver(newTransactionsFormSchema)
  })

  async function handleCreateNewTransaction(data: NewTransactionsFormInputs){
    const {description, price, category, type} = data;

    await api.post('transactions',{
      description,
      price,
      category,
      type,
      createdAt: new Date()
    })

    reset()
    
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <DialogContent>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton><X size={24}/></CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input 
            type='text' 
            placeholder='Descrição' 
            required 
            {...register('description')}
            />
          <input 
            type='number'
            placeholder='Preço' 
            required 
            {...register('price', { valueAsNumber: true})}
            />
          <input 
            type='text' 
            placeholder='Categoria'
            required
            {...register('category')} 
            />

          <Controller
            control={control}
            name= 'type'
            render = {({field}) => (
              <TransactionType 
                onValueChange={field.onChange} 
                value={field.value}>
                <TransactionTypeButton variant='income' value='income'>
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant='outcome' value='outcome'>
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type='submit' disabled={isSubmitting}>Cadastrar</button>
        </form>
        
      </DialogContent>
    </Dialog.Portal>
  )
}
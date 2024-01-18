import { HeaderContainer, HeaderContent, HeaderLogo, NewTransactionButton } from "./styles";
import logoImg from '../../assets/logoIgnite.png';
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from "../NewTransactionModal";

export function Header(){
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderLogo>
          <img src={logoImg} alt=""/>
          <p>DT Money</p>
        </HeaderLogo>
        
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}


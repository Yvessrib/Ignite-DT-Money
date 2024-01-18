import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./Styles/Themes/dafault"
import { GlobalStyle } from "./Styles/global"
import { Transactions } from "./pages/Transactions"
import { TransactionsProvider } from "./contexts/TransactionContext"

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
 
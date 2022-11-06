import { MenuItem, TextField } from '@mui/material'

type TermProps = {
  term: string;
  setTerm:Function;
  session: string;
  setSession: Function;
}

export const Term = ({term, setTerm, session, setSession}: TermProps) => {

  const setTermAndSession = (val:string) => {
    const sess = val[0]
    const term = val[1]
    setSession(sess)
    setTerm(term)
  }

  return (
    <TextField
    id="term-choice-field"
    select
    label="Term"
    value={session + term}
    onChange={(e) => setTermAndSession(e.target.value)}
    sx={{
      [`& fieldset`]: { borderRadius: "10px" },
      width: "100%",
      marginTop: "20px",
    }}
  >
    <MenuItem key={1} value={"W1"}> Winter 1 (Sep - Dec)</MenuItem>
    <MenuItem key={2} value={"W2"}> Winter 2 (Jan - Apr)</MenuItem>
    <MenuItem key={3} value={"S1"}> Summer 1 (May - Jun)</MenuItem>
    <MenuItem key={4} value={"S2"}> Summer 2 (Jul - Aug)</MenuItem>
  </TextField>
  )
}

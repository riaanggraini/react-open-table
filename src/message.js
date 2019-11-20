
import React from 'react'
import { Message ,Icon} from 'semantic-ui-react'

export default function MessageComponent({success, message}) {
  const additionallMsg = success ? "please wait for a moment" : "please try to choose your foor again"
  return(
  <Message color={success ? "green":"red"}>
   <Message.Header>{message}</Message.Header>
  <p>{additionallMsg}</p>
  </Message>
  )
}
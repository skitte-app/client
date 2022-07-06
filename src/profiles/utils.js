import React from 'react'
import numeral from 'numeral'

export function DisplayCount(props) {
  return <span className={props.className} style={{textTransform: "uppercase"}} id={props.type}>{numeral(props.children).format("0a")}</span>
}

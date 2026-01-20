import React from 'react'
import {footerStyles} from "../assets/dummyStyles"
const Footer = () => {
  return (
   <footer>
    <div className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <div className={footerStyles.copyright}>
          &copy;{new Date().getFullYear()} InvoiceR •Built by Jais Yadav
        </div>

        <div className={footerStyles.links}>
          <a href="/terms" className={footerStyles.link}>terms</a>
          <a href="/privacy" className={footerStyles.link}>privacy</a>
        </div>
      </div>
    </div>
   </footer>
  )
}

export default Footer
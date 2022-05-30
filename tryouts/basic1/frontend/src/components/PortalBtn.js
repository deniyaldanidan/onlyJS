import { AnimatePresence } from "framer-motion"

const PortalBtn = ({children, btnText, btnAction, portalState}) => {
  return (
    <>
        <div onClick={()=>btnAction(true)}>{btnText}</div>
        <AnimatePresence>
            {portalState && children}
        </AnimatePresence>
    </>
  )
}

export default PortalBtn
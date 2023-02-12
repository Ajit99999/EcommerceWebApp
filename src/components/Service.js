import {BsTruck } from 'react-icons/bs'
import { IoIosContact } from 'react-icons/io'
import { BiMoney } from 'react-icons/bi'
import { MdSecurity } from 'react-icons/md'
const Service = ()=>{

    return (
        <div className="service-container" >
          <div className="service-left-container" >
             <BsTruck className='icon' />
            <p>Super Fast & Free Delivery </p>
          </div>
          <div className="service-middle-container" >
            <div  >
                <IoIosContact className='icon' />
              <p>Contactless Shopping</p>
            </div>
            <div>
                <BiMoney className='icon' />
                <p>Easy Return & Money-Back Guarantee</p>
            </div>
          </div>
          <div className="service-right-container">
            <MdSecurity className='icon' />
            <p>Secure Payment System</p>
          </div>


        </div>
    )
}
export default Service;
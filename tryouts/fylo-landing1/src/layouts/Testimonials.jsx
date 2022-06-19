import React from 'react'
import MyTestimonial from '../components/MyTestimonial';
import pic1 from '../imgs/profile-1.jpg';
import pic2 from '../imgs/profile-2.jpg';
import pic3 from '../imgs/profile-3.jpg';


const data = [
    {
        pic: pic1,
        uname: 'Sathish Patel',
        posi: 'Founder & CEO, Huddle',
        msg: 'Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.',
    },
    {
        pic: pic2,
        uname: 'Bruce Mckenzie',
        posi: 'Founder & CEO, Huddle',
        msg: 'Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.',
        
    },
    {
        pic: pic3,
        uname: 'Iva Boyd',
        posi: 'Founder & CEO, Huddle',
        msg: 'Fylo has improved our team productivity by an order of magnitude. Since making the switch our team has become a well-oiled collaboration machine.',
    }
]

const Testimonials = () => {
  return (
    <div className='container mx-auto px-5 py-20 flex flex-col gap-x-7 gap-y-10 justify-center items-center lg:flex-row'>
        {
            data.map((mydata, index)=>< MyTestimonial key={index} data={mydata} />)
        }
    </div>
  )
}

export default Testimonials
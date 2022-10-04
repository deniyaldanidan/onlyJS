import React from 'react'
import {Link, useParams} from 'react-router-dom';
import cardsData from './cardData';
import {LayoutGroup, motion} from 'framer-motion';
import './view-card.scss';
import {fullname, Avatar, LoremIpsum} from 'react-lorem-ipsum';

const backLinkStyles = {
  display: "block",
  fontSize: "1.5rem",
  color: "#fff",
  wordSpacing: "2px",
  marginBottom: "10px"
}

const contentVariants = {
  hidden: {
    opacity: 0
  },
  visible:{
    opacity:1,
    transition: {
      duration:0.5
    }
  }
}

const containerVariants = {
  hidden: {opacity:0},
  visible: {
    opacity: 1,
    transition:{
      duration: 0.25,
      when: "beforeChildren",
      staggerChildren: 0.5
    }
  }
}

const ViewCard = () => {
  const {id} = useParams();

  const data = cardsData.find(card=>card.id=== parseInt(id));

  return (
    <LayoutGroup id="card-group">
    <motion.div 
      className="view-card">
      <Link to="/layout2" style={backLinkStyles} >{"<"} Back</Link>
      <motion.div className="cover-img" layoutId={`card-img-${data?.id}`}>
        <img src={data?.img} alt={data?.name} />
      </motion.div>
      <motion.div className='view-card-body'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
         <div className="view-title">{data.name}</div>
         <motion.div className="view-by" variants={contentVariants}>
            <span>by {fullname(data.gender)}</span>
            <Avatar gender={data.gender} className="author-img" width="200" height="200" alt='Author Image' />
         </motion.div>
         <motion.div className="view-contents" variants={contentVariants}>
            <LoremIpsum p={7} avgWordsPerSentence={10} avgSentencesPerParagraph={13} startWithLoremIpsum={false} />
         </motion.div>
      </motion.div>
    </motion.div>
    </LayoutGroup>
  )
}

export default ViewCard
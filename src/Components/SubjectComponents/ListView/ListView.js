import React from "react"
import  "./ListView.css"
import SingleTopic from "./singleTopic/SingleTopic";

const ListView = (props) => {
   
const {subchapters} = props;
    return (
    <div>
      <ul>
        {subchapters?.map((subtopic) => (
         <SingleTopic subtopic={subtopic} />
        ))}
        </ul>
    </div>
  )
};

export default ListView;

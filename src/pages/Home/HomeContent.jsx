import React, {useContext} from 'react';
import {CustomContext} from "../../utils/Context";
import '../../styles/homeContent.scss'
import ContentCategory from "../../components/ContentCategory/ContentCategory";

const HomeContent = () => {

    const {status, user} = useContext(CustomContext)

    return (
        <div className='content'>

            {
                status === 'all' ? user.categories.map((item) => (
                    <ContentCategory key={item.id} statusContent={item.categoryName}/>
                )) : <ContentCategory statusContent={status}/>
            }
        </div>
    );
};

export default HomeContent;
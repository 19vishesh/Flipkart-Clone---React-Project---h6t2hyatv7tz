import React, { useContext, useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import axios from 'axios'
import { Box, Button, Divider, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
//for react countdown
import Countdown from 'react-countdown';

import  {productData}  from '../../data/allProductData';

import { apiProductData } from '../../App';


// Carousel breakpoints
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 5
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background:#fff;
`
const Deal = styled(Box)`
    padding: 15px 20px;
    display:flex;
`
const Timer = styled(Box)`
    display:flex;
    margin-left:10px;
    align-items:center;
    justify-content:center;
    color:#7f7f7f;
`
const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;
`
const ViewAllButton = styled(Button)`
    margin-left: auto;                      //aligning the button to the left
    background-color: #2874f0;
    border-radius: 2px;
    font-size: 13px;
    font-weight:600;
    color:#fff;
`;

const Image = styled('img')({
    width: 'auto',
    height: 150
})

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`

// //=============================================================== function starts===================================================

const Slide = (props) => {

    //calling the apidata from App.js using useContext
    // const productData = useContext(apiProductData);

    // const [productData, setProductData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {

    //         const result = await axios.get(`https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products`);
    //         setProductData(result.data);
    //     }
    //     fetchData();
    // }, []);



    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

    const renderer = ({ hours, minutes, seconds }) => {
        return <Box variant="span">{hours}:{minutes}:{seconds} Left</Box>
    }

    return (
        <Component>
            <Deal>
                <DealText>{props.title}</DealText>
                {
                    props.timer &&
                    <Timer>
                        <img src={timerURL} alt="timer" style={{ width: 24, marginRight: 10 }} />
                        <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                    </Timer>
                }
                <ViewAllButton variant='container' color="primary">View All</ViewAllButton>
            </Deal>
            <Divider />
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                keyBoardControl={true}
                slidesToSlide={1}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"

            >
                {
                    productData.map(data => (
                        <Link to={`products/${data.id}`} style={{textDecoration:'none'}}>
                            <Box textAlign='center' style={{ padding: '25px 15px' }}>
                                <Image src={data.image} alt="banner" />
                                <Text style={{ fontWeight: 600, color: '#212121' }}>{data.title}</Text>
                                <Text style={{ color: 'green' }}>$ {data.price} only</Text>
                                <Text style={{}}>{data.category}</Text>
                            </Box>
                        </Link>
                    ))
                }

            </Carousel>
        </Component>
    )
}

export default Slide;
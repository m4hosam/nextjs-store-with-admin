"use client"
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Box } from '@mui/material'
import Image from 'next/image'
import image1 from '@public/assets/man-watch1.jpg'
import image2 from '@public/assets/man-watch2.jpg'
import image3 from '@public/assets/man-watch3.jpg'




export default function Example(props) {

    return (
        <Box sx={{

            minWidth: "50%", maxWidth: "50%"
        }}>
            <Carousel>
                <Image
                    src={image1}
                    width={500}
                    height={500}
                    alt="Picture 1"
                />
                <Image
                    src={image2}
                    width={500}
                    height={500}
                    alt="Picture 2"
                />
                <Image
                    src={image3}
                    width={500}
                    height={500}
                    alt="Picture 3"
                />
            </Carousel>
        </Box>
    )
}

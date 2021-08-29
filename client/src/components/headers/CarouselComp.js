import React, { useState } from 'react';
import {
  UncontrolledCarousel 
} from 'reactstrap';

const items = [
  {
    src: 'https://cdn.pixabay.com/photo/2016/06/06/06/11/birthday-party-1438901__340.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header',
    key: '1'
  },
  {
    src: 'https://cdn.pixabay.com/photo/2018/09/11/11/14/cake-3669167__340.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',
    key: '2'
  },
  {
    src: 'https://cdn.pixabay.com/photo/2018/01/04/11/40/food-3060458__340.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  }
];

const CarouselComp = () => <UncontrolledCarousel items={items} />


export default CarouselComp;
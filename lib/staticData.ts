import { statSync } from 'fs';
import { homedir } from 'os';

export const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

export const yearList = Array.from(Array(121), (_, i) => String(2020 - i));

export const largeBuildingTypeList = {
  flat: 'Flat',
  house: 'House',
  secondaryUnit: 'Secondary unit',
  uniqueSpace: 'Unique space',
  bnb: 'Bed and breakfast',
  boutiqueHotel: 'Boutique hotel',
};

export const buildingTypeLists = [
  {
    type: 'flat',
    value: ['Apartment', 'Loft', 'Serviced apartment', 'Casa particular', 'Holiday home'],
  },
  {
    type: 'house',
    value: [
      'Home',
      'Cabin',
      'Villa',
      'Townhouse',
      'Cottage',
      'Bungalow',
      'Earthen home',
      'Houseboat',
      'Hut',
      'Farm stay',
      'Dome',
      'Cycladic home',
      'Chalet',
      'Dammuso',
      'Lighthouse',
      "Shepherd's hunt",
      'Tiny home',
      'Trullo',
      'Pension',
    ],
  },
  {
    type: 'secondaryUnit',
    value: ['Guest house', 'Guest suit', 'Farm stay', 'Holiday home'],
  },
  {
    type: 'uniqueSpace',
    value: [
      'Barn',
      'Boat',
      'Bus',
      'Treehouse',
      'Campsite',
      'Castle',
      'Cave',
      'Dome',
      'Houseboat',
      'Hut',
      'Island',
      'Lighthouse',
      'Plane',
      'Ranch',
      'Tent',
      'Tower',
      'Train',
      'Windmill',
      'Yurt',
      'Riad',
      'Pension',
      'Other',
    ],
  },
  {
    type: 'bnb',
    value: ['Bed and breakfast', 'Nature lodge', 'Farm stay', 'Minsu', 'Casa particular', 'Ryokan'],
  },
  {
    type: 'boutiqueHotel',
    value: [
      'Hotel',
      'Hostel',
      'Resort',
      'Nature lodge',
      'Boutique hotel',
      'Aparthotel',
      'Heritage hotel',
      'Kezhan',
    ],
  },
];

// export const roomType;
// export const isSetUpForGuest;

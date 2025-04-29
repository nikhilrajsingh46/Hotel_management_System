import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
  GiMountainCave,
  GiMountainRoad,
  GiPagoda,
  GiTeapot,
} from 'react-icons/gi';
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
  FaHiking,
  FaPrayingHands,
} from 'react-icons/fa';
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from 'react-icons/fa6';
import { BiSolidWasher, BiSolidDryer, BiSolidFirstAid, BiWifi, BiSolidFridge, BiWorld } from 'react-icons/bi';
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from 'react-icons/md';
import { PiBathtubFill, PiCoatHangerFill, PiTelevisionFill } from 'react-icons/pi';
import { TbIroning3 } from 'react-icons/tb';
import { GiHeatHaze, GiCctvCamera, GiBarbecue, GiToaster, GiCampfire } from 'react-icons/gi';
import { AiFillCar } from 'react-icons/ai';

export const categories = [
  {
    label: 'All',
    icon: <BiWorld />,
  },
  {
    img: 'assets/mountain_side.webp',
    label: 'Mountain View',
    icon: <TbMountain />,
    description: 'This property offers stunning mountain views!',
  },
  {
    img: 'assets/cultural_tour.webp',
    label: 'Cultural Tour',
    icon: <GiPagoda />,
    description: 'This property is near cultural heritage sites!',
  },
  {
    img: 'assets/pool_cat.jpg',
    label: 'Amazing Pools',
    icon: <TbPool />,
    description: 'This is property has a beautiful pool!',
  },
  {
    img: 'assets/trekking.jpg',
    label: 'Trekking',
    icon: <FaHiking />,
    description: 'This property offers access to trekking routes!',
  },
  {
    img: 'assets/lake_cat.webp',
    label: 'Lakefront',
    icon: <GiBoatFishing />,
    description: 'This property is near a lake!',
  },
  {
    img: 'assets/monastery.jpeg',
    label: 'Monastery Stay',
    icon: <FaPrayingHands />,
    description: 'Experience peace and tranquility near monasteries!',
  },
  {
    img: 'assets/camping_cat.jpg',
    label: 'Camping',
    icon: <GiForestCamp />,
    description: 'This property offers camping activities!',
  },
  {
    img: 'assets/tea_garden.jpg',
    label: 'Tea Gardens',
    icon: <GiTeapot />,
    description: 'This property is surrounded by beautiful tea gardens!',
  },
  {
    img: 'assets/hills.jpg',
    label: 'Hillside',
    icon: <GiMountainRoad />,
    description: 'This property is located on scenic hillsides!',
  },
  {
    img: 'assets/wildlife_sanctuary.jpg',
    label: 'Wildlife Sanctuary',
    icon: <MdYard />,
    description: 'This property is near wildlife sanctuaries!',
  },
  {
    img: 'assets/village_stay.jpg',
    label: 'Village Stay',
    icon: <FaPeopleRoof />,
    description: 'Experience authentic Nepali village life!',
  },
  {
    img: 'assets/himalayan_view.jpg',
    label: 'Himalayan View',
    icon: <GiMountainCave />,
    description: 'This property offers breathtaking views of the Himalayas!',
  },
  {
    img: 'assets/lux_cat.jpg',
    label: 'Luxury',
    icon: <IoDiamond />,
    description: 'This property is brand new and luxurious!',
  },
];

export const types = [
  {
    name: 'An entire place',
    description: 'Guests have the whole place to themselves',
    icon: <FaHouseUser />,
  },
  {
    name: 'Room(s)',
    description: 'Guests have their own room in a house, plus access to shared places',
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: 'A Shared Room',
    description: 'Guests sleep in a room or common area that maybe shared with you or others',
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: 'Bath tub',
    icon: <PiBathtubFill />,
  },
  {
    name: 'Personal care products',
    icon: <FaPumpSoap />,
  },
  {
    name: 'Outdoor shower',
    icon: <FaShower />,
  },
  {
    name: 'Washer',
    icon: <BiSolidWasher />,
  },
  {
    name: 'Dryer',
    icon: <BiSolidDryer />,
  },
  {
    name: 'Hangers',
    icon: <PiCoatHangerFill />,
  },
  {
    name: 'Iron',
    icon: <TbIroning3 />,
  },
  {
    name: 'TV',
    icon: <PiTelevisionFill />,
  },
  {
    name: 'Dedicated workspace',
    icon: <BsPersonWorkspace />,
  },
  {
    name: 'Air Conditioning',
    icon: <BsSnow />,
  },
  {
    name: 'Heating',
    icon: <GiHeatHaze />,
  },
  {
    name: 'Security cameras',
    icon: <GiCctvCamera />,
  },
  {
    name: 'Fire extinguisher',
    icon: <FaFireExtinguisher />,
  },
  {
    name: 'First Aid',
    icon: <BiSolidFirstAid />,
  },
  {
    name: 'Wifi',
    icon: <BiWifi />,
  },
  {
    name: 'Cooking set',
    icon: <FaKitchenSet />,
  },
  {
    name: 'Refrigerator',
    icon: <BiSolidFridge />,
  },
  {
    name: 'Microwave',
    icon: <MdMicrowave />,
  },
  {
    name: 'Stove',
    icon: <GiToaster />,
  },
  {
    name: 'Barbecue grill',
    icon: <GiBarbecue />,
  },
  {
    name: 'Outdoor dining area',
    icon: <FaUmbrellaBeach />,
  },
  {
    name: 'Private patio or Balcony',
    icon: <MdBalcony />,
  },
  {
    name: 'Camp fire',
    icon: <GiCampfire />,
  },
  {
    name: 'Garden',
    icon: <MdYard />,
  },
  {
    name: 'Free parking',
    icon: <AiFillCar />,
  },
  {
    name: 'Self check-in',
    icon: <FaKey />,
  },
  {
    name: ' Pet allowed',
    icon: <MdPets />,
  },
];

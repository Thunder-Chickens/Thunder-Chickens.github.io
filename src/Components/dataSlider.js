import { v4 as uuidv4 } from "uuid"; 
import tc1 from '../Images/tc1.jpg'
import tc3 from '../Images/tc3.jpg';
import tc4 from '../Images/tc4.jpg';
import tc5 from '../Images/thunderchkn.jpg';
import impromp from '../Images/Improp.mov';
import grace_scarlette from '../Images/grace_scarlett.JPG'
import tim_scarlette from '../Images/tim_scarlett_awards.jpeg'
import peter_cool from '../Images/peter_cool.jpg'
import beaconBay from '../Images/beaconBay.png'

const video = false;
const image = true; 

const dataSlider = [
    {
        id: uuidv4(),
        title: "Thunderchickens @ Beacon at the Bay",
        text: "Thunderchickens chilling with alumnus Peter and Crabnadi veteran Joey Kusnadi",
        type: image,
        img: beaconBay,
        // Easter egg spots, as fractions of the image (x, y = top-left corner).
        // Click hatchSpot (2nd from right) and a chick hatches and follows the cursor;
        // walk it onto zapSpot (Joey, far left) and lightning strikes.
        hatchSpot: { x: 0.59, y: 0.195, w: 0.09, h: 0.135 },
        zapSpot: { x: 0.185, y: 0.2, w: 0.14, h: 0.21 }
    },
    {
        id: uuidv4(),
        title: "Grace and Scarlette",
        text: "Clashies",
        type: image, 
        img: grace_scarlette
    },
    {
        id: uuidv4(),
        title: "Tim and Scarlette",
        text: "Tim and Scarlette winning literally everthing MWAHAHA",
        type: image, 
        img: tim_scarlette
    },
    {
        id: uuidv4(),
        title: "Noah Woo Impromptu",
        text: " \"... so that you don't end up pooping your guts out\"",
        type: video,
        vid: impromp
    },
    {
        id: uuidv4(),
        title: "Peter",
        text: "The original Thunderchicken, basking in glory",
        type: image, 
        img: peter_cool
    },
    {
        id: uuidv4(),
        title: "Thunderchicken (absolutely not AI)",
        text: "A real life Thunderchicken mascot",
        type: image, 
        img: tc1
    },
]

export default dataSlider; 
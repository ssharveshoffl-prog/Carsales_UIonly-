import carHero from '@/assets/car-hero.jpg';
import carMercedes from '@/assets/car-mercedes.jpg';
import carTesla from '@/assets/car-tesla.jpg';
import carAudi from '@/assets/car-audi.jpg';
import carPorsche from '@/assets/car-porsche.jpg';
import carRangeRover from '@/assets/car-rangerover.jpg';

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engine: string;
  fuel: string;
  transmission: string;
  drivetrain: string;
  mpg: string;
  bodyType: string;
  image: string;
  vin: string;
  stock: string;
  features: string[];
  seats: number;
  color: string;
}

const images = [carHero, carMercedes, carTesla, carAudi, carPorsche, carRangeRover];

export const vehicles: Vehicle[] = [
  {
    id: 1, make: "BMW", model: "X5 xDrive40i", year: 2023, price: 62900, mileage: 12400,
    engine: "3.0L Turbo I6", fuel: "Gasoline", transmission: "Automatic", drivetrain: "AWD",
    mpg: "21/26", bodyType: "SUV", image: images[0], vin: "5UXCR6C09P9K12345",
    stock: "BM2301", features: ["Clean Carfax", "One Owner", "Premium Package", "Apple CarPlay"],
    seats: 5, color: "Black Sapphire"
  },
  {
    id: 2, make: "Mercedes-Benz", model: "C 300", year: 2023, price: 44900, mileage: 8200,
    engine: "2.0L Turbo I4", fuel: "Gasoline", transmission: "Automatic", drivetrain: "RWD",
    mpg: "23/33", bodyType: "Sedan", image: images[1], vin: "W1KWF8DB4PR123456",
    stock: "MB2302", features: ["Clean Carfax", "Low Mileage", "AMG Line", "Apple CarPlay"],
    seats: 5, color: "Obsidian Black"
  },
  {
    id: 3, make: "Tesla", model: "Model 3 Long Range", year: 2023, price: 41900, mileage: 5600,
    engine: "Dual Motor Electric", fuel: "Electric", transmission: "Automatic", drivetrain: "AWD",
    mpg: "134/126 MPGe", bodyType: "Sedan", image: images[2], vin: "5YJ3E1EA5PF123456",
    stock: "TS2303", features: ["Clean Carfax", "One Owner", "Autopilot", "Full Self-Driving"],
    seats: 5, color: "Midnight Silver"
  },
  {
    id: 4, make: "Audi", model: "Q7 Premium Plus", year: 2022, price: 54900, mileage: 22000,
    engine: "2.0L Turbo I4", fuel: "Gasoline", transmission: "Automatic", drivetrain: "AWD",
    mpg: "20/25", bodyType: "SUV", image: images[3], vin: "WA1LXAF72ND123456",
    stock: "AU2204", features: ["Clean Carfax", "Premium Package", "Virtual Cockpit", "Apple CarPlay"],
    seats: 7, color: "Daytona Gray"
  },
  {
    id: 5, make: "Porsche", model: "Cayenne", year: 2023, price: 79900, mileage: 6800,
    engine: "3.0L Turbo V6", fuel: "Gasoline", transmission: "Automatic", drivetrain: "AWD",
    mpg: "19/23", bodyType: "SUV", image: images[4], vin: "WP1AA2AY5PDA12345",
    stock: "PO2305", features: ["Clean Carfax", "One Owner", "Sport Chrono", "Premium Package"],
    seats: 5, color: "Jet Black"
  },
  {
    id: 6, make: "Land Rover", model: "Range Rover Sport", year: 2023, price: 83900, mileage: 9400,
    engine: "3.0L Turbo I6", fuel: "Gasoline", transmission: "Automatic", drivetrain: "AWD",
    mpg: "19/26", bodyType: "SUV", image: images[5], vin: "SALGS2SE5PA123456",
    stock: "LR2306", features: ["Clean Carfax", "One Owner", "Dynamic Package", "Meridian Sound"],
    seats: 5, color: "Santorini Black"
  },
  {
    id: 7, make: "BMW", model: "M4 Competition", year: 2023, price: 78900, mileage: 4200,
    engine: "3.0L Twin-Turbo I6", fuel: "Gasoline", transmission: "Automatic", drivetrain: "RWD",
    mpg: "16/23", bodyType: "Coupe", image: images[0], vin: "WBS43AZ09PCR12345",
    stock: "BM2307", features: ["Clean Carfax", "One Owner", "M Carbon Seats", "Executive Package"],
    seats: 4, color: "Black Sapphire"
  },
  {
    id: 8, make: "Mercedes-Benz", model: "GLE 450", year: 2022, price: 61900, mileage: 18500,
    engine: "3.0L Turbo I6", fuel: "Gasoline", transmission: "Automatic", drivetrain: "AWD",
    mpg: "20/26", bodyType: "SUV", image: images[1], vin: "4JGFB6BB3NA123456",
    stock: "MB2208", features: ["Clean Carfax", "Low Mileage", "AMG Package", "Burmester Sound"],
    seats: 5, color: "Obsidian Black"
  },
  {
    id: 9, make: "Tesla", model: "Model Y Performance", year: 2023, price: 52900, mileage: 3200,
    engine: "Dual Motor Electric", fuel: "Electric", transmission: "Automatic", drivetrain: "AWD",
    mpg: "117/105 MPGe", bodyType: "SUV", image: images[2], vin: "7SAYGDEE5PF123456",
    stock: "TS2309", features: ["Clean Carfax", "One Owner", "Performance Upgrade", "Full Self-Driving"],
    seats: 5, color: "Midnight Silver"
  },
  {
    id: 10, make: "Audi", model: "A6 Premium", year: 2023, price: 49900, mileage: 11000,
    engine: "2.0L Turbo I4", fuel: "Gasoline", transmission: "Automatic", drivetrain: "AWD",
    mpg: "24/31", bodyType: "Sedan", image: images[3], vin: "WAUENAF24PN123456",
    stock: "AU2310", features: ["Clean Carfax", "Premium Plus", "Virtual Cockpit", "Bang & Olufsen"],
    seats: 5, color: "Mythos Black"
  },
  {
    id: 11, make: "Porsche", model: "Taycan 4S", year: 2023, price: 89900, mileage: 7800,
    engine: "Dual Motor Electric", fuel: "Electric", transmission: "Automatic", drivetrain: "AWD",
    mpg: "79/80 MPGe", bodyType: "Sedan", image: images[4], vin: "WP0AB2Y14PSA12345",
    stock: "PO2311", features: ["Clean Carfax", "Performance Battery Plus", "Sport Chrono", "BOSE Sound"],
    seats: 4, color: "Jet Black"
  },
  {
    id: 12, make: "Land Rover", model: "Defender 110", year: 2023, price: 68900, mileage: 14200,
    engine: "3.0L Turbo I6", fuel: "Gasoline", transmission: "Automatic", drivetrain: "AWD",
    mpg: "18/23", bodyType: "SUV", image: images[5], vin: "SALE7EEU5P7123456",
    stock: "LR2312", features: ["Clean Carfax", "One Owner", "X-Dynamic Package", "Off-Road Pack"],
    seats: 5, color: "Santorini Black"
  },
  {
    id: 13, make: "BMW", model: "iX xDrive50", year: 2023, price: 83900, mileage: 6100,
    engine: "Dual Motor Electric", fuel: "Electric", transmission: "Automatic", drivetrain: "AWD",
    mpg: "86/87 MPGe", bodyType: "SUV", image: images[0], vin: "WB523CF05PCH12345",
    stock: "BM2313", features: ["Clean Carfax", "One Owner", "Technology Package", "Harman Kardon"],
    seats: 5, color: "Carbon Black"
  },
  {
    id: 14, make: "Mercedes-Benz", model: "EQS 450+", year: 2023, price: 104900, mileage: 4800,
    engine: "Single Motor Electric", fuel: "Electric", transmission: "Automatic", drivetrain: "RWD",
    mpg: "97/97 MPGe", bodyType: "Sedan", image: images[1], vin: "W1K6M4GB7PA123456",
    stock: "MB2314", features: ["Clean Carfax", "Hyperscreen", "Burmester 4D", "MBUX AR Navigation"],
    seats: 5, color: "Obsidian Black"
  },
  {
    id: 15, make: "Lexus", model: "RX 350h", year: 2023, price: 52900, mileage: 9800,
    engine: "2.5L Hybrid I4", fuel: "Hybrid", transmission: "CVT", drivetrain: "AWD",
    mpg: "37/33", bodyType: "SUV", image: images[3], vin: "2T2HZMDA1PC123456",
    stock: "LX2315", features: ["Clean Carfax", "One Owner", "F Sport", "Mark Levinson Audio"],
    seats: 5, color: "Caviar"
  },
  {
    id: 16, make: "Genesis", model: "G80 3.5T", year: 2023, price: 56900, mileage: 7200,
    engine: "3.5L Twin-Turbo V6", fuel: "Gasoline", transmission: "Automatic", drivetrain: "AWD",
    mpg: "18/27", bodyType: "Sedan", image: images[5], vin: "KMTG34LA5PA123456",
    stock: "GN2316", features: ["Clean Carfax", "One Owner", "Prestige Package", "Lexicon Audio"],
    seats: 5, color: "Vik Black"
  },
  {
    id: 17, make: "Volvo", model: "XC90 Recharge", year: 2023, price: 64900, mileage: 11500,
    engine: "2.0L Turbo PHEV", fuel: "Hybrid", transmission: "Automatic", drivetrain: "AWD",
    mpg: "27/30", bodyType: "SUV", image: images[4], vin: "YV4H60CZ5P1123456",
    stock: "VO2317", features: ["Clean Carfax", "Ultimate Package", "Bowers & Wilkins", "Pilot Assist"],
    seats: 7, color: "Onyx Black"
  },
  {
    id: 18, make: "Jaguar", model: "F-PACE SVR", year: 2022, price: 72900, mileage: 16400,
    engine: "5.0L Supercharged V8", fuel: "Gasoline", transmission: "Automatic", drivetrain: "AWD",
    mpg: "16/22", bodyType: "SUV", image: images[5], vin: "SADCZ2EE6NA123456",
    stock: "JG2218", features: ["Clean Carfax", "SVR Performance", "Meridian Sound", "Head-Up Display"],
    seats: 5, color: "Narvik Black"
  },
  {
    id: 19, make: "Rivian", model: "R1S Adventure", year: 2023, price: 78900, mileage: 8200,
    engine: "Quad Motor Electric", fuel: "Electric", transmission: "Automatic", drivetrain: "AWD",
    mpg: "69/63 MPGe", bodyType: "SUV", image: images[2], vin: "7FCTGAAA5PN123456",
    stock: "RV2319", features: ["Clean Carfax", "One Owner", "Adventure Package", "Max Pack Battery"],
    seats: 7, color: "El Cap Granite"
  },
  {
    id: 20, make: "Lucid", model: "Air Grand Touring", year: 2023, price: 138900, mileage: 3100,
    engine: "Dual Motor Electric", fuel: "Electric", transmission: "Automatic", drivetrain: "AWD",
    mpg: "131/120 MPGe", bodyType: "Sedan", image: images[2], vin: "LCDDCAEN5PA123456",
    stock: "LC2320", features: ["Clean Carfax", "One Owner", "DreamDrive Pro", "Surreal Sound"],
    seats: 5, color: "Stellar White"
  },
];

export const getVehicleById = (id: number) => vehicles.find(v => v.id === id);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

export const formatMileage = (mileage: number) =>
  new Intl.NumberFormat('en-US').format(mileage);
